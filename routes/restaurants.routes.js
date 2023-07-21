const express = require('express');
const router = express.Router();

const RestaurantController = require('../controllers/restaurants.controller');
const restaurantController = new RestaurantController();
const imageUploader = require('../imageUploader');

const { adminAuthMiddleware } = require('../middlewares/api.auth.middleware');
const { restaurantValidation } = require('../middlewares/validations/restaurants.validation');

router.get('/restaurant', restaurantController.getRestaurantList);
router.get('/restaurant/:restaurant_id', restaurantController.getRestaurant);
router.post('/restaurant', restaurantValidation, adminAuthMiddleware, restaurantController.createRestaurant);
router.put('/restaurant/:restaurant_id', restaurantValidation, adminAuthMiddleware, restaurantController.updateRestaurant);
router.delete('/restaurant/:restaurant_id', adminAuthMiddleware, restaurantController.deleteRestaurant);
router.post('/restaurant/:restaurant_id/image', adminAuthMiddleware, imageUploader.single('image'), restaurantController.updateRestaurantImg);
router.delete('/restaurant/:restaurant_id/image', adminAuthMiddleware, restaurantController.deleteRestaurantImg);

module.exports = router;
