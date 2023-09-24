const bookingService = require("../Services/booking.service");
const nodemailer = require("nodemailer");

const createBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

const getBooking = async (req, res, next) => {
  try {
    const query = await bookingService.getBooking(req.query.q);
    res.status(200).json(query);
  } catch (error) {
    console.log(error);
  }
};

const getAllBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.getAllBooking();
    res.status(201).json(booking);
  } catch (error) {}
};

const acceptBooking = async (req, res) => {
  try {
    const booking = await bookingService.acceptBooking(req);
    res.status(201).json(booking);
  } catch (error) {
    console.log(error);
  }
};

const getUserBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.getUserBooking(req);
    res.status(200).json(booking);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createBooking,
  getBooking,
  getAllBooking,
  acceptBooking,
  getUserBooking,
};
