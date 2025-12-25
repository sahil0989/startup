import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import adminRoutes from "./routes/admin.js";
import contactRoutes from "./routes/contact.js";
import productRoutes from "./routes/products.js";
import collectionRoutes from "./routes/collections.js";
import headerSlideRoutes from "./routes/headerSlide.js";
import { errorHandler } from "./middleware/auth.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL], credentials: true }));
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(morgan("combined"));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/products", productRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/header-slides", headerSlideRoutes);

// Error handler
app.use(errorHandler);

// DB + Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(console.error);
