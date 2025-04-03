import { useState, useEffect } from "react";
import {
  FaCopy,
  FaShareAlt,
  FaTrash,
  FaEye,
  FaCalendar,
  FaEllipsisH,
} from "react-icons/fa";
import { MdAdsClick } from "react-icons/md";
import ShareModal from "./ShareModal";
import { getUrlByUser, deleteUrl } from "../api/url";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api/user";
import bad_mood_icon from "../assets/images/mood-sad.svg";

const LinksContent = () => {
  const [links, setLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLink, setSelectedLink] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Fonction pour récupérer les liens
  const fetchLinks = async (id) => {
    try {
      const data = await getUrlByUser(id);
      setLinks(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Récupérer l'utilisateur et ses liens
  useEffect(() => {
    const fetchUserAndLinks = async () => {
      try {
        const user = await getUser();

        setUserId(user._id);

        const data = await getUrlByUser(user._id);

        setLinks(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserAndLinks();
  }, [userId, links]);

  // Rafraîchir les liens si l'utilisateur change
  useEffect(() => {
    if (userId) {
      fetchLinks(userId);
    }
  }, [userId]);

  // Copier le lien
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Lien copié dans le presse-papiers !"))
      .catch((err) => console.error("Erreur lors de la copie :", err));
  };

  // Supprimer un lien et mettre à jour la liste
  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous supprimer ce lien ?")) {
      try {
        await deleteUrl(id);

        setLinks((prevLinks) => prevLinks.filter((link) => link._id !== id));
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleShare = (link) => {
    setSelectedLink(link);
    setShowModal(true);
  };

  const handleViewDetails = (link) => {
    navigate(`/dashboard/links/${link._id}`, { state: { link } });
  };

  const filteredLinks = links.filter((link) =>
    link.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full w-full">
      <h2 className="text-lg font-semibold mb-4">Mes Liens</h2>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un lien..."
        className="border rounded px-3 py-2 w-full mb-4"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Liste des liens */}
      <div className="space-y-4">
        {filteredLinks.map((link) => (
          <div
            key={link._id}
            className="flex w-full justify-between items-start p-4 border rounded-lg shadow-sm"
          >
            <div className="flex items-start gap-4">
              <img
                src={link.image || bad_mood_icon}
                alt={link.title || "Image indisponible"}
                className="p-0.5 border border-black/40 shadow w-8 lg:w-12 h-8 lg:h-12 rounded-full object-cover"
              />

              <div className="flex items-start flex-col gap-2">
                <p className="font-bold text-Blacks break-words hover:underline cursor-pointer text-lg truncate max-w-md">
                  {link.title}
                </p>

                <a
                  href={link.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm font-semibold hover:underline"
                >
                  {link.shortUrl}
                </a>

                <a
                  href={link.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm font-semibold hover:underline"
                >
                  {link.originalUrl}
                </a>

                <div className="flex items-center gap-3 mt-4">
                  <p className="flex items-center gap-1 text-sm text-black">
                    <MdAdsClick />
                    <span>{link.clicks} clics</span>
                  </p>

                  <p className="flex items-center gap-1 text-sm text-black">
                    <FaCalendar />
                    <span>{formatDate(link.createdAt)}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {/* Bouton pour petit écran */}
              <div className="lg:hidden relative">
                <button
                  className="p-2 rounded bg-violet-700 hover:bg-violet-600 text-white"
                  onClick={() =>
                    setSelectedLink(selectedLink === link ? null : link)
                  }
                >
                  <FaEllipsisH />
                </button>

                {selectedLink === link && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
                    <button
                      onClick={() => copyToClipboard(link.shortUrl)}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Copier
                    </button>

                    <button
                      onClick={() => handleShare(link)}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Partager
                    </button>

                    <button
                      onClick={() => handleViewDetails(link)}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Détails
                    </button>

                    <button
                      onClick={() => handleDelete(link._id)}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Supprimer
                    </button>
                  </div>
                )}
              </div>

              {/* Boutons pour grand écran */}
              <div className="hidden lg:flex gap-2">
                <button
                  onClick={() => copyToClipboard(link.shortUrl)}
                  className="bg-violet-700 hover:bg-violet-600 text-white px-2 py-1 rounded"
                >
                  <FaCopy />
                </button>

                <button
                  className="p-2 rounded bg-violet-700 hover:bg-violet-600 text-white"
                  onClick={() => handleShare(link)}
                >
                  <FaShareAlt />
                </button>

                <button
                  className="p-2 rounded bg-violet-700 hover:bg-violet-600 text-white"
                  onClick={() => handleViewDetails(link)}
                >
                  <FaEye />
                </button>

                <button
                  className="p-2 rounded bg-violet-700 hover:bg-violet-600 text-white"
                  onClick={() => handleDelete(link._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de partage */}
      {showModal && (
        <ShareModal link={selectedLink} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default LinksContent;
