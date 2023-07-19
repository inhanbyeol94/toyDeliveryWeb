const { Restaurant } = require('../models');

class RestaurantRepository {
    findAllRestaurant = async () => {
        return await Restaurant.findAll();
    };

    findRestaurantId = async (restaurant_id) => {
        return await Restaurant.findOne({
            where: { restaurant_id: restaurant_id },
        });
    };

    createRestaurant = async (member_id, name, address, category, tel, desc, image) => {
        return await Restaurant.create({ member_id, name, address, category, tel, desc, image });
    };

    updateRestaurant = async (restaurant_id, name, address, category, tel, desc, image) => {
        const updateRestaurant = await Restaurant.update(
            { name, address, category, tel, desc, image },
            {
                where: { restaurant_id },
            }
        );
        return updateRestaurant;
    };

    deleteRestaurant = async (restaurant_id) => {
        return await Restaurant.destroy({ where: { restaurant_id } });
    };

    findMemberId = async (restaurant_id) => {
        return await Restaurant.findOne({ where: { restaurant_id } });
    };
}

module.exports = RestaurantRepository;
