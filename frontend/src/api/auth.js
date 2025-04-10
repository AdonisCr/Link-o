import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/auth" });

export const login = (formData) => API.post("/login", formData);

export const register = (formData) => API.post("/register", formData);

export const forgotPassword = (email) =>
  API.post("/forgot-password", { email });

export const resetPassword = (token, newPassword) =>
  API.post(`/reset-password/${token}`, { newPassword });
