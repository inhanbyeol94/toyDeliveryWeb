const RestaurantRepository = require('../repositories/restaurants.repository');
const { CustomError, ServiceReturn } = require('../customClass');

const AWS = require('aws-sdk');
class RestaurantService {
    restaurantRepository = new RestaurantRepository();

    //** 전체 레스토랑 불러오기 */
    findAllRestaurant = async () => {
        const allRestaurant = await this.restaurantRepository.findAllRestaurant();

        allRestaurant.sort((a, b) => {
            return b.createAt - a.createAt;
        });

        const allRestaurantData = allRestaurant.map((restaurant) => {
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

        return new ServiceReturn('정상 반환되었습니다.', 200, allRestaurantData);
    };

    //** 특정 레스토랑 불러오기 */
    findRestaurant = async (restaurant_id) => {
        const findRestaurant = await this.restaurantRepository.findRestaurantId({ restaurant_id });
        if (!findRestaurant) throw new CustomError('레스토랑을 찾을 수 없습니다.', 404);

        return new ServiceReturn('정상 반환되었습니다.', 200, findRestaurant);
    };

    findMyrestaurant = async (member_id) => {
        const findRestaurant = await this.restaurantRepository.findRestaurantId({ member_id });
        if (!findRestaurant) throw new CustomError('레스토랑을 찾을 수 없습니다.', 404);

        return new ServiceReturn('정상 반환되었습니다.', 200, findRestaurant);
    };

    //** 레스토랑 생성 */
    createRestaurant = async (member_id, name, address, tel, desc, category) => {
        const createRestaurant = await this.restaurantRepository.createRestaurant(member_id, name, address, tel, desc, category);
        const createRestaurantData = {
            restaurant_id: createRestaurant.restaurant_id,
            member_id: createRestaurant.member_id,
            name: createRestaurant.name,
            address: createRestaurant.address,
            category: createRestaurant.category,
            tel: createRestaurant.tel,
            desc: createRestaurant.desc,
            createdAt: createRestaurant.createdAt,
            updatedAt: createRestaurant.updatedAt,
        };

        return new ServiceReturn('레스토랑이 정상 생성되었습니다.', 201, createRestaurantData);
    };

    //** 레스토랑 수정 */
    updateRestaurant = async (member_id, restaurant_id, name, address, tel, desc, category) => {
        const findRestaurant = await this.restaurantRepository.findRestaurantId({ restaurant_id });
        if (!findRestaurant) throw new CustomError('레스토랑이 존재하지 않습니다.', 404);
        if (findRestaurant.member_id !== member_id) throw new CustomError('레스터랑 정보 수정은 본인이 개설한 레스토랑만 가능합니다.', 403);

        await this.restaurantRepository.updateRestaurant({ restaurant_id, name, address, tel, desc, category });

        return new ServiceReturn('매장 수정에 성공하였습니다.', 200, true);
    };

    //** 레스토랑 대표 이미지 수정 */
    updateRestaurantImg = async ({ image, restaurant_id }) => {
        await this.restaurantRepository.updateRestaurantImg({ image, restaurant_id });
        return new ServiceReturn('매장 사진이 정상 저장되었습니다.', 200, true);
    };

    //** 레스토랑 삭제 */
    deleteRestaurant = async (restaurant_id, member_id) => {
        const findRestaurant = await this.restaurantRepository.findRestaurantId({ restaurant_id });
        if (!findRestaurant) throw new CustomError('레스토랑이 존재하지 않습니다', 404);
        if (findRestaurant.member_id !== member_id) throw new CustomError('해당 레스토랑을 삭제 할 권한이 없습니다.', 403);

        await this.restaurantRepository.deleteRestaurant(restaurant_id);
        const restaurantDeleteData = {
            restaurant_id: findRestaurant.restaurant_id,
            name: findRestaurant.name,
        };
        new ServiceReturn('정상 삭제되었습니다.', 200, restaurantDeleteData);
    };

    //** 레스토랑 대표 이미지 삭제 */
    deleteProfileImage = async ({ restaurant_id }) => {
        const findRestaurant = await this.restaurantRepository.findRestaurantId({ restaurant_id });
        const imageKey = findRestaurant.image.replace('https://toydeliverycloud.s3.ap-northeast-2.amazonaws.com/', '');

        const s3 = new AWS.S3();

        s3.deleteObject(
            {
                Bucket: 'toydeliverycloud',
                Key: imageKey,
            },
            async (err) => {
                if (err) throw new CustomError('이미지를 삭제하는 중 오류가 발생하였습니다.', 500);
                await this.restaurantRepository.updateRestaurantImg({ image: null, restaurant_id });
            }
        );

        return new ServiceReturn('정상 삭제되었습니다.', 200, true);
    };
}

module.exports = RestaurantService;
