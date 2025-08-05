import express from "express";
import {
  getAllUsers,
  getAllComplaints,
  resolveComplaint,
  getAnalytics,
  deactivateUser,
  createCategory,
  getCategories,
  deleteCategory,
  logoutAdmin,
  getSolvedComplaints,
  updateUserRole,
  updateCategory,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/logout", logoutAdmin); // Route for admin logout

router.get("/users", protect, isAdmin, getAllUsers);
router.patch("/users/:id/deactivate", protect, isAdmin, deactivateUser); // New route for deactivating user
router.patch("/users/:id/role", protect, isAdmin, updateUserRole); // New route for updating user role
router.get("/complaints", protect, isAdmin, getAllComplaints);
router.put("/complaints/:id/resolve", protect, isAdmin, resolveComplaint);
router.get("/analytics", protect, isAdmin, getAnalytics); // New route for analytics
router.get("/solved-complaints", protect, isAdmin, getSolvedComplaints); // New route for solved complaints

// Category Routes
router.route("/categories")
  .post(protect, isAdmin, createCategory)
  .get(protect, isAdmin, getCategories);
router.route("/categories/:id")
  .delete(protect, isAdmin, deleteCategory)
  .put(protect, isAdmin, updateCategory); // Add this line

export default router;
