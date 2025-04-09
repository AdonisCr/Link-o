import { useState, useEffect } from "react";
import { getUrlByUser } from "../api/url";
import { getUser } from "../api/user";

const DashboardContent = () => {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Erreur utilisateur :", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!user || !user._id) return;

    const fetchUserUrls = async () => {
      try {
        const fetchedUrls = await getUrlByUser(user._id);
        setLinks(fetchedUrls);
        const total = fetchedUrls.reduce(
          (acc, link) => acc + (link.clicks || 0),
          0
        );
        setTotalClicks(total);
      } catch (error) {
        console.error("Erreur liens :", error.message);
      }
    };

    fetchUserUrls();
  }, [user]);

  // Fonction de filtrage des liens
  const filteredLinks = links.filter((link) =>
    link.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-3 lg:p-6 bg-gray-100 min-h-screen">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Clicks" value={totalClicks} />
        <StatCard title="Visitors" value="26" />
        <StatCard title="Unused Link" value="+2" />
      </div>

      {/* Tableau des liens */}
      <div className="bg-white shadow-md rounded-lg p-4 mt-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            My Links ({filteredLinks.length} total)
          </h2>
          <input
            type="text"
            placeholder="Search link..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded-lg w-full md:w-1/3"
          />
        </div>

        {/* Rendre le tableau scrollable sur mobile */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">#</th>
                <th className="p-2">Name</th>
                <th className="p-2">Value</th>
                <th className="p-2">Clicks</th>
                <th className="p-2">Date Created</th>
                <th className="p-2">Expire After</th>
              </tr>
            </thead>

            <tbody>
              {filteredLinks.length > 0 ? (
                filteredLinks.map((link, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{index + 1}</td>

                    <td className="p-2 text-blue-600 hover:underline cursor-pointer">
                      <a href={link.shortUrl} target="_blank">
                        {link.shortUrl}
                      </a>
                    </td>

                    <td className="p-2 max-w-xs truncate">{link.title}</td>

                    <td
                      className={`p-2 ${
                        link.clicks >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {link.clicks}
                    </td>

                    <td className="p-2">
                      {new Date(link.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-2">{link.expiresAt || "Lifetime"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    Aucun lien trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Composant pour afficher les statistiques
const StatCard = ({ title, value }) => (
  <div className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default DashboardContent;
