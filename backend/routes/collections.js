import express from "express";
import multer from "multer";
import { createCollection, getAllCollections, getCollectionById, updateCollection, deleteCollection } from "../controllers/collectionController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", requireAdmin, upload.single("image"), createCollection);
router.put("/:id", requireAdmin, upload.single("image"), updateCollection);
router.delete("/:id", requireAdmin, deleteCollection);

router.get("/", getAllCollections);
router.get("/:id", getCollectionById);

export default router;
