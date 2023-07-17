const RestaurantService = require('../services/restaurants.service');

class RestaurantsController {
    restaurantService = RestaurantService;

    getRestaurantList = async (req, res, next) => {
        const restaurants = await this.restaurantService.findAllRestaurant();
        res.status(200).json({ data: restaurants });
    };

    getRestaurant = async (req, res, next) => {
        const { restaurant_id } = req.params;
        const restaurant = await this.restaurantService.findRestaurant(restaurant_id);
        res.status(200).json({ data: restaurant });
    };

    createRestaurant = async (req, res, next) => {
        const { name, address, tel, desc, image } = req.body;

        const createRestaurant = await this.restaurantService.createRestaurant(name, address, tel, desc, image);
        res.status(201).json({ data: createRestaurant });
    };

    updateRestaurant = async (req, res, next) => {
        const { restaurant_id } = req.params;
        const { name, address, tel, desc, image } = req.body;
        const updateRestaurant = await this.restaurantService.updateRestaurant(restaurant_id, name, address, tel, desc, image);

        res.status(200).json({ data: updateRestaurant });
    };

    deleteRestaurant = async (req, res, next) => {
        const { restaurant_id } = req.params;
        const deleteRestaurant = await this.restaurantService.deleteRestaurant(restaurant_id);

        res.status(200).json({ data: deleteRestaurant });
    };

    searchRestaurant = async (req, res, next) => {
        const { searchFindings } = req.params;
        const searchRestaurant = await this.restaurantService.searchRestaurant(searchFindings);

        res.status(200).json({ data: searchRestaurant });
    };
}

module.exports = RestaurantsController;
