import { useLocation } from "react-router-dom";
import { MdAdsClick } from "react-icons/md";

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
    <div className="container mx-auto p-6 w-full">
      <a>Back to list</a>

      <div className="flex items-center justify-between w-full p-4 border rounded-lg shadow-sm">
        <div className="flex items-start gap-4">
          <img
            src={linkDetails.image}
            alt={linkDetails.title}
            className="p-0.5 border border-black/40 shadow w-8 lg:w-12 h-8 lg:h-12 rounded-full object-cover"
          />

          <div className="flex items-start flex-col gap-2">
            <p className="font-bold text-Blacks break-words hover:underline cursor-pointer text-lg truncate max-w-md">
              {linkDetails.title}
            </p>

            <a
              href={linkDetails.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm font-semibold hover:underline"
            >
              {linkDetails.shortUrl}
            </a>

            <a
              href={linkDetails.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm font-semibold hover:underline"
            >
              {linkDetails.originalUrl}
            </a>

            <div className="flex items-center gap-3 mt-4">
              <p className="flex items-center gap-1 text-sm text-black">
                {/* <MdAdsClick /> */}
                <span>{linkDetails.clicks} clics</span>
              </p>

              <p className="flex items-center gap-1 text-sm text-black">
                {/* <FaCalendar /> */}
                <span>{formatDate(linkDetails.createdAt)}</span>
              </p>
            </div>
          </div>
        </div>

        {linkDetails.qrCode && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">QR Code</h3>
            <img
              src={linkDetails.qrCode}
              alt="QR Code"
              className="mt-2 w-40 h-40"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkDetails;
