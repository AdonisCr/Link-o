const axios = require("axios");
const cheerio = require("cheerio");

const getMetaData = async (url) => {
  try {
    const { data } = await axios.get(url, { timeout: 5000 });
    const $ = cheerio.load(data);

    const title = $("title").text().trim() || "Titre non disponible";

    const description =
      $('meta[name="description"]').attr("content") ||
      $('meta[property="og:description"]').attr("content") ||
      "Aucune description";

    const image =
      $('meta[property="og:image"]').attr("content") ||
      $('link[rel="icon"]').attr("href") ||
      "";

    // Vérifier si l'image est un chemin relatif et compléter l'URL si nécessaire
    const baseUrl = new URL(url).origin;
    const fullImageUrl =
      image && !image.startsWith("http") ? `${baseUrl}${image}` : image;

    return { title, description, image: fullImageUrl };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des métadonnées :",
      error.message
    );

    return {
      title: "Titre non disponible",
      description: "Aucune description",
      image: "",
    };
  }
};

module.exports = { getMetaData };
