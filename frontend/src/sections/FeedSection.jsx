import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { Sparkles } from "lucide-react";

const FeedSection = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  

  const fetchComplaints = async () => {
    try {
      const response = await API.get("/complaints/all");

      const pendingAndInProgressComplaints = response.data.filter(
        (complaint) => complaint.status === "pending" || complaint.status === "in progress"
      );

      setComplaints(pendingAndInProgressComplaints);
    } catch (error) {
      console.error("Fetch error:", error.response?.data || error.message);
      toast.error("Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async (id) => {
    try {
      await API.patch(`/complaints/${id}/vote`);

      toast.success("Voted successfully!");

      // Optimistic update
      const updated = complaints.map((c) =>
        c._id === id ? { ...c, voted: (c.voted || 0) + 1 } : c
      );
      setComplaints(updated);
    } catch (error) {
      console.error("Vote error:", error.response?.data || error.message);
      toast.error("Failed to vote");
    }
  };

  const handleViewImage = (imageName) => {
    setModalImageSrc(`http://localhost:5000/uploads/${imageName}`);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImageSrc('');
  };

  

  useEffect(() => {
    fetchComplaints();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading complaints...</div>;
  }

  if (!complaints.length) {
    return <div className="text-center py-10 text-gray-400">No pending complaints found.</div>;
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {complaints.map((complaint) => (
        <div
          key={complaint._id}
          className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{complaint.title}</h3>
            <p className="text-gray-600 mt-1">{complaint.description}</p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold px-2 py-1 rounded-full
                ${complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}
              `}>
                {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
              </span>
              {complaint.image && (
              <img
                src={`http://localhost:5000/uploads/${complaint.image}`}
                alt="Complaint attachment"
                className="w-full h-32 object-cover rounded-md mb-2 cursor-pointer"
                onClick={() => handleViewImage(complaint.image)}
              />
            )}
            </div>
            <button
              onClick={() => handleUpvote(complaint._id)}
              aria-label="Upvote complaint"
              className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm hover:bg-blue-200"
            >
              <Sparkles size={16} />
              {complaint.voted || 0}
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500 flex items-center">
            Posted by: {complaint.user?.name || 'Unknown User'}
            <br />
            On: {new Date(complaint.createdAt).toLocaleString()}
            <div className="ml-45">
              {complaint.user?.image && (
              <img
                src={`data:image/jpeg;base64,${complaint.user.image}`}
                alt={complaint.user.name}
                className="w-6 h-6 rounded-full ml-2 object-cover"
              />
            )}
            </div>
          </div>
        </div>
      ))}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl max-h-full overflow-auto relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 text-sm"
            >
              Close
            </button>
            <img src={modalImageSrc} alt="Complaint Image" className="max-w-full max-h-[80vh] object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedSection;