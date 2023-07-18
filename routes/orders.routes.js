const express = require('express');
const router = express.Router();

const OrdersController = require('../controllers/orders.controller');
const orderController = new OrdersController();

router.post('/restaurant/:restaurant_id/order', orderController.orderItem);
router.get('/restaurant/:restaurant_id/order', orderController.orderCheck);
router.put('/restaurant/:restaurant_id/order', orderController.orderUpdate);

module.exports = router;
