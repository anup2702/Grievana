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
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalComplaints: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const fetchComplaints = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const params = { page, limit: 10 };
      if (filterStatus) {
        if (filterStatus === "resolved") {
          params.status = "resolved";
        } else {
          params.status = filterStatus;
        }
      }
      if (filterCategory) params.category = filterCategory;
      if (searchTerm) params.search = searchTerm;

      const res = await API.get("/admin/complaints", { params });
      console.log("AdminComplaintsSection fetchComplaints response:", res.data);
      setComplaints(res.data?.complaints || []);
      setPagination(res.data?.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalComplaints: 0,
        hasNextPage: false,
        hasPrevPage: false,
      });
      setCurrentPage(page);
    } catch (err) {
      const errorMessage = "Failed to load complaints";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Fetch error:", err);
      // Set empty data on error
      setComplaints([]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalComplaints: 0,
        hasNextPage: false,
        hasPrevPage: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/admin/categories");
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Categories fetch error:", err);
      setCategories([]);
      // Don't show toast for categories error as it's not critical
    }
  };

  useEffect(() => {
    fetchComplaints(1);
    fetchCategories();
  }, [filterStatus, filterCategory, searchTerm]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Use admin endpoint for status updates
      await API.put(`/admin/complaints/${id}/resolve`, { status: newStatus });
      // Refetch complaints to ensure data consistency
      await fetchComplaints(currentPage);
      toast.success("Status updated");
    } catch (err) {
      toast.error("Update failed");
      console.error("Status error:", err);
    }
  };

  const exportToCSV = () => {
    if (!complaints || complaints.length === 0) {
      toast.error("No data to export");
      return;
    }

    try {
      const headers = ["User", "Title", "Description", "Category", "Status", "Priority", "Created At"];
      const csvData = complaints.map(complaint => [
        complaint?.user?.name || "Unknown",
        complaint?.title || "",
        complaint?.description || "",
        complaint?.category || "",
        complaint?.status || "",
        complaint?.priority || "",
        complaint?.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : ""
      ]);

      const csvContent = [headers, ...csvData]
        .map(row => row.map(field => `"${field || ""}"`).join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `complaints_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("CSV exported successfully");
    } catch (error) {
      console.error("CSV export error:", error);
      toast.error("Failed to export CSV");
    }
  };

  const exportToPDF = () => {
    if (!complaints || complaints.length === 0) {
      toast.error("No data to export");
      return;
    }

    try {
      // Simple PDF export using browser print functionality
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        toast.error("Please allow popups for PDF export");
        return;
      }

      const htmlContent = `
        <html>
          <head>
            <title>Complaints Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #333; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              tr:nth-child(even) { background-color: #f9f9f9; }
            </style>
          </head>
          <body>
            <h1>Complaints Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Created Date</th>
                </tr>
              </thead>
              <tbody>
                ${complaints.map(complaint => `
                  <tr>
                    <td>${complaint?.user?.name || "Unknown"}</td>
                    <td>${complaint?.title || ""}</td>
                    <td>${complaint?.category || ""}</td>
                    <td>${complaint?.status || ""}</td>
                    <td>${complaint?.priority || ""}</td>
                    <td>${complaint?.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : ""}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `;

      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.print();

      toast.success("PDF export initiated. Use browser's print to PDF feature.");
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Failed to export PDF");
    }
  };

  return (
    <div className="card-theme rounded-lg shadow-theme p-6">
      <h2 className="text-2xl font-bold mb-4 text-theme-primary">Manage Complaints</h2>
      <p className="mb-6 text-theme-secondary">Admin can view, update, and assign complaints here.</p>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-theme flex-grow px-3 py-2 rounded-md"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input-theme px-3 py-2 rounded-md"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="input-theme px-3 py-2 rounded-md"
        >
          <option value="">All Categories</option>
          {Array.isArray(categories) && categories.map((category) => (
            <option key={category?._id || Math.random()} value={category?.name || ""}>
              {category?.name || "Unknown"}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 flex gap-2">
        <button
          onClick={exportToCSV}
          className="button-theme-primary bg-success"
        >
          Export to CSV
        </button>
        <button
          onClick={exportToPDF}
          className="button-theme-primary bg-error"
        >
          Export to PDF
        </button>
      </div>

      {error ? (
        <div className="text-center py-8">
          <p className="text-error mb-4">{error}</p>
          <button
            onClick={() => fetchComplaints(1)}
            className="button-theme-primary"
          >
            Try Again
          </button>
        </div>
      ) : loading ? (
        <p className="text-theme-muted">Loading complaints...</p>
      ) : !Array.isArray(complaints) || complaints.length === 0 ? (
        <p className="text-theme-muted">No complaints found.</p>
      ) : (
        <>
          <table className="min-w-full table-auto border-theme">
            <thead>
              <tr className="bg-theme-secondary text-left">
                <th className="px-4 py-2 text-theme-primary">User</th>
                <th className="px-4 py-2 text-theme-primary">Issue</th>
                <th className="px-4 py-2 text-theme-primary">View</th>
                <th className="px-4 py-2 text-theme-primary">Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint?._id || Math.random()} className="border-theme">
                  <td className="px-4 py-2 text-theme-primary">{complaint?.user?.name || "Unknown"}</td>
                  <td className="px-4 py-2 text-theme-primary">{complaint?.title || ""}</td>
                  <td className="px-4 py-2">
                    <NavLink
                      to={`/admin/complaints/${complaint?._id}`}
                      className="text-button-primary hover:text-button-hover font-medium underline"
                    >
                      View
                    </NavLink>
                  </td>
                  <td className="px-4 py-2">
                    <select
                      value={complaint?.status || "pending"}
                      onChange={(e) => handleStatusChange(complaint?._id, e.target.value.toLowerCase())}
                      className="input-theme px-2 py-1"
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

          {pagination && pagination.totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-theme-secondary">
                Showing {complaints.length} of {pagination.totalComplaints || 0} complaints
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fetchComplaints(currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="button-theme-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-theme-primary">
                  Page {pagination.currentPage || 1} of {pagination.totalPages || 1}
                </span>
                <button
                  onClick={() => fetchComplaints(currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className="button-theme-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminComplaintsSection;
