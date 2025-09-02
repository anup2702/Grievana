import React, { useEffect, useState } from "react";
import API from "../api/axios";

const SolvedSection = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch complaints on mount
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await API.get("/complaints");

        const solved = res.data.filter((c) => c.status === "resolved");
        setComplaints(solved);
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="flex-1 min-h-screen flex flex-col bg-theme-primary rounded-lg shadow-theme p-6">
      <h2 className="text-2xl font-bold mb-6 text-theme-primary">Solved Complaints</h2>

      {loading ? (
        <div className="text-center text-theme-muted py-20">Loading complaints...</div>
      ) : complaints.length === 0 ? (
        <div className="text-center text-theme-muted py-20">
          <p>No solved complaints found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((complaint) => (
            <div key={complaint._id} className="bg-theme-primary p-4 rounded-xl shadow-theme border border-theme">
              <h3 className="text-lg font-semibold text-theme-primary mb-2">
                {complaint.title}
              </h3>
              <p className="text-sm text-theme-secondary mb-2">{complaint.description}</p>
              <p className="text-xs text-theme-muted">{complaint.place} • {complaint.category}</p>
              <div className="flex justify-between items-center mt-4 text-sm">
                <span>{complaint.voted} votes</span>
                <span className="text-success font-semibold">{complaint.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SolvedSection;