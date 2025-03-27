import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../Composants/SideBar";
import NavBar from "../Composants/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      navigate("/"); // Rediriger vers Connexion si l'utilisateur n'est pas connecté
    }
  }, [navigate]);

  return (
    <div className="flex  bg-gray-100">
      <SideBar className="fixed h-screen shadow-lg " />

      <div className="flex-1 flex flex-col ">
        <NavBar className=" fixed top-0  z-10" />

        <div className="flex-1 overflow-y-auto mt-2 p-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                Derniers liens
              </h2>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                Suivie et Analyse{" "}
              </h2>
              <ul className="space-y-2">
                {/* {latestLinks.map((link) => (
                <li key={link.id} className="text-blue-500 hover:underline">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                </li>
              ))} */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
