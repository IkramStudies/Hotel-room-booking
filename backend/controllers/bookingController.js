const Booking = require("../models/Booking");

// Get booking history for the logged-in user
exports.getMyBookings = async (req, res) => {
  try {
    // req.user.id comes from the Passport session we set up earlier
    const history = await Booking.find({ user: req.user.id })
      .populate("room") // This pulls in room details (name, price, image)
      .sort({ createdAt: -1 }); // Show newest bookings first

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
