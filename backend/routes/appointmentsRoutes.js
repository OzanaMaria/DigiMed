const express = require("express");
const router = express.Router();
const appointmentControllers = require("../controllers/appointmentControllers");

router
    .route("/")
    .get(appointmentControllers.getAllAppointments)
    .post(appointmentControllers.createNewAppointment);

router.route("/:email").get(appointmentControllers.getAppointmentByEmail);

module.exports = router;