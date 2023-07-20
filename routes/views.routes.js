const express = require('express');
const router = express.Router();

const { nonAuthMiddleware, allAuthMiddleware, userAuthMiddleware, adminAuthMiddleware } = require('../middlewares/view.auth.middleware');

const ViewController = require('../controllers/views.controller');
const viewController = new ViewController();

router.get('/', viewController.index);
router.get('/login', nonAuthMiddleware, viewController.login);
router.get('/signup', nonAuthMiddleware, viewController.signUp);
router.get('/orderAdmin', adminAuthMiddleware, viewController.orderAdmin);
router.get('/profile', allAuthMiddleware, viewController.profile);
router.get('/menuAdmin', adminAuthMiddleware, viewController.menuAdmin);
router.get('/storeList', allAuthMiddleware, viewController.storeList);
router.get('/orderHistory', allAuthMiddleware, viewController.orderHistory);

module.exports = router;
