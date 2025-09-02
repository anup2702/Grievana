import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Import ArcElement for Pie/Doughnut charts
} from "chart.js";
import { Line, Pie } from "react-chartjs-2"; // Import Pie

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Register ArcElement
);

const AdminAnalyticsSection = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    complaintsReceived: 0,
    resolvedComplaints: 0,
    activeModerators: 0,
    monthlyComplaints: [],
    complaintsByCategory: [],
    complaintsByLocation: [],
    averageResolutionTime: 0, // Initialize averageResolutionTime
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get("/admin/analytics");
        setStats(res.data);
      } catch (err) {
        toast.error("Failed to load analytics data");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const monthlyChartData = {
    labels: stats.monthlyComplaints.map(
      (data) => `${data._id.month}/${data._id.year}`
    ),
    datasets: [
      {
        label: "Complaints",
        data: stats.monthlyComplaints.map((data) => data.count),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.1,
      },
    ],
  };

  const monthlyChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Complaint Trends",
      },
    },
  };

  const categoryChartData = {
    labels: stats.complaintsByCategory.map((data) => data._id),
    datasets: [
      {
        data: stats.complaintsByCategory.map((data) => data.count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const locationChartData = {
    labels: stats.complaintsByLocation.map((data) => data._id),
    datasets: [
      {
        data: stats.complaintsByLocation.map((data) => data.count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  // Helper function to format milliseconds into a readable time
  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} days`;
    if (hours > 0) return `${hours} hours`;
    if (minutes > 0) return `${minutes} minutes`;
    return `${seconds} seconds`;
  };

  if (loading) {
    return <p className="text-theme-muted">Loading analytics...</p>;
  }

  return (
    <div className="bg-theme-primary rounded-lg shadow-theme p-6 ">
      <h2 className="text-2xl font-bold mb-4 text-theme-primary">Analytics</h2>
      <div className="flex flex-col gap-8">
        {/* Summary Stats */}
        <div className="flex justify-evenly  grid-cols-2  md:grid-cols-4 gap-4">
          <div className="bg-theme-secondary p-4 rounded text-center">
            <p className="text-sm font-medium text-theme-primary">Total Users</p>
            <p className="text-xl font-bold text-theme-primary">
              {stats.totalUsers}
            </p>
          </div>
          <div className="bg-theme-secondary p-4 rounded text-center">
            <p className="text-sm font-medium text-theme-primary">Complaints Received</p>
            <p className="text-xl font-bold text-theme-primary">
              {stats.complaintsReceived}
            </p>
          </div>
          <div className="bg-theme-secondary p-4 rounded text-center">
            <p className="text-sm font-medium text-theme-primary">Resolved Complaints</p>
            <p className="text-xl font-bold text-theme-primary">
              {stats.resolvedComplaints}
            </p>
          </div>
          <div className="bg-theme-secondary p-4 rounded text-center">
            <p className="text-sm font-medium text-theme-primary">Active Moderators</p>
            <p className="text-xl font-bold text-theme-primary">
              {stats.activeModerators}
            </p>
          </div>
          {/* Average Resolution Time */}
          <div className="bg-theme-secondary p-4 rounded text-center">
            <p className="text-sm font-medium text-theme-primary">Avg. Resolution Time</p>
            <p className="text-xl font-bold text-theme-primary">
              {stats.resolvedComplaints > 0 ? formatTime(stats.averageResolutionTime) : "N/A"}
            </p>
          </div>
        </div>

        <div className="flex h-full">
          {/* Monthly Complaint Trends Chart */}
        <div className="bg-theme-secondary p-4 rounded">
          <h3 className="text-lg font-semibold mb-2 text-theme-primary">
            Monthly Complaint Trends
          </h3>
          {stats.monthlyComplaints.length > 0 ? (
            <Line data={monthlyChartData} options={monthlyChartOptions} />
          ) : (
            <div className="flex items-center justify-center h-32 text-theme-muted">
              No monthly complaint data available.
            </div>
          )}
        </div>

        {/* Complaints by Category Chart */}
        <div className="bg-theme-secondary p-4 rounded w-100">
          <h3 className="text-lg font-semibold mb-2 text-theme-primary">
            Complaints by Category
          </h3>
          {stats.complaintsByCategory.length > 0 ? (
            <Pie data={categoryChartData} />
          ) : (
            <div className="flex items-center justify-center h-32 text-theme-muted">
              No complaint data by category available.
            </div>
          )}
        </div>

        {/* Complaints by Location Chart */}
        <div className="bg-theme-secondary p-4 rounded w-100">
          <h3 className="text-lg font-semibold mb-2 text-theme-primary">
            Complaints by Location
          </h3>
          {stats.complaintsByLocation.length > 0 ? (
            <Pie data={locationChartData} />
          ) : (
            <div className="flex items-center justify-center h-32 text-theme-muted">
              No complaint data by location available.
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsSection;
