const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Create a transporter object with your email service credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'digimed1999@gmail.com',
        pass: 'alabala2023'
    }
});

// Define the email sending route
router.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: 'digimed1999@gmail.com',
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Failed to send email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully.');
        }
    });
});

module.exports = router;