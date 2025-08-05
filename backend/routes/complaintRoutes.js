import express from "express";
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

router.route("/").post(protect, upload.single("image"), compressImage, createComplaint).get(protect, getUserComplaints);
router.route("/all").get(protect, getAllComplaints); // New route for all complaints
router
  .route("/:id")
  .get(protect, getComplaintById)
  .put(protect, updateComplaint);
router.route("/:id/status").patch(protect, updateComplaintStatus); // New route for updating status
router.route("/:id/vote").patch(protect, upvoteComplaint); // New route for upvoting

export default router;