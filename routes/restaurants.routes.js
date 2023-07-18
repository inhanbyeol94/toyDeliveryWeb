const express = require('express');
const router = express.Router();

const RestaurantController = require('../controllers/restaurants.controller');
const restaurantController = new RestaurantController();

// router.get('/restaurant', restaurantController.getRestaurant);
// router.post('/restaurant', restaurantController.createRestaurant);
// router.put('/restaurant/:restaurant_id', restaurantController.updateRestaurant);
// router.delete('/restaurant/:restaurant_id', restaurantController.deleteMember);
// router.post('/restaurant/search', restaurantController.searchRestaurant);

module.exports = router;
