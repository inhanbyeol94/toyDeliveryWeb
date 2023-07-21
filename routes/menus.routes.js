const express = require('express');
const router = express.Router();

const { adminAuthMiddleware } = require('../middlewares/api.auth.middleware');
const MenuController = require('../controllers/menus.controller');
const menuController = new MenuController();

router.get('/restaurant/:restaurant_id/menu/:menu_id', menuController.getMenu);
router.get('/restaurant/:restaurant_id/menu', menuController.getMenuList);
router.post('/restaurant/menu', adminAuthMiddleware, menuController.createMenu);
router.put('/restaurant/:restaurant_id/menu/:menu_id', adminAuthMiddleware, menuController.updateMenu);
router.delete('/restaurant/:restaurant_id/menu/:menu_id', adminAuthMiddleware, menuController.deleteMenu);

module.exports = router;
