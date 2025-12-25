import express from "express";
import multer from "multer";
import { requireAdmin } from "../middleware/auth.js";
import {
  uploadHeaderSlide,
  getHeaderSlides,
  getAllHeaderSlides,
  updateHeaderSlide,
  toggleHeaderSlide,
  deleteHeaderSlide,
} from "../controllers/headerSlideController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Frontend
router.get("/", getHeaderSlides);

// Admin
router.get("/admin", requireAdmin, getAllHeaderSlides);
router.post("/", requireAdmin, upload.single("image"), uploadHeaderSlide);
router.put("/:id", requireAdmin, upload.single("image"), updateHeaderSlide);
router.patch("/:id/toggle", requireAdmin, toggleHeaderSlide);
router.delete("/:id", requireAdmin, deleteHeaderSlide);

export default router;
