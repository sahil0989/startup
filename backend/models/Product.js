import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    collection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },

    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],

    originalPrice: { type: Number },
    discountedPrice: { type: Number },
    dimensions: { type: String },
    description: { type: String },
    material: { type: String },
    status: {
      type: String,
      enum: ["live", "draft"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
