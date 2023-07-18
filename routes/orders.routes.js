const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/orders.controller');
const orderController = new OrderController();

// router.post('/restaurant/:restaurant_id/order', orderController.orderItem);
// router.put('/restaurant/:restaurant_id/order', orderController.orderCheck);

module.exports = router;
