const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const dotenv = require('dotenv');


dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET; // Secret Key from .env
router.post("/validate-token", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ valid: false, message: "No token provided." });
  }

  // Token extract karo (Bearer hatane ke liye check)
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.status(200).json({ valid: true, message: "Token is valid.", user: decoded });
  } catch (error) {
    res.status(401).json({ valid: false, message: "Invalid or expired token." });
  }
});

module.exports = router;
