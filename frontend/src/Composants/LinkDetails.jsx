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
    <div className="w-full h-full flex flex-col items-start gap-6 p-6">
      <Link
        to="/dashboard/links"
        className="text-black flex items-center gap-1 text-base hover:underline font-medium"
      >
        <MdKeyboardArrowLeft className="text-xl" />
        Retour à la liste
      </Link>

      <div className="flex items-start justify-between w-full p-4 border rounded-lg shadow-sm">
        <div className="flex flex-col items-start gap-4">
          <p className="font-bold text-Blacks break-words hover:underline cursor-pointer text-2xl truncate max-w-xl">
            {linkDetails.title}
          </p>

          <div className="flex items-start gap-2">
            <img
              src={linkDetails.image || bad_mood_icon}
              alt={linkDetails.title || "Image indisponible"}
              className="p-0.5 border border-black/40 shadow w-8 lg:w-14 h-8 lg:h-14 rounded-full object-cover"
            />

            <div className="flex items-start flex-col gap-2">
              <a
                href={linkDetails.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm lg:text-base font-semibold hover:underline"
              >
                {linkDetails.shortUrl}
              </a>

              <a
                href={linkDetails.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm lg:text-base font-semibold hover:underline"
              >
                {linkDetails.originalUrl}
              </a>

              <div className="flex items-center gap-3 mt-4">
                <p className="flex items-center gap-1 text-sm text-black">
                  <MdAdsClick />

                  <span>{linkDetails.clicks} clics</span>
                </p>

                <p className="flex items-center gap-1 text-sm text-black">
                  <FaCalendar />

                  <span>{formatDate(linkDetails.createdAt)}</span>
                </p>

                {linkDetails.lastAccessed && (
                  <p className="flex items-center gap-1 text-sm text-black">
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

        {linkDetails.qrCode && (
          <img
            src={linkDetails.qrCode}
            alt="QR Code"
            className="w-30 h-auto border rounded-md border-black/20"
          />
        )}
      </div>

      {/* Description */}
      {linkDetails.description && (
        <div className="w-full p-4 border rounded-lg shadow-sm">
          <h3 className="text-lg text-black font-bold mb-2">Description</h3>

          <p className="text-sm lg:text-base text-black">
            {linkDetails.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default LinkDetails;
