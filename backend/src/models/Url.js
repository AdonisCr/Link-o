const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  lastAccessed: { type: Date, default: null },
  expiresAt: { type: Date, default: null },

  // Ajout des métadonnées de la page
  title: { type: String, default: "Titre non disponible" },
  description: { type: String, default: "Aucune description" },
  image: { type: String, default: "" },

  // QR Code en base64
  qrCode: { type: String, default: "" },
});

module.exports = mongoose.model("Url", UrlSchema);
