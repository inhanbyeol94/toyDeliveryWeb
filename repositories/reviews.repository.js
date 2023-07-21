const { Review } = require('../models');
const { Op } = require('sequelize');

class ReviewRepository {
    findAllReview = async (restaurant_id) => {
        return await Review.findAll({
            where: {
                restaurant_id: restaurant_id,
            },
        });
    };

    findReviewId = async (restaurant_id, review_id) => {
        return await Review.findOne({
            where: { [Op.and]: [{ restaurant_id }, { review_id }] },
        });
    };

    findReviewsByMember = async (member_id) => {
        return await Review.findAll({
            where: { member_id },
        });
    };

    createReview = async ({ restaurant_id, member_id, menu_id, menu_name, star, review, image }) => {
        return await Review.create({ restaurant_id, member_id, menu_id, menu_name, star, review, image });
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
