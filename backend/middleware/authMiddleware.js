import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Auth middleware - Token present:", !!token);

  if (!token) {
    console.log("Auth middleware - No token provided");
    return res.status(401).json({ message: "No token" });
  }

  try {
    console.log("Auth middleware - Verifying token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Auth middleware - Token decoded:", decoded);

    console.log("Auth middleware - Finding user:", decoded.id);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      console.log("Auth middleware - User not found");
      return res.status(401).json({ message: "User not found" });
    }

    console.log("Auth middleware - User authenticated:", req.user._id);
    next();
  } catch (err) {
    console.error("Auth middleware - Token verification error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
