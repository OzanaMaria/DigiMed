const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Create a transporter object with your email service credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Define the email sending route
exports.createNewAppointment = async (to, date) => {
    console.log(to);
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to,
        subject: "Thank you for your appointment at DigiMed!",
        text: "Your appointment has been set for " + date
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

