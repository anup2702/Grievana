import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

const AdminSolvedComplaintsSection = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolvedComplaints = async () => {
      try {
        const res = await API.get("/admin/solved-complaints");
        setComplaints(res.data);
      } catch (err) {
        toast.error("Failed to load solved complaints");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSolvedComplaints();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading solved complaints...</p>;
  }

  if (complaints.length === 0) {
    return <p className="text-gray-400">No solved complaints found.</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Solved Complaints</h2>
      <table className="min-w-full table-auto border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Issue</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Resolved On</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id} className="border-t">
              <td className="px-4 py-2">{complaint.user?.name || "Unknown"}</td>
              <td className="px-4 py-2">{complaint.title}</td>
              <td className="px-4 py-2">{complaint.status}</td>
              <td className="px-4 py-2">{new Date(complaint.resolvedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSolvedComplaintsSection;
