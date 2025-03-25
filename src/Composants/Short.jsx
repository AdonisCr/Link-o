import React, { useState } from "react";
import { shortenUrl } from "../api";

function Short() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShortenUrl = async () => {
    if (!longUrl) {
      alert("Veuillez entrer une URL valide.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const shortened = await shortenUrl(longUrl);
      setShortUrl(shortened);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Lien copié !");
  };

  const handleInputChange = (e) => {
    const newLongUrl = e.target.value;
    setLongUrl(newLongUrl);
    if (!newLongUrl) {
      setShortUrl("");
    }
  };

  return (
    <div className="w-[80%] md:w-[60%] mx-auto flex flex-col gap-5 items-center text-center">
      <p className="text-Whites font-medium">
        Le raccourcisseur d'URL le plus simple que vous attendiez
      </p>
      <div className="w-full flex justify-between bg-Whites rounded-lg">
        <input
          type="text"
          className="w-3/4 py-3 px-2 rounded-lg outline-none"
          placeholder="Coller votre lien ici..."
          value={longUrl}
          onChange={handleInputChange}
        />

        <button
          className="bg-linac text-Whites font-medium px-2 md:px-6 py-1 md:py-2 rounded-lg lg:text-lg md:text-xs text-[8px]"
          onClick={handleShortenUrl}
          disabled={isLoading}
        >
          {isLoading ? "Chargement..." : "Réduire URL"}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="w-full flex justify-between gap-5">
        <input
          type="text"
          className="w-1/2 py-2 px-2 rounded-lg outline-none"
          value={shortUrl}
          readOnly
        />
        <button
          className="w-1/2 px-2 md:px-6 text-Whites py-1 md:py-2 border-4 border-linac rounded-lg text-[8px] md:text-xs lg:text-lg"
          onClick={handleCopyUrl}
          disabled={!shortUrl}
        >
          Copier URL
        </button>
      </div>
    </div>
  );
}

export default Short;
