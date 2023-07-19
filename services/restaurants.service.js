const RestaurantRepository = require('../repositories/restaurants.repository');

class RestaurantService {
    restaurantRepository = new new RestaurantRepository()();

    findAllRestaurant = async () => {
        const allRestaurant = await this.restaurantRepository.findAllRestaurant();

        allRestaurant.sort((a, b) => {
            return b.createAt - a.createAt;
        });

        return allRestaurant.map((restaurant) => {
            return {
                restaurant_id: restaurant.restaurant_id,
                name: restaurant.name,
                tel: restaurant.tel,
                image: restaurant.image,
                createdAt: restaurant.createdAt,
                updatedAt: restaurant.updatedAt,
            };
        });
    };

    findRestaurant = async (restaurant_id) => {
        const restaurant = await this.restaurantRepository.findRestaurantId(restaurant_id);
        return {
            restaurant_id: restaurant.restaurant_id,
            name: restaurant.name,
            address: restaurant.address,
            tel: restaurant.tel,
            desc: restaurant.desc,
            image: restaurant.image,
            createdAt: restaurant.createdAt,
            updatedAt: restaurant.updatedAt,
        };
    };

    createRestaurant = async (member_id, name, address, tel, desc, image) => {
        const createRestaurant = await this.restaurantRepository.createRestaurant(member_id, name, address, tel, desc, image);

        return {
            restaurant_id: createRestaurant.restaurant_id,
            member_id: createRestaurant.member_id,
            name: createRestaurant.name,
            address: createRestaurant.address,
            tel: createRestaurant.tel,
            desc: createRestaurant.desc,
            image: createRestaurant.image,
            createdAt: createRestaurant.createdAt,
            updatedAt: createRestaurant.updatedAt,
        };
    };

    updateRestaurant = async (member_id, restaurant_id, name, address, tel, desc, image) => {
        const findRestaurant = await this.restaurantRepository.findRestaurantId(restaurant_id);

        if (!findRestaurant) throw new Error("Restaurant doesn't exist");
        if (findRestaurant.member_id !== member_id) throw new Error('작성한 유저가 아닙니다.');

        await this.restaurantRepository.updateRestaurant(restaurant_id, name, address, tel, desc, image);

        const updateRestaurant = await this.restaurantRepository.findRestaurantId(restaurant_id);

        return {
            restaurant_id: updateRestaurant.restaurant_id,
            name: updateRestaurant.name,
            address: updateRestaurant.address,
            tel: updateRestaurant.tel,
            desc: updateRestaurant.desc,
            image: updateRestaurant.image,
            createdAt: updateRestaurant.createdAt,
            updatedAt: updateRestaurant.updatedAt,
        };
    };

    deleteRestaurant = async (restaurant_id, member_id) => {
        const findRestaurant = await this.restaurantRepository.findRestaurantId(restaurant_id);

        if (!findRestaurant) throw new Error("Restaurant doesn't exist");
        if (findRestaurant.member_id !== member_id) throw new Error('작성한 유저가 아닙니다.');

        await this.restaurantRepository.deleteRestaurant(restaurant_id);

        return {
            restaurant_id: findRestaurant.restaurant_id,
            name: findRestaurant.name,
        };
    };
}

module.exports = RestaurantService;
