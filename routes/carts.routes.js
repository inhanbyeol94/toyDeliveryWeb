const express = require('express');
const router = express.Router();

const CartController = require('../controllers/carts.controller');
const cartController = new CartController();

const { allAuthMiddleware, nonAuthMiddleware } = require('../middlewares/api.auth.middleware');

router.post('/restaurant/:restaurant_id/cart', allAuthMiddleware, cartController.addCart);
router.get('/restaurant/:restaurant_id/cart', allAuthMiddleware, cartController.getCart);
router.delete('/restaurant/:itemId/cart', allAuthMiddleware, cartController.deleteItem);
router.get('/getRecentCart', allAuthMiddleware, cartController.getRecentCart);

module.exports = router;
