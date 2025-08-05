import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Register a new user
export const registerUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  // Validate email format and extract name
  const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+[0-9]{4}@iem\.edu\.in$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Invalid email format. Please use your organizational email (firstName.lastNameYEAR@iem.edu.in).");
  }

  const name = email.split('@')[0].replace(/[0-9]/g, '').replace('.', ' ');

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password, role });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileCompleted: user.profileCompleted,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Authenticate user & get token
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body; // Destructure role from req.body
  console.log("Backend: Role received in login request:", role); // New log

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    console.log("Backend: User role from DB:", user.role); // New log
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileCompleted: user.profileCompleted,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// Get user profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      department: user.department,
      rollNumber: user.rollNumber,
      image: user.image ? user.image.toString('base64') : null,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Update user profile
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.phone = req.body.phone || user.phone;
    user.department = req.body.department || user.department;
    user.rollNumber = req.body.rollNumber || user.rollNumber;
    user.profileCompleted = true;
    if (req.body.image) {
      user.image = req.body.image; // Save the image buffer
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      profileCompleted: updatedUser.profileCompleted,
      image: updatedUser.image ? updatedUser.image.toString('base64') : null, // Include image in response as base64
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Upvote a complaint
export const upvoteComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);

  if (complaint) {
    // Check if the user has already upvoted this complaint
    if (complaint.upvotes.includes(req.user.id)) {
      res.status(400);
      throw new Error("You have already upvoted this complaint");
    }

    complaint.upvotes.push(req.user.id);
    complaint.voted = (complaint.voted || 0) + 1; // Increment voted count
    const updatedComplaint = await complaint.save();
    res.json(updatedComplaint);
  } else {
    res.status(404);
    throw new Error("Complaint not found");
  }
});