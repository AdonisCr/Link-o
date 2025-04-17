const express = require("express");
const router = express.Router();
const {
  createTicket,
  getUserTickets,
} = require("../controllers/ticketController");
const protect = require("../middlewares/authMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create-ticket", authMiddleware, createTicket);
router.get("/", authMiddleware, getUserTickets);

module.exports = router;
