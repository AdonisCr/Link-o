import React from "react";

const Footer = () => {
  return (
    <footer className=" w-full  bg-Blacks" style={{ fontFamily: "Winky Sans, sans-serif" }}>
      <div className="w-[90%]  mx-auto md:flex flex-wrap justify-center md:justify-between items-center gap-6  h-auto py-10 text-center   ">
        <div className="flex flex-col text-white space-y-2 space-x-8 ">
          <div className="space-y-4 text-lg flex flex-col items-center md:items-start ">
            <img
              src="/src/assets/images/logo.png"
              alt="Logo"
              className="w-24 sm:w-28 md:w-32 lg:w-40 "
            />
            <p className="md:w-[400px] md:px-6 w-auto px-2 md:text-start text-center">
              {" "}
              <span className="font-bold ">Link-o </span>est une plateforme
              avancée de gestion de liens, conçue pour simplifier et optimiser
              le partage d’URL en ligne.Link-o permet aux particuliers et aux
              entreprises de maximiser leur impact numérique.
            </p>
          </div>
        </div>
        <div className="flex flex-col text-white space-y-2 space-x-8">
          <div className="space-y-1 text-lg flex flex-col   md:text-start text-center gap-y-2 mt-10 md:mt-0">
            <h3 className="text-xl font-bold text-[#AC6CFF] hover:text-purple-800 cursor-pointer hover:underline shadow-sm mt-10 md:mt-0">
              Nos Services
            </h3>
            <div className="flex flex-col gap-5">
              <a href="">Qui sommes nous?</a>
              <a href="">Nous contacter</a>
              <a href="">Convertir un lien</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-white space-y-2 space-x-8 ">
          <div className="space-y-1 text-lg flex flex-col   md:text-start text-center gap-y-2 mt-10 md:mt-0">
            <h3 className="text-xl font-bold text-[#AC6CFF] hover:text-purple-800 cursor-pointer hover:underline shadow-sm">
              Explorez-nous
            </h3>
            <div className="flex flex-col gap-5">
              <a href="">Acceuil</a>
              <a href="">A Propos</a>
              <a href="">Fonctionnalités</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-white space-y-2 space-x-8 gap-y-2">
          <div className="text-lg flex flex-col   md:text-start text-center gap-4 mt-10 md:mt-0">
            <h3 className="text-xl font-bold text-[#AC6CFF] hover:text-purple-800 cursor-pointer hover:underline shadow-sm ">
              Contactez-nous
            </h3>
            <div className="flex gap-2 items-center justify-center md:items-start md:justify-start ">
              <img
                src="../src/assets/images/location-plus-solid-24.png"
                alt=""
                className="bg-white rounded-full p-1 size-7"
              />
              <p>Calavi,Zogbagjè-Ita</p>
            </div>
            <div className="flex gap-2 items-center justify-center md:items-start md:justify-start ">
              <img
                src="../src/assets/images/phone-solid-24.png"
                alt=""
                className="bg-white rounded-full p-1 size-7"
              />
              <p>229 01 57 51 23 06 </p>
            </div>
            <div className="flex gap-2 items-center justify-center md:items-start md:justify-start ">
              <img
                src="../src/assets/images/location-plus-solid-24.png"
                alt=""
                className="bg-white rounded-full p-1 size-7"
              />
              <p>tognide@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
