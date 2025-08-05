import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";

const AdminComplaintsSection = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filterStatus) params.status = filterStatus;
      if (filterCategory) params.category = filterCategory;
      if (searchTerm) params.search = searchTerm;

      const res = await API.get("/admin/complaints", { params });
      setComplaints(res.data);
    } catch (err) {
      toast.error("Failed to load complaints");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/admin/categories");
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to load categories");
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchCategories();
  }, [filterStatus, filterCategory, searchTerm]); // Re-fetch when filters change

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.patch(`/complaints/${id}/status`, { status: newStatus });

      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
      toast.success("Status updated");
    } catch (err) {
      toast.error("Update failed");
      console.error("Status error:", err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Manage Complaints</h2>
      <p className="mb-6">Admin can view, update, and assign complaints here.</p>

      {/* Filter and Search Controls */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-3 py-2 border rounded-md"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading complaints...</p>
      ) : complaints.length === 0 ? (
        <p className="text-gray-400">No complaints found.</p>
      ) : (
        <table className="min-w-full table-auto border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Issue</th>
              <th className="px-4 py-2">View</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id} className="border-t">
                <td className="px-4 py-2">{complaint.user?.name || "Unknown"}</td>
                <td className="px-4 py-2">{complaint.title}</td>
                <td className="px-4 py-2">
                  <NavLink
                    to={`/admin/complaints/${complaint._id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium underline"
                  >
                    View
                  </NavLink>
                </td>
                <td className="px-4 py-2">
                  <select
                    value={complaint.status}
                    onChange={(e) => handleStatusChange(complaint._id, e.target.value.toLowerCase())}
                    className="border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminComplaintsSection;
