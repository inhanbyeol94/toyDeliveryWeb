const express = require('express');
const router = express.Router();

const OrdersController = require('../controllers/orders.controller');
const orderController = new OrdersController();

// router.get('/restaurant/:restaurant_id/order', orderController.orderCheck);
router.get('/restaurant/order', orderController.orderCheck);
router.get('/restaurant/order/:orderId', orderController.findByOrder);
router.get('/member/order', orderController.findMemberOrder);
router.put('/restaurant/:order_id/order', orderController.orderUpdate);
router.post('/restaurant/cart/:cart_id/order', orderController.orderCart);

module.exports = router;
