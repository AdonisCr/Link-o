import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/auth" });

export const verifyToken = async () => {
  const response = await API.get("/verify-token", {
    withCredentials: true,
  });

  return response.data;
};

export const login = async (formData) => {
  const response = await API.post("/login", formData, {
    withCredentials: true,
  });

  console.log("📦 Réponse login:", response);

  return response.data;
};

export const register = async (formData) => {
  const response = await API.post("/register", formData, {
    withCredentials: true,
  });

  return response;
};

export const logout = async () => {
  const response = await API.post("/logout", {
    withCredentials: true,
  });

  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await API.post(
    "/forgot-password",
    { email },
    {
      withCredentials: true,
    }
  );

  return response;
};

export const resetPassword = async (token, newPassword) => {
  const response = await API.post(
    `/reset-password/${token}`,
    { newPassword },
    {
      withCredentials: true,
    }
  );

  return response;
};

export const changePassword = async (formData) => {
  const response = API.put("/change-password", formData, {
    withCredentials: true,
  });

  return response;
};
