const express = require('express');
const router = express.Router();

const { nonAuthMiddleware, allAuthMiddleware, userAuthMiddleware, adminAuthMiddleware } = require('../middlewares/view.auth.middleware');

const ViewController = require('../controllers/views.controller');
const viewController = new ViewController();

router.get('/', viewController.index);
router.get('/login', nonAuthMiddleware, viewController.login);
router.get('/signup', nonAuthMiddleware, viewController.signUp);
router.get('/orderAdmin', adminAuthMiddleware, viewController.orderAdmin); //나중에 매장관리자만 입장가능
router.get('/profile', allAuthMiddleware, viewController.profile);
router.get('/menuAdmin', adminAuthMiddleware, viewController.menuAdmin); //나중에 매장관리자만 입장가능

module.exports = router;
