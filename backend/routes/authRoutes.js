const express = require("express");
const router = express.Router();
const passport = require("passport");
const { googleAuthSuccess, logout } = require("../controllers/authController");

// Start Google Auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard");
  },
);

// Check if user is logged in (used by React frontend)
router.get("/login/success", googleAuthSuccess);

// Logout
router.get("/logout", logout);

module.exports = router;
