import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaClipboardList,
  FaUsers,
  FaChartBar,
  FaCheckCircle, // Import FaCheckCircle
  FaTachometerAlt, // Import FaTachometerAlt for dashboard
  // Removed FaEnvelope
} from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

const links = [
  { path: "dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "complaints", label: "Complaints", icon: <FaClipboardList /> },
  { path: "users", label: "Users", icon: <FaUsers /> },
  { path: "analytics", label: "Analytics", icon: <FaChartBar /> },
  { path: "solved", label: "Solved", icon: <FaCheckCircle /> }, // New link for Solved Complaints
  // Removed contact link
  // { path: "contact", label: "Contact Messages", icon: <FaEnvelope /> },
];

const AdminSidebar = ({ handleLogout }) => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const username = user.name || "Admin";
  const profileImage = user.image ? `data:image/jpeg;base64,${user.image}` : null;

  return (
    <div className="w-64 md:w-72 h-screen bg-theme-primary shadow-theme p-4 md:p-6 flex flex-col">
      {/* Logo / Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-theme-primary hover:text-theme-secondary transition cursor-pointer">
          Admin Panel
        </h1>
      </div>

      {/* Profile Section */}
      <div className="mb-6 flex items-center gap-3 px-4">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-button-primary flex items-center justify-center text-white font-bold">
            A
          </div>
        )}
        <h2 className="text-lg font-semibold text-theme-primary">{username}</h2>
      </div>

    {/* Navigation Links at Top */}
    <nav className="flex flex-col gap-2 mb-auto">
      {links.map(({ path, label, icon }) => (
        <NavLink
          key={path}
          to={`/admin/${path}`}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md text-sm transition ${
              isActive
                ? "bg-button-primary text-white font-semibold"
                : "bg-theme-secondary text-theme-primary hover:bg-theme-tertiary"
            }`
          }
        >
          {icon}
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>

      {/* Logout Button at Bottom */}
      <button
        onClick={handleLogout}
        className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-error text-white rounded-md font-semibold hover:bg-error transition"
      >
        <IoIosLogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
