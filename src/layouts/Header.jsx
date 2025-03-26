import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    // <header className="w-full bg-Blacks py-4 font-semibold text-lg ">
    //   <div className="w-[90%] mx-auto  flex items-center justify-between">
    //     <img src="/src/assets/images/logo.png" alt="" className="w-40" />
    //     <nav className="flex items-center justify-center gap-12">
    //       <ul className="flex  text-Whites font-semibold text-lg gap-10">
    //         <li>Home</li
    //         <li>About Us</li>
    //         <li>Features</li>
    //         <li>Our Works</li>
    //         <li>Pricing </li>
    //       </ul>
    //       <div className=" flex  gap-6 items-center ">
    //         <button className="text-linac ">Sign in</button>
    //         <button className="bg-linac text-Whites px-3 py-1 rounded-lg">
    //           Sign up
    //         </button>
    //       </div>
    //     </nav>
    //   </div>
    // </header>

    <header className="w-full bg-Blacks py-4 font-semibold text-sm md:text-base text-white fixed top-0 left-0 z-50">
      <div className="w-[90%] mx-auto flex items-center justify-between">
        {/* Logo */}
        <img
          src="/src/assets/images/logo.png"
          alt="Logo"
          className="w-24 sm:w-28 md:w-32 lg:w-40"
        />

        {/* Conteneur Mobile : Menu + Boutons alignés */}
        <div className="flex items-center gap-4 lg:hidden  sm:text-xs">
          {/* Boutons Sign in & Sign up (Visibles même sur mobile) */}
          <button className="text-linac ">Se Connecter</button>
          <button className="bg-linac text-Whites px-2 py-1 rounded-lg">
            S'inscrire
          </button>

          {/* Menu Mobile Button */}
          <button className="text-Whites" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {/* Navigation (S'affiche en mode mobile) */}
        <nav
          className={`absolute top-14 left-0 w-full bg-Blacks transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          } lg:static lg:flex lg:items-center lg:w-auto lg:bg-transparent`}
        >
          <ul className="flex flex-col lg:flex-row gap-6 lg:gap-10 text-Whites text-center lg:text-left p-5 lg:p-0">
            <li className="relative cursor-pointer font-semibold  after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full  after:h-[3px] after:bg-linac after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500">
              Acceuil
            </li>
            <li className="relative cursor-pointer font-semibold  after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full  after:h-[3px] after:bg-linac after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500">
              A Propos{" "}
            </li>
            <li className="relative cursor-pointer font-semibold  after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full  after:h-[3px] after:bg-linac after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500">
              Fonctionnalite
              {/* </li>
            <li className="relative cursor-pointer font-semibold  after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full  after:h-[3px] after:bg-linac after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500">
              Our Works
            </li>
            <li className="relative cursor-pointer font-semibold  after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full  after:h-[3px] after:bg-linac after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500">
              Pricing */}
            </li>
          </ul>
        </nav>

        {/* Boutons visibles en mode desktop */}
        <div className="hidden lg:flex gap-6 items-center">
          <button className="text-linac ">Se Connecter</button>
          <button
            className="bg-linac text-Whites px-4 py-2 rounded-lg"
            onClick={() => navigate("/signup")}
          >
            S'inscrire
          </button>
        </div>
      </div>
    </header>
  );
}
export default Header;
