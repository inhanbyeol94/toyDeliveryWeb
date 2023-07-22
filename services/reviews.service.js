const ReviewRepository = require('../repositories/reviews.repository');
const RestaurantRepository = require('../repositories/restaurants.repository');
const AWS = require('aws-sdk');

const { CustomError, ServiceReturn } = require('../customClass');

class ReviewService {
    reviewRepository = new ReviewRepository();
    restaurantRepository = new RestaurantRepository();

    /** 레스토랑 리뷰 전체 불러오기 */
    findAllReview = async (restaurant_id) => {
        const allReview = await this.reviewRepository.findAllReview(restaurant_id);
        const allReviewData = allReview.map((review) => {
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

        return new ServiceReturn('정상 반환되었습니다.', 200, allReviewData);
    };

    /** 특정 회원의 전체 리뷰 목록 불러오기 */
    findReviewsByMember = async (member_id) => {
        const review = await this.reviewRepository.findReviewsByMember({ member_id });
        const reviewData = {
            reviewId: review.review_id,
            memberId: review.Members.member_id,
            orderId: review.order_id,
            star: review.star,
            review: review.review,
            image: review.image,
            createdAt: review.created_at,
            updatedAt: review.updated_at,
        };

        return new ServiceReturn('정상 반환되었습니다.', 200, reviewData);
    };

    /** 특정 리뷰 불러오기 */
    findOneReview = async (review_id) => {
        const review = await this.reviewRepository.findReviewId(review_id);
        const reviewData = {
            reviewId: review.review_id,
            memberId: review.member_id,
            orderId: review.order_id,
            star: review.star,
            review: review.review,
            image: review.image,
            createdAt: review.created_at,
            updatedAt: review.updated_at,
        };

        return new ServiceReturn('정상 반환되었습니다.', 200, reviewData);
    };

    /** 리뷰 생성 */
    createReview = async (restaurant_id, member_id, order_id, star, review, image) => {
        await this.reviewRepository.createReview(restaurant_id, member_id, order_id, star, review, image);
        return new ServiceReturn('리뷰를 생성하였습니다.', 201, true);
    };

    /** 리뷰 수정 */
    updateReview = async (member_id, review_id, review, star, image) => {
        const findReview = await this.reviewRepository.findReviewId(review_id);
        if (!findReview) throw new CustomError('수정할 리뷰가 존재하지 않습니다.', 404);
        if (findReview.member_id !== member_id) throw new CustomError('본인이 작성한 리뷰만 수정이 가능합니다.', 403);

        await this.reviewRepository.updateReview(review_id, review, star, image);

        const updateReview = await this.reviewRepository.findReviewId(review_id);
        const updateReviewData = {
            reviewId: updateReview.review_id,
            memberId: updateReview.member_id,
            orderId: updateReview.order_id,
            star: updateReview.star,
            review: updateReview.review,
            image: updateReview.image,
            createdAt: updateReview.created_at,
            updatedAt: updateReview.updated_at,
        };

        return new ServiceReturn('정상 수정되었습니다.', 200, updateReviewData);
    };

    /** 리뷰 삭제 */
    deleteReview = async (review_id, member_id) => {
        const findReview = await this.reviewRepository.findReviewId(review_id);

        if (!findReview) throw new CustomError('삭제할 리뷰가 존재하지 않습니다.', 404);
        if (findReview.member_id !== member_id) throw new CustomError('본인이 작성한 리뷰만 삭제가 가능합니다.', 403);

        await this.reviewRepository.deleteReview(review_id);

        const resultData = {
            reviewId: findReview.review_id,
            memberId: findReview.member_id,
            orderId: findReview.order_id,
            star: findReview.star,
            review: findReview.review,
            image: findReview.image,
            createdAt: findReview.created_at,
            updatedAt: findReview.updated_at,
        };

        return new ServiceReturn('정상 삭제되었습니다.', 200, resultData);
    };

    /** 리뷰 사진 추가 */
    updateReviewImage = async ({ member_id, image }) => {
        await this.reviewRepository.updateReviewImage({ member_id, image });
        return new ServiceReturn('리뷰 사진이 정상 저장되었습니다.', 200, true);
    };

    /** 리뷰 사진 삭제 */
    deleteReviewImage = async ({ member_id, review_id }) => {
        const findUser = await this.reviewRepository.findReviewsByMember([{ member_id }, { review_id }]);
        if (!findUser) throw new CustomError('사진을 삭제할 리뷰가 존재하지 않습니다.', 404);

        const imageKey = findUser.image.replace('https://toydeliverycloud.s3.ap-northeast-2.amazonaws.com/', '');

        const s3 = new AWS.S3();

        s3.deleteObject(
            {
                Bucket: 'toydeliverycloud',
                Key: imageKey,
            },
            async (err) => {
                if (err) throw new CustomError('삭제에 실패하였습니다.', 406);
                await this.memberRepository.updateProfileImage({ member_id, image: null });
            }
        );

        return new ServiceReturn('정상 삭제되었습니다.', 200, true);
    };
}

module.exports = ReviewService;
