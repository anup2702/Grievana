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
import { useTheme } from "../contexts/ThemeContext";

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
  const { isDarkMode } = useTheme();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const username = user.name || "Admin";
  const profileImage = user.image ? `data:image/jpeg;base64,${user.image}` : null;

  return (
    <div className={`w-64 md:w-72 h-screen shadow-theme p-4 md:p-6 flex flex-col transition-colors duration-300 ${
      isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Logo / Header */}
      <div className="mb-6 text-center">
        <h1 className={`text-2xl font-bold transition-colors cursor-pointer ${
          isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'
        }`}>
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
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
            isDarkMode ? 'bg-gray-600' : 'bg-black'
          }`}>
            A
          </div>
        )}
        <h2 className={`text-lg font-semibold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>{username}</h2>
      </div>

    {/* Navigation Links at Top */}
    <nav className="flex flex-col gap-2 mb-auto">
      {links.map(({ path, label, icon }) => (
        <NavLink
          key={path}
          to={`/admin/${path}`}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors ${
              isActive
                ? isDarkMode
                ? "bg-gray-900 text-white font-semibold"
                : "bg-black text-white font-semibold"
                : isDarkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
        className={`mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors ${
          isDarkMode
            ? 'bg-red-600 text-white hover:bg-red-700'
            : 'bg-red-500 text-white hover:bg-red-600'
        }`}
      >
        <IoIosLogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
