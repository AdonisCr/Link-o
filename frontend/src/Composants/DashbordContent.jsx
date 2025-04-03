import { useState, useEffect } from "react";
import { getUrlByUser } from "../api/url";
import { getUser } from "../api/user";

const DashboardContent = () => {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);

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
    let intervalId;

    const fetchUserUrls = async () => {
      if (!user || !user._id) return;

      try {
        const fetchedUrls = await getUrlByUser(user._id);

        setLinks(fetchedUrls);

        const total = fetchedUrls.reduce(
          (acc, link) => acc + (link.clicks || 0),
          0
        );

        setTotalClicks(total);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des liens :",
          error.message
        );
      }
    };

    if (user) {
      fetchUserUrls();
      intervalId = setInterval(fetchUserUrls, 3000);
    }

    return () => clearInterval(intervalId);
  }, [user]);

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4"
      style={{ fontFamily: "Winky Sans, sans-serif" }}
    >
      <div className="bg-white shadow-md rounded-lg px-6 py-4">
        <h2 className="text-lg font-semibold mb-2">
          Bienvenue, {user ? user.username : "Utilisateur"} !
        </h2>

        <p className="text-gray-600">
          Voici un récapitulatif de votre activité :
        </p>

        <ul className="mt-2 space-y-1">
          <li>
            <strong>Nombre de liens générés :</strong> {links.length}
          </li>

          <li>
            <strong>Dernier lien généré : </strong>
            {links.length > 0 ? (
              <>
                <a
                  href={links[0].shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm font-semibold hover:underline"
                >
                  {links[0].originalUrl}
                </a>
              </>
            ) : (
              "Aucun lien"
            )}
          </li>

          <li>
            <strong>Nombre total de clics :</strong> {totalClicks}
          </li>
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg px-6 py-2">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          Derniers liens
        </h2>

        <ul>
          {links.length > 0 ? (
            links.map((link, index) => (
              <li key={index} className="border-b py-2">
                <h3 className="font-bold text-Blacks break-words hover:underline cursor-pointer text-base truncate max-w-md">
                  {link.title}
                </h3>

                <a
                  href={link.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm font-semibold hover:underline"
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
    </div>
  );
};

export default DashboardContent;
