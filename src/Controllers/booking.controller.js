const bookingService = require('../Services/booking.service');
const nodemailer = require('nodemailer');

const createBooking = async (req, res, next) => {
    try {
        const booking = await bookingService.createBooking(req.body, res);
        res.status(200).json(booking);


    } catch (error) {
        next(error)
    }
}

module.exports = {
    createBooking
};