const WorkProgress = require("../Models/workProgressModel");
const Booking = require("../Models/bookingModel");
const nodemailer = require("nodemailer");

const getWork = async () => {
  const workArray = [];

  const workProgress = await WorkProgress.find()
    .populate("booking")
    .sort({ startDate: 1 });

  for (let x = 0; x < workProgress.length; x++) {
    workData = {
      name: workProgress[x].booking.name,
      email: workProgress[x].booking.email,
      phone: workProgress[x].booking.phone,
      productName: workProgress[x].booking.productName,
      workStatus: workProgress[x].workStatus,
      address: workProgress[x].booking.address,
      bookingKey: workProgress[x].booking.bookingKey,
      submitDate: workProgress[x].booking.date,
      bookingDate: workProgress[x].booking.bookingDate,
    };

    workArray.push(workData);
  }

  return workArray;
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

  const booking = await Booking.find({ email: userEmail, status: "Accept" });

  // set booking id for how many user booking
  for (let i = 0; i < booking.length; i++) {
    userBookingId.push(booking[i]._id);
  }

  // find and count workprogress in progress and done
  for (let x = 0; x < userBookingId.length; x++) {
    work = await WorkProgress.find({ booking: userBookingId[x] })
      .populate("booking")
      .sort({ startDate: 1 });

    workData = {
      name: work[x].booking.name,
      email: work[x].booking.email,
      phone: work[x].booking.phone,
      productName: work[x].booking.productName,
      workStatus: work[x].workStatus,
      address: work[x].booking.address,
      bookingKey: work[x].booking.bookingKey,
      submitDate: work[x].booking.date,
      bookingDate: work[x].booking.bookingDate,
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
