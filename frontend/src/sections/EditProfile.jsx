import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    enrollNo: "CS1234",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", formData);
    toast("Profile updated!");
    // TODO: Send to backend
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-white rounded-lg shadow p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Edit Profile</h2>

      <div className="flex items-center justify-center h-30 ">
        <CgProfile size={80}/>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            readOnly
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Roll Number / College ID */}
        <div className="flex flex-col">
          <label htmlFor="enrollNo" className="text-sm font-medium text-gray-700">Enrollment No.</label>
          <input
            type="text"
            id="enrollNo"
            name="enrollNo"
            required
            value={formData.enrollNo}
            readOnly
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password (optional) */}
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">New Password (optional)</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current"
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
