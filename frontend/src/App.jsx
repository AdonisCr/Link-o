import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Inscription from "./pages/Auth/Inscription.jsx";
import Connexion from "./pages/Auth/Connexion.jsx";
import LinksContent from "./Composants/LinksContent.jsx";
import DashboardContent from "./Composants/DashbordContent.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Settings from "./pages/Settings.jsx";
import Domains from "./pages/Domains.jsx";
import Support from "./pages/Support.jsx";
import LinkDetails from "./Composants/LinkDetails.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/Inscription" element={<Inscription />} />

        <Route path="/Connexion" element={<Connexion />} />

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardContent />} />

          <Route path="links" element={<LinksContent />} />

          <Route path="links/:id" element={<LinkDetails />} />

          <Route path="domains" element={<Domains />} />

          <Route path="support" element={<Support />} />

          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
