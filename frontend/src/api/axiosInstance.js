// src/api/axiosInstance.js
import axios from "axios";
import { logout as apiLogout } from "./auth";

let storeLogout = null;

export const setLogoutCallback = (logoutFn) => {
  storeLogout = logoutFn;
};

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Intercepteur de réponse
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401 && storeLogout) {
      console.warn("⛔ Token expiré ou invalide. Déconnexion...");
      await storeLogout();
    }
    return Promise.reject(error);
  }
);

export default API;
