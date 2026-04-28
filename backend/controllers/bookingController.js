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

    // Optional User ID: If logged in, take the ID. If not, it stays undefined/null.
    const userId = req.user ? req.user._id : null;

    // ... (keep your existing date and overlapping validation)

    const booking = await Booking.create({
      user: userId, // Will be null for guests
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
      status: "confirmed",
    });

    await Room.findByIdAndUpdate(room, { isAvailable: false });

    res.status(201).json({ success: true, data: booking });
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
