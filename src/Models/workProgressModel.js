const mongoose = require("mongoose");
const Booking = require("./bookingModel");

const workProgressSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  workStatus: {
    type: String,
    default: "In Progress",
  },
  startDate: Date,
  endDate: Date,
  createdDate: { type: Date, default: Date.now },
});

const WorkProgress = mongoose.model("WorkProgress", workProgressSchema);

module.exports = WorkProgress;
