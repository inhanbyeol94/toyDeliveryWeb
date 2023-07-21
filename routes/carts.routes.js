const express = require('express');
const router = express.Router();

const CartController = require('../controllers/carts.controller');
const cartController = new CartController();

const { allAuthMiddleware, nonAuthMiddleware } = require('../middlewares/api.auth.middleware');

router.post('/restaurant/:restaurant_id/cart', allAuthMiddleware, cartController.addItem);
router.get('/restaurant/:restaurant_id/cart', allAuthMiddleware, cartController.getCart);
router.delete('/restaurant/:itemId/cart', allAuthMiddleware, cartController.deleteItem);
router.get('/getCurrentCart', allAuthMiddleware, cartController.getCurrentCart);

module.exports = router;
