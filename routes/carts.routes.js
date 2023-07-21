const express = require('express');
const router = express.Router();

const CartController = require('../controllers/carts.controller');
const cartController = new CartController();

router.post('/restaurant/:restaurant_id/cart', cartController.addCart);
router.get('/restaurant/:restaurant_id/cart', cartController.getCart);
router.delete('/restaurant/:restaurant_id/cart', cartController.deleteItem);

module.exports = router;
