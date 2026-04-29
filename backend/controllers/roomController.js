const Room = require("../models/Room");

// Get all rooms for the frontend gallery
exports.getAllRooms = async (req, res) => {
  try {
    // Show everything except rooms currently being built/renovated
    const rooms = await Room.find({ status: { $ne: "Under Construction" } });
    res.status(200).json({ success: true, data: rooms });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin only: Add a new room
exports.createRoom = async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    res.status(201).json({ success: true, data: newRoom });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
