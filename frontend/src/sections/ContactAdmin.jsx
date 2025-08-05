import React, { useState } from "react";
import { toast } from "react-toastify";

const ContactAdmin = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // TODO: Replace with actual POST request
      console.log("Submitted:", formData);
      toast.success("Your message has been sent!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Try again later.");
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Contact Management</h2>

      <form onSubmit={handleSubmit} className="space-y-5 px-2 md:px-4">
        

        {/* Subject */}
        <div className="flex flex-col">
          <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            value={formData.subject}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Feedback, Issue, or Query"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm resize-none"
            placeholder="Type your message here..."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex justify-center">
          <button
            type="submit"
            className="w-full max-w-md bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactAdmin;
