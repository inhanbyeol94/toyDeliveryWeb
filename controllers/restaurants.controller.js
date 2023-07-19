const RestaurantService = require('../services/restaurants.service');

class RestaurantsController {
    restaurantService = new new RestaurantService()();

    getRestaurantList = async (req, res, next) => {
        const restaurants = await this.restaurantService.findAllRestaurant();
        res.status(200).json({ data: restaurants });
    };

    getRestaurant = async (req, res, next) => {
        const { restaurant_id } = req.params;
        try {
            const restaurant = await this.restaurantService.findRestaurant(restaurant_id);
            if (!restaurant) throw new Error('존재하지 않는 매장입니다.');

            res.status(200).json({ data: restaurant });
        } catch (error) {
            res.status(400).json({ errorMessage: Error });
        }
    };

    createRestaurant = async (req, res, next) => {
        const { name, address, tel, desc, image } = req.body;
        const { member_id, group } = req.session.user;

        try {
            if (group !== 1) throw new Error('해당 권한이 없습니다.');

            const createRestaurant = await this.restaurantService.createRestaurant(member_id, name, address, tel, desc, image);
            res.status(201).json({ data: createRestaurant });
        } catch (error) {
            res.status(400).json({ Error });
        }
    };

    updateRestaurant = async (req, res, next) => {
        const { restaurant_id } = req.params;
        const { name, address, tel, desc, image } = req.body;
        const { member_id } = req.session.user;
        try {
            if (member_id !== 1) throw new Error('해당 권한이 없습니다.');
            const updateRestaurant = await this.restaurantService.updateRestaurant(member_id, restaurant_id, name, address, tel, desc, image);
            res.status(200).json({ data: updateRestaurant });
        } catch (error) {
            res.status(400).json({ errorMessage: Error });
        }
    };

    deleteRestaurant = async (req, res, next) => {
        const { restaurant_id } = req.params;
        const { member_id } = req.session.user;
        try {
            if (member_id !== 1) throw new Error('해당 권한이 없습니다.');
            const deleteRestaurant = await this.restaurantService.deleteRestaurant(restaurant_id, member_id);
            res.status(200).json({ data: deleteRestaurant });
        } catch (error) {
            res.status(400).json({ errorMessage: Error });
        }
    };
}

module.exports = RestaurantsController;
