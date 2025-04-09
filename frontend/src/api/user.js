import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Ajouter automatiquement le token aux requêtes
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Récupérer les informations de l'utilisateur connecté
export const getUser = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("Aucun token trouvé");

    const { data } = await API.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    throw new Error("Impossible de récupérer l'utilisateur");
  }
};

export const updateUser = async (formData) => {
  const token = localStorage.getItem("token");
  const { data } = await API.put("/user/update", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteUser = async () => {
  const token = localStorage.getItem("token");
  const { data } = await API.delete("/user/delete", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Déconnexion
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/Connexion";
};
