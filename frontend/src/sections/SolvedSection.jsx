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

        const solved = res.data.filter((c) => c.status === "solved");
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
    <div className="flex-1 min-h-screen flex flex-col bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Solved Complaints</h2>

      {loading ? (
        <div className="text-center text-gray-500 py-20">Loading complaints...</div>
      ) : complaints.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          <p>No solved complaints found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((complaint) => (
            <div key={complaint._id} className="bg-white p-4 rounded-xl shadow border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {complaint.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{complaint.description}</p>
              <p className="text-xs text-gray-500">{complaint.place} • {complaint.category}</p>
              <div className="flex justify-between items-center mt-4 text-sm">
                <span>{complaint.voted} votes</span>
                <span className="text-green-600 font-semibold">{complaint.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SolvedSection;