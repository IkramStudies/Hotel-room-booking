const Booking = require("../models/Booking");

// @desc    Create a new booking with availability check
// @route   POST /api/bookings/create
exports.createBooking = async (req, res) => {
  try {
    const { room, checkIn, checkOut, totalPrice } = req.body;
    const userId = req.user._id;

    // 1. Basic Date Validation
    if (new Date(checkIn) >= new Date(checkOut)) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date.",
      });
    }

    // 2. Prevent Double Booking
    // Find any confirmed booking for the same room that overlaps with these dates
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

    // 3. Save Booking
    const booking = await Booking.create({
      user: userId,
      room,
      checkIn,
      checkOut,
      totalPrice,
      status: "confirmed", // Defaulting to confirmed until payment is linked
    });

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get booking history for the logged-in user
// @route   GET /api/bookings/my-bookings
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

// @desc    Cancel a booking
// @route   PATCH /api/bookings/:id/cancel
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    // Check if the booking belongs to the user
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    booking.status = "cancelled";
    await booking.save();

    res
      .status(200)
      .json({ success: true, message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
