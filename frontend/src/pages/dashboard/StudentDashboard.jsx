import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import StudentSidebar from "../../components/StudentSidebar";
import FeedSection from "../../sections/FeedSection";
import RegistrationSection from "../../sections/RegisterComplaintPage";
import SolvedSection from "../../sections/SolvedSection";
import EditProfile from "../../sections/EditProfile";
import ContactAdmin from "../../sections/ContactAdmin";

const StudentDashboard = () => {
  return (
    <div className="flex h-screen bg-theme-secondary overflow-hidden">
      
      {/* Sidebar Navigation */}
      <StudentSidebar />

      {/* Main Content Area */}
      <div className="flex-grow min-h-full flex flex-col overflow-hidden">
        <main className="flex-grow overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route index element={<Navigate to="feed" replace />} />
            <Route path="feed" element={<FeedSection />} />
            <Route path="registered" element={<RegistrationSection />} />
            <Route path="solved" element={<SolvedSection />} />
            <Route path="edit" element={<EditProfile />} />
            <Route path="contact" element={<ContactAdmin />} />
            <Route path="*" element={<Navigate to="feed" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
