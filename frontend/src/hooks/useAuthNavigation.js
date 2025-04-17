import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const useAuthNavigation = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  return {
    ...auth,
    login: (userData) => {
      auth.login(userData);
      navigate("/dashboard");
    },

    logout: async () => {
      await auth.logout();
      navigate("/Connexion", { state: { from: "logout" } });
    },
  };
};
