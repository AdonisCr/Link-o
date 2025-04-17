const Url = require("../models/Url");
const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");

exports.getUrlByUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const urls = await Url.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });

    res.json({ urls });
  } catch (err) {
    console.error("Erreur lors de la récupération des URLs :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    if (req.file) {
      updates.profilePicture = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");

    console.log(updatedUser);

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
