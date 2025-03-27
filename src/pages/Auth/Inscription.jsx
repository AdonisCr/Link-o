import React, { useState } from "react";

const Inscription = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.[!@#$%^&])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (!emailRegex.test(email)) {
            newErrors.email = "Veuillez entrer un email valide.";
        }
        if (!passwordRegex.test(password)) {
            newErrors.password = "Le mot de passe doit contenir au moins 8 caractères et un caractère spécial.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Formulaire validé !");
        }
    };

    return (

        <div className="flex flex-col items-center justify-center min-h-screen bg-black">

            <img src="../src/assets/images/logo.png" alt="" className="w-24 sm:w-28 md:w-32 lg:w-40 absolute top-0 left-0 hidden lg:block" />
            <div className="flex bg-white rounded-lg shadow-lg w-3/4 max-w-4xl overflow-hidden">
                {/* Image Section */}
                <div className="w-1/2 relative hidden md:block">
                    <img src="./src/assets/images/Link.webp" alt="Signup" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-purple-600 opacity-50"></div>
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2 p-8">

                    <h2 className="text-3xl font-semibold text-gray-700 text-center mt-[20px]">Créez un compte </h2>
                    <div className="mt-6 w-full flex flex-col items-center">
                        {/* Boutons de connexion */}
                        <div className="flex gap-4 w-full">

                            {/* Bouton Google */}
                            <button className="flex items-center justify-center w-full py-2 border rounded-lg gap-2 hover:bg-gray-50 transition cursor-pointer hover:shadow-lg">
                                <img src="../src/assets/images/google-logo-24.png" alt="Google" className=" w-5 h-5" />
                                <p className="font-semibold">Sign up with google</p>
                            </button>

                            {/* Bouton Apple */}
                            <button className="flex items-center justify-center w-full py-2 border rounded-lg hover:bg-gray-50 transition cursor-pointer hover:shadow-lg">
                                <img src="../src/assets/images/apple-logo-24.png" alt="Apple" className="w-5 h-5 mr-2" />
                                <p className="font-semibold">Sign up with Apple</p>
                            </button>

                        </div>

                        {/* Texte "ou se connecter avec" avec traits horizontaux */}
                        <div className="flex items-center w-full mt-6">
                            <hr className="flex-grow border-gray-300" />
                            <span className="px-3 text-gray-500">ou se connecter avec</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>
                    </div>

                    <form className="mt-6" onSubmit={handleSubmit}>
                        <div className="w-full">
                            <label className="block text-gray-700 mb-1">Nom</label>

                            {/* Conteneur de l'input avec icône */}
                            <div className="relative flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-purple-600">

                                {/* Icône à gauche */}
                                <img
                                    src="../src/assets/images/user-regular-24.png"
                                    alt="User Icon"
                                    className="w-5 h-5 text-gray-500 ml-3"
                                />

                                {/* Input */}
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 outline-none"
                                    placeholder="Entrez votre nom complet"
                                />
                            </div>

                           
                        </div>


                        <div className="mt-4 w-full">
                            <label className="block text-gray-700 mb-1">Email</label>

                            {/* Conteneur avec l'icône et l'input */}
                            <div className="relative flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-purple-600">

                                {/* Icône email */}
                                <img
                                    src="../src/assets/images/envelope-regular-24.png"
                                    alt="Email Icon"
                                    className="w-5 h-5 text-gray-500 ml-3"
                                />

                                {/* Input Email */}
                                <input
                                    type="email"
                                    className="w-full px-3 py-2 outline-none"
                                    placeholder="Entrez votre adresse mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* Message d'erreur */}
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>


                        <div className="mt-4 w-full">
                            <label className="block text-gray-700 mb-1">Mot de passe</label>

                            {/* Conteneur avec l'icône et l'input */}
                            <div className="relative flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-purple-600">

                                {/* Icône mot de passe */}
                                <img
                                    src="../src/assets/images/lock-open-regular-24.png"
                                    alt="Lock Icon"
                                    className="w-5 h-5 text-gray-500 ml-3"
                                />

                                {/* Input Password */}
                                <input
                                    type="password"
                                    className="w-full px-3 py-2 outline-none"
                                    placeholder="Entrez votre mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {/* Message d'erreur */}
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>
{/*                         
                        <div className="mt-4 w-full">
                            <label className="block text-gray-700 mb-1">Mot de passe</label>

                         
                            <div className="relative flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-purple-600">

                               
                                <img
                                    src="../src/assets/lock-open-regular-24.png"
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

                            
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div> */}


                        <button type="submit" className="w-full mt-4 px-4 py-2 tracking-wide text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <p className="font-semibold text-lg">S'inscrire</p>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Inscription;