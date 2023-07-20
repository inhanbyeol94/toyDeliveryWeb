const ReviewService = require('../services/reviews.service');

class ReviewsController {
    reviewService = new ReviewService();

    getReviewList = async (req, res, next) => {
        const reviews = await this.reviewService.findAllReview();
        res.status(200).json({ data: review });
    };

    getReview = async (req, res, next) => {
        const { review_id } = req.params;
        try {
            const review = await this.reviewService.findReview(review_id);
            if (!review) throw new Errow('존재하지 않는 리뷰입니다.');

            res.status(200).json({ data: review });
        } catch (error) {
            res.status(400).json({ errorMessage: Error });
        }
    };

    createReview = async (req, res, next) => {
        const { star, review, image } = req.body;
        const { member_id, group } = req.session.user;

        try {
            if (group !== 1) throw new Error('해당 권한이 없습니다.');

            const createReview = await this.reviewService.createReview(member_id, star, review, image);
            res.status(201).json({ data: createReview });
        } catch (error) {
            res.status(400).json({ Error });
        }
    };

    updateReview = async (req, res, next) => {
        const { review_id } = req.params;
        const { review, image, star } = req.body;
        const { member_id } = req.session.user;
        try {
            if (member_id !== 1) throw new Error('해당 권한이 없습니다.');
            const updateReview = await this.reviewService.updateReview(member_id, review_id, review, image, star);
            res.status(200).json({ data: updateReview });
        } catch (error) {
            res.status(400).json({ errorMessage: Error });
        }
    };

    deleteReview = async (req, res, next) => {
        const { review_id } = req.params;
        const { member_id } = req.session.user;
        try {
            if (member_id !== 1) throw new Error('해당 권한이 없습니다.');
            const deleteReview = await this.reviewService.deleteReview(review_id, member_id);
            res.status(200).json({ data: deleteReview });
        } catch (error) {
            res.status(400).json({ errorMessage: Error });
        }
    };
}

module.exports = ReviewsController;
