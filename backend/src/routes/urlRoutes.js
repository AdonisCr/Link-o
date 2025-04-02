const express = require("express");
const router = express.Router();
const {
  shortenUrl,
  shortUrl,
  getAllUrl,
  deleteUrl,
  getStats,
} = require("../controllers/urlController");
const { getUrlByUser } = require("../controllers/userController");

router.post("/shorten", shortenUrl);
router.get("/:shortUrl", shortUrl);
router.get("/", getAllUrl);
router.delete("/:id", deleteUrl);
router.get("/:shortUrl/stats", getStats);
router.get("/user/:userId", getUrlByUser);

module.exports = router;
