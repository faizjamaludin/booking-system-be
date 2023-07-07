const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  bookingDate: Date,
  address: String,
  key: String,
  status: {
    type: String,
    default: "Pending",
  },
  reason: {
    type: String,
    default: "",
  },
  date: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
