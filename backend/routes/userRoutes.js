import express from "express";
import { body } from "express-validator";
import {
  registerUser,
  loginUser,
  updateProfile,
  getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload, { compressImage } from "../middleware/upload.js";

const router = express.Router();

// Public Routes
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars"),
    body("phone").notEmpty().withMessage("Phone number is required"),
    body("role").isIn(['student', 'admin']).withMessage("Invalid role"),
  ],
  registerUser
);
router.post("/login", loginUser);

// Protected Routes
router.get("/profile", protect, getUserProfile); // Route to get user profile
router.put("/profile", protect, upload.single("image"), compressImage, updateProfile);

export default router;
