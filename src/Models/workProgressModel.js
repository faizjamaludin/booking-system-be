const mongoose = require("mongoose");

const workProgressSchema = new mongoose.Schema({
  bookingId: String,
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
