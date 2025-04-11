import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth";

const Inscription = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Pour gérer l'état de soumission
  const [serverError, setServerError] = useState(""); // Pour les erreurs serveur
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!emailRegex.test(email)) {
      newErrors.email = "Veuillez entrer un email valide.";
    }

    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères et un caractère spécial.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { data } = await register({ username: name, email, password });

      navigate("/Connexion");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);

      setServerError(
        error.response?.data?.message ||
          "Une erreur est survenue lors de l'inscription"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fontWinky flex flex-col items-center justify-center min-h-screen bg-black">
      <img
        src="../src/assets/logo.png"
        alt=""
        className="w-24 sm:w-28 md:w-32 lg:w-40 absolute top-0 left-0 hidden lg:block"
      />

      <div className="flex bg-white rounded-lg shadow-lg w-3/4 max-w-4xl overflow-hidden">
        <div className="w-1/2 relative hidden md:block">
          <div className="relative w-[300px] h-96 overflow-hidden rounded-lg group cursor-pointer mt-[28px] ml-[50px] hidden md:block">
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
              src="../src/assets/images/persone.webp"
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
              src="/src/assets/images/logo.png"
              alt="Logo"
              className="absolute top-2 w-16 sm:w-20 md:w-26 lg:w-[120px] right-0"
            />

            {/* Texte en bas à gauche avec flèche */}
            <div className="absolute bottom-5 left-5 text-white flex items-start space-x-2">
              <span className="text-sm sm:text-base md:text-lg lg:text-lg font-semibold  leading-0">
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
            Créez un compte
          </h2>

          {serverError && (
            <p className="text-red-500 text-center mb-4">{serverError}</p>
          )}

          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="w-full">
              <label className="block text-gray-700 mb-1">Nom</label>

              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Entrez votre nom complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className="mt-4 w-full">
              <label className="block text-gray-700 mb-1">Email</label>

              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Entrez votre adresse mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mt-4 w-full">
              <label className="block text-gray-700 mb-1">Mot de passe</label>

              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-4 px-4 py-2 tracking-wide text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inscription;
