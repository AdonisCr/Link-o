const express = require("express");
const {
  verifyToken,
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const refreshToken = require("../middlewares/refreshTokenMiddleware");
const router = express.Router();

router.post("/refresh-token", refreshToken);
router.get("/verify-token", verifyToken);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);

router.get("/me", authMiddleware, getMe);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.put("/change-password", authMiddleware, changePassword);

module.exports = router;
