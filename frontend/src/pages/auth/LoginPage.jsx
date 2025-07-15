import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'


const LoginPage = () => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('http://localhost:5000/api/student/login', {
        email,
        password,
        role
      })
      localStorage.setItem('token', data.token)
      toast.success('Login Successful')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg px-6 py-8 min-h-[380px] flex flex-col items-center justify-between">

        {/* Top Section */}
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="flex justify-center">
            <img src="/logo.png" alt="Grievana Logo" className="h-12 object-contain" />
          </div>

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-sm text-gray-500">Please login to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y- h-45 w-90 flex flex-col justify-between">
            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm text-gray-700 font-medium">Email</label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm text-gray-700 font-medium">Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Role Toggle */}
            <div className="mt-3 flex justify-center gap-4">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`px-4 py-1.5 h-7 w-14 rounded-md text-sm font-medium border transition ${
                  role === "student"
                    ? "bg-blue-600 text-white border-blue-600 shadow"
                    : "bg-gray-100 text-blue-600 border-gray-300 hover:bg-blue-50"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`px-4 py-1.5 w-10 rounded-md text-sm font-medium border transition ${
                  role === "admin"
                    ? "bg-blue-600 text-white border-blue-600 shadow"
                    : "bg-gray-100 text-blue-600 border-gray-300 hover:bg-blue-50"
                }`}
              >
                Staff
              </button>
            </div>

            {/* Login Button */}
            <div className='flex items-center justify-center'>
              <button
              type="submit"
              className="w-50 h-7 bg-blue-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
            </div>
          </form>
        </div>

        {/* Sign Up */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
