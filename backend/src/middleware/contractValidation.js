import { z } from "zod";
import { AppError } from "./errorHandler.js";

/**
 * Validation Middleware for Contract endpoints
 * Uses Zod for schema validation
 */

// Signatory schema
const signatorySchema = z.object({
  name: z.string().min(1, "Signatory name is required"),
  position: z.string().min(1, "Signatory position is required"),
});

// Contract request schema
const requestContractSchema = z.object({
  // Required fields
  contractType: z.enum(
    ["long_term_variable", "long_term_fixed", "fixed_rate_term", "garbage_bins", "garbage_bins_disposal"],
    { errorMap: () => ({ message: "Invalid contract type" }) }
  ),
  clientName: z.string().min(1, "Client name is required"),
  companyName: z.string().optional(),
  clientEmailContract: z.string().email("Invalid email format").min(1, "Client email is required"),
  clientAddress: z.string().optional(),
  serviceAddress: z.string().min(1, "Service address is required"),
  collectionSchedule: z.enum(
    ["daily", "weekly", "monthly", "bi_weekly", "other"],
    { errorMap: () => ({ message: "Invalid collection schedule" }) }
  ),
  specialClauses: z.string().min(1, "Special clauses or requests field is required"),
  signatories: z
    .array(signatorySchema)
    .min(1, "At least one signatory is required"),
  ratePerKg: z.string().min(1, "Rate per kg specification is required"),
  clientRequests: z.string().min(1, "Client requests field is required"),

  // Optional fields
  contractDuration: z.string().optional(),
  actualAddress: z.string().optional(),
  collectionScheduleOther: z.string().optional(),
  wasteAllowance: z.string().optional(),
  requestNotes: z.string().optional(),
});

/**
 * Validate request contract
 */
export const validateRequestContract = (req, res, next) => {
  try {
    requestContractSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join(", ");
      return next(new AppError(`Validation error: ${errorMessages}`, 400));
    }
    next(error);
  }
};
