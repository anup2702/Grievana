import React from "react";
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
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
