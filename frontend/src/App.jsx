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
import PrivateRoute from "./Composants/PrivateRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import QrCodePage from "./pages/QrCodePage.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/Inscription" element={<Inscription />} />

          <Route path="/Connexion" element={<Connexion />} />

          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardContent />} />

            <Route path="links" element={<LinksContent />} />

            <Route path="links/:id" element={<LinkDetails />} />

            <Route path="qrcodes" element={<QrCodePage />} />

            <Route path="domains" element={<Domains />} />

            <Route path="support" element={<Support />} />

            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
