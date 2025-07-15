import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiUpvote } from "react-icons/bi";

const FeedSection = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleUpvote = async (id) => {
    try {
      const token = localStorage.getItem("token"); // if you're storing JWT in localStorage
      const res = await axios.patch(
        `http://localhost:5000/api/complaints/${id}/vote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Optional: refresh complaints list
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, voted: c.voted + 1 } : c))
      );
    } catch (error) {
      console.log("Voting failed", error);
    }
  };

  // Fetch complaints on mount
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const res = await axios.get("http://localhost:5000/api/complaints", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const pendingComplaints = res.data.filter(
          (c) => c.status === "pending"
        );
        setComplaints(pendingComplaints);
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="flex-1 h-full flex flex-col bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        Ongoing Complaints
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : complaints.length === 0 ? (
        <p className="text-gray-500">No ongoing complaints found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {complaints.map((complaint) => (
            <div key={complaint._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {complaint.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {complaint.description}
              </p>
              <p className="text-xs text-gray-500">
                {complaint.place} | {complaint.category}
              </p>
              <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  {" "}
                  <button
                    className="cursor-pointer"
                    onClick={() => handleUpvote(complaint._id)}
                  >
                    <BiUpvote size={15} />
                  </button>{" "}
                  {complaint.voted}
                </span>
                <span className="text-yellow-600 font-semibold">
                  {complaint.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedSection;
