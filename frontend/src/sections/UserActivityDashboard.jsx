import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

const UserActivityDashboard = () => {
  const [stats, setStats] = useState({
    totalComplaints: 0,
    resolvedComplaints: 0,
    pendingComplaints: 0,
    inProgressComplaints: 0,
    totalUsers: 0,
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [complaintsRes, usersRes] = await Promise.all([
        API.get("/admin/complaints", { params: { limit: 1000 } }),
        API.get("/admin/users"),
      ]);

      const complaints = complaintsRes.data.complaints || complaintsRes.data;
      const users = usersRes.data;

      const totalComplaints = complaints.length;
      const resolvedComplaints = complaints.filter(c => c.status === "resolved").length;
      const pendingComplaints = complaints.filter(c => c.status === "pending").length;
      const inProgressComplaints = complaints.filter(c => c.status === "in progress").length;

      // Get recent activity (last 10 complaints)
      const recentActivity = complaints
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10)
        .map(c => ({
          id: c._id,
          title: c.title,
          status: c.status,
          createdAt: c.createdAt,
          user: c.user?.name || "Unknown",
        }));

      setStats({
        totalComplaints,
        resolvedComplaints,
        pendingComplaints,
        inProgressComplaints,
        totalUsers: users.length,
        recentActivity,
      });
    } catch (err) {
      toast.error("Failed to load dashboard stats");
      console.error("Stats error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card-theme rounded-lg shadow-theme p-6">
        <p className="text-theme-secondary">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="card-theme rounded-lg shadow-theme p-6">
      <h2 className="text-2xl font-bold mb-6 text-theme-primary">User Activity Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-theme-secondary p-4 rounded-lg shadow-theme">
          <h3 className="text-lg font-semibold text-theme-primary">Total Complaints</h3>
          <p className="text-3xl font-bold text-theme-primary">{stats.totalComplaints}</p>
        </div>

        <div className="bg-theme-secondary p-4 rounded-lg shadow-theme">
          <h3 className="text-lg font-semibold text-theme-primary">Resolved</h3>
          <p className="text-3xl font-bold text-success">{stats.resolvedComplaints}</p>
        </div>

        <div className="bg-theme-secondary p-4 rounded-lg shadow-theme">
          <h3 className="text-lg font-semibold text-theme-primary">Pending</h3>
          <p className="text-3xl font-bold text-warning">{stats.pendingComplaints}</p>
        </div>

        <div className="bg-theme-secondary p-4 rounded-lg shadow-theme">
          <h3 className="text-lg font-semibold text-theme-primary">In Progress</h3>
          <p className="text-3xl font-bold text-info">{stats.inProgressComplaints}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-theme-secondary p-4 rounded-lg shadow-theme">
        <h3 className="text-xl font-semibold mb-4 text-theme-primary">Recent Activity</h3>
        <div className="space-y-3">
          {stats.recentActivity.length === 0 ? (
            <p className="text-theme-muted">No recent activity</p>
          ) : (
            stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-theme-tertiary rounded">
                <div>
                  <p className="font-medium text-theme-primary">{activity.title}</p>
                  <p className="text-sm text-theme-secondary">by {activity.user}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    activity.status === 'resolved' ? 'status-resolved' :
                    activity.status === 'in progress' ? 'status-in-progress' :
                    'status-pending'
                  }`}>
                    {activity.status}
                  </span>
                  <p className="text-xs text-theme-muted mt-1">
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserActivityDashboard;
