import React from "react";
import dd from "../assets/images/242_1x_shots_so.png";
const About = () => {
  const blogs = [
    {
      id: 1,
      imag: "./src/assets/images/like-regular-24.png",
      name: "Simple et rapide",
      descr2:
        "Link-O est conçu pour être intuitif et ultra-rapide. Il suffit d’entrer une URL longue pour obtenir un lien raccourci instantanément.",
    },
    {
      id: 2,
      imag: "./src/assets/images/link-regular-24.png",
      name: "Raccourcissement Illimité",
      descr2:
        "Que votre lien soit long ou complexe, Link-o le simplifie toujours pour vous garantir une URL courte et propre.",
    },
    {
      id: 3,
      imag: "./src/assets/images/lock-regular-24.png",
      name: " Sécurisé et Fiable",
      descr2:
        "Protocoles HTTPS et chiffrement des données pour protéger chaque lien. Détection et suppression automatique des liens malveillants.",
    },
    {
      id: 4,
      imag: "./src/assets/images/signal-5-regular-24.png",
      name: "Suivi et Statistiques",
      descr2:
        "Analyse des clics : découvrez combien de fois votre lien a été ouvert.",
    },
    {
      id: 5,
      imag: "./src/assets/images/camera-home-regular-24.png",
      name: "Compatible avec Tous les Appareils",
      descr2:
        "Link-o fonctionne sur mobile, tablette et ordinateur, pour une accessibilité optimale où que vous soyez.",
    },
    {
      id: 6,
      imag: "./src/assets/images/share-alt-regular-24.png",
      name: "Partage facile",
      descr2:
        "Boutons de partage rapide vers les réseaux sociaux. Intégration directe dans des emails ou messages.",
    },
  ];

  return (
    <section
      className="h-full w-full"
      style={{ fontFamily: "Winky Sans, sans-serif" }}
    >
      <div id="about" className="w-[90%] mx-auto bg-white flex flex-col md:flex-row ">
        <div className="w-1/2">
          <img src={dd} alt="" className="w-full" />
        </div>
        <div className="flex flex-col justify-center items-center p-8 w-1/2">
          <h2 className="font-bold text-3xl text-[#2C2E33] cursor-pointer hover:scale-95 transition-all duration-300">
            Qu'est-ce que Link-o ?
          </h2>

          <p className="text-center p-8 text-lg">
            <span className="font-bold">Link-o</span> est un raccourcisseur
            d’URL puissant et polyvalent conçu pour offrir une expérience fluide
            et intuitive. Que vous soyez un particulier souhaitant partager des
            liens plus propres ou une entreprise cherchant à analyser et
            optimiser ses campagnes marketing, Link-o vous offre toutes les
            fonctionnalités nécessaires.
          </p>
        </div>
      </div>

      {/* Section des icônes animées */}
      <div id="fonctions" className="bg-purple-50 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 justify-between w-[90%] items-start mx-auto gap-x-10 gap-y-5">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex py-4 hover:scale-95 transition-all duration-300"
            >
              <div className="flex flex-col gap-3 justify-center items-center text-center">
                {/* Ajout de l'animation sur l'icône */}
                <img
                  className="w-12 h-12 animate-spin-slow animate-swing"
                  src={blog.imag}
                  alt={blog.name}
                />

                <h1 className="text-black font-semibold text-xl">
                  {blog.name}
                </h1>
                <h1 className="text-black text-lg">{blog.descr2}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
