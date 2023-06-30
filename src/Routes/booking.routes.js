const express = require("express");
const router = express.Router();
const bookingController = require('../Controllers/booking.controller')

router.post("/", bookingController.createBooking);
router.get("/status", bookingController.getBooking);
router.get("/all", bookingController.getAllBooking);


module.exports = router;