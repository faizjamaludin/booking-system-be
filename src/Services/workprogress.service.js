const WorkProgress = require("../Models/workProgressModel");
const Booking = require("../Models/bookingModel");
const nodemailer = require("nodemailer");

const getWork = async () => {
  const workProgress = await WorkProgress.find()
    .populate("booking")
    .sort({ startDate: 1 });

  return workProgress;
};

const doneWork = async (data) => {
  const id = data.params.id;
  // const reason = data.body.reason;
  const newData = data.body;

  if (newData) {
    const workProgress = await WorkProgress.findByIdAndUpdate(id, {
      workStatus: newData.workStatus,
    });

    workProgress.save();
    return workProgress;
  }
};

const getUserWorkProgress = async (data) => {
  const userEmail = data.params.email;
  const workArray = [];
  const userBookingId = [];
  var work;

  const booking = await Booking.find({ email: userEmail, status: "Accept" });

  // set booking id for how many user booking
  for (let i = 0; i < booking.length; i++) {
    userBookingId.push(booking[i]._id);
  }

  // find and count workprogress in progress and done
  for (let j = 0; j < userBookingId.length; j++) {
    work = await WorkProgress.find({ booking: userBookingId[j] });

    workData = {
      name: booking[i].name,
      phone: booking[i].phone,
      bookingDate: booking[i].bookingDate,
      status: booking[i].status,
      reason: booking[i].reason,
    };

    workArray.push(workData);
  }

  return workArray;
};

module.exports = {
  getWork,
  doneWork,
  getUserWorkProgress,
};
