import asyncHandler from "express-async-handler";
import Complaint from "../models/Complaint.js";

// Create a new complaint
export const createComplaint = asyncHandler(async (req, res) => {
  const { title, description, category, image } = req.body;

  const complaint = new Complaint({
    user: req.user.id,
    title,
    description,
    category,
    image, // Save the image filename
    status: "pending", // Default status for new complaints
  });

  const createdComplaint = await complaint.save();
  res.status(201).json(createdComplaint);
});

// Get all complaints for a user
export const getUserComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({ user: req.user.id });
  res.json(complaints);
});

// Get all complaints (for admin or general feed)
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

  const complaints = await Complaint.find(query)
    .populate({
      path: "user",
      select: "name image",
      transform: (doc) => {
        if (doc && doc.image) {
          return { ...doc._doc, image: doc.image.toString('base64') };
        }
        return doc;
      },
    })
    .sort({ createdAt: -1 });

  const populatedComplaints = complaints.map(complaint => {
    const complaintObject = complaint.toObject();
    if (complaintObject.user && complaintObject.user.image) {
      complaintObject.user.image = complaintObject.user.image.toString('base64');
    }
    if (complaintObject.image) {
      complaintObject.image = `data:image/jpeg;base64,${complaintObject.image.toString('base64')}`;
    }
    return complaintObject;
  });

  res.json(populatedComplaints);
});

// Get a single complaint by ID
export const getComplaintById = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (complaint) {
    if (complaint.image) {
      complaint.image = `data:image/jpeg;base64,${complaint.image.toString('base64')}`;
    }
    res.json(complaint);
  } else {
    res.status(404);
    throw new Error("Complaint not found");
  }
});

// Update a complaint
export const updateComplaint = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  const complaint = await Complaint.findById(req.params.id);

  if (complaint) {
    complaint.title = title || complaint.title;
    complaint.description = description || complaint.description;
    complaint.category = category || complaint.category;

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
