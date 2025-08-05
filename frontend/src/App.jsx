import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import StudentDashboard from './pages/dashboard/StudentDashboard';
<<<<<<< HEAD
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import RegisterComplaintPage from './sections/RegisterComplaintPage';
import ComplaintDetails from './components/ComplaintDetails';

=======
import AdminDashboard from './pages/dashboard/AdminDashboard';
>>>>>>> 4a19ab3571681c5bb6b67186d3aff00db5aa42f3

function App() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<StudentDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/admin/complaints/:id" element={<ComplaintDetails />} />
        </Route>
        <Route path="/register-complaint" element={<RegisterComplaintPage />} />

<<<<<<< HEAD

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
=======
>>>>>>> 4a19ab3571681c5bb6b67186d3aff00db5aa42f3
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
