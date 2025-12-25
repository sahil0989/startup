import express from "express";
import {
  submitContactForm,
  getAllMessages,
  updateMessageStatus,
  deleteMessage,
} from "../controllers/contactController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// User
router.post("/", submitContactForm);

// Admin
router.get("/", requireAdmin, getAllMessages);
router.put("/:id/handle", requireAdmin, updateMessageStatus);
router.delete("/:id", requireAdmin, deleteMessage);

export default router;
