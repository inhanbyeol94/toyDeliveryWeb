const express = require('express');
const router = express.Router();

const ReviewController = require('../controllers/reviews.controller');
const reviewController = new ReviewController();

const { allAuthMiddleware } = require('../middlewares/api.auth.middleware');
const { reviewValidation } = require('../middlewares/validations/reviews.validation');

router.get('/restaurant/:restaurant_id/review', reviewController.getReviewList);
router.get('/restaurant/:restaurant_id/review/:review_id', reviewController.getReview);
router.post('/restaurant/:restaurant_id/review/order/:order_id', reviewValidation, allAuthMiddleware, reviewController.createReview);
router.put('/restaurant/:restaurant_id/review/:review_id', reviewValidation, allAuthMiddleware, reviewController.updateReview);
router.delete('/restaurant/:restaurant_id/review/:review_id', allAuthMiddleware, reviewController.deleteReview);

module.exports = router;
