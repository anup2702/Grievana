import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../api/axios";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    rollNumber: "",
    password: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get("/users/profile");
        console.log('Frontend - Profile data received:', {
          hasImage: !!data.image,
          imageLength: data.image ? data.image.length : 0
        });

        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          department: data.department || "",
          rollNumber: data.rollNumber || "",
          password: "",
        });

        if (data.image) {
          const imageUrl = `data:image/jpeg;base64,${data.image}`;
          console.log('Frontend - Setting preview image URL length:', imageUrl.length);
          setPreviewImage(imageUrl);
        } else {
          console.log('Frontend - No image in profile data');
        }
      } catch (error) {
        console.error('Frontend - Failed to fetch user data:', error);
        toast.error("Failed to fetch user data.");
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append("phone", formData.phone);
    dataToSend.append("department", formData.department);
    dataToSend.append("rollNumber", formData.rollNumber);
    if (formData.password) {
      dataToSend.append("password", formData.password);
    }
    if (imageFile) {
      dataToSend.append("image", imageFile);
    }

    try {
      await axios.put("/users/profile", dataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile updated successfully!");
      setFormData((prev) => ({ ...prev, password: "" }));
      setImageFile(null);
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col bg-theme-primary rounded-lg shadow-theme p-6">
      <ToastContainer position="top-right" theme="colored" />

      <h2 className="text-2xl font-bold text-theme-primary mb-6">Edit Profile</h2>

      {/* Profile Icon / Image Preview */}
      <div className="flex items-center justify-center mb-6">
        {previewImage ? (
          <img src={previewImage} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover" />
        ) : (
          <CgProfile size={80} className="text-theme-primary" />
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 px-2 md:px-4">
        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-theme-primary">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            readOnly
            className="mt-1 px-3 py-2 border border-theme rounded-md bg-theme-secondary cursor-not-allowed text-sm"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-theme-primary">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            readOnly
            className="mt-1 px-3 py-2 border border-theme rounded-md bg-theme-secondary cursor-not-allowed text-sm"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm font-medium text-theme-primary">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border border-theme rounded-md focus:ring-2 focus:ring-button-primary"
          />
        </div>

        {/* Department */}
        <div className="flex flex-col">
          <label htmlFor="department" className="text-sm font-medium text-theme-primary">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            required
            value={formData.department}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border border-theme rounded-md focus:ring-2 focus:ring-button-primary"
          />
        </div>

        {/* Roll Number */}
        <div className="flex flex-col">
          <label htmlFor="rollNumber" className="text-sm font-medium text-theme-primary">Roll Number</label>
          <input
            type="text"
            id="rollNumber"
            name="rollNumber"
            required
            value={formData.rollNumber}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border border-theme rounded-md focus:ring-2 focus:ring-button-primary"
          />
        </div>

        {/* Profile Image Upload */}
        <div className="flex flex-col">
          <label htmlFor="profileImage" className="text-sm font-medium text-theme-primary">Profile Image (Optional)</label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 px-3 py-2 border border-theme rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-button-primary"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium text-theme-primary">New Password <span className="text-theme-muted">(optional)</span></label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
            className="mt-1 px-3 py-2 border border-theme rounded-md focus:ring-2 focus:ring-button-primary text-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="w-full max-w-md button-theme-primary px-4 py-2 rounded-md font-semibold transition focus:outline-none focus:ring-2 focus:ring-button-primary"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;

