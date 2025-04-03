const Url = require("../models/Url");

exports.getUrlByUser = async (req, res) => {
  try {
    console.log("UserID reçu :", req.params.userId);

    const urls = await Url.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });

    res.json({ urls });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
