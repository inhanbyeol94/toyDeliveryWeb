const ReviewService = require('../services/reviews.service');
const Review = require('../models/review');

class ReviewsController {
    reviewService = new ReviewService();
    // 리뷰 작성
    createReview = async (req, res) => {
        try {
            const { review, image, star } = req.body;

            // 새로운 리뷰 생성
            const newReview = await Review.create({
                review,
                image,
                star,
            });

            res.status(201).json({ review: newReview });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: '리뷰 작성중 오류가 발생하였습니다.' });
        }
    };

    // 리뷰 수정
    updateReview = async (req, res) => {
        try {
            const { id } = req.params;
            const { review, image, star } = req.body;

            // 해당 ID를 가진 리뷰 찾기
            const existingReview = await Review.findByPk(id);

            if (!existingReview) {
                return res.status(404).json({ error: '리뷰를 찾을 수 없습니다.' });
            }

            // 리뷰 수정
            existingReview.review = review;
            existingReview.image = image;
            existingReview.star = star;

            await existingReview.save();

            res.status(200).json({ review: existingReview });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: '리뷰 수정 중 오류가 발생했습니다.' });
        }
    };
  
    // 리뷰 삭제
    deleteReview = async (req, res) => {
        try {
            const { id } = req.params;

            // 해당 ID를 가진 리뷰 찾기
            const existingReview = await Review.findByPk(id);

            if (!existingReview) {
                return res.status(404).json({ error: '리뷰를 찾을 수 없습니다.' });
            }

            // 리뷰 삭제
            await existingReview.destroy();

            res.status(200).json({ message: '리뷰가 삭제되었습니다.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: '리뷰 삭제 중 오류가 발생했습니다.' });
        }
    };

    // 리뷰 조회
    getReview = async (req, res) => {
        try {
            const { id } = req.params;

            // 해당 ID를 가진 리뷰 찾기
            const existingReview = await Review.findByPk(id);

            if (!existingReview) {
                return res.status(404).json({ error: '리뷰를 찾을 수 없습니다.' });
            }

            // 리뷰 조회 결과를 원하는 필드로 가공
            const review = {
                restaurant_id: existingReview.restaurant_id,
                menu_id: existingReview.menu_id,
                menu_name: existingReview.menu_name,
                review: existingReview.review,
                image: existingReview.image,
                star: existingReview.star,
            };

            res.status(200).json({ review });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: '리뷰 조회 중 오류가 발생했습니다.' });
        }
    };
}
module.exports = ReviewsController;
