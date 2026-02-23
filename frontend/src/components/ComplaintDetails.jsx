import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API, { API_BASE } from "../api/axios";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const ComplaintDetails = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await API.get(`/complaints/${id}`);

        // Handle different response structures
        const data = response.data;
        const fetchedComplaint = data?.complaint || data;

        if (!fetchedComplaint || !fetchedComplaint._id) {
          throw new Error("Invalid complaint data");
        }

        setComplaint(fetchedComplaint);
      } catch (error) {
        console.error("Complaint fetch error:", error.message);
        toast.error("Unable to load complaint details");
        setComplaint(null);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-theme-muted">
        <FaSpinner className="animate-spin mr-2" />
        Loading complaint details...
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="text-center py-20 text-theme-error">
        Complaint not found or an error occurred.
      </div>
    );
  }

  return (
    <div className="bg-theme-primary rounded-md shadow-theme p-6 max-w-4xl mx-auto mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-theme-primary mb-4">
            {complaint.title || "Untitled Complaint"}
          </h2>
          <p className="text-theme-primary mb-4">
            {complaint.description || "No description provided."}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-theme-muted">Category</p>
              <p className="font-semibold text-theme-primary">{complaint.category || "—"}</p>
            </div>
            <div>
              <p className="text-theme-muted">Place</p>
              <p className="font-semibold text-theme-primary">{complaint.place || "—"}</p>
            </div>
            <div>
              <p className="text-theme-muted">Status</p>
              <p
                className={`font-semibold ${
                  complaint.status === "resolved"
                    ? "text-theme-success"
                    : "text-theme-warning"
                }`}
              >
                {complaint.status || "Unknown"}
              </p>
            </div>
            <div>
              <p className="text-theme-muted">Upvotes</p>
              <p className="font-semibold text-theme-primary">{complaint.voted || 0}</p>
            </div>
            <div>
              <p className="text-theme-muted">Submitted On</p>
              <p className="font-semibold text-theme-primary">
                {new Date(complaint.createdAt).toLocaleDateString()}
              </p>
            </div>
            {complaint.resolvedAt && (
              <div>
                <p className="text-theme-muted">Resolved On</p>
                <p className="font-semibold text-theme-primary">
                  {new Date(complaint.resolvedAt).toLocaleDateString()}
                </p>
              </div>
            )}
            {complaint.user ? (
              <div>
                <p className="text-theme-muted">Submitted By</p>
                <p className="font-semibold text-theme-primary">{complaint.user.name || "Unknown User"}</p>
              </div>
            ) : (
              <div>
                <p className="text-theme-muted">Submitted By</p>
                <p className="font-semibold text-theme-primary">Anonymous</p>
              </div>
            )}
          </div>
        </div>

        {complaint.image && (
          <div className="flex justify-center items-center">
            <img
              src={`${API_BASE}/uploads/${complaint.image}`}
              alt="Complaint attachment"
              className="rounded-lg shadow-md max-h-80 object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintDetails;