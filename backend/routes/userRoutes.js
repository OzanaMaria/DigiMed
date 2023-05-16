const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

router
    .route("/")
    .get(userControllers.getAllUsers)
    .post(userControllers.createNewUser);

router.route("/:email").get(userControllers.getUserByEmail);

module.exports = router;