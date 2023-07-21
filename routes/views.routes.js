const express = require('express');
const router = express.Router();

const { nonAuthMiddleware, allAuthMiddleware, userAuthMiddleware, adminAuthMiddleware, restaurant } = require('../middlewares/view.auth.middleware');

const ViewController = require('../controllers/views.controller');
const viewController = new ViewController();

router.get('/', viewController.index);
router.get('/login', nonAuthMiddleware, viewController.login);
router.get('/signup', nonAuthMiddleware, viewController.signUp);
router.get('/orderAdmin', adminAuthMiddleware, viewController.orderAdmin);
router.get('/profile', allAuthMiddleware, viewController.profile);
router.get('/menuAdmin', adminAuthMiddleware, viewController.menuAdmin);
router.get('/storeList', allAuthMiddleware, viewController.storeList);
// router.get('/storeList', nonAuthMiddleware, viewController.storeList); // 로그인 없이 테스트 중
router.get('/orderHistory', allAuthMiddleware, viewController.orderHistory);
router.get('/storeInfo/page/:restaurantId', adminAuthMiddleware, viewController.storeInfo);
router.get('/menuAdmin', adminAuthMiddleware, viewController.menuAdmin);
router.get('/restaurant/page/:restaurantId', allAuthMiddleware, viewController.restaurant);

module.exports = router;
