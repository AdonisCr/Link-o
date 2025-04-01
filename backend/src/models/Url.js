const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  lastAccessed: { type: Date, default: null },
  expiresAt: { type: Date, default: null },
});

module.exports = mongoose.model("Url", UrlSchema);
