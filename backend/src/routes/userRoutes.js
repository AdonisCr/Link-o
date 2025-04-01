const express = require("express");
const router = express.Router();
const { getUrlByUser } = require("../controllers/userController");

router.get("/:userId", getUrlByUser);

module.exports = router;
