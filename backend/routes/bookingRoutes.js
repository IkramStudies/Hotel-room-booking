const express = require("express");
const router = express.Router();
const { getMyBookings } = require("../controllers/bookingController");
const { isAuthenticated } = require("../middleware/authMiddleware");

// Only logged-in users can hit this route
router.get("/my-history", isAuthenticated, getMyBookings);

module.exports = router;
