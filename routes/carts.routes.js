const express = require('express');
const router = express.Router();

const CartController = require('../controllers/carts.controller');
const cartController = new CartController();

router.post('/restaurant/:restaurant_id/cart', cartController.addToCart);
router.get('/restaurant/:restaurant_id/cart', cartController.getCartList);

module.exports = router;
