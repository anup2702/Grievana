import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import connectDB from "../config/db.js";

import userRoutes from "../routes/userRoutes.js";
import complaintRoutes from "../routes/complaintRoutes.js";
import contactRoutes from "../routes/contactRoutes.js";
import adminRoutes from "../routes/adminRoutes.js";
import { notFound, errorHandler } from "../middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: "https://grievana.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

// dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// static uploads (⚠️ works only for read, not persistent writes)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Connect DB per request safely
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
