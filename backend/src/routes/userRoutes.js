const express = require("express");
const router = express.Router();
const { updateUser, deleteAccount } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");

// Config multer pour la photo
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.put(
  "/update",
  authMiddleware,
  upload.single("profilePicture"),
  updateUser
);

router.delete("/delete", authMiddleware, deleteAccount);

module.exports = router;
