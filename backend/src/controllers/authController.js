const crypto = require("crypto");
const { Resend } = require("resend");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const transporter = require("../utils/mailer");

require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

const generateToken = (userId) => {
  try {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  } catch (error) {
    console.error("Erreur lors de la génération du token :", error.message);
    throw new Error("Problème de génération de token");
  }
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Un utilisateur avec cet email existe déjà" });
    }

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Créer l'utilisateur
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Générer le token
    const token = generateToken(user._id);

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({
      message: error.message || "Une erreur est survenue lors de l'inscription",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.warn("Utilisateur non trouvé :", email);
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.warn("Mot de passe incorrect pour :", email);
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      token,
      message: "Utilisateur connecté avec succès!",
    });
  } catch (error) {
    console.error("Erreur de connexion :", error.message || error);

    // Renvoyer une erreur détaillée en développement
    res.status(500).json({
      message: "Erreur serveur. Réessayez plus tard.",
      error: error.message || "Erreur inconnue",
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Aucun utilisateur trouvé." });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1h

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    const resetLink = `${process.env.BASE_FRONTEND_URL}/reset-password/${resetToken}`;

    // Envoi du mail via nodemailer
    await transporter.sendMail({
      from: "noreply@geryguedegbe.com",
      to: email,
      subject: "🔒 Réinitialisation de votre mot de passe",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #6c63ff;">Réinitialisation de votre mot de passe</h2>
          <p>Bonjour <strong>${user.username}</strong>,</p>
          <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous :</p>
    
          <a href="${resetLink}" target="_blank" 
             style="display: inline-block; padding: 12px 20px; margin: 20px 0; background-color: #6c63ff; color: white; text-decoration: none; border-radius: 5px;">
            Réinitialiser mon mot de passe
          </a>
    
          <p>Ou copiez/collez ce lien dans votre navigateur :</p>
          <p style="word-break: break-all;">${resetLink}</p>
    
          <p style="color: #999;">Ce lien est valable pendant 1 heure.</p>
    
          <hr style="margin: 30px 0;" />
          <p style="font-size: 12px; color: #aaa;">
            Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.
          </p>
        </div>
      `,
    });

    res
      .status(200)
      .json({ message: "Lien de réinitialisation envoyé par email." });
  } catch (err) {
    console.error("Erreur reset email :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Lien invalide ou expiré." });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la mise à jour." });
  }
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Mot de passe actuel incorrect." });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
