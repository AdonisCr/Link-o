import { useState, useEffect } from "react";
import { getUrlByUser } from "../api/url";
import { getUser } from "../api/user";

const DashboardContent = () => {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    // Récupérer l'utilisateur connecté
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUserUrls = async () => {
      if (!user || !user._id) return;

      try {
        const fetchedUrls = await getUrlByUser(user._id);
        setLinks(fetchedUrls);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des liens :",
          error.message
        );
      }
    };

    if (user) {
      fetchUserUrls();
    }
  }, [user]);

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-2 "
      style={{ fontFamily: "Winky Sans, sans-serif" }}
    >
      <div className="bg-white shadow-md rounded-lg px-6 py-2">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          Derniers liens
        </h2>

        <ul>
          {links.length > 0 ? (
            links.map((link, index) => (
              <li key={index} className="border-b py-2">
                <a
                  href={link.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {link.shortUrl}
                </a>
              </li>
            ))
          ) : (
            <p>Aucun lien généré pour le moment.</p>
          )}
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg px-6 py-2">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          Suivi et Analyse
        </h2>
      </div>
    </div>
  );
};

export default DashboardContent;
