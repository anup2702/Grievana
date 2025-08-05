import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion"; // Animation library

const Landing = () => {
  // Animation variants for scroll-triggered animations
  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const featureVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* 🌟 Navbar with sticky positioning */}
      <nav className="h-16 w-full px-6 py-4 sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
          {/* 🚀 Logo section */}
          <Link to="/" className="flex items-center">
            <motion.img
              src="/logo.png"
              alt="Grievana logo"
              className="h-12 w-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            />
          </Link>

          {/* 🔗 Auth & GitHub links */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex gap-4">
              <Link
                to="/login"
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-white hover:text-blue-600 border border-blue-600 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1 bg-blue-300 text-black rounded hover:bg-white hover:text-blue-600 border border-blue-600 transition-all duration-300"
              >
                Register
              </Link>
            </div>

            {/* 🐙 GitHub icon */}
            <a
              href="https://github.com/anup2702/Grievana-Complaint-Reg-Mang"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={28} />
            </a>
          </motion.div>
        </div>
      </nav>

      {/* 🔥 Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center gap-6 px-4 text-center py-16">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-blue-700"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Raise Your Voice, Resolve with Ease.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-600 max-w-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          A unified platform for students and staff to manage and resolve campus
          complaints quickly and transparently.
        </motion.p>

        {/* 🌈 CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/login"
            className="w-45 h-10 flex items-center justify-center bg-blue-500 hover:bg-white hover:text-blue-600 text-white font-semibold rounded-xl border border-blue-600 transition-all duration-300"
          >
            Register a Complaint
          </Link>
        </motion.div>
      </main>

      {/* 🌟 Features Section */}
      <motion.section
        className="w-full bg-white py-12 px-6"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            Why Choose Grievana?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
            <motion.div variants={featureVariant}>
              <h4 className="font-semibold text-lg mb-2">
                Transparent Resolution
              </h4>
              <p>
                Complaints are visible to relevant authorities for quick action.
              </p>
            </motion.div>
            <motion.div variants={featureVariant} transition={{ delay: 0.2 }}>
              <h4 className="font-semibold text-lg mb-2">
                User-Friendly Interface
              </h4>
              <p>Simple, intuitive design for students and staff alike.</p>
            </motion.div>
            <motion.div variants={featureVariant} transition={{ delay: 0.4 }}>
              <h4 className="font-semibold text-lg mb-2">Real-Time Tracking</h4>
              <p>Track your complaint status and receive live updates.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* "How It Works" Section */}
      <motion.section
        className="w-full bg-white py-12 px-6"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
            <motion.div variants={featureVariant}>
              <h4 className="font-semibold text-lg mb-2">1. Register & Login</h4>
              <p>Create an account or log in to get started.</p>
            </motion.div>
            <motion.div variants={featureVariant} transition={{ delay: 0.2 }}>
              <h4 className="font-semibold text-lg mb-2">2. Submit a Complaint</h4>
              <p>Fill out a simple form with the details of your grievance.</p>
            </motion.div>
            <motion.div variants={featureVariant} transition={{ delay: 0.4 }}>
              <h4 className="font-semibold text-lg mb-2">3. Track to Resolution</h4>
              <p>Follow the status of your complaint and get notified of updates.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* "Our Mission" Section */}
      <motion.section
        className="w-full bg-gray-100 py-12 px-6"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-8">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600">
            To provide a transparent, efficient, and accessible platform for the college community to voice their concerns and have them addressed in a timely manner. We believe in fostering a culture of accountability and continuous improvement.
          </p>
        </div>
      </motion.section>

      {/* ❤️ Testimonial Section */}
      <motion.section
        className="w-full bg-gray-100 py-12 px-6"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-8">
            What People Say
          </h2>
          <p className="italic text-gray-600">
            “Grievana made it super easy to raise our voices without hassle.
            It's a game-changer!”
            <br />– Priya S., Student
          </p>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="w-full bg-white py-12 px-6"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="text-left">
            <motion.div className="mb-4" variants={featureVariant}>
              <h4 className="font-semibold text-lg mb-2">Is my complaint anonymous?</h4>
              <p>Complaints are not anonymous to the administrators to ensure accountability. However, your identity is protected and only shared with relevant authorities.</p>
            </motion.div>
            <motion.div className="mb-4" variants={featureVariant} transition={{ delay: 0.2 }}>
              <h4 className="font-semibold text-lg mb-2">How long does it take for a complaint to be resolved?</h4>
              <p>The resolution time varies depending on the complexity of the issue. You can track the status of your complaint in your dashboard.</p>
            </motion.div>
            <motion.div variants={featureVariant} transition={{ delay: 0.4 }}>
              <h4 className="font-semibold text-lg mb-2">Who can I contact for help?</h4>
              <p>You can reach out to our support team at support@grievana.in for any assistance.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 🚀 Final CTA Section */}
      <motion.section
        className="w-full bg-blue-100 py-12 px-6"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-700 mb-6">
            Join your peers in creating a more responsive and accountable
            campus.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/register"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-white hover:text-blue-600 border border-blue-600 transition-colors"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* 🎯 Footer */}
      <footer className="w-full border-t border-gray-200 bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          {/* 🧠 Developer Info */}
          <motion.div
            className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h4 className="font-semibold text-gray-800">Developed By</h4>
            <p>Team Syntax Slayers, IEM Kolkata</p>
          </motion.div>

          {/* 📬 Contact Info */}
          <motion.p
            className="text-center md:text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            📧 support@grievana.in
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
