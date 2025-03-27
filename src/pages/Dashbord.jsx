import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h2 className="text-xl font-bold">Tableau de bord</h2>
                <nav className="mt-4">
                    <ul>
                        <li className="mb-2">
                            <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-700">
                                Accueil
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/dashboard/profile" className="block p-2 rounded hover:bg-gray-700">
                                Profil
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Contenu dynamique */}
            <main className="flex-1 p-6 bg-gray-100">
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
