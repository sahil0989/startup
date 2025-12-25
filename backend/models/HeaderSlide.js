import mongoose from "mongoose";

const headerSlideSchema = new mongoose.Schema(
  {
    image: {
      url: String,
      public_id: String,
    },
    active: {
      type: Boolean,
      default: false, // draft by default
    },
  },
  { timestamps: true }
);

export default mongoose.model("HeaderSlide", headerSlideSchema);
