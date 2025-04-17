import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Récupérer les informations de l'utilisateur connecté
export const getUser = async () => {
  try {
    const { data } = await API.get("/auth/me");

    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    throw new Error("Impossible de récupérer l'utilisateur");
  }
};

export const updateUser = async (formData) => {
  try {
    const { data } = await API.put("/user/update", formData);
    return data;
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour des données de l'utilisateur :",
      error
    );
    throw new Error("Impossible de mettre à jour les données de l'utilisateur");
  }
};

export const deleteUser = async () => {
  try {
    const { data } = await API.delete("/user/delete", {});

    return data;
  } catch (error) {
    console.error("Erreur lors de la suppression du compte :", error);
    throw new Error("Impossible de supprimer le compte");
  }
};
