const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerStay: { type: Number, required: true },
    images: [String], // Array of URLs for the room gallery
    category: {
      type: String,
      enum: ["Deluxe", "Luxury", "Suite"],
      default: "Deluxe",
    },
    isAvailable: { type: Boolean, default: true },
    amenities: [String], // e.g., ["WiFi", "Pool", "Breakfast"]
  },
  { timestamps: true },
);

module.exports = mongoose.model("Room", roomSchema);
