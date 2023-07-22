const { Op } = require('sequelize');
const { Review, Member } = require('../models');

class ReviewRepository {
    findAllReview = async (restaurant_id) => {
        return await Review.findAll({ where: { restaurant_id }, include: [{ model: Member }], order: [['created_at', 'DESC']] });
    };

    findReviewId = async (review_id) => {
        return await Review.findOne({
            where: { review_id },
            include: [{ model: Member }],
        });
    };

    findReviewsByMember = async (target) => {
        return await Review.findOne({
            where: { [Op.and]: target },
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
    updateReviewImage = async ({ image, member_id }) => {
        await Review.update({ image }, { where: { member_id } });
    };
    addReviewByOrder = async (order_id, member_id) => {
        return await Review.findOne({ where: { order_id, member_id } });
    };
    deleteReviewByOrder = async (order_id, member_id) => {
        return await Review.destroy({ where: { order_id, member_id } });
    };
}

module.exports = ReviewRepository;
