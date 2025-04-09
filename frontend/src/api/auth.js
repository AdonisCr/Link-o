import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/auth" });

export const login = (formData) => API.post("/login", formData);

export const register = (formData) => API.post("/register", formData);
