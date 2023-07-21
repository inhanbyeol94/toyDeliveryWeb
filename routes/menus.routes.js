const express = require('express');
const router = express.Router();

const { adminAuthMiddleware } = require('../middlewares/api.auth.middleware');
const MenuController = require('../controllers/menus.controller');
const { Menuvalidation } = require('../middlewares/validations/menus.validation');

const menuController = new MenuController();

router.get('/restaurant/:restaurant_id/menu/:menu_id', menuController.getMenu);
router.get('/restaurant/:restaurant_id/menu', menuController.getMenuList);
router.post('/restaurant/menu', Menuvalidation, adminAuthMiddleware, menuController.createMenu);
router.put('/restaurant/menu/:menu_id', Menuvalidation, adminAuthMiddleware, menuController.updateMenu);
router.delete('/restaurant/menu/:menu_id', adminAuthMiddleware, menuController.deleteMenu);

module.exports = router;
