import React, { useState } from "react";

const faqData = [
  {
    question: "Combien de temps faut-il pour raccourcir un lien ?",
    answer:
      "Le raccourcissement de lien est instantané. Il vous suffit de coller votre URL, et vous obtenez immédiatement un lien court prêt à être utilisé.",
  },
  {
    question: "Puis-je suivre les clics sur mes liens ?",
    answer:
      "Oui, notre tableau de bord vous permet de voir le nombre de clics, la localisation des utilisateurs et d'autres statistiques en temps réel.",
  },
  {
    question: "Les liens courts expirent-ils avec le temps ?",
    answer:
      "Par défaut, les liens restent actifs indéfiniment. Toutefois, vous pouvez définir une date d’expiration si vous le souhaitez.",
  },
  {
    question: "Est-ce que je peux personnaliser mes liens courts ?",
    answer:
      "Absolument ! Vous pouvez choisir une extension personnalisée pour vos liens afin de les rendre plus reconnaissables.",
  },
  {
    question: "Votre service est-il gratuit ?",
    answer:
      "Oui, la majorité de nos fonctionnalités sont disponibles gratuitement. Des options premium sont également disponibles pour les utilisateurs avancés.",
  },
  {
    question: "Puis-je supprimer un lien raccourci ?",
    answer:
      "Oui, vous pouvez à tout moment supprimer un lien depuis votre interface d’administration si vous êtes connecté.",
  },
];

const FAQCard = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-white shadow-md rounded-md p-6 transition-all duration-300 border border-gray-200"
      style={{ minHeight: "100px" }}
    >
      <div
        className="flex justify-between items-start cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h3 className="font-semibold text-gray-800">{question}</h3>
        <span className="text-xl font-bold text-gray-500">
          {open ? "−" : "+"}
        </span>
      </div>
      {open && <p className="mt-4 text-gray-600 text-sm">{answer}</p>}
    </div>
  );
};

const FAQSection = () => {
  return (
    <section
      id="FAQ"
      className="bg-purple-50 py-16 px-4 md:px-20 "
      style={{ fontFamily: "Winky Sans, sans-serif" }}
    >
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
        Questions Fréquentes
      </h2>
      <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
        Voici les réponses aux questions les plus courantes concernant notre
        service de raccourcisseur de lien.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {faqData.map((item, index) => (
          <div key={index} className="self-start">
            <FAQCard {...item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
