const Url = require("../models/Url");
const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");

exports.getUrlByUser = async (req, res) => {
  try {
    const urls = await Url.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });

    res.json({ urls });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    // Si une photo est uploadée
    if (req.file) {
      updates.profilePicture = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Erreur updateUser :", error);
    res.status(500).json({ message: "Erreur de mise à jour" });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "Compte supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};
