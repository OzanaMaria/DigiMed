const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/miscellaneousControllers");

router
    .route("/hospitals")
    .get(userControllers.getAllHospitals);

router
    .route("/specialities")
    .get(userControllers.getAllSpecialities);

module.exports = router;