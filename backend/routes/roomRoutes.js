const express = require("express");
const router = express.Router();
const { getAllRooms } = require("../controllers/roomController");

router.get("/all", getAllRooms);

module.exports = router;
