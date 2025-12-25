import fs from "fs";
import Collection from "../models/Collection.js";
import Product from "../models/Product.js";
import cloudinary from "../utils/cloudinary.js";

/* ================= HELPER ================= */
const uploadImage = async (file) => {
  const result = await cloudinary.uploader.upload(file.path, {
    folder: "collections",
  });

  // delete temp file
  try {
    fs.unlinkSync(file.path);
  } catch (err) {
    console.error("File delete error:", err.message);
  }

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};

/* ================= CREATE ================= */
export const createCollection = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const { url, publicId } = await uploadImage(req.file);

    const collection = await Collection.create({
      name: req.body.name,
      description: req.body.description,
      image: url,
      imagePublicId: publicId,
    });

    res.status(201).json(collection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET ALL ================= */
export const getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find().lean();

    const result = await Promise.all(
      collections.map(async (col) => {
        const count = await Product.countDocuments({
          collections: col._id,
        });
        return { ...col, productCount: count };
      })
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET ONE ================= */
export const getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id).lean();
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    const productCount = await Product.countDocuments({
      collections: collection._id,
    });

    res.json({ ...collection, productCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    collection.name = req.body.name ?? collection.name;
    collection.description = req.body.description ?? collection.description;

    // 🔥 IMAGE REPLACEMENT
    if (req.file) {
      // 1️⃣ delete old image
      if (collection.imagePublicId) {
        await cloudinary.uploader.destroy(collection.imagePublicId);
      }

      // 2️⃣ upload new image
      const { url, publicId } = await uploadImage(req.file);
      collection.image = url;
      collection.imagePublicId = publicId;
    }

    await collection.save();

    const productCount = await Product.countDocuments({
      collections: collection._id,
    });

    res.json({ ...collection.toObject(), productCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;

    const collection = await Collection.findById(id);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    /* ================= DELETE PRODUCTS ================= */
    const products = await Product.find({ collection: id });

    for (const product of products) {
      // 🔥 Delete product images from Cloudinary
      if (product.images?.length > 0) {
        await Promise.all(
          product.images.map((img) =>
            cloudinary.uploader.destroy(img.public_id)
          )
        );
      }

      // 🗑 Delete product document
      await product.deleteOne();
    }

    /* ================= DELETE COLLECTION IMAGE ================= */
    if (collection.imagePublicId) {
      await cloudinary.uploader.destroy(collection.imagePublicId);
    }

    /* ================= DELETE COLLECTION ================= */
    await collection.deleteOne();

    res.json({
      message: "Collection and all related products deleted successfully",
    });
  } catch (err) {
    console.error("Delete collection error:", err);
    res.status(500).json({ message: err.message });
  }
};
