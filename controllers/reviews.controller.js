const ReviewService = require('../services/reviews.service');

class ReviewsController {
    reviewService = new ReviewService();

    getReviewList = async (req, res) => {
        const { restaurant_id } = req.params;
        const reviews = await this.reviewService.findAllReview(restaurant_id);
        res.status(200).json({ data: reviews });
    };

    getReviewsByMember = async (req, res) => {
        const { member_id } = req.session.user;
        const reviews = await this.reviewService.findReviewsByMember(member_id);
        res.status(200).json({ data: reviews });
    };

    getReview = async (req, res) => {
        const { review_id } = req.params;
        const review = await this.reviewService.findOneReview(review_id);
        res.status(200).json({ data: review });
    };

    createReview = async (req, res) => {
        const { restaurant_id, order_id } = req.params;
        const { member_id } = req.session.user;
        const { star, review, image } = req.body;
        try {
            const { code, message } = await this.reviewService.createReview(restaurant_id, member_id, order_id, star, review, image);
            res.status(code).json({ message: message });
        } catch (error) {
            res.status(400).json({ Error });
        }
    };

    updateReview = async (req, res) => {
        const review_id = req.params.review_id;
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

    deleteReview = async (req, res) => {
        const review_id = req.params.review_id;
        const { member_id } = req.session.user;
        try {
            if (member_id !== 1) throw new Error('해당 권한이 없습니다.');
            const deleteReview = await this.reviewService.deleteReview(review_id, member_id);
            res.status(200).json({ data: deleteReview });
        } catch (error) {
            res.status(400).json({ errorMessage: Error });
        }
    };
    updateReviewImage = async (req, res) => {
        try {
            const image = req.file.location;
            const { member_id } = req.session.user;
            const { code, result } = await this.reviewService.updateReviewImage({ image, member_id });
            res.status(code).json({ result });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };
    deleteReviewImage = async (req, res) => {
        try {
            const { member_id } = req.session.user;
            const { code, result } = await this.reviewService.deleteReviewImage({ member_id });
            res.status(code).json({ result });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };
    addReviewByOrder = async (req, res) => {
        const { member_id } = req.session.user;
        const { order_id } = req.params;
        const reviews = await this.reviewService.addReviewByOrder(order_id, member_id);
        res.status(200).json({ data: reviews });
    };
    deleteReviewByOrder = async (req, res) => {
        const { member_id } = req.session.user;
        const { order_id } = req.params;
        const reviews = await this.reviewService.deleteReviewByOrder(order_id, member_id);
        res.status(200).json({ data: reviews });
    };
}

module.exports = ReviewsController;
