const express = require('express');
const router = express.Router();

const RestaurantController = require('../controllers/restaurants.controller');
const restaurantController = new RestaurantController();

const { adminAuthMiddleware } = require('../middlewares/api.auth.middleware');
const { restaurantValidation } = require('../middlewares/validations/restaurants.validation');

router.get('/restaurant', restaurantController.getRestaurantList);
router.get('/restaurant/:restaurant_id', restaurantController.getRestaurant);
router.get('/myrestaurant', adminAuthMiddleware, restaurantController.getMyrestaurant);
router.post('/restaurant', restaurantValidation, adminAuthMiddleware, restaurantController.createRestaurant);
router.put('/restaurant/:restaurant_id', restaurantValidation, adminAuthMiddleware, restaurantController.updateRestaurant);
router.delete('/restaurant/:restaurant_id', adminAuthMiddleware, restaurantController.deleteRestaurant);

module.exports = router;
