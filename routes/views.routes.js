const express = require('express');
const router = express.Router();

const ViewController = require('../controllers/views.controller');
const viewController = new ViewController();

module.exports = router;
