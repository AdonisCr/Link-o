import axios from "axios";

const API_KEY = "nZvwQlDaUMnoLvEKMF0E4T4toz1HAlTlMOcTQo7dlNtGb955Ar4g0JwdNE7C";

export const shortenUrl = async (longUrl) => {
  try {
    const response = await axios.post(
      "https://api.tinyurl.com/create",
      { url: longUrl },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data.tiny_url;
  } catch (error) {
    throw new Error(
      error.response?.data?.errors?.[0]?.message ||
        "Erreur lors de la génération du lien."
    );
  }
};
