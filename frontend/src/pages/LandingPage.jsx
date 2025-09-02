import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaShieldAlt, FaUser, FaClock, FaStar, FaUsers, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion"; // Animation library
import { useTheme } from "../contexts/ThemeContext";

const FAQItem = ({ question, answer, delay }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="mb-4 cursor-pointer"
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ delay }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <h4 className="font-semibold text-lg mb-2 flex justify-between items-center">
        {question}
        <span>{isOpen ? "▲" : "▼"}</span>
      </h4>
      {isOpen && <p className="text-theme-secondary">{answer}</p>}
    </motion.div>
  );
};

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
    <div className="min-h-screen flex flex-col bg-theme-secondary text-theme-primary">
      {/* 🌟 Navbar with sticky positioning */}
      <nav className="h-16 w-full px-6 py-4 sticky top-0 z-50 border-b border-theme shadow-theme bg-theme-primary">
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
            <div className="flex gap-4 items-center">
              <Link
                to="/login"
                className="button-theme-primary px-4 py-1 rounded shadow-theme hover:bg-theme-primary hover:text-button-primary border border-button-primary transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="button-theme-primary px-4 py-1 rounded shadow-theme hover:bg-theme-primary hover:text-button-primary border border-button-primary transition-all duration-300"
              >
                Register
              </Link>
            </div>
            {/* 🐙 GitHub icon */}
            <a
              href="https://github.com/anup2702/Grievana-Complaint-Reg-Mang"
              target="_blank"
              rel="noopener noreferrer"
              className="text-theme-primary hover:text-button-primary transition-colors"
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
          className="text-4xl md:text-5xl font-bold text-theme-primary"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Raise Your Voice, Resolve with Ease.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-theme-secondary max-w-2xl"
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
            className="button-theme-primary w-45 h-10 flex items-center justify-center hover:bg-theme-primary hover:text-button-primary font-semibold rounded-xl border border-button-primary shadow-theme transition-all duration-300"
          >
            Register Complaint
          </Link>
        </motion.div>
      </main>

      {/* 📊 Stats Section */}
      <motion.section
        className="w-full bg-theme-primary py-12 px-6"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-theme-primary mb-8">
            Our Impact
          </h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" transition={{ staggerChildren: 0.1 }}>
            <motion.div
              className="flex flex-col items-center"
              variants={featureVariant}
            >
              <FaCheckCircle className="text-4xl text-success mb-4" />
              <h3 className="text-4xl font-bold text-theme-primary">1000+</h3>
              <p className="text-theme-secondary">Complaints Resolved</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center"
              variants={featureVariant}
            >
              <FaUsers className="text-4xl text-button-primary mb-4" />
              <h3 className="text-4xl font-bold text-theme-primary">500+</h3>
              <p className="text-theme-secondary">Active Users</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center"
              variants={featureVariant}
            >
              <FaStar className="text-4xl text-warning mb-4" />
              <h3 className="text-4xl font-bold text-theme-primary">95%</h3>
              <p className="text-theme-secondary">Satisfaction Rate</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 🌟 Features Section */}
      <motion.section
        className="w-full bg-theme-primary py-12 px-6"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-theme-primary mb-6">
            Why Choose Grievana?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-theme-primary">
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
        className="w-full bg-theme-primary py-12 px-6"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-theme-primary mb-6">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-theme-primary">
            <motion.div variants={featureVariant} className="flex flex-col items-center">
              <FaUser className="text-4xl text-button-primary mb-4" />
              <h4 className="font-semibold text-lg mb-2">1. Register & Login</h4>
              <p>Create a secure account using your college email or log in if you already have one. Our platform ensures your data is protected with advanced security measures.</p>
            </motion.div>
            <motion.div variants={featureVariant} transition={{ delay: 0.2 }} className="flex flex-col items-center">
              <FaClock className="text-4xl text-button-primary mb-4" />
              <h4 className="font-semibold text-lg mb-2">2. Submit a Complaint</h4>
              <p>Fill out a simple form with details about your issue, including category, description, and any supporting evidence. Choose the appropriate department for faster resolution.</p>
            </motion.div>
            <motion.div variants={featureVariant} transition={{ delay: 0.4 }} className="flex flex-col items-center">
              <FaCheckCircle className="text-4xl text-button-primary mb-4" />
              <h4 className="font-semibold text-lg mb-2">3. Track to Resolution</h4>
              <p>Monitor the status of your complaint in real-time through your dashboard. Receive notifications when updates are made, and provide feedback on the resolution process.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* "Our Mission" Section */}
      <motion.section
        className="w-full bg-theme-secondary py-12 px-6"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-theme-primary mb-8">
            Our Mission
          </h2>
          <p className="text-lg text-theme-secondary">
            To provide a transparent, efficient, and accessible platform for the college community to voice their concerns and have them addressed in a timely manner. We believe in fostering a culture of accountability and continuous improvement.
          </p>
        </div>
      </motion.section>

      {/* ❤️ Testimonial Section */}
      <motion.section
        className="w-full bg-theme-secondary py-12 px-6"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-theme-primary mb-8">
            What People Say
          </h2>
          <p className="italic text-theme-secondary">
            “Grievana made it super easy to raise our voices without hassle.
            It's a game-changer!”
            <br />– Priya S., Student
          </p>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="w-full bg-theme-primary py-12 px-6"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-theme-primary mb-6">
            Frequently Asked Questions
          </h2>
          <div className="text-left grid grid-cols-1 md:grid-cols-2 gap-8">
            <FAQItem
              question="Is my complaint anonymous?"
              answer="Complaints are not anonymous to the administrators to ensure accountability and proper resolution. However, your identity is protected and only shared with relevant authorities who need to address the issue."
              delay={0}
            />
            <FAQItem
              question="What types of complaints can I submit?"
              answer="You can submit complaints related to campus facilities, academic issues, administrative concerns, safety matters, and other college-related grievances. We have categories to help route your complaint to the right department."
              delay={0.1}
            />
            <FAQItem
              question="How long does it take for a complaint to be resolved?"
              answer="The resolution time varies depending on the complexity of the issue. Simple issues may be resolved within days, while complex matters could take weeks. You can track the status of your complaint in real-time through your dashboard."
              delay={0.2}
            />
            <FAQItem
              question="Can I edit my complaint after submission?"
              answer="Yes, you can edit your complaint details within 24 hours of submission if additional information becomes available. After that, please contact support for any necessary changes."
              delay={0.3}
            />
            <FAQItem
              question="How do I know if my complaint is being addressed?"
              answer="You will receive email notifications and can check the status in your dashboard. Complaints move through stages: Submitted, Under Review, In Progress, and Resolved."
              delay={0.4}
            />
            <FAQItem
              question="Who can I contact for help?"
              answer="You can reach out to our support team at support@grievana.in for any assistance. For urgent matters, contact your department head or the college administration directly."
              delay={0.5}
            />
          </div>
        </div>
      </motion.section>

      {/* 🚀 Final CTA Section */}
      <motion.section
        className="w-full bg-theme-tertiary py-12 px-6"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-theme-primary mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-theme-secondary mb-6">
            Join your peers in creating a more responsive and accountable
            campus.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/register"
            className="button-theme-primary inline-block px-6 py-2 rounded-lg hover:bg-theme-primary hover:text-button-primary border border-button-primary shadow-theme transition-colors"
          >
            Get Started
          </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* 🎯 Footer */}
      <footer className="w-full border-t border-theme bg-theme-primary shadow-theme py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-theme-secondary">
          {/* 🧠 Developer Info */}
          <motion.div
            className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h4 className="font-semibold text-theme-primary">Developed By</h4>
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
