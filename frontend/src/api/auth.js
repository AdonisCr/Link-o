import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/auth" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const login = (formData) => API.post("/login", formData);

export const register = (formData) => API.post("/register", formData);

export const forgotPassword = (email) =>
  API.post("/forgot-password", { email });

export const resetPassword = (token, newPassword) =>
  API.post(`/reset-password/${token}`, { newPassword });

export const changePassword = (formData) =>
  API.put("/change-password", formData);
