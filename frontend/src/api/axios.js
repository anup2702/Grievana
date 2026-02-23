import axios from "axios";

const API_BASE = import.meta.env.PROD
  ? "https://grievana-lbackend.vercel.app"
  : "http://localhost:5000";

const instance = axios.create({
  baseURL: `${API_BASE}/api`,
});

// Add token automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { API_BASE };
export default instance;
