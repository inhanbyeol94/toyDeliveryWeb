const express = require('express');
const router = express.Router();

const { nonAuthMiddleware } = require('../middlewares/auth.middleware');

const ViewController = require('../controllers/views.controller');
const viewController = new ViewController();

router.get('/', viewController.index);
router.get('/login', nonAuthMiddleware, viewController.login);
router.get('/signup', nonAuthMiddleware, viewController.signUp);
router.get('/orderAdmin', nonAuthMiddleware, viewController.orderAdmin); //나중에 매장관리자만 입장가능

module.exports = router;
