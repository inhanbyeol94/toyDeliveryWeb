const express = require('express');
const router = express.Router();

const ViewController = require('../controllers/views.controller');
const viewController = new ViewController();

router.post('/restaurant/search', viewController.searchRestaurant);

module.exports = router;
