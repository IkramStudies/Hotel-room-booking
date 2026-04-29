const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    pricePerStay: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      enum: ["Single", "Premium", "Suite"],
      default: "Premium",
    },
    /**
     * Physical Status of the Room:
     * - Available: Ready for guests.
     * - Unavailable: Manually taken off the market.
     * - Under Construction: Long-term renovation/building.
     * - Maintenance: Short-term cleaning or repairs.
     */
    status: {
      type: String,
      enum: ["Available", "Unavailable", "Under Construction", "Maintenance"],
      default: "Available",
    },
    amenities: {
      type: [String],
      default: [], // e.g., ["WiFi", "AC", "Kitchen"]
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Room", roomSchema);
