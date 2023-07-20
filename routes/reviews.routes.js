const express = require('express');
const router = express.Router();

const ReviewController = require('../controllers/reviews.controller');
const reviewController = new ReviewController();

const { adminAuthMiddleware } = require('../middlewares/api.auth.middleware');
const { reviewValidation } = require('../middlewares/validations/reviews.validation');

router.get('/restaurant/:restaurant_id/review', reviewController.getReviewList);
router.get('/restaurant/:restaurant_id/review/:review_id', reviewController.getReview);
router.post('/restaurant/:restaurant_id/review', reviewValidation, reviewController.createReview);
router.put('/restaurant/:restaurant_id/review/:review_id', reviewValidation, reviewController.updateReview);
router.delete('/restaurant/:restaurant_id/review/:review_id', adminAuthMiddleware, reviewController.deleteReview);

module.exports = router;