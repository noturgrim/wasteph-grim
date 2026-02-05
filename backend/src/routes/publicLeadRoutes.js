import express from "express";
import { createPublicLead } from "../controllers/publicLeadController.js";
import { publicLeadValidation, validate } from "../middleware/validation.js";
import { rateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Public route - no authentication required
// Apply rate limiting to prevent spam (max 5 submissions per 15 minutes per IP)
router.post(
  "/",
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Max 5 requests per window per IP
    message:
      "Too many submissions from this IP. Please try again after 15 minutes.",
  }),
  publicLeadValidation,
  validate,
  createPublicLead
);

export default router;
