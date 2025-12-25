import express from "express";
import { registerAdmin, loginAdmin, logoutAdmin, checkAuth } from "../controllers/adminController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerAdmin); // Use only once
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/check-auth", requireAdmin, checkAuth);

export default router;
