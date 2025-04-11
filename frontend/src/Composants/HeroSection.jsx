import React from "react";
import Short from "./Short";

function HeroSection() {
  return (
    <section id="acceuil" className="w-full bg-Indigolight  relative mt-16 md:mt-[70px] lg:mt-20  py-10 flex flex-col gap-10 "
      style={{ fontFamily: "Winky Sans, sans-serif" }}
    >
      <div  className="w-full max-w-[90%] md:max-w-[80%] mx-auto text-center gap-4 md:gap-6 flex flex-col px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-Whites leading-tight">
          La Solution Pour Vos Liens <br />
          <span className="text-DarkLilac text-3xl md:text-5xl lg:text-6xl">
            Raccourcissez<span className="text-Whites">,</span> Partagez
            <span className="text-Whites">,</span> Analysez
          </span>
        </h1>

        <h3 className="text-Whites text-lg md:text-xl lg:text-2xl font-medium">
          Réduisez vos liens en un clic, personnalisez-les et suivez leurs
          performances en temps réel. Simplifiez le partage et optimisez votre
          impact en ligne.
        </h3>
      </div>

      <Short />

      {/* <div className="w-[80%] md:w-[60%] mx-auto flex flex-col  gap-5  item-center text-center ">
        <p className="text-Whites font-medium ">
          Le raccourcisseur d'URL le plus simple que vous attendiez
        </p>
        <div className="w-full justify-between flex bg-Whites rounded-lg ">
          <input
            type="text"
            className="w-3/4 py-3 px-2 rounded-lg outline-none"
            placeholder="Coller votre lien ici ........"
          />
          <button className="bg-linac text-Whites  font-medium px-2 md:px-6   py-1 md:py-2 rounded-lg lg:text-lg md:text-xs text-[8px] ">
            {" "}
            Reduire URL
          </button>
        </div>
        <div className="w-full justify-between flex gap-5">
          <input
            type="text"
            className="w-1/2 py-2 px-2 rounded-lg outline-none"
            value=""
            readOnly
          />
          <button className="w-1/2  px-2 md:px-6 text-Whites py-1 md:py-2 border-4 border-linac rounded-lg text-[8px] md:text-xs lg:text-lg">
            {" "}
            Copier URL{" "}
          </button>
        </div>
      </div> */}
    </section>
  );
}
export default HeroSection;
