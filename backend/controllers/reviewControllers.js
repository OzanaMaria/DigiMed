const Review = require('../models/Review');
const { use } = require('../routes/reviewRoutes');

exports.getAllReviews = async (req, res, next) => {
    try {
        const [reviews, _] = await Review.findAll();

        res.status(200).json({ reviews });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.createNewReview = async (req, res, next) => {
    try {
        console.log(req.body);
        let { pacientId,
            doctorId,
            number } = req.body;
        let review = new Review(pacientId,
            doctorId,
            number);
        console.log(review);
        review = await review.save();

        res.status(201).json({ message: "Review created" });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getReviewByEmail = async (req, res, next) => {
    try {
        let userEmail = req.params.email;
        let [review, _] = await Review.findByEmail(userEmail);

        res.status(200).json({ review: review });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getScoreByEmail = async (req, res, next) => {
    try {
        let userEmail = req.params.email;
        let [user, _] = await Review.findByEmail(userEmail);
        let score = 0;
        user.forEach(e => score += e.number);
        console.log(score);
        res.status(200).json({ score: score / user.length });
    } catch (error) {
        console.log(error);
        next(error);
    }
}