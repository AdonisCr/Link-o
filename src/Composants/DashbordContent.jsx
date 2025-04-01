import { useState, useEffect } from "react";

const DashboardContent = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const storedLinks = JSON.parse(localStorage.getItem("shortenedLinks")) || [];
    setLinks(storedLinks);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 " style={{ fontFamily: "Winky Sans, sans-serif" }}>
      <div className="bg-white shadow-md rounded-lg px-6 py-2">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          Derniers liens
        </h2>
        <ul>
          {links.length > 0 ? (
            links.map((link, index) => (
              <li key={index} className="border-b py-2">
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {link}
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
