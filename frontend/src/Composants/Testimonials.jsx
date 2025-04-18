import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Jean Dupont",
    handle: "@jeandupont",
    image: "/images/testi1.jpg",
    feedback:
      "Grâce à ce raccourcisseur, j’ai pu suivre les clics en temps réel et obtenir des statistiques précises. Super simple à utiliser !",
  },
  {
    name: "Sophie Martin",
    handle: "@sophiemartin",
    image: "/images/testi2.jpg",
    feedback:
      "Enfin un outil qui me permet de raccourcir mes liens efficacement tout en gardant un œil sur la performance.",
  },
  {
    name: "Ali Ben",
    handle: "@aliben",
    image: "/images/testi3.jpg",
    feedback:
      "Interface propre, résultats rapides. J’ai optimisé mes campagnes avec des liens courts et trackés !",
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 7000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section
      className="bg-Blacks text-white py-16 px-4"
      style={{ fontFamily: "Winky Sans, sans-serif" }}
    >
      <div className="text-center mb-12">
        <p className="text-linac font-medium">Temoignage</p>
        <h2 className="text-4xl font-bold mt-2">
          Retour d’expérience utilisateurs
        </h2>
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
          Grâce à notre solution de raccourcissement d’URL, nos utilisateurs
          partagent leur satisfaction.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index} className="p-4">
              <div className="flex flex-col md:flex-row bg-Blacks rounded-2xl border border-gray-400 p-6 gap-6 h-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full md:w-48 h-48 object-cover rounded-xl"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      You have right place
                    </h3>
                    <p className="text-gray-300 mb-4">{item.feedback}</p>
                    <div className="flex text-linac mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-gray-400 text-sm">{item.handle}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
