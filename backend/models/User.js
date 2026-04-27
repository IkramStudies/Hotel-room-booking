const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
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
    avatar: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user", // You can manually change your email to 'admin' in MongoDB later
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
