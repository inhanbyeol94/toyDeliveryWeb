const express = require('express');
const router = express.Router();

const ReviewController = require('../controllers/restaurants.controller');
const reviewController = new ReviewController();

// router.get('/restaurant/:restaurant_id/review', reviewController.getReview);
// router.post('/restaurant/:restaurant_id/review', reviewController.createReview);
// router.put('/restaurant/:restaurant_id/review/review_id', reviewController.updateReview);
// router.delete('/restaurant/:restaurant_id/review/review_id', reviewController.deleteReview);

module.exports = router;
