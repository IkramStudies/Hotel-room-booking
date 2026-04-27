const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  register,
  verifyOtp,
  login,
  googleAuthSuccess,
  logout,
} = require("../controllers/authController");

// --- MANUAL AUTH ROUTES ---

// Registration (Triggers OTP)
router.post("/register", register);

// OTP Verification
router.post("/verify-otp", verifyOtp);

// Manual Login
router.post("/login", login);

// --- GOOGLE AUTH ROUTES ---

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
    // Redirects to your React frontend home page
    res.redirect("http://localhost:5173/");
  },
);

// Check Session Status (Used by React to see if user is logged in)
router.get("/login/success", googleAuthSuccess);

// Logout
router.get("/logout", logout);

module.exports = router;
