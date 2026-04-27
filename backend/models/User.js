const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true, // sparse allows multiple nulls for users who don't use Google
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // Not required because Google users won't have a password
    },
    avatar: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // --- New Fields for OTP Verification ---
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
