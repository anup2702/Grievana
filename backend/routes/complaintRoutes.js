import express from "express";
import multer from "multer";
import {
  createComplaint,
  getUserComplaints,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  updateComplaintStatus,
  upvoteComplaint,
} from "../controllers/complaintController.js";
import { protect } from "../middleware/authMiddleware.js";

import upload, { compressImage } from "../middleware/upload.js";

const router = express.Router();

// Error handling middleware for multer and image processing
const handleUploadError = (error, req, res, next) => {
  console.error("Upload error caught:", error.message);

  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ message: 'File upload error: ' + error.message });
  } else if (error.message === 'Only image files are allowed') {
    return res.status(400).json({ message: error.message });
  } else if (error.message.includes('Cannot write to uploads directory')) {
    return res.status(500).json({ message: 'Server file system error. Please try again later.' });
  } else if (error.message.includes('Invalid image file')) {
    return res.status(400).json({ message: 'Invalid image file. Please select a valid image.' });
  } else if (error.message.includes('Unsupported image format')) {
    return res.status(400).json({ message: error.message });
  } else if (error.message.includes('Image processing failed')) {
    return res.status(500).json({ message: 'Image processing failed. Please try with a different image.' });
  } else if (error.message.includes('Failed to save image file')) {
    return res.status(500).json({ message: 'Failed to save image. Please try again.' });
  }

  // For any other errors, pass to general error handler
  next(error);
};

router.route("/").post(
  protect,
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error("Multer error:", err);
        return handleUploadError(err, req, res, next);
      }
      next();
    });
  },
  compressImage,
  createComplaint,
  handleUploadError  // Catch any errors from compressImage or createComplaint
).get(protect, getUserComplaints);

router.route("/all").get(protect, getAllComplaints); // New route for all complaints
router
  .route("/:id")
  .get(protect, getComplaintById)
  .put(protect, updateComplaint);
router.route("/:id/status").patch(protect, updateComplaintStatus); // New route for updating status
router.route("/:id/vote").patch(protect, upvoteComplaint); // New route for upvoting

export default router;
