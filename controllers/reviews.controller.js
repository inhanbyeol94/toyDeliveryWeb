const ReviewService = require('../services/reviews.service');

class ReviewsController {
    reviewService = new ReviewService();

    /** 레스토랑 리뷰 전체 불러오기 */
    getReviewList = async (req, res) => {
        try {
            const { restaurant_id } = req.params;
            const { status, message, result } = await this.reviewService.findAllReview(restaurant_id);

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    /** 특정 회원의 전체 리뷰 목록 불러오기 */
    getReviewsByMember = async (req, res) => {
        try {
            const { member_id } = req.session.user;
            const { status, message, result } = await this.reviewService.findReviewsByMember(member_id);

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    /** 특정 리뷰 불러오기 */
    getReview = async (req, res) => {
        try {
            const { review_id } = req.params;
            const { status, message, result } = await this.reviewService.findOneReview(review_id);

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    /** 리뷰 생성과 수정 */
    createReview = async (req, res) => {
        try {
            const { restaurant_id, order_id } = req.params;
            const { member_id } = req.session.user;
            const { star, review, image, review_id } = req.body;
            const { status, message, result } = await this.reviewService.createReview(
                restaurant_id,
                member_id,
                order_id,
                star,
                review,
                image,
                review_id
            );

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    /** 리뷰 삭제 */
    deleteReview = async (req, res) => {
        try {
            const { review_id } = req.params;
            const { member_id } = req.session.user;
            const { status, message, result } = await this.reviewService.deleteReview(review_id, member_id);

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    /** 리뷰 사진 추가 */
    updateReviewImage = async (req, res) => {
        try {
            const image = req.file.location;
            const { member_id } = req.session.user;
            const { status, message, result } = await this.reviewService.updateReviewImage({ image, member_id });

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    /** 리뷰 사진 삭제 */
    deleteReviewImage = async (req, res) => {
        try {
            const { review_id } = req.params;
            const { member_id } = req.session.user;
            const { status, message, result } = await this.reviewService.deleteReviewImage({ member_id, review_id });

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    getReviewOder = async (req, res) => {
        try {
            const { order_id } = req.params;
            const { member_id } = req.session.user;
            const { status, message, result } = await this.reviewService.getReviewOder(order_id, member_id);

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };
}

module.exports = ReviewsController;
