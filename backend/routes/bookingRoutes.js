const express = require("express");
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  cancelBooking,
} = require("../controllers/bookingController");
const { isAuthenticated } = require("../middleware/authMiddleware");

// All booking routes require the user to be logged in
router.post("/create", createBooking);
router.get("/my-bookings", isAuthenticated, getMyBookings);
router.patch("/:id/cancel", isAuthenticated, cancelBooking);

module.exports = router;
