import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "SUPER_SECRET_KEY";

// ONE TIME ADMIN REGISTER
export const registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminExists = await Admin.findOne();
    if (adminExists) return res.status(403).send("Admin already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    res.status(201).send("Admin registered successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ADMIN LOGIN
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).send("Invalid credentials");

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,        // ✅ ALWAYS true on Render
      sameSite: "none",    // ✅ REQUIRED for Vercel → Render
      maxAge: 60 * 60 * 1000
    });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// LOGOUT
export const logoutAdmin = (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.send("Logout successful");
};

// CHECK AUTH
export const checkAuth = (req, res) => {
  res.send({ authenticated: true });
};
