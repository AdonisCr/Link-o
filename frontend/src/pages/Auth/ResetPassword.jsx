import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/auth";
import Modal from "../../Composants/Modal";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("❌ Les mots de passe ne correspondent pas.");
      setModalMessage(
        "Assurez-vous que les deux mots de passe sont identiques."
      );
      setModalOpen(true);
      return;
    }

    try {
      const res = await resetPassword(token, newPassword);
      setMessage(res.data.message);
      setModalMessage("Votre mot de passe a été réinitialisé avec succès !");
      setModalOpen(true);
      setTimeout(() => navigate("/Connexion"), 3000);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Une erreur est survenue.";
      setMessage("Erreur : " + errorMsg);
      setModalMessage("Échec de la réinitialisation : " + errorMsg);
      setModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 bg-gray-50">
      {/* Logo */}
      <img
        src="/src/assets/images/logo.png"
        alt="Logo"
        className="w-28 lg:w-32 h-auto object-cover bg-Blacks"
      />

      {/* Form container */}
      <div className="w-full max-w-md bg-white border border-violet-200 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Réinitialisation du mot de passe
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nouveau mot de passe */}
          <div className="flex flex-col gap-1 relative">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-gray-700"
            >
              Nouveau mot de passe
            </label>

            <input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 pr-10"
              required
            />

            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>

          {/* Confirmation mot de passe */}
          <div className="flex flex-col gap-1 relative">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirmer le mot de passe
            </label>

            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 pr-10"
              required
            />

            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 transition-colors text-white font-semibold py-2 rounded-lg"
          >
            Réinitialiser le mot de passe
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-green-600 font-medium">
            {message}
          </p>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <Modal
          title="🔐 Réinitialisation"
          message={modalMessage}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ResetPassword;
