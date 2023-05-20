const express = require("express");
const router = express.Router();
const reviewControllers = require("../controllers/reviewControllers");

router
    .route("/")
    .get(reviewControllers.getAllReviews)
    .post(reviewControllers.createNewReview);

router.route("/:email").get(reviewControllers.getReviewByEmail);

router.route("/score/:email").get(reviewControllers.getScoreByEmail);
module.exports = router;