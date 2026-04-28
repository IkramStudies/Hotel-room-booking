const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pricePerStay: {
      type: Number,
      required: true,
    },
    images: [String], // Array of URLs for the room gallery
    category: {
      type: String,
      // Updated to match your booking form options for consistency
      enum: ["Single", "Premium", "Suite"],
      default: "Premium",
    },
    // This is the key field the booking controller now toggles
    isAvailable: {
      type: Boolean,
      default: true,
    },
    amenities: [String], // e.g., ["WiFi", "Pool", "Breakfast"]
  },
  { timestamps: true },
);

module.exports = mongoose.model("Room", roomSchema);
