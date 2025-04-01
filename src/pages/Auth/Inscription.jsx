import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Inscription = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Déclaration de useNavigate

    const validateForm = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        // Validation email
        if (!emailRegex.test(email)) {
            newErrors.email = "Veuillez entrer un email valide.";
        }

        // Validation mot de passe
        if (!passwordRegex.test(password)) {
            newErrors.password = "Le mot de passe doit contenir au moins 8 caractères et un caractère spécial.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert("Inscription réussie !");
            navigate("/Connexion"); // Redirection après succès
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
            <img src="../src/assets/logo.png" alt="" className="w-24 sm:w-28 md:w-32 lg:w-40 absolute top-0 left-0 hidden lg:block" />
            <div className="flex bg-white rounded-lg shadow-lg w-3/4 max-w-3xl overflow-hidden">
            <div className="relative w-[300px] h-96 overflow-hidden rounded-lg group cursor-pointer mt-[22px] ml-[25px] hidden md:block">
        {/* Bordure uniquement sur les côtés sans escalier */}
        <div
          className="absolute inset-0 border-4 border-gray-200"
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
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 items-center"></div>

        {/* Logo en haut à gauche */}
        <img
          src="/src/assets/images/logo.png" // Remplace avec ton logo
          alt="Logo"
          className="absolute top-2 w-16 sm:w-20 md:w-26 lg:w-[150px] left-[20px]"
        />

        {/* Texte en bas à gauche avec flèche */}
        <div className="absolute bottom-5 left-5 text-white flex items-center space-x-2">
          <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">"La meilleure solution pour racourssir vos liens"</span>
          <svg
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
          </svg>
        </div>
      
    </div>
                {/* <div className="w-1/2 relative hidden md:block">
                <img src="./src/assets/images/Link.webp" alt="Login" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-purple-600 opacity-50"></div>
                </div> */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-semibold text-gray-700 text-center mt-[20px]">Créez un compte</h2>
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <div className="w-full">
                            <label className="block text-gray-700 mb-1">Nom</label>
                            <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Entrez votre nom complet" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mt-4 w-full">
                            <label className="block text-gray-700 mb-1">Email</label>
                            <input type="email" className="w-full px-3 py-2 border rounded-lg" placeholder="Entrez votre adresse mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div className="mt-4 w-full">
                            <label className="block text-gray-700 mb-1">Mot de passe</label>
                            <input type="password" className="w-full px-3 py-2 border rounded-lg" placeholder="Entrez votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>
                        <button type="submit" className="w-full mt-4 px-4 py-2 tracking-wide text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                            S'inscrire
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Inscription;
