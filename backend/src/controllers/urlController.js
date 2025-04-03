const express = require("express");
const qrcode = require("qrcode");
const validUrl = require("valid-url");
const shortid = require("shortid");
const Url = require("../models/Url");
const { getMetaData } = require("../utils/scraper");

// Raccourcir une URL
exports.shortenUrl = async (req, res) => {
  const { originalUrl, userId, expiresInDays, generateQrCode } = req.body;

  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ message: "URL invalide" });
  }

  try {
    let url = await Url.findOne({ originalUrl, userId });

    if (url) {
      return res.json(url);
    }

    const shortCode = shortid.generate();
    const fullShortUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/url/${shortCode}`;

    // 🔥 Récupération des métadonnées du lien
    const { title, description, image } = await getMetaData(originalUrl);

    // Générer le QR code uniquement si `generateQrCode` est activé
    let qrCodeDataUrl = null;

    if (generateQrCode) {
      qrCodeDataUrl = await qrcode.toDataURL(fullShortUrl);
    }

    // Définir la date d'expiration si nécessaire
    const expiresAt = expiresInDays
      ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)
      : null;

    url = new Url({
      originalUrl,
      shortUrl: fullShortUrl,
      userId: userId || null,
      expiresAt,
      title,
      description,
      image,
      qrCode: qrCodeDataUrl,
    });

    await url.save();

    res.json({
      _id: url._id,
      originalUrl: url.originalUrl,
      shortUrl: fullShortUrl,
      clicks: url.clicks,
      userId: url.userId,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt,
      title,
      description,
      image,
      qrCode: qrCodeDataUrl,
    });
  } catch (err) {
    console.error("Erreur serveur :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Rediriger vers l'URL d'origine et incrémenter le nombre de clics
exports.shortUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;

    // Trouver l'URL dans la base de données avec seulement le code court
    const url = await Url.findOne({
      shortUrl: `${req.protocol}://${req.get("host")}/api/url/${shortUrl}`,
    });

    if (!url) {
      return res.status(404).json({ message: "URL non trouvée" });
    }

    // Vérifier si l'URL a expiré
    if (url.expiresAt && new Date() > url.expiresAt) {
      return res.status(410).json({ message: "URL expirée" });
    }

    // Incrémenter les clics et mettre à jour la date du dernier accès

    url.clicks += 1;

    url.lastAccessed = new Date();
    await url.save();

    res.redirect(url.originalUrl);
  } catch (err) {
    console.error("Erreur serveur :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Obtenir toutes les URLs générées
exports.getAllUrl = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Supprimer une URL
exports.deleteUrl = async (req, res) => {
  try {
    await Url.findByIdAndDelete(req.params.id);

    res.json({ message: "URL supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer les stats d’un lien
exports.getStats = async (req, res) => {
  try {
    const fullShortUrl = `${req.protocol}://${req.get("host")}/api/url/${
      req.params.shortUrl
    }`;

    const url = await Url.findOne({ shortUrl: fullShortUrl });

    if (!url) {
      return res.status(404).json({ message: "URL non trouvée" });
    }

    res.json({
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
      lastAccessed: url.lastAccessed,
      expiresAt: url.expiresAt,
      title: url.title,
      description: url.description,
      image: url.image,
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer le QR code
exports.getQrCode = async (req, res) => {
  try {
    const url = await Url.findById(req.params.id);

    if (!url) {
      return res.status(404).json({ message: "URL non trouvée" });
    }

    res.json({ qrCode: url.qrCode });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Supprimer le QR code
exports.deleteQrCode = async (req, res) => {
  try {
    const url = await Url.findById(req.params.id);

    if (!url) {
      return res.status(404).json({ message: "URL non trouvée" });
    }

    url.qrCode = "";
    await url.save();

    res.json({ message: "QR Code supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
