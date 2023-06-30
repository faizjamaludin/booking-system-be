const Booking = require('../Models/bookingModel')
const nodemailer = require('nodemailer');

// create transporter auth to send an email

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'faiz.jamaludin02@gmail.com',
        pass: process.env.GMAIL_PASS,
    },
});

const createBooking = (data, res) => {
    const booking = new Booking({
        name: data.name,
        email: data.email,
        phone: data.phone,
        bookingDate: data.booking,
        key: data.key
    });


    if (booking.save()) {
        const msg = 'your key is ' + data.key;


        const mailOptions = {
            from: 'faiz.jamaludin02@gmail.com',
            to: data.email,
            subject: 'Thank you for submitting',
            text: msg,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.sendStatus(500);
            } else {
                console.log('Email sent: ' + info.response);
                res.sendStatus(200);
            }
        });
    }

}

module.exports = {
    createBooking,
};
