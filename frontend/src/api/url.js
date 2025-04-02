import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000/api/url" });

export const shortenUrl = async (originalUrl, customAlias, userId) => {
  try {
    const response = await API.post("/shorten", {
      originalUrl,
      customAlias,
      userId,
    });

    return response.data.shortUrl;
  } catch (error) {
    console.error("Erreur lors de la réduction de l'URL :", error);
    throw new Error(
      "Impossible de raccourcir l'URL. Vérifiez qu'elle est valide."
    );
  }
};

export const getUrlByUser = async (userId) => {
  try {
    const response = await API.get(`/user/${userId}`);
    return response.data.urls || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des URLs :", error);
    throw new Error("Impossible de récupérer les URLs");
  }
};
