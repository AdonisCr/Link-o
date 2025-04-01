import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../Composants/SideBar";
import NavBar from "../Composants/Navbar";

import DashboardContent from "../Composants/DashbordContent";
import LinksContent from "../Composants/LinksContent";
// import AnalyticsContent from "./AnalyticsContent";
// import DomainsContent from "./DomainsContent";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "links":
        return <LinksContent />;
      case "analytics":
        return <AnalyticsContent />;
      case "domains":
        return <DomainsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex bg-violet-200">
      <SideBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="fixed h-screen shadow-lg"
      />

      <div className="flex-1 flex flex-col">
        <NavBar className="fixed top-0  z-10" />

        <div className="flex-1 overflow-y-auto mt-2 p-2">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
