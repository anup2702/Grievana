import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import ErrorBoundary from "../../components/ErrorBoundary";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AdminComplaintsSection from "../../sections/AdminComplaintsSection";
import AdminUsersSection from "../../sections/AdminUsersSection";
import AdminAnalyticsSection from "../../sections/AdminAnalyticsSection";
import AdminCategoriesSection from "../../sections/AdminCategoriesSection"; // Import new component
import AdminSolvedComplaintsSection from "../../sections/AdminSolvedComplaintsSection"; // Import new component
import UserActivityDashboard from "../../sections/UserActivityDashboard"; // Import new component
// Removed import for AdminContactSection
// import AdminContactSection from "../../sections/AdminContactSection";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear admin token and redirect to login
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-theme-secondary flex gap-10 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-theme-primary shadow-theme flex-shrink-0">
        <AdminSidebar handleLogout={handleLogout} />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 min-h-screen w-full">
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={
            <div className="h-[calc(100vh-3rem)] overflow-y-auto">
              <UserActivityDashboard />
            </div>
          } />
          <Route path="complaints" element={
            <div className="h-[calc(100vh-3rem)] overflow-y-auto">
              <ErrorBoundary>
                <AdminComplaintsSection />
              </ErrorBoundary>
            </div>
          } />
          <Route path="users" element={
            <div className="h-[calc(100vh-3rem)] overflow-y-auto">
              <AdminUsersSection />
            </div>
          } />
          <Route path="analytics" element={
            <div className="h-[calc(100vh-3rem)] overflow-y-auto">
              <AdminAnalyticsSection />
            </div>
          } />
          <Route path="categories" element={
            <div className="h-[calc(100vh-3rem)] overflow-y-auto">
              <AdminCategoriesSection />
            </div>
          } />
          <Route path="solved" element={
            <div className="h-[calc(100vh-3rem)] overflow-y-auto">
              <AdminSolvedComplaintsSection />
            </div>
          } />
          {/* Removed contact page route */}
          {/* <Route path="contact" element={<AdminContactSection />} /> */}
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
