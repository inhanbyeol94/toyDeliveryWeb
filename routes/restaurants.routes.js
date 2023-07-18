const express = require('express');
const router = express.Router();

const RestaurantController = require('../controllers/restaurants.controller');
const restaurantController = new RestaurantController();

const { adminAuthMiddleware } = require('../middlewares/auth.middleware');
const { restaurantValidation } = require('../middlewares/validations/restaurants.validation');

router.get('/restaurant', restaurantController.getRestaurantList);
router.get('/restaurant/:restaurant_id', restaurantController.getRestaurant);
router.post('/restaurant', restaurantValidation, adminAuthMiddleware, restaurantController.createRestaurant);
router.put('/restaurant/:restaurant_id', restaurantValidation, adminAuthMiddleware, restaurantController.updateRestaurant);
router.delete('/restaurant/:restaurant_id', adminAuthMiddleware, restaurantController.deleteRestaurant);
// router.post('/restaurant/search', restaurantController.searchRestaurant);

module.exports = router;
