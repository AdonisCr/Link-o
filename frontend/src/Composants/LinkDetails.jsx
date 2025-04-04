import { Link, useLocation } from "react-router-dom";
import { MdAdsClick, MdKeyboardArrowLeft } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import bad_mood_icon from "../assets/images/mood-sad.svg";

const LinkDetails = () => {
  const location = useLocation();
  const linkDetails = location.state?.link;

  if (!linkDetails) return <p>Aucun détail à afficher.</p>;

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
    <div className="w-full h-full flex flex-col items-start gap-6 p-3 lg:p-6">
      <Link
        to="/dashboard/links"
        className="text-black flex items-center gap-1 text-base hover:underline font-medium"
      >
        <MdKeyboardArrowLeft className="text-xl" />
        Retour à la liste
      </Link>

      {/* Section principale responsive */}
      <div className="flex flex-col lg:flex-row justify-between w-full p-4 border rounded-lg shadow-sm gap-6">
        {/* Partie gauche : infos */}
        <div className="flex flex-col gap-4 flex-1 min-w-0">
          <p className="font-bold  text-black break-words max-w-2xl hover:underline cursor-pointer text-xl lg:text-2xl truncate">
            {linkDetails.title}
          </p>

          <div className="flex lg:flex-row flex-col text-start items-start gap-3">
            <img
              src={linkDetails.image || bad_mood_icon}
              alt={linkDetails.title || "Image indisponible"}
              className="p-0.5 border border-black/40 shadow w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover"
            />

            <div className="flex flex-col gap-2 w-full min-w-0">
              <a
                href={linkDetails.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm lg:text-base font-semibold hover:underline break-all"
              >
                {linkDetails.shortUrl}
              </a>

              <a
                href={linkDetails.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm lg:text-base font-semibold hover:underline break-all"
              >
                {linkDetails.originalUrl}
              </a>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-4 text-sm text-black">
                <p className="flex items-center gap-1">
                  <MdAdsClick />
                  <span>{linkDetails.clicks} clics</span>
                </p>

                <p className="flex items-center gap-1">
                  <FaCalendar />
                  <span>{formatDate(linkDetails.createdAt)}</span>
                </p>

                {linkDetails.lastAccessed && (
                  <p className="flex items-center gap-1">
                    <FaCalendar />

                    <span>
                      Dernier accès : {formatDate(linkDetails.lastAccessed)}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Partie droite : QR Code */}
        {linkDetails.qrCode && (
          <div className="flex justify-center items-center">
            <img
              src={linkDetails.qrCode}
              alt="QR Code"
              className="w-32 lg:w-36 h-auto border rounded-md border-black/20"
            />
          </div>
        )}
      </div>

      {/* Description */}
      {linkDetails.description && (
        <div className="w-full p-4 border rounded-lg shadow-sm">
          <h3 className="text-lg text-black font-bold mb-2">Description</h3>
          <p className="text-sm lg:text-base text-black break-words">
            {linkDetails.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default LinkDetails;
