const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

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
