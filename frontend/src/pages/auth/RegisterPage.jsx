import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [role, setRole] = useState('student')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('http://localhost:5000/api/student/register', {
        email,
        password,
        role,
        phone,
        name
      })
      localStorage.setItem('token', data.token)
      toast.success('Registration Successful')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg px-6 py-8 min-h-[380px] flex flex-col items-center justify-between">

        {/* Top Section */}
        <div className="flex flex-col gap-4">
          {/* Logo */}
          <div className="flex justify-center">
            <img src="/logo.png" alt="Grievana Logo" className="h-12 object-contain" />
          </div>

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Welcome</h2>
            <p className="text-sm text-gray-500">Please create an account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleChange} className="space-y- h-75 w-90 flex flex-col justify-center gap-1">
            {/* Name  */}
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm text-gray-700 font-medium">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="john doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Phone  */}
            <div className="space-y-1">
              <label htmlFor="phone" className="text-sm text-gray-700 font-medium">Phone</label>
              <input
                type="number"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+02 345 235 233"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm text-gray-700 font-medium">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
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
                className={`px-4 py-1.5 rounded-md text-sm font-medium border transition ${
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
                className={`px-4 py-1.5 rounded-md text-sm font-medium border transition ${
                  role === "admin"
                    ? "bg-blue-600 text-white border-blue-600 shadow"
                    : "bg-gray-100 text-blue-600 border-gray-300 hover:bg-blue-50"
                }`}
              >
                Staff
              </button>
            </div>

            {/* Login Button */}
            <div className='flex items-center justify-center pt-2'>
              <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
            </div>
          </form>
        </div>

        {/* Sign Up */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
