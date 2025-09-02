import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

// Check environment variables
console.log("Environment check:");
console.log("MONGO_URI:", process.env.MONGO_URI ? "Set" : "NOT SET");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Set" : "NOT SET");
console.log("PORT:", process.env.PORT || "5000 (default)");

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // frontend port
  credentials: true,
}));

app.use(express.json());

// Get __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect MongoDB
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI environment variable is not set!");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/users", userRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
