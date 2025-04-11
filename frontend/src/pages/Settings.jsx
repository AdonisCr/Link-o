import { useEffect, useState } from "react";
import { deleteUser, getUser, logout } from "../api/user";
import { updateUser } from "../api/user";
import { changePassword } from "../api/auth";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState([]);
  const [user, setUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordErrors, setPasswordErrors] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        setUsername(userData.username);
        setEmail(userData.email);
      } catch (error) {
        console.error("Erreur utilisateur :", error);
      }
    };

    fetchUser();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      const updated = await updateUser(formData);
      setUser(updated);
      setPreviewImage(null);
      alert("Profil mis à jour !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour.");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordErrors((prev) => ({
        ...prev,
        confirm: "Les mots de passe ne correspondent pas.",
      }));
      return;
    }

    try {
      await changePassword({
        currentPassword,
        newPassword,
      });

      alert("Mot de passe changé avec succès !");

      setCurrentPassword("");

      setNewPassword("");

      setConfirmPassword("");

      setPasswordErrors({ current: "", new: "", confirm: "" });
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "Erreur lors du changement de mot de passe.";

      // Vérifie si l'erreur concerne un mot de passe incorrect
      if (
        error.response?.data?.message?.toLowerCase().includes("mot de passe") ||
        error.response?.data?.message?.toLowerCase().includes("incorrect")
      ) {
        setPasswordErrors((prev) => ({
          ...prev,
          current: errorMsg,
        }));
      } else {
        alert(errorMsg);
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser();
      logout(); // supprime le token et redirige
    } catch (err) {
      console.error(err);
      alert("Échec de la suppression");
    }
  };

  const UserProfile = ({ user }) => {
    const profilePictureData = user?.profilePicture?.data;
    const contentType = user?.profilePicture?.contentType || "image/png";

    const imageSrc = profilePictureData
      ? `data:${contentType};base64,${profilePictureData}`
      : "/default-avatar.png"; // image par défaut si pas de photo

    return (
      <img
        src={imageSrc}
        alt="Photo de profil"
        className="w-20 h-20 rounded-full object-cover"
      />
    );
  };

  return (
    <div className="w-full max-w-3xl px-4 py-6 flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-black">Paramètres du compte</h2>

      {/* Modifier les infos */}
      <div className="p-5 border rounded-md shadow-sm bg-white">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Infos personnelles
        </h3>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom complet"
            className="w-full border px-3 py-2 rounded-md"
          />

          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Adresse email"
            className="w-full border px-3 py-2 rounded-md"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setProfilePicture(file);
              setPreviewImage(URL.createObjectURL(file));
            }}
            className="w-full"
          />

          {previewImage && (
            <img
              src={previewImage}
              alt="Aperçu"
              className="w-20 h-20 object-cover rounded-full mt-2"
            />
          )}

          <button
            onClick={handleUpdateProfile}
            className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-md w-fit"
          >
            Mettre à jour
          </button>
        </div>
      </div>

      {/* Mot de passe */}
      <div className="p-5 border rounded-md shadow-sm bg-white">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Changer le mot de passe
        </h3>

        <div className="flex flex-col gap-4">
          {/* Mot de passe actuel */}
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                setPasswordErrors((prev) => ({ ...prev, current: "" }));
              }}
              placeholder="Mot de passe actuel"
              className="w-full border px-3 py-2 rounded-md pr-10"
            />

            <button
              type="button"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-600"
            >
              {showCurrentPassword ? "Masquer" : "Afficher"}
            </button>

            {passwordErrors.current && (
              <p className="text-sm text-red-500 mt-1">
                {passwordErrors.current}
              </p>
            )}
          </div>

          {/* Nouveau mot de passe */}
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setPasswordErrors((prev) => ({ ...prev, new: "" }));
              }}
              placeholder="Nouveau mot de passe"
              className="w-full border px-3 py-2 rounded-md pr-10"
            />

            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-600"
            >
              {showNewPassword ? "Masquer" : "Afficher"}
            </button>

            {passwordErrors.new && (
              <p className="text-sm text-red-500 mt-1">{passwordErrors.new}</p>
            )}
          </div>

          {/* Confirmation */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordErrors((prev) => ({ ...prev, confirm: "" }));
              }}
              placeholder="Confirmer le nouveau mot de passe"
              className="w-full border px-3 py-2 rounded-md pr-10"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-600"
            >
              {showConfirmPassword ? "Masquer" : "Afficher"}
            </button>

            {passwordErrors.confirm && (
              <p className="text-sm text-red-500 mt-1">
                {passwordErrors.confirm}
              </p>
            )}
          </div>

          <button
            onClick={() => {
              const errors = {
                current: currentPassword
                  ? ""
                  : "Veuillez entrer le mot de passe actuel.",
                new:
                  newPassword.length >= 6
                    ? ""
                    : "Le mot de passe doit contenir au moins 6 caractères.",
                confirm:
                  confirmPassword === newPassword
                    ? ""
                    : "Les mots de passe ne correspondent pas.",
              };

              setPasswordErrors(errors);

              const hasErrors = Object.values(errors).some((e) => e);
              if (!hasErrors) {
                handleChangePassword();
              }
            }}
            className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-md w-fit"
          >
            Enregistrer le mot de passe
          </button>
        </div>
      </div>

      {/* Supprimer compte */}
      <div className="p-5 border rounded-md shadow-sm bg-white">
        <h3 className="text-lg font-semibold text-red-600 mb-4">
          Supprimer le compte
        </h3>

        <p className="text-sm text-gray-700 mb-4">
          Attention : cette action est irréversible. Votre compte et toutes vos
          données seront supprimés.
        </p>

        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md w-fit"
          >
            Supprimer mon compte
          </button>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-red-500 font-semibold">
              Êtes-vous sûr ? Cliquez à nouveau pour confirmer.
            </p>

            <button
              onClick={handleDeleteAccount}
              className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-md w-fit"
            >
              Oui, je confirme la suppression
            </button>

            <button
              onClick={() => setConfirmDelete(false)}
              className="text-sm text-gray-600 underline w-fit"
            >
              Annuler
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
