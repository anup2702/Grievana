import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegistrationSection = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  console.log("User:", student);

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("student"));
    console.log("User:", user);
    console.log({ title, description, location, department });

    if (!user || !user.token) {
      toast.error("User not logged in.");
      return;
    }

    try {
      console.log("Submitting complaint...");
      const { data } = await axios.post(
        "http://localhost:5000/api/complaints/createComplaint",
        {
          title,
          description,
          place: location,
          category: department,
          user: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success("Complaint submitted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error(
        error.response?.data?.message || "Failed to submit complaint"
      );
    }
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        Complaint Registration
      </h2>
      <form onSubmit={handleComplaintSubmit} className="space-y-6 px-8">
        {/* Title */}
        <div className="flex flex-col mb-4">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Description */}
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter detailed description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        {/* Department */}
        <div className="flex flex-col">
          <label
            htmlFor="department"
            className="text-sm font-medium text-gray-700"
          >
            Department
          </label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="e.g. Hostel, Academics"
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Location */}
        <div className="flex flex-col">
          <label
            htmlFor="location"
            className="text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Block A, Room 101"
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Submit */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-80 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Complaint
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationSection;
