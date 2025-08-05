import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../api/axios';

const RegisterPage = () => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

 const handleChange = async (e) => {
  e.preventDefault();
  try {
    const { data } = await API.post('/users/register', {
      email,
      password,
      role,
    });

    // Check for expected properties directly in data
    if (data && data._id && data.token) {
      // Destructure user properties and token directly from data
      const { _id, name, email: userEmail, role: userRole, token, profileCompleted, image } = data;
      const user = { _id, name, email: userEmail, role: userRole, profileCompleted, image };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      toast.success("Registration Successful");
      if (!profileCompleted) {
        navigate("/edit-profile");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      // Handle cases where the API returns a 2xx response but no user/token
      throw new Error("Invalid registration response from server.");
    }
  } catch (error) {
    console.error("Registration Error:", error);
    const errorMessage = error.message === "Invalid registration response from server."
      ? "Registration failed: Invalid server response."
      : error.response?.data?.message || 'Registration failed';
    toast.error(errorMessage);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg px-8 py-10">
        
        {/* Logo + Heading */}
        <div className="text-center mb-6">
          <img src="/logo.png" alt="Grievana Logo" className="h-14 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Create Account 🚀</h2>
          <p className="text-sm text-gray-500">It only takes a few steps</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleChange} className="space-y-1">
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Role Selection */}
          <div className="flex justify-center gap-4 mt-2">
            {['student', 'admin'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium border transition ${
                  role === r
                    ? 'bg-blue-600 text-white border-blue-600 shadow'
                    : 'bg-gray-100 text-blue-600 border-gray-300 hover:bg-blue-50'
                }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white text-sm rounded-md font-semibold hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
