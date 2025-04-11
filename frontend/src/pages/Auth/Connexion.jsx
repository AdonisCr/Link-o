import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");

    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      newErrors.email = "Veuillez entrer un email valide.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { login: loginContext } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (validateForm()) {
      try {
        const { data } = await login({ email, password });
        console.log(data);

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        localStorage.setItem("token", data.token);

        loginContext(data.token);

        navigate("/dashboard");
      } catch (err) {
        if (err.response) {
          setServerError(err.response.data.message);
        } else {
          setServerError("Une erreur est survenue. Réessayez plus tard.");
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="flex bg-white rounded-lg shadow-lg w-3/4 max-w-4xl overflow-hidden">
        <div className="w-1/2 relative hidden md:block">
          <div className="relative w-[300px] h-96 overflow-hidden rounded-lg group cursor-pointer mt-[26px] ml-[50px] hidden md:block">
            {/* Bordure uniquement sur les côtés sans escalier */}
            <div
              className="absolute inset-0 border-10 border-gray-300"
              style={{
                clipPath:
                  "polygon(90% 0%, 100% 0%, 100% 90%, 90% 90%, 90% 100%, 0% 100%, 0% 10%, 10% 10%, 10% 0%)",
              }}
            ></div>

            {/* Image avec effet spécial */}
            <img
              src="../src/assets/images/persone.webp" // Remplace avec ton image
              alt="Person standing"
              className="w-full h-full object-cover"
              style={{
                clipPath:
                  "polygon(0% 10%, 10% 10%, 10% 0%, 100% 0%, 100% 90%, 90% 90%, 90% 100%, 0% 100%)",
              }}
            />

            {/* Overlay noir qui s'affiche en hover */}
            <div
              className="absolute inset-0 bg-black opacity-50  transition-opacity duration-300 items-center"
              style={{
                clipPath:
                  "polygon(0% 10%, 10% 10%, 10% 0%, 100% 0%, 100% 90%, 90% 90%, 90% 100%, 0% 100%)",
              }}
            ></div>

            {/* Logo en haut à gauche */}
            <img
              src="/src/assets/images/logo.png" // Remplace avec ton logo
              alt="Logo"
              className="absolute top-2 w-16 sm:w-20 md:w-26 lg:w-[120px] right-0"
            />

            {/* Texte en bas à gauche avec flèche */}
            <div className="absolute bottom-5 left-5 text-white flex items-start space-x-2">
              <span className="text-sm sm:text-base md:text-lg lg:text-lg font-semibold  leading-none">
                "La meilleure solution pour racourssir vos liens"
              </span>
              {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-6 text-white"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg> */}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-gray-700 text-center mt-[20px]">
            Connexion
          </h2>

          {serverError && (
            <p className="text-red-500 text-sm text-center mt-2">
              {serverError}
            </p>
          )}

          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="w-full">
              <label className="block text-gray-700 mb-1">Email</label>
              <div className="relative flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-purple-600">
                <img
                  src="../src/assets/images/envelope-regular-24.png"
                  alt="Email Icon"
                  className="w-5 h-5 text-gray-500 ml-3"
                />

                <input
                  type="email"
                  className="w-full px-3 py-2 outline-none"
                  placeholder="Entrez votre adresse mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mt-4 w-full">
              <label className="block text-gray-700 mb-1">Mot de passe</label>

              <div className="relative flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-purple-600">
                <img
                  src="../src/assets/images/lock-open-regular-24.png"
                  alt="Lock Icon"
                  className="w-5 h-5 text-gray-500 ml-3"
                />

                <input
                  type="password"
                  className="w-full px-3 py-2 outline-none"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="mt-4 flex justify-between items-center text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-gray-300 focus:ring-purple-600"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />

                <span className="text-gray-600">Se rappeler de moi</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-purple-600 hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full mt-4 px-4 py-2 tracking-wide text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <p className="font-semibold text-lg">Se connecter</p>
            </button>
            <div className="mt-4 text-center text-sm">
              <span className="text-gray-600 text-[15px]">
                Vous n'avez pas de compte ?{" "}
              </span>

              <a
                href="#"
                className="text-purple-600 font-semibold hover:underline text-[15px] ml-[15px]"
                onClick={() => navigate("/Inscription")}
              >
                S'inscrire
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
