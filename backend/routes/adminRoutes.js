const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/adminMiddleware");
const { createRoom } = require("../controllers/roomController");

// Only admins can add rooms
router.post("/add-room", isAdmin, createRoom);

module.exports = router;
