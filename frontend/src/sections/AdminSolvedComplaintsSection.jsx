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
        // Ensure res.data is an array before setting
        const complaintsData = Array.isArray(res.data) ? res.data : (res.data?.complaints || []);
        setComplaints(complaintsData);
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
    return <p className="text-theme-muted">Loading solved complaints...</p>;
  }

  if (complaints.length === 0) {
    return <p className="text-theme-muted">No solved complaints found.</p>;
  }

  return (
    <div className="bg-theme-primary rounded-lg shadow-theme p-6">
      <h2 className="text-2xl font-bold mb-4 text-theme-primary">Solved Complaints</h2>
      <table className="min-w-full table-auto border-theme">
        <thead>
          <tr className="bg-theme-secondary text-left">
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Issue</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Resolved On</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id} className="border-t border-theme">
              <td className="px-4 py-2 text-theme-primary">{complaint.user?.name || "Unknown"}</td>
              <td className="px-4 py-2 text-theme-primary">{complaint.title}</td>
              <td className="px-4 py-2 text-theme-primary">{complaint.status}</td>
              <td className="px-4 py-2 text-theme-primary">
                {complaint.resolvedAt ? new Date(complaint.resolvedAt).toLocaleDateString() : "Not set"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSolvedComplaintsSection;
