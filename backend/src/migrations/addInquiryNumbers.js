/**
 * Migration Script: Add inquiry numbers to existing inquiries
 * 
 * This script:
 * 1. Adds the inquiry_number column to the inquiry table
 * 2. Generates unique inquiry numbers for all existing inquiries
 * 
 * Run this script after pushing the database schema changes:
 * node backend/src/migrations/addInquiryNumbers.js
 */

import { db } from "../db/index.js";
import { inquiryTable } from "../db/schema.js";
import { sql, asc } from "drizzle-orm";

const addInquiryNumbers = async () => {
  console.log("Starting inquiry number migration...");

  try {
    // Step 1: Check if column exists, if not add it (nullable first)
    console.log("\nStep 1: Adding inquiry_number column (if not exists)...");
    try {
      await db.execute(sql`
        ALTER TABLE inquiry 
        ADD COLUMN IF NOT EXISTS inquiry_number TEXT;
      `);
      console.log("✓ Column added successfully");
    } catch (error) {
      console.log("Column might already exist, continuing...");
    }

    // Step 2: Get all inquiries ordered by creation date
    console.log("\nStep 2: Fetching existing inquiries...");
    const inquiries = await db
      .select({
        id: inquiryTable.id,
        inquiryNumber: inquiryTable.inquiryNumber,
        createdAt: inquiryTable.createdAt,
      })
      .from(inquiryTable)
      .orderBy(asc(inquiryTable.createdAt));

    console.log(`Found ${inquiries.length} inquiries`);

    // Step 3: Generate and assign inquiry numbers
    console.log("\nStep 3: Generating inquiry numbers...");
    let counter = 1;
    let updatedCount = 0;
    let skippedCount = 0;

    for (const inquiry of inquiries) {
      // Skip if already has an inquiry number
      if (inquiry.inquiryNumber) {
        skippedCount++;
        continue;
      }

      // Generate inquiry number with padded zeros (INQ-0001, INQ-0002, etc.)
      const inquiryNumber = `INQ-${counter.toString().padStart(4, "0")}`;

      try {
        // Update the inquiry with the generated number
        await db.execute(sql`
          UPDATE inquiry 
          SET inquiry_number = ${inquiryNumber}
          WHERE id = ${inquiry.id};
        `);

        updatedCount++;
        counter++;

        // Log progress every 10 inquiries
        if (updatedCount % 10 === 0) {
          console.log(`  Progress: ${updatedCount}/${inquiries.length} inquiries updated`);
        }
      } catch (error) {
        console.error(`Failed to update inquiry ${inquiry.id}:`, error.message);
      }
    }

    // Step 4: Make the column NOT NULL and add UNIQUE constraint
    console.log("\nStep 4: Adding constraints to inquiry_number column...");
    try {
      await db.execute(sql`
        ALTER TABLE inquiry 
        ALTER COLUMN inquiry_number SET NOT NULL;
      `);
      console.log("✓ Added NOT NULL constraint");
    } catch (error) {
      console.error("Failed to add NOT NULL constraint:", error.message);
    }

    try {
      await db.execute(sql`
        ALTER TABLE inquiry 
        ADD CONSTRAINT inquiry_number_unique UNIQUE (inquiry_number);
      `);
      console.log("✓ Added UNIQUE constraint");
    } catch (error) {
      console.error("Failed to add UNIQUE constraint:", error.message);
    }

    // Summary
    console.log("\n" + "=".repeat(50));
    console.log("Migration Summary:");
    console.log("=".repeat(50));
    console.log(`Total inquiries found: ${inquiries.length}`);
    console.log(`Inquiries updated: ${updatedCount}`);
    console.log(`Inquiries skipped (already had numbers): ${skippedCount}`);
    console.log("=".repeat(50));
    console.log("\n✓ Migration completed successfully!");

    process.exit(0);
  } catch (error) {
    console.error("\n✗ Migration failed:");
    console.error(error);
    process.exit(1);
  }
};

// Run the migration
addInquiryNumbers();
