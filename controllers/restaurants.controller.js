const RestaurantService = require('../services/restaurants.service');

class RestaurantsController {
    restaurantService = new RestaurantService();

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
        const { name, address, tel, desc, category, image } = req.body;
        const { member_id } = req.session.user;

        try {
            const createRestaurant = await this.restaurantService.createRestaurant(member_id, name, address, tel, desc, category, image);
            res.status(201).json({ status: 200, result: createRestaurant });
        } catch (error) {
            res.status(400).json({ status: 200, result: error.message });
        }
    };

    updateRestaurant = async (req, res, next) => {
        const { restaurant_id } = req.params;
        const { name, address, tel, desc, category, image } = req.body;
        const { member_id } = req.session.user;
        try {
            await this.restaurantService.updateRestaurant(member_id, restaurant_id, name, address, tel, desc, category, image);
            res.status(200).json({ status: 200, result: '수정되었습니다' });
        } catch (error) {
            res.status(400).json({ status: 500, result: '수정중 오류가 발생했습니다' });
        }
    };
    updateRestaurantImg = async (req, res, next) => {
        const { restaurant_id } = req.params;
        const image = req.file.location;
        try {
            const { result } = await this.restaurantService.updateRestaurantImg({ image, restaurant_id });
            res.status(200).json({ status: 200, result });
        } catch (error) {
            res.status(400).json({ status: 500, result: '오류가 발생했습니다' });
        }
    };

    deleteRestaurant = async (req, res, next) => {
        const { restaurant_id } = req.params;
        const { member_id } = req.session.user;
        try {
            const deleteRestaurant = await this.restaurantService.deleteRestaurant(restaurant_id, member_id);
            res.status(200).json({ status: 200, result: deleteRestaurant });
        } catch (error) {
            res.status(400).json({ status: 400, result: Error });
        }
    };
    deleteRestaurantImg = async (req, res) => {
        try {
            const { restaurant_id } = req.params;
            const { result } = await this.restaurantService.deleteProfileImage({ restaurant_id });
            res.status(200).json({ status: 200, result });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 500, result: '오류가 발생했습니다' });
        }
    };
}

module.exports = RestaurantsController;
