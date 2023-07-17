const { Restaurant } = require('../models');

class RestaurantRepository {
    findAllRestauant = async () => {
        return await Restaurant.findAll();
    };

    findRestaurantId = async (restaurant_id) => {
        return await Restaurant.findOne({
            where: { restaurant_id: restaurant_id },
        });
    };

    createRestaurant = async (name, address, tel, desc, image) => {
        return await Restaurant.create({ name, address, tel, desc, image });
    };

    updateRestaurant = async (restaurant_id, name, address, tel, desc, image) => {
        const updateRestaurant = await this.Restaurant.update(
            { name, address, tel, desc, image },
            {
                where: { restaurant_id },
            }
        );
        return updateRestaurant;
    };

    deleteRestaurant = async (restaurant_id) => {
        return await this.Restaurant.destroy({ where: { restaurant_id } });
    };
}

module.exports = RestaurantRepository;
