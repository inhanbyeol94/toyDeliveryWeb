const express = require('express');
const router = express.Router();

const ReviewController = require('../controllers/reviews.controller');
const reviewController = new ReviewController();
const imageUploader = require('../imageUploader');
const { allAuthMiddleware } = require('../middlewares/api.auth.middleware');
const { reviewValidation } = require('../middlewares/validations/reviews.validation');

router.get('/member/review', reviewController.getReviewsByMember);
router.get('/restaurant/:restaurant_id/review', reviewController.getReviewList);
router.get('/restaurant/:restaurant_id/review/:review_id', reviewController.getReview);
router.post('/review/order/:order_id', reviewController.addReviewByOrder);
router.delete('/review/order/:order_id', reviewController.deleteReviewByOrder);
router.post('/restaurant/:restaurant_id/review/order/:order_id', reviewValidation, allAuthMiddleware, reviewController.createReview);
router.put('/restaurant/:restaurant_id/review/:review_id', reviewValidation, allAuthMiddleware, reviewController.updateReview);
router.delete('/restaurant/:restaurant_id/review/:review_id', allAuthMiddleware, reviewController.deleteReview);
router.post('/review/image', imageUploader.single('image'), reviewController.updateReviewImage);
router.delete('/review/image', reviewController.deleteReviewImage);

module.exports = router;
