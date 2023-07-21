const { Restaurant } = require('../models');

class RestaurantRepository {
    findAllRestaurant = async () => {
        return await Restaurant.findAll();
    };

    findRestaurantId = async (data) => {
        return await Restaurant.findOne({
            where: data,
        });
    };

    searchCategory = async (category) => {
        return await Restaurant.findAll({ where: { category } });
    };

    createRestaurant = async (member_id, name, address, tel, desc, category, image) => {
        return await Restaurant.create({ member_id, name, address, tel, desc, category, image });
    };

    updateRestaurant = async ({ restaurant_id, name, address, tel, desc, category }) => {
        const updateRestaurant = await Restaurant.update(
            { name, address, tel, desc, category },
            {
                where: { restaurant_id },
            }
        );
        return updateRestaurant;
    };
    updateRestaurantImg = async ({ image, restaurant_id }) => {
        await Restaurant.update({ image }, { where: { restaurant_id } });
    };
    deleteRestaurant = async (restaurant_id) => {
        return await Restaurant.destroy({ where: { restaurant_id } });
    };

    findMemberId = async (restaurant_id) => {
        return await Restaurant.findOne({ where: { restaurant_id } });
    };
}

module.exports = RestaurantRepository;
