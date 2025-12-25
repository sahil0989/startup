import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },          // Cloudinary URL
    imagePublicId: { type: String },  // 👈 REQUIRED FOR DELETE
    products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }],
  },
  { timestamps: true }
);

export default mongoose.model("Collection", collectionSchema);
