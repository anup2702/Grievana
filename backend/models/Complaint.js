import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isResolved: { type: Boolean, default: false },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  voted: { type: Number, default: 0 },
  status: { type: String, enum: ["pending", "in progress", "resolved"], default: "pending" },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date }, // Added resolvedAt field
});

export default mongoose.model("Complaint", complaintSchema);