import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const JWT_SECRET = process.env.JWT_SECRET || "SUPER_SECRET_KEY";

export const requireAdmin = async (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.adminId);
    if (!admin) return res.status(401).json({ message: "Unauthorized" });

    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Global error handler
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};
