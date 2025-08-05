import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import API from "../api/axios";
import { toast } from "react-toastify";

const AdminUsersSection = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/admin/users");
        setUsers(res.data);
      } catch (err) {
        toast.error("Failed to load users");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeactivateUser = async (id) => {
    try {
      await API.patch(`/admin/users/${id}/deactivate`);
      toast.success("User deactivated successfully!");
      // Update local state to reflect deactivation
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isActive: false } : user
        )
      );
    } catch (err) {
      toast.error("Failed to deactivate user");
      console.error("Deactivation error:", err);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await API.patch(`/admin/users/${id}/role`, { role: newRole });
      toast.success("User role updated successfully!");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      toast.error("Failed to update user role");
      console.error("Role update error:", err);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading users...</p>;
  }

  if (users.length === 0) {
    return <p className="text-gray-400">No users found.</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Manage Users</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <table className="min-w-full table-auto border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                {user.isActive ? (
                  <span className="text-green-600">Active</span>
                ) : (
                  <span className="text-red-600">Inactive</span>
                )}
              </td>
              <td className="px-4 py-2">
                {/* Example: Role change dropdown (not fully functional yet) */}
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
                {!user.isActive && (
                  <button
                    onClick={() => handleDeactivateUser(user._id)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    <MdOutlineCancel size={20} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersSection;
