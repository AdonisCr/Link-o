import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { isAuthenticated, isLoading, clearAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      clearAuth();
    }
  }, [isAuthenticated, isLoading, clearAuth]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Chargement de la session...</p>
      </div>
    );
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/Connexion" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
