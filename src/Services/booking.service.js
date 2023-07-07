const Booking = require("../Models/bookingModel");
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
    key: data.key,
  });

  if (booking.save()) {
    const msg = "your key is " + data.key;

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
        console.log("Email sent: " + info.response);
        res.sendStatus(200);
      }
    });
  }
};

const getBooking = async (data) => {
  const booking = await Booking.findOne({ key: data });

  bookingData = {
    name: booking.name,
    phone: booking.phone,
    bookingDate: booking.bookingDate,
    status: booking.status,
  };

  // console.log(bookingData)

  return bookingData;
};

const getAllBooking = async () => {
  const booking = await Booking.find();

  // console.log(booking);
  return booking;
};

module.exports = {
  createBooking,
  getBooking,
  getAllBooking,
};
