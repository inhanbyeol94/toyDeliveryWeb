const express = require('express');
const router = express.Router();

const RestaurantController = require('../controllers/restaurants.controller');
const restaurantController = new RestaurantController();
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/restaurant', restaurantController.getRestaurantList);
router.get('/restaurant/:restaurant_id', restaurantController.getRestaurant);
router.post('/restaurant', authMiddleware, restaurantController.createRestaurant);
router.put('/restaurant/:restaurant_id', authMiddleware, restaurantController.updateRestaurant);
router.delete('/restaurant/:restaurant_id', authMiddleware, restaurantController.deleteRestaurant);
// router.post('/restaurant/search', restaurantController.searchRestaurant);

module.exports = router;
