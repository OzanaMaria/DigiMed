const express = require("express");
const router = express.Router();
const appointmentControllers = require("../controllers/appointmentControllers");

router
    .route("/")
    .get(appointmentControllers.getAllAppointments)
    .post(appointmentControllers.createNewAppointments);

router.route("/:email").get(appointmentControllers.getAppointmentByEmail);
router.route("/:date/:email").get(appointmentControllers.getAppointmentByEmailAndDate);

module.exports = router;
