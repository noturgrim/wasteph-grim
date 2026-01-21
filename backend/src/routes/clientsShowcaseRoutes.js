import express from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getActiveClientsShowcase,
  getAllClientsShowcase,
  getClientsShowcaseById,
  createClientsShowcase,
  updateClientsShowcase,
  deleteClientsShowcase,
  toggleClientsShowcaseStatus,
} from "../controllers/clientsShowcaseController.js";

const router = express.Router();

// Public routes
router.get("/", getActiveClientsShowcase);

// Protected routes (require authentication)
router.get("/all", requireAuth, getAllClientsShowcase);
router.get("/:id", requireAuth, getClientsShowcaseById);
router.post("/", requireAuth, createClientsShowcase);
router.put("/:id", requireAuth, updateClientsShowcase);
router.delete("/:id", requireAuth, deleteClientsShowcase);
router.patch("/:id/toggle", requireAuth, toggleClientsShowcaseStatus);

export default router;
