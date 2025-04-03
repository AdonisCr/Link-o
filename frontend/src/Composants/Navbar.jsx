import { useEffect, useState } from "react";
import { shortenUrl } from "../api/url";
import { getUser, logout } from "../api/user";

const NavBar = () => {
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [generateQRCode, setGenerateQRCode] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();

        setUser(userData);
      } catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur :", err);
      }
    };

    fetchUser();
  }, []);

  const handleShorten = async () => {
    try {
      setError("");

      if (!user || !user._id) {
        setError("Utilisateur non identifié.");
        return;
      }

      const generatedUrl = await shortenUrl(
        longUrl,
        customAlias,
        user._id,
        generateQRCode
      );

      setShortUrl(generatedUrl);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full bg-Blacks py-2 text-white px-4 flex items-center justify-between shadow-lg border-l-2 border-violet-200 rounded-bl-lg">
      {/* Barre de recherche */}
      <div className="flex bg-white px-3 py-2 rounded-md items-center gap-2 shadow-md">
        <img
          src="/src/assets/images/Search.svg"
          alt="Rechercher"
          className="w-5 h-5"
        />

        <input
          type="text"
          name="search"
          className="rounded-md outline-none text-gray-500 text-sm w-48 transition-all duration-300 focus:w-64"
          placeholder="Recherche un lien"
        />
      </div>

      {/* Boutons et menus */}
      <div className="flex gap-4 items-center relative">
        {/* Bouton Créer */}
        <div className="relative">
          <button
            className="flex items-center bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-md px-3 py-2 shadow-md transition duration-300"
            onClick={() => setShowCreateMenu(!showCreateMenu)}
          >
            <img
              src="/src/assets/images/Plus.svg"
              alt="Créer"
              className="w-5 h-5"
            />
            <span className="hidden sm:inline ml-2">Créer un lien</span>
          </button>

          {showCreateMenu && (
            <div className="absolute right-0 mt-3 w-80 bg-white text-black shadow-xl rounded-lg p-4">
              <h3 className="text-md font-semibold mb-3 text-gray-700">
                Raccourcir un lien
              </h3>

              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 text-sm mb-3"
                placeholder="Coller l'URL longue"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
              />

              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 text-sm mb-3"
                placeholder="Personnaliser l'URL (optionnel)"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
              />

              <div className="w-full flex flex-col items-start text-start gap-2">
                <div className="w-full flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-700">
                    QR Code
                  </h3>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={generateQRCode}
                      onChange={() => setGenerateQRCode(!generateQRCode)}
                    />

                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                <p className="text-sm font-medium mb-3 text-gray-700">
                  Générez un code QR à partager partout où les gens peuvent le
                  voir.
                </p>
              </div>

              <button
                className="w-full bg-violet-600 text-white px-3 py-2 rounded-md hover:bg-violet-700 transition duration-300"
                onClick={handleShorten}
              >
                Raccourcir
              </button>

              {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
              {shortUrl && (
                <div className="mt-3 flex items-center justify-between border rounded-md px-3 py-2 bg-gray-100">
                  <span className="text-sm text-gray-700 truncate">
                    {shortUrl}
                  </span>
                  <button
                    className="text-violet-500 text-sm font-medium hover:text-violet-700"
                    onClick={() => navigator.clipboard.writeText(shortUrl)}
                  >
                    Copier
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Profil */}
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-700 transition duration-300"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <span className="font-semibold hidden sm:block text-white">
              {user?.username || "Username"}
            </span>
          </div>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white text-black shadow-xl rounded-lg py-2">
              <div className="px-4 py-3 border-b">
                <p className="text-gray-700 font-semibold">{user?.username}</p>
                <p className="text-gray-500 text-sm">{user?.email}</p>
              </div>

              <button
                onClick={logout}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
