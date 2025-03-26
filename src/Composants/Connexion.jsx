import React, { useState } from "react";

const Connexion = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            newErrors.email = "Veuillez entrer un email valide.";
        }
        if (password.length < 8) {
            newErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Connexion réussie !");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <img src="../src/assets/logo.png" alt="" className="w-24 sm:w-28 md:w-32 lg:w-40 absolute top-0 left-0 hidden lg:block" />
            <div className="flex bg-white rounded-lg shadow-lg w-3/4 max-w-4xl overflow-hidden">
                <div className="w-1/2 relative hidden md:block">
                    <img src="./src/assets/Link.webp" alt="Login" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-purple-600 opacity-50"></div>
                </div>
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-semibold text-gray-700 text-center mt-[20px]">Connexion</h2>
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <div className="w-full">
                            <label className="block text-gray-700 mb-1">Email</label>
                            <div className="relative flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-purple-600">
                                <img src="../src/assets/envelope-regular-24.png" alt="Email Icon" className="w-5 h-5 text-gray-500 ml-3" />
                                <input type="email" className="w-full px-3 py-2 outline-none" placeholder="Entrez votre adresse mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div className="mt-4 w-full">
                            <label className="block text-gray-700 mb-1">Mot de passe</label>
                            <div className="relative flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-purple-600">
                                <img src="../src/assets/lock-open-regular-24.png" alt="Lock Icon" className="w-5 h-5 text-gray-500 ml-3" />
                                <input type="password" className="w-full px-3 py-2 outline-none" placeholder="Entrez votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>
                        <button type="submit" className="w-full mt-4 px-4 py-2 tracking-wide text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <p className="font-semibold text-lg">Se connecter</p>
                        </button>
                        {/* Options supplémentaires */}
<div className="mt-4 flex justify-between items-center text-sm">
    {/* Se rappeler de moi */}
    <label className="flex items-center">
        <input type="checkbox" className="mr-2 rounded border-gray-300 focus:ring-purple-600" />
        <span className="text-gray-600">Se rappeler de moi</span>
    </label>

    {/* Mot de passe oublié */}
    <a href="#" className="text-purple-600 hover:underline">Mot de passe oublié ?</a>
</div>

{/* Lien vers l'inscription */}
<div className="mt-4 text-center text-sm">
    <span className="text-gray-600">Vous n'avez pas de compte ? </span>
    <a href="#" className="text-purple-600 font-semibold hover:underline"  onClick={() => navigate("/SignUp")}>S'inscrire</a>
</div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Connexion;
