import React, { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegistrationSection = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [sendAnonymously, setSendAnonymously] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    } else if (title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    // Description validation
    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    } else if (description.length > 1000) {
      newErrors.description = "Description must be less than 1000 characters";
    }

    // Category validation
    if (!category) {
      newErrors.category = "Category is required";
    }

    // Location validation
    if (!location.trim()) {
      newErrors.location = "Location is required";
    } else if (location.length > 200) {
      newErrors.location = "Location must be less than 200 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateFile = (file) => {
    const newErrors = { ...errors };
    delete newErrors.image;

    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

      if (file.size > maxSize) {
        newErrors.image = "File size must be less than 5MB";
      } else if (!allowedTypes.includes(file.type)) {
        newErrors.image = "Only image files (JPEG, PNG, GIF, WebP) are allowed";
      }
    }

    setErrors(newErrors);
    return !newErrors.image;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!sendAnonymously && (!user || !user._id)) {
      toast.error("User data not found. Please log in again.");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("priority", priority);
    formData.append("sendAnonymously", sendAnonymously);
    if (!sendAnonymously) {
      formData.append("user", user._id);
    }
    if (image) {
      formData.append("image", image);
    }

    try {
      await API.post("/complaints", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Complaint submitted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error submitting complaint:", err);
      toast.error(
        err.response?.data?.message || "Failed to submit complaint"
      );
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        navigate("/login");
      }
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col bg-theme-primary rounded-lg shadow-theme p-6">
      <h2 className="text-2xl font-bold mb-6 text-theme-primary">
        Complaint Registration
      </h2>

      <form onSubmit={handleComplaintSubmit} className="space-y-6 px-4 md:px-8">
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            id="sendAnonymously"
            checked={sendAnonymously}
            onChange={() => setSendAnonymously(!sendAnonymously)}
            className="w-4 h-4 text-button-primary border-theme rounded focus:ring-button-primary"
          />
          <label htmlFor="sendAnonymously" className="text-theme-primary text-sm font-medium">
            Send Anonymously
          </label>
        </div>

        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium text-theme-primary">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className={`mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-button-primary input-theme ${
              errors.title ? 'border-error' : 'border-theme'
            }`}
            required
          />
          {errors.title && <p className="text-error text-xs mt-1">{errors.title}</p>}
        </div>

      {/* Category */}
      <div className="flex flex-col">
        <label htmlFor="category" className="text-sm font-medium text-theme-primary">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-button-primary input-theme ${
            errors.category ? 'border-error' : 'border-theme'
          }`}
          required
        >
          <option value="" className="bg-theme-secondary text-theme-primary">Select category</option>
          <option value="Academic" className="bg-theme-secondary text-theme-primary">Academic</option>
          <option value="Administrative" className="bg-theme-secondary text-theme-primary">Administrative</option>
          <option value="Facilities" className="bg-theme-secondary text-theme-primary">Facilities</option>
          <option value="Safety" className="bg-theme-secondary text-theme-primary">Safety</option>
          <option value="Other" className="bg-theme-secondary text-theme-primary">Other</option>
        </select>
        {errors.category && <p className="text-error text-xs mt-1">{errors.category}</p>}
      </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium text-theme-primary">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter detailed description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={`mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-button-primary input-theme ${
              errors.description ? 'border-error' : 'border-theme'
            }`}
            required
          ></textarea>
          {errors.description && <p className="text-error text-xs mt-1">{errors.description}</p>}
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label htmlFor="location" className="text-sm font-medium text-theme-primary">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location (e.g., Room 101, Library, Campus Ground)"
            className={`mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-button-primary input-theme ${
              errors.location ? 'border-error' : 'border-theme'
            }`}
            required
          />
          {errors.location && <p className="text-error text-xs mt-1">{errors.location}</p>}
        </div>

        {/* Priority */}
        <div className="flex flex-col">
          <label htmlFor="priority" className="text-sm font-medium text-theme-primary">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-button-primary input-theme border-theme"
          >
            <option value="Low" className="bg-theme-secondary text-theme-primary">Low</option>
            <option value="Medium" className="bg-theme-secondary text-theme-primary">Medium</option>
            <option value="High" className="bg-theme-secondary text-theme-primary">High</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label htmlFor="image" className="text-sm font-medium text-theme-primary">
            Upload Image (Optional)
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className={`mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-button-primary input-theme ${
              errors.image ? 'border-error' : 'border-theme'
            }`}
          />
          {errors.image && <p className="text-error text-xs mt-1">{errors.image}</p>}
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-md border-theme"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center pt-2">
          <button
            type="submit"
            className="w-full max-w-md button-theme-primary px-4 py-2 rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-button-primary transition"
          >
            Submit Complaint
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationSection;
