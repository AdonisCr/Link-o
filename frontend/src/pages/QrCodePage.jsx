import { useState, useEffect } from "react";
import {
  FaCopy,
  FaShareAlt,
  FaTrash,
  FaEye,
  FaCalendar,
  FaEllipsisH,
  FaQrcode,
} from "react-icons/fa";
import { MdAdsClick } from "react-icons/md";
import ShareModal from "../Composants/ShareModal";
import { getAllUserQrCodes, deleteQrCode } from "../api/url";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api/user";
import bad_mood_icon from "../assets/images/mood-sad.svg";
import { toast } from "react-toastify";

const QrCodeContent = () => {
  const [qrCodes, setQrCodes] = useState([]);
  const [sortOption, setSortOption] = useState("recent");
  const [selectedQrCode, setSelectedQrCode] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [openedMenuId, setOpenedMenuId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fonction pour récupérer les QR codes
  const fetchQrCodes = async (id) => {
    try {
      setIsLoading(true);
      const data = await getAllUserQrCodes(id);
      setQrCodes(data);
    } catch (error) {
      console.error("Erreur de récupération des QR codes:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Récupérer l'utilisateur et ses QR codes
  useEffect(() => {
    const fetchUserAndQrCodes = async () => {
      try {
        const user = await getUser();
        setUserId(user._id);
        await fetchQrCodes(user._id);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchUserAndQrCodes();
  }, []);

  // Supprimer un QR code
  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce QR code ?")) {
      try {
        await deleteQrCode(id);
        setQrCodes((prev) => prev.filter((qr) => qr._id !== id));
        toast.success("Qr Code supprimer avec success !");
      } catch (error) {
        toast.error("Erreur lors de la suppression");
        console.error("Erreur lors de la suppression:", error.message);
      }
    }
  };

  // Partager un QR code
  const handleShare = (qrCode) => {
    setSelectedQrCode(qrCode);
    setShowModal(true);
  };

  // Voir les détails
  const handleViewDetails = (qrCode) => {
    navigate(`/dashboard/links/${qrCode._id}`, { state: { qrCode } });
  };

  // Formater la date
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

  // Filtrer les QR codes

  const sortedQrCodes = [...qrCodes].sort((a, b) => {
    if (sortOption === "recent")
      // Tri du plus récent au plus ancien
      return new Date(b.createdAt) - new Date(a.createdAt);

    if (sortOption === "oldest")
      // Tri du plus ancien au plus récent
      return new Date(a.createdAt) - new Date(b.createdAt);

    if (sortOption === "clicks")
      // Tri du plus de clics au moins de clics
      return (b.clicks || 0) - (a.clicks || 0);

    if (sortOption === "least-clicks")
      // NOUVEAU: Tri du moins de clics au plus de clics
      return (a.clicks || 0) - (b.clicks || 0);

    return 0;
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-3 lg:p-6 w-full">
      <div className="flex justify-between items-center mb-4 flex-col sm:flex-row gap-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FaQrcode className="text-linac" /> Mes QR Codes
        </h2>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full px-3 py-2.5 lg:w-1/3 bg-white text-gray-700 border border-gray-200 text-sm rounded-md shadow-sm focus:outline-none focus:ring-1 mt-6 focus:ring-violet-500 focus:border-violet-500 transition-colors"
        >
          <option value="recent"> Plus récents</option>
          <option value="oldest"> Plus anciens</option>
          <option value="clicks"> Plus populaires</option>
          <option value="least-clicks"> Moins populaire</option>
        </select>
      </div>

      {/* Liste des QR codes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {sortedQrCodes.map((qr) => (
          <div
            key={qr._id}
            className="flex flex-col p-4 border rounded-lg shadow-sm gap-3 overflow-hidden"
          >
            {/* Section haute avec QR code et titre */}
            <div className="flex flex-col gap-4">
              <div className="w-full flex items-center justify-between">
                <img
                  src={qr.image || bad_mood_icon}
                  alt={qr.title || "QR Code"}
                  className="border border-black/40 shadow w-10 h-10 rounded-full object-cover"
                />
                <div className="relative">
                  <button
                    className="text-black text-lg font-bold lg:text-xl"
                    onClick={() =>
                      setOpenedMenuId(openedMenuId === qr._id ? null : qr._id)
                    }
                  >
                    <FaEllipsisH />
                  </button>

                  {openedMenuId === qr._id && (
                    <div className="absolute right-0 mt-2 w-44 bg-white shadow-xl rounded-lg z-50 border border-gray-100 animate-fade-in">
                      <div className="absolute top-[-6px] right-4 w-3 h-3 bg-white rotate-45 shadow-sm border-l border-t border-gray-100"></div>

                      <button
                        onClick={() => {
                          handleShare(qr);
                          setOpenedMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 lg:py-3 py-2 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
                      >
                        <FaShareAlt className="text-violet-600" /> Partager
                      </button>

                      <button
                        onClick={() => {
                          handleViewDetails(qr);
                          setOpenedMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 lg:py-3 py-2 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
                      >
                        <FaEye className="text-violet-600" /> Détails
                      </button>

                      <button
                        onClick={() => {
                          handleDelete(qr._id);
                          setOpenedMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 lg:py-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FaTrash className="text-red-600" /> Supprimer
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Image du QR code */}
              <img
                src={qr.qrCode}
                alt={`QR Code pour ${qr.title}`}
                className="w-full h-48 object-contain border rounded"
              />

              <div className="min-w-0 flex-1">
                <p className="font-bold text-black truncate text-base hover:underline cursor-pointer">
                  {qr.title || "Sans titre"}
                </p>

                <a
                  href={qr.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 mt-2 text-sm font-semibold hover:underline break-words max-w-full block"
                >
                  {qr.shortUrl}
                </a>

                <a
                  href={qr.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 mt-1 text-sm hover:underline break-words max-w-full block"
                >
                  {qr.originalUrl}
                </a>
              </div>
            </div>

            {/* Informations supplémentaires */}
            <div className="flex mt-2 flex-wrap items-center gap-3 text-sm text-gray-600">
              <p className="flex items-center gap-1">
                <MdAdsClick className="text-lg" />
                <span>{qr.clicks || 0} clics</span>
              </p>

              <p className="flex items-center gap-1">
                <FaCalendar className="text-lg" />
                <span>{formatDate(qr.createdAt)}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de partage */}
      {showModal && (
        <ShareModal
          link={selectedQrCode}
          onClose={() => setShowModal(false)}
          isQrCode={true}
        />
      )}
    </div>
  );
};

export default QrCodeContent;
