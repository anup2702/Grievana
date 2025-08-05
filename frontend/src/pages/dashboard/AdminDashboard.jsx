import React from "react";
<<<<<<< HEAD
import AdminSidebar from "../../components/AdminSidebar";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AdminComplaintsSection from "../../sections/AdminComplaintsSection";
import AdminUsersSection from "../../sections/AdminUsersSection";
import AdminAnalyticsSection from "../../sections/AdminAnalyticsSection";
import AdminCategoriesSection from "../../sections/AdminCategoriesSection"; // Import new component
import AdminSolvedComplaintsSection from "../../sections/AdminSolvedComplaintsSection"; // Import new component
import AdminContactSection from "../../sections/AdminContactSection";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear admin token and redirect to login
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex gap-10 ">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <AdminSidebar handleLogout={handleLogout} />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 min-h-screen w-full">
        <Routes>
          <Route index element={<Navigate to="complaints" replace />} />
          <Route path="complaints" element={<AdminComplaintsSection />} />
          <Route path="users" element={<AdminUsersSection />} />
          <Route path="analytics" element={<AdminAnalyticsSection />} />
          <Route path="categories" element={<AdminCategoriesSection />} />
          <Route path="solved" element={<AdminSolvedComplaintsSection />} /> {/* New route */}
          <Route path="contact" element={<AdminContactSection />} />
          <Route path="*" element={<Navigate to="complaints" replace />} />
=======
import { Routes, Route, Navigate } from "react-router-dom";
import AdminSidebar from "../../componenets/AdminSidebar";
import FeedSection from "../../sections/FeedSection";
import SolvedSection from "../../sections/SolvedSection";
import EditProfile from "../../sections/EditProfile";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar/>
      <div className="flex-grow p-6">
        <Routes>
          <Route index element={<Navigate to="feed" replace />} />
          <Route path="feed" element={<FeedSection />} />
          <Route path="registered" element={<RegistrationSection />} />
          <Route path="solved" element={<SolvedSection />} />
          <Route path="edit" element={<EditProfile />} />
>>>>>>> 4a19ab3571681c5bb6b67186d3aff00db5aa42f3
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
