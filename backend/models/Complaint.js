import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  isResolved: { type: Boolean, default: false },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  voted: { type: Number, default: 0 },
  status: { type: String, enum: ["pending", "in progress", "resolved"], default: "pending" },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date }, // Added resolvedAt field
  priority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
  category: { type: String, required: true },
  location: { type: String, required: true },
  summary: { type: String },
  isSpam: { type: Boolean, default: false },
  isOffensive: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Complaint", complaintSchema);