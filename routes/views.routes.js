const express = require('express');
const router = express.Router();

const { nonAuthMiddleware, allAuthMiddleware } = require('../middlewares/api.auth.middleware');

const ViewController = require('../controllers/views.controller');
const viewController = new ViewController();

router.get('/', viewController.index);
router.get('/login', nonAuthMiddleware, viewController.login);
router.get('/signup', nonAuthMiddleware, viewController.signUp);
router.get('/profile', allAuthMiddleware, viewController.profile);

module.exports = router;
