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
    <div className="min-h-screen flex items-center justify-center bg-theme-primary px-4">
      <div className="w-full max-w-md bg-theme-primary rounded-3xl shadow-theme px-8 py-10">
        
        {/* Logo + Heading */}
        <div className="text-center mb-6">
          <img src="/logo.png" alt="Grievana Logo" className="h-14 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-theme-primary">Create Account 🚀</h2>
          <p className="text-sm text-theme-muted">It only takes a few steps</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleChange} className="space-y-1">
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-theme-primary mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-theme rounded-md text-sm focus:ring-2 focus:ring-button-primary focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-theme-primary mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-theme rounded-md text-sm focus:ring-2 focus:ring-button-primary focus:outline-none"
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
                    ? 'bg-button-primary text-white border-button-primary shadow'
                    : 'bg-theme-secondary text-theme-primary border-theme hover:bg-theme-primary'
                }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-button-primary text-white text-sm rounded-md font-semibold hover:bg-button-hover transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-primary"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-theme-secondary">
          Already have an account?{' '}
          <Link to="/login" className="text-theme-primary font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
