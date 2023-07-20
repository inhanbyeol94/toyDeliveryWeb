const ReviewRepository = require('../repositories/reviews.repository');

class ReviewService {
    reviewRepository = new ReviewRepository();

    findAllReview = async () => {
        const allReview = await this.reviewRepository.findAllReview();

        allReview.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        return allReview.map((review) => {
            return {
                review_id: review.review_id,
                member_id: review.member_id,
                menu_id: review.menu_id,
                menu_name: review.menu_name,
                star: review.name,
                review: review.review,
                image: review.image,
                createdAt: review.createdAt,
                updatedAt: review.updatedAt,
            };
        });
    };

    findReview = async (review_id) => {
        const review = await this.reviewRepository.findReviewId(review_id);
        return {
            review_id: review.review_id,
            member_id: review.member_id,
            menu_id: review.menu_id,
            menu_name: review.menu_name,
            star: review.name,
            review: review.review,
            image: review.image,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
        };
    };

    createReview = async (review_id, member_id, menu_id, menu_name, star, review, image) => {
        const createdReview = await this.reviewRepository.createReview(review_id, member_id, menu_id, menu_name, star, review, image);

        return {
            review_id: createdReview.review_id,
            member_id: createdReview.member_id,
            menu_id: createdReview.menu_id,
            menu_name: createdReview.menu_name,
            star: createdReview.name,
            review: createdReview.review,
            image: createdReview.image,
            createdAt: createdReview.createdAt,
            updatedAt: createdReview.updatedAt,
        };
    };

    updateReview = async (member_id, review_id, review, star, image) => {
        const findReview = await this.reviewRepository.findReviewId(review_id);

        if (!findReview) throw new Error("Review doesn't exist");
        if (findReview.member_id !== member_id) throw new Error('작성한 유저가 아닙니다.');

        await this.reviewRepository.updateReview(member_id, review_id, menu_id, menu_name, review, star, image);
        const updateReview = await this.reviewRepository.findReviewId(review_id);

        return {
            member_id: updateReview.member_id,
            review_id: updateReview.review_id,
            review: updateReview.review,
            star: updateReview.star,
            image: updateReview.image,
            createdAt: updateReview.createdAt,
            updatedAt: updateReview.updatedAt,
        };
    };

    deleteReview = async (review_id) => {
        const findReview = await this.reviewRepository.findReviewId(review_id);

        if (!findReview) throw new Error("Review doesn't exist");
        if (findReview.member_id !== member_id) throw new Error('작성한 유저가 아닙니다.');

        await this.reviewRepository.deleteReview(review_id);

        return {
            review_id: findReview.review_id,
            member_id: findReview.member_id
        };
    };
}

module.exports = ReviewService;
