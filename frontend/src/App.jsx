import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

function App() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard/*" element={<StudentDashboard />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
