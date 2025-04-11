import { useEffect, useState } from "react";
import { shortenUrl } from "../api/url";
import { getUser, logout } from "../api/user";
import { FaUserAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import MobileMenu from "./MobileMenu";

const NavBar = () => {
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [generateQRCode, setGenerateQRCode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="w-full sticky top-0 bg-Blacks py-2 text-white px-3 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-2">
        {/* Mobile Menu **/}
        <button
          onClick={() => setIsOpen(true)}
          className="text-white flex lg:hidden focus:outline-none"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* En-tête */}
        <div className="flex flex-col items-start leading-none">
          <h1 className="text-sm lg:text-base font-bold">Dashboard</h1>

          <p className="text-sm lg:text-base font-semibold">
            Welcome back, {user ? user.username : "Utilisateur"} 👋
          </p>
        </div>
      </div>

      {/* Boutons et menus */}
      <div className="flex gap-4 items-center relative">
        {/* Bouton Créer */}
        <div className="relative">
          <button
            className="flex items-center bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-md px-2 lg:px-3 py-2 shadow-md transition duration-300"
            onClick={() => setShowCreateMenu(!showCreateMenu)}
          >
            <img
              src="/src/assets/images/Plus.svg"
              alt="Créer"
              className="w-4 lg:w-5 h-4 lg:h-5 object-cover"
            />

            <span className="hidden sm:inline ml-2">Créer un lien</span>
          </button>

          {showCreateMenu && (
            // Grand écran : lg:absolute ; Petit écran : fixed centré avec bg noir
            <div className="lg:absolute fixed inset-0 p-4 lg:p-0 lg:inset-auto flex items-center justify-center lg:right-0 lg:mt-3 z-50">
              {/* Overlay sur mobile uniquement */}
              <div
                className="lg:hidden absolute inset-0 bg-black/40"
                onClick={() => setShowCreateMenu(false)}
              />

              {/* Contenu du formulaire */}
              <div className="relative w-full max-w-sm space-y-2 lg:w-80 bg-white shadow-xl rounded-lg p-4 z-50">
                {/* Croix pour fermer sur mobile */}
                <button
                  onClick={() => setShowCreateMenu(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 lg:hidden"
                >
                  <IoClose className="text-2xl text-black font-bold" />
                </button>

                <h3 className="text-md font-semibold mb-3 text-gray-700">
                  Raccourcir un lien
                </h3>

                <input
                  type="text"
                  className="w-full border rounded-md px-3 text-black py-2 text-sm mb-3"
                  placeholder="Coller l'URL longue"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                />

                <input
                  type="text"
                  className="w-full border rounded-md text-black px-3 py-2 text-sm mb-3"
                  placeholder="Personnaliser l'URL (optionnel)"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                />

                <div className="w-full flex flex-col items-start text-start gap-3">
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
            </div>
          )}
        </div>

        {/* Profil */}
        <div className="relative">
          <div
            className="flex items-center gap-2 text-lg cursor-pointer transition border-2 border-white rounded-full p-2 duration-300"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <FaUserAlt />
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

      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        username={user?.username}
        email={user?.email}
      />
    </div>
  );
};

export default NavBar;
