import { useState } from "react";
import { forgotPassword } from "../../api/auth";
import Modal from "../../Composants/Modal";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword(email);
      setModalMessage(res.data.message);
      setModalOpen(true);
    } catch (err) {
      setModalMessage("Erreur : " + err.response?.data?.message);
      setModalOpen(true);
    }
  };

  return (
    <div className="w-full flex-col min-h-screen justify-center gap-4 bg-gray-50 p-3 lg:p-6 flex items-center">
      <img
        src="/src/assets/images/logo.png"
        alt="Logo"
        className="w-28 lg:w-32 h-auto object-cover bg-Blacks"
      />

      <div className="p-6 border border-violet-300 rounded-lg max-w-md w-full">
        <h2 className="text-lg lg:text-xl font-semibold">
          Entrez votre email de récupération
        </h2>

        <form onSubmit={handleSubmit} className="w-full mt-4">
          <input
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <button className="bg-violet-600 text-white px-4 py-2 mt-4 rounded">
            Envoyer
          </button>
        </form>

        {/* Affichage du modal si besoin */}
        {modalOpen && (
          <Modal
            title="📧 E-mail envoyé"
            message={modalMessage}
            onClose={() => setModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
