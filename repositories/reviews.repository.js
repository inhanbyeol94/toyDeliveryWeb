const { Review } = require('../models');

class ReviewRepository {
    findAllReview = async () => {
        return await Review.findAll();
    };

    findReviewId = async (data) => {
        return await Review.findOne({
            where: data,
        });
    };

    createReview = async (member_id, menu_id, menu_name, star, review, image) => {
        return await Review.create({ member_id, menu_id, menu_name, star, review, image })
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
        return await Review.destroy({ where: { review_id } })
    };

    findMemberId = async (review_id) => {
        return await Review.findOne({ where: { review_id } });
    };
}

module.exports = ReviewRepository;
