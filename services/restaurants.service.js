const RestaurantRepository = require('../repositories/restaurants.repository');

class RestaurantService {
    restaurantRepository = new RestaurantRepository();
    //
}

module.exports = RestaurantService;
