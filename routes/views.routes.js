const express = require('express');
const router = express.Router();

const { nonAuthMiddleware } = require('../middlewares/auth.middleware');

const ViewController = require('../controllers/views.controller');
const viewController = new ViewController();

router.get('/', viewController.index);
router.get('/login', nonAuthMiddleware, viewController.login);
router.get('/signup', nonAuthMiddleware, viewController.signUp);
router.get('/profile', nonAuthMiddleware, viewController.profile);
router.get('/view/restaurant', nonAuthMiddleware, viewController.restaurant);

module.exports = router;
