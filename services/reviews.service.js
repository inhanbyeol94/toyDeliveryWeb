const ReviewRepository = require('../repositories/reviews.repository');
const RestaurantRepository = require('../repositories/restaurants.repository');

class ReviewService {
    reviewRepository = new ReviewRepository();
    restaurantRepository = new RestaurantRepository();

    findAllReview = async (restaurant_id) => {
        const allReview = await this.reviewRepository.findAllReview(restaurant_id);

        allReview.sort((a, b) => {
            return b.created_at - a.created_at;
        });

        return allReview.map((review) => {
            return {
                reviewId: review.review_id,
                memberId: review.Members.member_id,
                orderId: review.order_id,
                star: review.star,
                review: review.review,
                image: review.image,
                createdAt: review.created_at,
                updatedAt: review.updated_at,
            };
        });
    };

    //
    findReviewsByMember = async (member_id) => {
        const review = await this.reviewRepository.findReviewsByMember(member_id);
        return {
            reviewId: review.review_id,
            memberId: review.Members.member_id,
            orderId: review.order_id,
            star: review.star,
            review: review.review,
            image: review.image,
            createdAt: review.created_at,
            updatedAt: review.updated_at,
        };
    };

    findOneReview = async (review_id) => {
        const review = await this.reviewRepository.findReviewId(review_id);
        return {
            reviewId: review.review_id,
            memberId: review.member_id,
            orderId: review.order_id,
            star: review.star,
            review: review.review,
            image: review.image,
            createdAt: review.created_at,
            updatedAt: review.updated_at,
        };
    };

    createReview = async (restaurant_id, member_id, order_id, star, review, image) => {
        await this.reviewRepository.createReview(restaurant_id, member_id, order_id, star, review, image);

        return { code: 201, message: '리뷰를 생성하였습니다.' };
    };

    updateReview = async (member_id, review_id, review, star, image) => {
        const findReview = await this.reviewRepository.findReviewId(review_id);

        if (!findReview) throw new Error("Review doesn't exist");
        if (findReview.member_id !== member_id) throw new Error('작성한 유저가 아닙니다.');

        await this.reviewRepository.updateReview(review_id, review, star, image);
        const updateReview = await this.reviewRepository.findReviewId(review_id);

        return {
            reviewId: updateReview.review_id,
            memberId: updateReview.member_id,
            orderId: updateReview.order_id,
            star: updateReview.star,
            review: updateReview.review,
            image: updateReview.image,
            createdAt: updateReview.created_at,
            updatedAt: updateReview.updated_at,
        };
    };

    deleteReview = async (review_id, member_id) => {
        const findReview = await this.reviewRepository.findReviewId(review_id);

        if (!findReview) throw new Error("Review doesn't exist");
        if (findReview.member_id !== member_id) throw new Error('작성한 유저가 아닙니다.');

        await this.reviewRepository.deleteReview(review_id);

        return {
            reviewId: findReview.review_id,
            memberId: findReview.member_id,
            orderId: findReview.order_id,
            star: findReview.star,
            review: findReview.review,
            image: findReview.image,
            createdAt: findReview.created_at,
            updatedAt: findReview.updated_at,
        };
    };
}

module.exports = ReviewService;
