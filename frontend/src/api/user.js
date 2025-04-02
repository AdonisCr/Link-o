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

// Déconnexion
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/Connexion";
};
