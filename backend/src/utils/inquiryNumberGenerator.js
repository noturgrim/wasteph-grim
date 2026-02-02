import { db } from "../db/index.js";
import { inquiryTable } from "../db/schema.js";
import { desc } from "drizzle-orm";

/**
 * Generate the next inquiry number in format INQ-0001, INQ-0002, etc.
 * @returns {Promise<string>} Next inquiry number
 */
export const generateInquiryNumber = async () => {
  try {
    // Get the most recent inquiry number
    const [lastInquiry] = await db
      .select({ inquiryNumber: inquiryTable.inquiryNumber })
      .from(inquiryTable)
      .orderBy(desc(inquiryTable.createdAt))
      .limit(1);

    if (!lastInquiry || !lastInquiry.inquiryNumber) {
      // First inquiry ever
      return "INQ-0001";
    }

    // Extract number from format "INQ-0001"
    const lastNumber = parseInt(lastInquiry.inquiryNumber.split("-")[1], 10);
    const nextNumber = lastNumber + 1;

    // Pad with zeros to 4 digits
    const paddedNumber = nextNumber.toString().padStart(4, "0");

    return `INQ-${paddedNumber}`;
  } catch (error) {
    // If there's an error (e.g., empty table), start from 0001
    console.error("Error generating inquiry number:", error);
    return "INQ-0001";
  }
};

/**
 * Generate inquiry number with retry logic for race conditions
 * @param {number} maxRetries - Maximum number of retries (default: 5)
 * @returns {Promise<string>} Next available inquiry number
 */
export const generateInquiryNumberWithRetry = async (maxRetries = 5) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const inquiryNumber = await generateInquiryNumber();
      return inquiryNumber;
    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw new Error(
          "Failed to generate inquiry number after multiple attempts"
        );
      }
      // Wait a bit before retrying (exponential backoff)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 100)
      );
    }
  }
};
