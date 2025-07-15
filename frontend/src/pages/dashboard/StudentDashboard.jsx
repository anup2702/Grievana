import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import StudentSidebar from "../../componenets/StudentSidebar";
import FeedSection from "../../sections/FeedSection";
import RegistrationSection from "../../sections/RegistrationSection";
import SolvedSection from "../../sections/SolvedSection";
import EditProfile from "../../sections/EditProfile";
import ContactAdmin from "../../sections/ContactAdmin";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <StudentSidebar/>
      <div className="flex-grow p-6">
        <Routes>
          <Route index element={<Navigate to="feed" replace />} />
          <Route path="feed" element={<FeedSection />} />
          <Route path="registered" element={<RegistrationSection />} />
          <Route path="solved" element={<SolvedSection />} />
          <Route path="edit" element={<EditProfile />} />
          <Route path="contact" element={<ContactAdmin />} />
        </Routes>
      </div>
    </div>
  );
};

export default StudentDashboard;
