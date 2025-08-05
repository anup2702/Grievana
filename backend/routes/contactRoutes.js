import express from "express";
import {
  createContact,
  getContacts,
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.route("/").post(protect, createContact).get(protect, isAdmin, getContacts);

export default router;
