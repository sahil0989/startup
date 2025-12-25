import fs from "fs";
import HeaderSlide from "../models/HeaderSlide.js";
import cloudinary from "../utils/cloudinary.js";

/* ================= CREATE ================= */
export const uploadHeaderSlide = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "header-slides",
    });

    fs.unlinkSync(req.file.path);

    const slide = await HeaderSlide.create({
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      active: false,
    });

    res.status(201).json(slide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET (ADMIN – ALL) ================= */
export const getAllHeaderSlides = async (req, res) => {
  const slides = await HeaderSlide.find().sort("-createdAt");
  res.json(slides);
};

/* ================= GET (FRONTEND – LIVE ONLY) ================= */
export const getHeaderSlides = async (req, res) => {
  const slides = await HeaderSlide.find({ active: true }).sort("-createdAt");
  res.json(slides);
};

/* ================= UPDATE IMAGE ================= */
export const updateHeaderSlide = async (req, res) => {
  try {
    const slide = await HeaderSlide.findById(req.params.id);
    if (!slide) {
      return res.status(404).json({ message: "Slide not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    // delete old image
    if (slide.image?.public_id) {
      await cloudinary.uploader.destroy(slide.image.public_id);
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "header-slides",
    });

    fs.unlinkSync(req.file.path);

    slide.image = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    await slide.save();
    res.json(slide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= TOGGLE LIVE / DRAFT ================= */
export const toggleHeaderSlide = async (req, res) => {
  const slide = await HeaderSlide.findById(req.params.id);
  if (!slide) {
    return res.status(404).json({ message: "Slide not found" });
  }

  slide.active = !slide.active;
  await slide.save();

  res.json(slide);
};

/* ================= DELETE ================= */
export const deleteHeaderSlide = async (req, res) => {
  const slide = await HeaderSlide.findById(req.params.id);
  if (!slide) {
    return res.status(404).json({ message: "Slide not found" });
  }

  if (slide.image?.public_id) {
    await cloudinary.uploader.destroy(slide.image.public_id);
  }

  await slide.deleteOne();
  res.json({ success: true });
};
