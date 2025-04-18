import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
import { getUser } from "../api/user";
import bad_mood_icon from "../assets/images/mood-sad.svg";

const LinksContent = () => {
  const [links, setLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLink, setSelectedLink] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [openedMenuId, setOpenedMenuId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [sortOption, setSortOption] = useState("recent");
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
      .then(() => toast.success("Lien copié dans le presse-papiers !"))
      .catch(() =>
        toast.error("Une erreur est survenue lors de la copie du lien.")
      );
  };

  // Supprimer un lien et mettre à jour la liste
  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous supprimer ce lien ?")) {
      try {
        await deleteUrl(id);
        setLinks((prevLinks) => prevLinks.filter((link) => link._id !== id));

        toast.success("Lien supprimé avec succès !");
      } catch (error) {
        console.error(error.message);
        toast.error("Échec de la suppression du lien.");
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

  const filteredAndSortedLinks = [...links]
    .filter((link) =>
      link.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "recent")
        return new Date(b.createdAt) - new Date(a.createdAt);

      if (sortOption === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);

      if (sortOption === "clicks") return (b.clicks || 0) - (a.clicks || 0);

      if (sortOption === "least-clicks")
        return (a.clicks || 0) - (b.clicks || 0);

      return 0;
    });

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
    <div className="bg-white shadow-md rounded-lg p-3 lg:p-6 w-full">
      <div className="w-full flex items-center justify-between gap-4">
        <div className="w-full lg:w-2/3">
          <h2 className="text-lg font-semibold mb-4">Mes Liens</h2>

          {/* Barre de recherche */}
          <input
            type="text"
            placeholder="Rechercher un lien..."
            className="border rounded px-3 py-2 w-full mb-4"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full px-3 py-2.5 lg:w-1/3 bg-white text-gray-700 border border-gray-200 text-sm rounded-md shadow-sm focus:outline-none focus:ring-1 mt-6 focus:ring-violet-500 focus:border-violet-500 transition-colors"
        >
          <option value="recent">📅 Plus récents</option>
          <option value="oldest">🕰️ Plus anciens</option>
          <option value="clicks">🔥 Plus populaires</option>
          <option value="least-clicks">📈 Moins populaire</option>
        </select>
      </div>

      {/* Liste des liens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {filteredAndSortedLinks.map((link) => (
          <div
            key={link._id}
            className="flex flex-col p-4 border rounded-lg shadow-sm gap-3 overflow-hidden"
          >
            {/* Section haute avec image et titre */}
            <div className="flex flex-col gap-4">
              <div className="w-full flex items-center justify-between">
                <img
                  src={link.image || bad_mood_icon}
                  alt={link.title || "Image indisponible"}
                  className="border border-black/40 shadow w-10 h-10 rounded-full object-cover"
                />

                <div className="relative">
                  <button
                    className="text-black text-lg font-bold lg:text-xl "
                    onClick={() =>
                      setOpenedMenuId(
                        openedMenuId === link._id ? null : link._id
                      )
                    }
                  >
                    <FaEllipsisH />
                  </button>

                  {openedMenuId === link._id && (
                    <div className="absolute right-0 mt-2 w-44 bg-white shadow-xl rounded-lg z-50 border border-gray-100 animate-fade-in">
                      {/* Petite flèche */}
                      <div className="absolute top-[-6px] right-4 w-3 h-3 bg-white rotate-45 shadow-sm border-l border-t border-gray-100"></div>

                      <button
                        onClick={() => {
                          copyToClipboard(link.shortUrl);
                          setOpenedMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 lg:py-3 py-2 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
                      >
                        <FaCopy className="text-violet-600" />
                        Copier
                      </button>

                      <button
                        onClick={() => {
                          handleShare(link);
                          setOpenedMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 lg:py-3 py-2 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
                      >
                        <FaShareAlt className="text-violet-600" />
                        Partager
                      </button>

                      <button
                        onClick={() => {
                          handleViewDetails(link);
                          setOpenedMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 lg:py-3 py-2  text-sm text-gray-700 hover:bg-violet-50 transition-colors"
                      >
                        <FaEye className="text-violet-600" />
                        Détails
                      </button>

                      <button
                        onClick={() => {
                          handleDelete(link._id);
                          setOpenedMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4  lg:py-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FaTrash className="text-red-600" />
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-bold text-black truncate text-base hover:underline cursor-pointer">
                  {link.title}
                </p>

                <a
                  href={link.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 mt-2 text-sm font-semibold hover:underline break-words max-w-full block"
                >
                  {link.shortUrl}
                </a>

                <a
                  href={link.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 mt-1 text-sm hover:underline break-words max-w-full block"
                >
                  {link.originalUrl}
                </a>
              </div>
            </div>

            {/* Infos supplémentaires */}
            <div className="flex mt-2 flex-wrap items-center gap-3 text-sm text-gray-600">
              <p className="flex items-center gap-1">
                <MdAdsClick className="text-lg" />
                <span>{link.clicks} clics</span>
              </p>

              <p className="flex items-center gap-1">
                <FaCalendar className="text-lg" />
                <span>{formatDate(link.createdAt)}</span>
              </p>
            </div>

            {/* Boutons d'actions */}
            <div className="flex justify-between w-full">
              {/* Boutons pour grand écran */}
              {/* <div className="hidden lg:flex gap-2">
                <button
                  onClick={() => copyToClipboard(link.shortUrl)}
                  className="bg-violet-700 hover:bg-violet-600 text-white p-2 rounded"
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
                  className="p-2 rounded bg-red-600 hover:bg-red-500 text-white"
                  onClick={() => handleDelete(link._id)}
                >
                  <FaTrash />
                </button>
              </div> */}
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
