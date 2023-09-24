const express = require("express");
const router = express.Router();
const bookingController = require("../Controllers/booking.controller");

router.post("/", bookingController.createBooking); // create new booking in product details
router.put("/:id", bookingController.acceptBooking); // accept booking in booking details
router.get("/status", bookingController.getBooking); //user can check booking status
router.get("/all", bookingController.getAllBooking);
router.get("/user/:email", bookingController.getUserBooking);

module.exports = router;
