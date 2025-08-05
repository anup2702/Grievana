import React, { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post("/users/login", {
        email,
        password,
      });

      console.log("Login API Response Data:", data); // Log the response data for debugging

      // Check for expected properties directly in data
      if (data && data.token) {
        // Destructure user properties and token directly from data
        const { _id, name, email: userEmail, role: userRole, token, image } = data;
        const user = { _id, name, email: userEmail, role: userRole, image };

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        toast.success("Login Successful");

        console.log("User role after login:", user.role); // Log the user's role

        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        // Handle cases where the API returns a 2xx response but no expected data
        console.error("Login Error: Invalid or incomplete response from server.", data);
        throw new Error("Login failed: Invalid server response.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      const errorMessage = error.message.includes("Invalid server response")
        ? error.message
        : error.response?.data?.message ||
          error.response?.data?.error ||
          "Login failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl px-8 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Grievana Logo" className="h-14 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back 👋</h2>
          <p className="text-sm text-gray-500 mt-1">Login to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white text-sm rounded-md font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
