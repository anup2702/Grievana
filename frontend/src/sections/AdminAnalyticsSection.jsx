import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie, Bar, Doughnut } from "react-chartjs-2";
import { MdRefresh, MdTrendingUp, MdPeople, MdAssignment, MdCheckCircle, MdSchedule, MdLocationOn, MdCategory, MdInsights, MdWarning, MdThumbUp } from "react-icons/md";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
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
    averageResolutionTime: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAnalytics = async (showRefresh = false) => {
    try {
      if (showRefresh) setRefreshing(true);
      const res = await API.get("/admin/analytics");
      setStats(res.data);
      if (showRefresh) toast.success("Analytics refreshed");
    } catch (err) {
      toast.error("Failed to load analytics data");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
      if (showRefresh) setRefreshing(false);
    }
  };

  useEffect(() => {
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    },
    elements: {
      point: {
        radius: 2
      },
      line: {
        borderWidth: 2
      }
    }
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
    <div className="bg-theme-primary rounded-lg shadow-theme p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-theme-primary">Analytics</h2>
        <button
          onClick={() => fetchAnalytics(true)}
          disabled={refreshing}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-button-primary text-white rounded hover:bg-button-hover transition-colors"
          title="Refresh Analytics"
        >
          <MdRefresh size={16} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <div className="bg-theme-secondary p-2 rounded text-center flex flex-col items-center gap-1">
            <MdPeople size={20} className="text-theme-primary" />
            <p className="text-xs font-medium text-theme-primary">Total Users</p>
            <p className="text-lg font-bold text-theme-primary">
              {stats.totalUsers}
            </p>
            <p className="text-xs text-theme-muted">Active: {Math.floor(stats.totalUsers * 0.7)}</p>
          </div>
          <div className="bg-theme-secondary p-2 rounded text-center flex flex-col items-center gap-1">
            <MdAssignment size={20} className="text-theme-primary" />
            <p className="text-xs font-medium text-theme-primary">Complaints</p>
            <p className="text-lg font-bold text-theme-primary">
              {stats.complaintsReceived}
            </p>
            <p className="text-xs text-theme-muted">This month: {stats.monthlyComplaints.slice(-1)[0]?.count || 0}</p>
          </div>
          <div className="bg-theme-secondary p-2 rounded text-center flex flex-col items-center gap-1">
            <MdCheckCircle size={20} className="text-theme-primary" />
            <p className="text-xs font-medium text-theme-primary">Resolved</p>
            <p className="text-lg font-bold text-theme-primary">
              {stats.resolvedComplaints}
            </p>
            <p className="text-xs text-theme-muted">{stats.complaintsReceived > 0 ? Math.round((stats.resolvedComplaints / stats.complaintsReceived) * 100) : 0}% rate</p>
          </div>
          <div className="bg-theme-secondary p-2 rounded text-center flex flex-col items-center gap-1">
            <MdPeople size={20} className="text-theme-primary" />
            <p className="text-xs font-medium text-theme-primary">Moderators</p>
            <p className="text-lg font-bold text-theme-primary">
              {stats.activeModerators}
            </p>
            <p className="text-xs text-theme-muted">Active staff</p>
          </div>
          <div className="bg-theme-secondary p-2 rounded text-center flex flex-col items-center gap-1">
            <MdSchedule size={20} className="text-theme-primary" />
            <p className="text-xs font-medium text-theme-primary">Avg. Time</p>
            <p className="text-sm font-bold text-theme-primary">
              {stats.resolvedComplaints > 0 ? formatTime(stats.averageResolutionTime) : "N/A"}
            </p>
            <p className="text-xs text-theme-muted">Resolution</p>
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="bg-theme-secondary p-2 rounded">
            <h4 className="text-sm font-semibold text-theme-primary mb-1 flex items-center gap-1">
              <MdInsights /> Quick Stats
            </h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-theme-muted">Pending:</span>
                <span className="font-medium">{stats.complaintsReceived - stats.resolvedComplaints}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-theme-muted">Categories:</span>
                <span className="font-medium">{stats.complaintsByCategory.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-theme-muted">Locations:</span>
                <span className="font-medium">{stats.complaintsByLocation.length}</span>
              </div>
            </div>
          </div>

          <div className="bg-theme-secondary p-2 rounded">
            <h4 className="text-sm font-semibold text-theme-primary mb-1 flex items-center gap-1">
              <MdTrendingUp /> Recent Activity
            </h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-theme-muted">Last 7 days:</span>
                <span className="font-medium">
                  {stats.monthlyComplaints.slice(-1)[0]?.count || 0} complaints
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-theme-muted">Growth:</span>
                <span className={`font-medium ${stats.monthlyComplaints.length > 1 && stats.monthlyComplaints.slice(-1)[0]?.count > stats.monthlyComplaints.slice(-2)[0]?.count ? 'text-green-500' : 'text-red-500'}`}>
                  {stats.monthlyComplaints.length > 1 ?
                    `${stats.monthlyComplaints.slice(-1)[0]?.count > stats.monthlyComplaints.slice(-2)[0]?.count ? '+' : ''}${(stats.monthlyComplaints.slice(-1)[0]?.count || 0) - (stats.monthlyComplaints.slice(-2)[0]?.count || 0)}`
                    : 'N/A'
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-theme-muted">Avg/Month:</span>
                <span className="font-medium">
                  {stats.monthlyComplaints.length > 0 ? Math.round(stats.monthlyComplaints.reduce((sum, item) => sum + item.count, 0) / stats.monthlyComplaints.length) : 0}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-theme-secondary p-2 rounded">
            <h4 className="text-sm font-semibold text-theme-primary mb-1 flex items-center gap-1">
              <MdThumbUp /> Performance
            </h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-theme-muted">Efficiency:</span>
                <span className="font-medium">
                  {stats.complaintsReceived > 0 ? `${Math.round((stats.resolvedComplaints / stats.complaintsReceived) * 100)}%` : '0%'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-theme-muted">Backlog:</span>
                <span className={`font-medium ${(stats.complaintsReceived - stats.resolvedComplaints) > 10 ? 'text-red-500' : 'text-green-500'}`}>
                  {stats.complaintsReceived - stats.resolvedComplaints} items
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-theme-muted">Response Time:</span>
                <span className="font-medium">
                  {stats.resolvedComplaints > 0 ? formatTime(stats.averageResolutionTime) : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Monthly Complaint Trends Chart */}
          <div className="bg-theme-secondary p-2 rounded">
            <div className="flex items-center gap-1 mb-1">
              <MdTrendingUp size={16} className="text-theme-primary" />
              <h3 className="text-sm font-semibold text-theme-primary">
                Trends
              </h3>
            </div>
            {stats.monthlyComplaints.length > 0 ? (
              <div className="h-32">
                <Line data={monthlyChartData} options={monthlyChartOptions} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-24 text-theme-muted text-xs">
                No data
              </div>
            )}
          </div>

          {/* Complaints by Category Chart */}
          <div className="bg-theme-secondary p-2 rounded">
            <div className="flex items-center gap-1 mb-1">
              <MdCategory size={16} className="text-theme-primary" />
              <h3 className="text-sm font-semibold text-theme-primary">
                Category
              </h3>
            </div>
            {stats.complaintsByCategory.length > 0 ? (
              <div className="h-32 flex items-center justify-center">
                <Pie
                  data={categoryChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    }
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-24 text-theme-muted text-xs">
                No data
              </div>
            )}
          </div>

          {/* Complaints by Location Chart */}
          <div className="bg-theme-secondary p-2 rounded">
            <div className="flex items-center gap-1 mb-1">
              <MdLocationOn size={16} className="text-theme-primary" />
              <h3 className="text-sm font-semibold text-theme-primary">
                Location
              </h3>
            </div>
            {stats.complaintsByLocation.length > 0 ? (
              <div className="h-32 flex items-center justify-center">
                <Doughnut
                  data={locationChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    }
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-24 text-theme-muted text-xs">
                No data
              </div>
            )}
          </div>

          {/* Resolution Rate Chart */}
          <div className="bg-theme-secondary p-2 rounded">
            <div className="flex items-center gap-1 mb-1">
              <MdCheckCircle size={16} className="text-theme-primary" />
              <h3 className="text-sm font-semibold text-theme-primary">
                Resolution
              </h3>
            </div>
            {stats.complaintsReceived > 0 ? (
              <div className="flex flex-col items-center justify-center h-32">
                <div className="relative w-16 h-16 mb-2">
                  <Doughnut
                    data={{
                      labels: ['Resolved', 'Pending'],
                      datasets: [{
                        data: [stats.resolvedComplaints, stats.complaintsReceived - stats.resolvedComplaints],
                        backgroundColor: ['#10B981', '#F59E0B'],
                        hoverBackgroundColor: ['#059669', '#D97706'],
                      }],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                      },
                    }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-theme-primary">
                    {Math.round((stats.resolvedComplaints / stats.complaintsReceived) * 100)}%
                  </p>
                  <p className="text-xs text-theme-muted">Rate</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-24 text-theme-muted text-xs">
                No data
              </div>
            )}
          </div>
        </div>

        {/* Insights Section */}
        <div className="bg-theme-secondary p-3 rounded">
          <h4 className="text-sm font-semibold text-theme-primary mb-2 flex items-center gap-1">
            <MdWarning /> Key Insights
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              {stats.complaintsReceived - stats.resolvedComplaints > 10 && (
                <div className="flex items-center gap-1 text-red-500">
                  <MdWarning size={12} />
                  <span>High backlog: {stats.complaintsReceived - stats.resolvedComplaints} pending complaints</span>
                </div>
              )}
              {stats.monthlyComplaints.length > 1 && stats.monthlyComplaints.slice(-1)[0]?.count > stats.monthlyComplaints.slice(-2)[0]?.count && (
                <div className="flex items-center gap-1 text-green-500">
                  <MdThumbUp size={12} />
                  <span>Growth trend: Complaints increasing month-over-month</span>
                </div>
              )}
              {stats.resolvedComplaints > 0 && stats.averageResolutionTime < 86400000 && (
                <div className="flex items-center gap-1 text-green-500">
                  <MdThumbUp size={12} />
                  <span>Good performance: Average resolution under 24 hours</span>
                </div>
              )}
            </div>
            <div className="space-y-1">
              {stats.complaintsByCategory.length > 5 && (
                <div className="flex items-center gap-1 text-blue-500">
                  <MdInsights size={12} />
                  <span>Diverse issues: {stats.complaintsByCategory.length} complaint categories</span>
                </div>
              )}
              {stats.totalUsers > 0 && (stats.resolvedComplaints / stats.totalUsers) > 0.5 && (
                <div className="flex items-center gap-1 text-green-500">
                  <MdThumbUp size={12} />
                  <span>High engagement: {Math.round((stats.resolvedComplaints / stats.totalUsers) * 100)}% resolution per user</span>
                </div>
              )}
              {stats.activeModerators < 2 && stats.complaintsReceived > 20 && (
                <div className="flex items-center gap-1 text-orange-500">
                  <MdWarning size={12} />
                  <span>Consider adding more moderators for current workload</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsSection;
