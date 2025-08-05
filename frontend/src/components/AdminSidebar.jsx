import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaClipboardList,
  FaUsers,
  FaChartBar,
  FaCheckCircle, // Import FaCheckCircle
  FaEnvelope, // Import FaEnvelope
} from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

const links = [
  { path: "complaints", label: "Complaints", icon: <FaClipboardList /> },
  { path: "users", label: "Users", icon: <FaUsers /> },
  { path: "analytics", label: "Analytics", icon: <FaChartBar /> },
  { path: "solved", label: "Solved", icon: <FaCheckCircle /> }, // New link for Solved Complaints
  { path: "contact", label: "Contact Messages", icon: <FaEnvelope /> },
];

const AdminSidebar = ({ handleLogout }) => (
  <div className="w-64 h-screen bg-white shadow-md p-4 flex flex-col">
    {/* Logo / Header */}
    <div className="mb-6 text-center">
      <h1 className="text-2xl font-bold text-blue-700 hover:text-blue-800 transition cursor-pointer">
        Admin Panel
      </h1>
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
                ? "bg-blue-600 text-white font-semibold"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100"
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
      className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-md font-semibold hover:bg-red-200 transition"
    >
      <IoIosLogOut size={20} />
      Logout
    </button>
  </div>
);

export default AdminSidebar;