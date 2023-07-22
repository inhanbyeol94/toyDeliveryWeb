const RestaurantRepository = require('../repositories/restaurants.repository');
const { CustomError, ServiceReturn } = require('../customClass');

const AWS = require('aws-sdk');
class RestaurantService {
    restaurantRepository = new RestaurantRepository();

    findAllRestaurant = async () => {
        const allRestaurant = await this.restaurantRepository.findAllRestaurant();

        allRestaurant.sort((a, b) => {
            return b.createAt - a.createAt;
        });

        return allRestaurant.map((restaurant) => {
            return {
                restaurant_id: restaurant.restaurant_id,
                name: restaurant.name,
                category: restaurant.category,
                tel: restaurant.tel,
                image: restaurant.image,
                createdAt: restaurant.createdAt,
                updatedAt: restaurant.updatedAt,
            };
        });
    };

    findRestaurant = async (restaurant_id) => {
        const restaurant = await this.restaurantRepository.findRestaurantId({ restaurant_id });
        return restaurant;
    };

    createRestaurant = async ({ member_id, name, address, tel, desc, category, image }) => {
        const overlapName = await this.restaurantRepository.findRestaurantId({ name: name });
        if (overlapName) throw new CustomError('이미 사용중인 매장의 이름입니다.', 403);

        const overlapAdmin = await this.restaurantRepository.findRestaurantId({ member_id: member_id });
        if (overlapAdmin) throw new CustomError('해당 아이디에는 이미 매장이 존재합니다.', 403);

        await this.restaurantRepository.createRestaurant({ member_id, name, address, tel, desc, category, image });

        return new ServiceReturn('매장 생성이 완료되었습니다.', 201, true);
    };

    updateRestaurant = async (member_id, restaurant_id, name, address, tel, desc, category) => {
        const findRestaurant = await this.restaurantRepository.findRestaurantId({ restaurant_id: restaurant_id });
        if (!findRestaurant) throw new CustomError('존재하지 않는 매장입니다.', 404);
        if (findRestaurant.member_id !== member_id) throw new CustomError('작성한 유저가 아닙니다.', 404);
        await this.restaurantRepository.updateRestaurant({ restaurant_id, name, address, tel, desc, category });

        return ServiceReturn('매장 수정에 성공하였습니다.', 200, true);
    };
    updateRestaurantImg = async ({ image, restaurant_id }) => {
        await this.restaurantRepository.updateRestaurantImg({ image, restaurant_id });
        return { result: '매장 사진이 정상 저장되었습니다.' };
    };

    deleteRestaurant = async (restaurant_id, member_id) => {
        const findRestaurant = await this.restaurantRepository.findRestaurantId({ restaurant_id });
        if (!findRestaurant) throw new CustomError('존재하지 않는 매장입니다.', 404);
        if (findRestaurant.member_id !== member_id) throw new CustomError('작성한 유저가 아닙니다.', 404);

        await this.restaurantRepository.deleteRestaurant(restaurant_id);
        return ServiceReturn('매장 삭제에 성공하였습니다.', 200, true);
    };
    deleteProfileImage = async ({ restaurant_id }) => {
        try {
            const findRestaurant = await this.restaurantRepository.findRestaurantId({ restaurant_id });
            const imageKey = findRestaurant.image.replace('https://toydeliverycloud.s3.ap-northeast-2.amazonaws.com/', '');

            const s3 = new AWS.S3();

            s3.deleteObject(
                {
                    Bucket: 'toydeliverycloud',
                    Key: imageKey,
                },
                async (err) => {
                    if (err) throw { result: '이미지를 삭제하는 중 오류가 발생했습니다' };
                    await this.restaurantRepository.updateRestaurantImg({ image: null, restaurant_id });
                }
            );

            return { result: '정상적으로 삭제되었습니다.' };
        } catch (err) {
            console.log(err.message);
            return { result: '오류가 발생했습니다' };
        }
    };
}

module.exports = RestaurantService;
