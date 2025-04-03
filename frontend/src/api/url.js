import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/url" });

export const shortenUrl = async (
  originalUrl,
  customAlias,
  userId,
  generateQrCode
) => {
  try {
    const response = await API.post("/shorten", {
      originalUrl,
      customAlias,
      userId,
      generateQrCode,
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

export const deleteUrl = async (id) => {
  if (!id) return;

  try {
    await API.delete(`${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression  de l'url :", error);
    throw new Error("Impossible de supprimer l'url.");
  }
};

// Récupérer le QR code
export const getQrCode = async (id) => {
  try {
    const response = await API.get(`/${id}/qrcode`);

    return response.data.qrCode;
  } catch (error) {
    console.error("Erreur lors de la récupération du QR code :", error);
    throw new Error("Impossible de récupérer le QR code.");
  }
};

// Supprimer un QR code
export const deleteQrCode = async (id) => {
  try {
    await API.delete(`/${id}/qrcode`);
  } catch (error) {
    console.error("Erreur lors de la suppression du QR code :", error);
    throw new Error("Impossible de supprimer le QR code.");
  }
};
