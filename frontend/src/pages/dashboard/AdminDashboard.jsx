import React from "react";
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
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
