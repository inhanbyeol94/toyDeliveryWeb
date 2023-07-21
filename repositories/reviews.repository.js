const { Review, Member } = require('../models');

class ReviewRepository {
    findAllReview = async (restaurant_id) => {
        return await Review.findAll({ where: { restaurant_id }, include: [{ model: Member }] });
    };

    findReviewId = async (review_id) => {
        return await Review.findOne({
            where: { review_id },
        });
    };

    findReviewsByMember = async (member_id) => {
        return await Review.findOne({
            where: { member_id },
            include: [{ model: Member }],
        });
    };

    createReview = async (restaurant_id, member_id, order_id, star, review, image) => {
        await Review.create({ restaurant_id, member_id, order_id, star, review, image });
    };

    updateReview = async (review_id, star, review, image) => {
        const updateReview = await this.Review.update(
            { star, review, image },
            {
                where: { review_id },
            }
        );
        return updateReview;
    };

    deleteReview = async (review_id) => {
        return await Review.destroy({ where: { review_id } });
    };

    findMemberId = async (review_id) => {
        return await Review.findOne({ where: { review_id } });
    };
}

module.exports = ReviewRepository;
