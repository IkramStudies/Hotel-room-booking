const Booking = require("../models/Booking");
const Room = require("../models/Room"); // Added to update availability

// @desc    Create a new booking with expanded details and room status update
// @route   POST /api/bookings/create
// @desc    Create a new booking (Guest or User)
exports.createBooking = async (req, res) => {
  try {
    const {
      room,
      checkIn,
      checkOut,
      totalPrice,
      fullName,
      email,
      phone,
      address,
      nationality,
      emergencyContact,
      headOfFamily,
      noOfPax,
      roomType,
      planType,
      extraBed,
    } = req.body;

    const userId = req.user ? req.user._id : null;

    // 1. DYNAMIC AVAILABILITY CHECK
    // This ensures Room B is only "Unavailable" if the dates actually overlap
    const overlappingBooking = await Booking.findOne({
      room: room,
      status: "confirmed",
      $or: [
        {
          checkIn: { $lt: new Date(checkOut) },
          checkOut: { $gt: new Date(checkIn) },
        },
      ],
    });

    if (overlappingBooking) {
      return res.status(400).json({
        success: false,
        message: "This room is already reserved for the selected dates.",
      });
    }

    // 2. DISCOUNT LOGIC
    const today = new Date();
    const checkInDate = new Date(checkIn);

    // Calculate days in advance
    const diffTime = checkInDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Check total historical bookings for the "First Guest" rule
    const totalBookingsCount = await Booking.countDocuments({
      status: "confirmed",
    });

    let appliedDiscount = 0;
    let finalPrice = totalPrice;

    // Apply 30% if it's the first 2 bookings OR booked 30+ days in advance
    if (totalBookingsCount < 2 || diffDays >= 30) {
      appliedDiscount = 0.3;
      finalPrice = totalPrice * (1 - appliedDiscount);
    }

    // 3. CREATE THE BOOKING
    const booking = await Booking.create({
      user: userId,
      room,
      checkIn,
      checkOut,
      totalPrice: finalPrice, // Saved with the discount applied
      fullName,
      email,
      phone,
      address,
      nationality,
      emergencyContact,
      headOfFamily,
      noOfPax,
      roomType,
      planType,
      extraBed,
      status: "confirmed",
    });

    // NOTE: We no longer update Room.isAvailable to false here.
    // The availability is now handled by the 'overlappingBooking' check above.

    res.status(201).json({
      success: true,
      data: booking,
      message:
        appliedDiscount > 0
          ? "Booking confirmed with 30% discount!"
          : "Booking confirmed.",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// ... getMyBookings and cancelBooking stay the same
// getMyBookings and cancelBooking remain logically the same
// but will now return the full object including new fields.
exports.getMyBookings = async (req, res) => {
  try {
    const history = await Booking.find({ user: req.user._id })
      .populate("room")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.checkAvailability = async (req, res) => {
  try {
    // 1. Match the field name sent from the frontend
    const { roomId, checkIn, checkOut } = req.body;

    // 2. Query 'room' (not roomId) to match your Mongoose Schema
    const conflict = await Booking.findOne({
      room: roomId,
      // 3. Match the lowercase status from your Schema enum
      status: { $ne: "cancelled" },
      $or: [
        {
          checkIn: { $lt: new Date(checkOut) },
          checkOut: { $gt: new Date(checkIn) },
        },
      ],
    });

    if (conflict) {
      return res.status(200).json({ available: false });
    }

    res.status(200).json({ available: true });
  } catch (error) {
    console.error("Availability Check Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    booking.status = "cancelled";
    await booking.save();

    // RELEASE THE ROOM: Make it available again
    await Room.findByIdAndUpdate(booking.room, { isAvailable: true });

    res
      .status(200)
      .json({ success: true, message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// Example in roomController.js
exports.getAllRooms = async (req, res) => {
  try {
    // Only fetch rooms where isAvailable is true
    const rooms = await Room.find({ isAvailable: true });
    res.status(200).json({ success: true, data: rooms });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
