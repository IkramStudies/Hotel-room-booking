const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    // --- Guest Identity Fields ---
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    nationality: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    headOfFamily: { type: String, required: true },

    // --- Stay Details ---
    noOfPax: { type: Number, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },

    roomType: {
      type: String,
      enum: ["Single", "Premium", "Suite"],
      required: true,
    },

    planType: {
      type: String,
      enum: ["EPAI", "CPAI", "MAPAI", "APAI"],
      required: true,
    },

    extraBed: {
      type: Boolean,
      default: false,
    },

    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
