import fs from "fs";
import Product from "../models/Product.js";
import Collection from "../models/Collection.js";
import cloudinary from "../utils/cloudinary.js";

const uploadImages = async (files) => {
  return await Promise.all(
    files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "products",
      });

      fs.unlinkSync(file.path);

      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    })
  );
};

const deleteImages = async (images = []) => {
  await Promise.all(
    images.map((img) =>
      cloudinary.uploader.destroy(img.public_id)
    )
  );
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      collection,
      originalPrice,
      discountedPrice,
      description,
      material,
      dimensions
    } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Product name is required" });
    }

    if (!collection) {
      return res.status(400).json({ message: "Collection is required" });
    }

    // Validate collection
    const validCollection = await Collection.findById(collection);
    if (!validCollection) {
      return res.status(400).json({ message: "Invalid collection" });
    }

    const price = Number(originalPrice) || 0;
    const discount = Number(discountedPrice) || 0;

    if (discount > price) {
      return res
        .status(400)
        .json({ message: "Discounted price cannot exceed original price" });
    }

    let images = [];
    if (req.files?.length) {
      images = await uploadImages(req.files);
    }

    const product = await Product.create({
      name,
      collection,
      originalPrice: price,
      discountedPrice: discount,
      description,
      material,
      images,
      dimensions
    });

    // 👈 UPDATE COLLECTION: Push the new product ID
    await Collection.findByIdAndUpdate(collection, {
      $push: { products: product._id },
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Other methods: getAllProducts, getProductById, updateProduct, deleteProduct, searchProducts, etc.
// You already implemented them correctly; just ensure uploadImages is used.

// Get all products (with optional pagination)
export const getAllProductsAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const products = await Product.find().populate("collection", "name").skip(skip).limit(limit).lean();
    const total = await Product.countDocuments();
    res.json({ total, page, limit, products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all products (with optional pagination)
export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = { status: "live" };

    const products = await Product.find(filter)
      .populate("collection", "name")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    const total = await Product.countDocuments(filter);

    res.json({
      total,
      page,
      limit,
      products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("collections", "name");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updates = { ...req.body };

    // Inside updateProduct after product is found...
    if (updates.collection && updates.collection.toString() !== product.collection.toString()) {
      // 1. Remove from old collection
      await Collection.findByIdAndUpdate(product.collection, {
        $pull: { products: product._id },
      });
      // 2. Add to new collection
      await Collection.findByIdAndUpdate(updates.collection, {
        $push: { products: product._id },
      });
    }

    // Validate prices
    if (
      updates.discountedPrice &&
      updates.originalPrice &&
      Number(updates.discountedPrice) > Number(updates.originalPrice)
    ) {
      return res
        .status(400)
        .json({ message: "Discounted price cannot exceed original price" });
    }

    // Replace images if new ones uploaded
    if (req.files && req.files.length > 0) {
      await deleteImages(product.images);
      updates.images = await uploadImages(req.files);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // 👈 UPDATE COLLECTION: Remove product ID from its collection
    if (product.collection) {
      await Collection.findByIdAndUpdate(product.collection, {
        $pull: { products: product._id },
      });
    }

    // Delete images from Cloudinary
    await deleteImages(product.images);

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get products by collection
export const getProductsByCollection = async (req, res) => {
  try {
    const products = await Product.find({ collections: req.params.collectionId })
      .populate("collection", "name")
      .lean();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category })
      .populate("collection", "name")
      .lean();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search products by name
export const searchProducts = async (req, res) => {
  try {
    const products = await Product.find({ name: { $regex: req.query.q, $options: "i" } })
      .populate("collection", "name")
      .lean();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};