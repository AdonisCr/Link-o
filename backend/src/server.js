require("dotenv").config(); // ✅ toujours en premier

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const urlRoutes = require("./routes/urlRoutes");
const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL, // ✅ dynamique
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tickets", ticketRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});