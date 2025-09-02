import asyncHandler from "express-async-handler";
import Complaint from "../models/Complaint.js";
import { analyzeComplaint } from "../geminiService.js";

// Create a new complaint
export const createComplaint = asyncHandler(async (req, res) => {
  console.log("Creating complaint - Request body:", req.body);
  console.log("Creating complaint - User from token:", req.user);

  const { title, description, category, location, priority, image } = req.body;

  // Validate required fields
  if (!title || !description || !category || !location) {
    console.log("Missing required fields");
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    // Analyze the complaint using rule-based analysis for spam/offensive check
    const analysis = await analyzeComplaint(title, description);
    console.log("Complaint analysis result:", analysis);

    if (analysis.isSpam || analysis.isOffensive) {
      res.status(400).json({ message: "Complaint cannot be registered. It has been flagged as spam or offensive." });
      return;
    }

    const complaint = new Complaint({
      user: req.user.id,
      title,
      description,
      category,
      location,
      priority,
      summary: analysis.summary,
      image, // Save the image filename
      status: "pending", // Default status for new complaints
      isSpam: analysis.isSpam,
      isOffensive: analysis.isOffensive,
    });

    console.log("Saving complaint:", complaint);
    const createdComplaint = await complaint.save();
    console.log("Complaint saved successfully:", createdComplaint);
    res.status(201).json(createdComplaint);
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Get all complaints for a user
export const getUserComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({ user: req.user.id });
  res.json(complaints);
});

// Get all complaints (for admin or general feed)
export const getAllComplaints = asyncHandler(async (req, res) => {
  const { status, category, search, page = 1, limit = 10 } = req.query;
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

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const totalComplaints = await Complaint.countDocuments(query);
  const totalPages = Math.ceil(totalComplaints / limitNum);

  const complaints = await Complaint.find(query)
    .populate({
      path: "user",
      select: "name image",
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum);

  const populatedComplaints = complaints.map(complaint => {
    const complaintObject = complaint.toObject();
    if (complaintObject.user && complaintObject.user.image) {
      complaintObject.user.image = complaintObject.user.image.toString('base64');
    }
    // Remove base64 conversion for complaint image, use filename directly
    // if (complaintObject.image) {
    //   complaintObject.image = `data:image/jpeg;base64,${complaintObject.image.toString('base64')}`;
    // }
    return complaintObject;
  });

  res.json({
    complaints: populatedComplaints,
    pagination: {
      currentPage: pageNum,
      totalPages,
      totalComplaints,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
  });
});

// Get a single complaint by ID
export const getComplaintById = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (complaint) {
    // Remove base64 conversion for complaint image, use filename directly
    // if (complaint.image) {
    //   complaint.image = `data:image/jpeg;base64,${complaint.image.toString('base64')}`;
    // }
    res.json(complaint);
  } else {
    res.status(404);
    throw new Error("Complaint not found");
  }
});

// Update a complaint
export const updateComplaint = asyncHandler(async (req, res) => {
  const { title, description, category, location, priority } = req.body;

  const complaint = await Complaint.findById(req.params.id);

  if (complaint) {
    complaint.title = title || complaint.title;
    complaint.description = description || complaint.description;
    complaint.category = category || complaint.category;
    complaint.location = location || complaint.location;
    complaint.priority = priority || complaint.priority;

    const updatedComplaint = await complaint.save();
    res.json(updatedComplaint);
  } else {
    res.status(404);
    throw new Error("Complaint not found");
  }
});

// Update complaint status
export const updateComplaintStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  console.log(`Backend: Attempting to update complaint ${req.params.id} to status: ${status}`);

  const complaint = await Complaint.findById(req.params.id);

  if (complaint) {
    console.log("Backend: Complaint found:", complaint);
    complaint.status = status || complaint.status;

    // Set resolvedAt timestamp when status is changed to "resolved"
    if (status === "resolved") {
      complaint.resolvedAt = new Date();
    }

    const updatedComplaint = await complaint.save();
    console.log("Backend: Complaint updated successfully:", updatedComplaint);
    res.json(updatedComplaint);
  } else {
    console.log("Backend: Complaint not found for ID:", req.params.id);
    res.status(404);
    throw new Error("Complaint not found");
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
