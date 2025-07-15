import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      
      {/* Navbar */}
      <nav className="h-16 w-full px-6 py-4 sticky top-0 z-50 border-b border-opacity-10 border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
          
          {/* Logo */}
          <Link to="/" className="flex items-center w-auto">
            <img src="/logo.png" alt="Grievana logo" className="h-12 w-auto" />
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6">
            {/* Auth */}
            <div className="flex gap-4">
              <Link
                to="/login"
                className="w-13 text-center px-4 py-1 bg-blue-600 text-white rounded hover:bg-white hover:text-blue-600 border border-blue-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1 bg-blue-300 text-black rounded hover:bg-white hover:text-blue-500 border border-blue-600 transition-colors"
              >
                Register
              </Link>
            </div>

            {/* GitHub */}
            <a
              href="https://github.com/anup2702/Grievana-Complaint-Reg-Mang"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={28} />
            </a>
          </div>
        </div>
      </nav>

      {/* Body */}
      <main className="flex-grow flex flex-col items-center justify-center gap-6 px-4 text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700">
          Raise Your Voice, Resolve with Ease.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
          A unified platform for students and staff to manage and resolve campus
          complaints quickly and transparently.
        </p>
        <Link
  to="/login"
  className="w-45 h-10 flex items-center justify-center bg-blue-500 hover:bg-white hover:text-blue-600 text-white font-semibold rounded-xl border border-blue-600 transition-colors"
>
  Register a Complaint
</Link>

      </main>

      {/* Footer */}
     <footer className="w-full h-9 items-center border-t border-gray-200 bg-white shadow-sm py-4 px-6">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
    
    {/* Left Block */}
    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
      <h4 className="font-semibold text-gray-800">Developed By</h4>
      <p>Team Syntax Slayers, IEM Kolkata</p>
    </div>

    {/* Right Block */}
    <p className="text-center md:text-right">📧 support@grievana.in</p>
  </div>
</footer>

    </div>
  );
};

export default Landing;
