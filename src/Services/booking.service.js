const Booking = require("../Models/bookingModel");
const WorkProgress = require("../Models/workProgressModel");
const nodemailer = require("nodemailer");

// create transporter auth to send an email

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "faiz.jamaludin02@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
});

const createBooking = (data, res) => {
  const booking = new Booking({
    name: data.name,
    email: data.email,
    phone: data.phone,
    bookingDate: data.booking,
    address: data.address,
    bookingKey: data.bookingKey,
    productName: data.productName,
  });

  if (booking.save()) {
    const msg = "your key is " + data.bookingKey;

    const mailOptions = {
      from: "faiz.jamaludin02@gmail.com",
      to: data.email,
      subject: "Thank you for submitting",
      text: msg,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  }
};

const getBooking = async (data) => {
  const booking = await Booking.findOne({ bookingKey: data });

  bookingData = {
    name: booking.name,
    phone: booking.phone,
    bookingDate: booking.bookingDate,
    status: booking.status,
    reason: booking.reason,
  };

  return bookingData;
};

const getAllBooking = async () => {
  const booking = await Booking.find().sort({ bookingDate: 1 });

  return booking;
};

const acceptBooking = async (data) => {
  const id = data.params.id;
  const newData = data.body;
  const bookingDate = data.body.bookingDate;

  if (newData.reason) {
    const booking = await Booking.findByIdAndUpdate(id, {
      status: "Reject",
      reason: data.body.reason,
    });
    return booking;
  }

  if (newData.status === "Accept") {
    const booking = await Booking.findByIdAndUpdate(id, {
      bookingDate: newData.bookingDate,
      status: newData.status,
    });

    const workProgress = new WorkProgress({
      booking: id,
      startDate: bookingDate,
    });

    workProgress.save();

    return booking;
  }

  const booking = await Booking.findByIdAndUpdate(id, {
    status: "Accept",
  });

  const workProgress = new WorkProgress({
    booking: id,
    startDate: bookingDate,
  });

  workProgress.save();

  return booking;
};

const getUserBooking = async (data) => {
  const userEmail = data.params.email;
  const bookingArray = [];

  const booking = await Booking.find({ email: userEmail });

  // set booking id for how many user booking
  for (let i = 0; i < booking.length; i++) {
    bookingData = {
      name: booking[i].name,
      phone: booking[i].phone,
      bookingDate: booking[i].bookingDate,
      status: booking[i].status,
      reason: booking[i].reason,
    };

    bookingArray.push(bookingData);
  }

  return bookingArray;
};

module.exports = {
  createBooking,
  getBooking,
  getAllBooking,
  acceptBooking,
  getUserBooking,
};
