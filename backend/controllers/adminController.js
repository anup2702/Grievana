import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Complaint from "../models/Complaint.js";
import Category from "../models/Category.js"; // Import Category model

// Admin logout
export const logoutAdmin = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const { search } = req.query;
  let query = {};

  if (search) {
    query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };
  }

  const users = await User.find(query).select("-password");
  res.json(users);
});

// Get all complaints with filtering and searching
export const getAllComplaints = asyncHandler(async (req, res) => {
  const { status, category, search } = req.query;
  let query = {};

  if (status) {
    query.status = status;
  }
  if (category) {
    query.category = category;
  }
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const complaints = await Complaint.find(query).populate("user", "name email");
  res.json(complaints);
});

// Get all solved complaints
export const getSolvedComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({ status: "resolved" })
    .populate("user", "name email")
    .sort({ resolvedAt: -1 });
  res.json(complaints);
});

// Resolve a complaint
export const resolveComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);

  if (complaint) {
    complaint.status = "resolved";
    complaint.resolvedAt = new Date(); // Set resolvedAt timestamp
    const updatedComplaint = await complaint.save();
    res.json(updatedComplaint);
  } else {
    res.status(404);
    throw new Error("Complaint not found");
  }
});

// Get analytics data
export const getAnalytics = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments({});
  const complaintsReceived = await Complaint.countDocuments({});
  const resolvedComplaints = await Complaint.countDocuments({ status: "resolved" });
  const activeModerators = await User.countDocuments({ role: "admin", isActive: true }); // Correctly calculate active moderators

  const monthlyComplaints = await Complaint.aggregate([
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  const complaintsByCategory = await Complaint.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  const complaintsByLocation = await Complaint.aggregate([
    { $group: { _id: "$place", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  const resolvedComplaintsData = await Complaint.find({ status: "resolved", resolvedAt: { $ne: null } });
  let totalResolutionTime = 0;
  resolvedComplaintsData.forEach(complaint => {
    if (complaint.createdAt && complaint.resolvedAt) {
      totalResolutionTime += (complaint.resolvedAt.getTime() - complaint.createdAt.getTime());
    }
  });

  const averageResolutionTime = resolvedComplaints > 0 
    ? totalResolutionTime / resolvedComplaints 
    : 0; // in milliseconds

  res.json({
    totalUsers,
    complaintsReceived,
    resolvedComplaints,
    activeModerators,
    monthlyComplaints,
    complaintsByCategory,
    complaintsByLocation,
    averageResolutionTime, // Added average resolution time
  });
});

// Deactivate a user
export const deactivateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.isActive = false;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Update user role
export const updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const { role } = req.body;

  if (user) {
    user.role = role;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Category Management
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const category = await Category.create({ name });
  res.status(201).json(category);
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.remove();
    res.json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  const { name } = req.body;

  if (category) {
    category.name = name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});
