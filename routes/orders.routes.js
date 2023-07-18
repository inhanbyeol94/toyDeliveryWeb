const express = require('express');
const router = express.Router();

const OrderConstroller = require('../controllers/orders.controller');
const orderConstroller = new OrderConstroller();

// router.post('/restaurant/:restaurant_id/order', orderConstroller.orderItem);
// router.put('/restaurant/:restaurant_id/order', orderConstroller.orderCheck);

module.exports = router;
