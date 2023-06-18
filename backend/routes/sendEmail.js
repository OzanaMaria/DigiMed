const express = require("express");
const router = express.Router();
const sendEmailControllers = require("../controllers/sendEmail.js");

router
    .route("/")
    .post(sendEmailControllers.createNewAppointments);

module.exports = router;
