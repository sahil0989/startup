import express from "express";
import multer from "multer";
import {
  createProduct, getAllProducts, getProductById,
  updateProduct, deleteProduct, getProductsByCollection,
  getProductsByCategory, searchProducts,
  getAllProductsAdmin
} from "../controllers/productController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Admin-only
router.post("/", requireAdmin, upload.array("images"), createProduct);
router.put("/:id", requireAdmin, upload.array("images"), updateProduct);
router.delete("/:id", requireAdmin, deleteProduct);
router.get("/all", getAllProductsAdmin);

// Public
router.get("/", getAllProducts);
router.get("/search", searchProducts);
router.get("/collection/:collectionId", getProductsByCollection);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getProductById);

export default router;
