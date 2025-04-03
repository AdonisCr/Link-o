import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const ShareModal = ({ link, onClose }) => {
  if (!link) return null;

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
      link.shortUrl
    )}`,

    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      link.shortUrl
    )}`,

    instagram: "#", // Instagram ne supporte pas le partage direct
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      link.shortUrl
    )}`,

    email: `mailto:?subject=Check this link&body=${encodeURIComponent(
      link.shortUrl
    )}`,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Partager le lien</h2>

        <div className="flex justify-around mb-4">
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="text-green-500 text-2xl" />
          </a>

          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-blue-600 text-2xl" />
          </a>

          <a
            href={shareLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-pink-500 text-2xl" />
          </a>
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter className="text-black text-2xl" />
          </a>
          <a href={shareLinks.email} target="_blank" rel="noopener noreferrer">
            <FaEnvelope className="text-gray-700 text-2xl" />
          </a>
        </div>

        <div className="flex items-center border rounded px-3 py-2">
          <input
            type="text"
            value={link.shortUrl}
            readOnly
            className="flex-1"
          />

          <button
            className="ml-2 text-blue-500 font-semibold"
            onClick={() => navigator.clipboard.writeText(link.shortUrl)}
          >
            Copier
          </button>
        </div>

        <button
          className="mt-4 w-full bg-gray-300 rounded py-2"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
