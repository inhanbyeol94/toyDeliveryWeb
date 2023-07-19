const express = require('express');
const router = express.Router();

const MenuController = require('../controllers/menus.controller');
const menuController = new MenuController();
const { adminAuthMiddleware } = require('../middlewares/auth.middleware');
const { menuValidation } = require('../middlewares/validations/menus.validation');

router.get('/restaurant/:restaurant_id/menu', menuController.getMenuList);
router.get('/restaurant/:restaurant_id/menu/:menu_id', menuController.getMenu);
router.post('/restaurant/:restaurant_id/menu', menuValidation, adminAuthMiddleware, menuController.createMenu);
router.put('/restaurant/:restaurant_id/menu/:menu_id', menuValidation, adminAuthMiddleware, menuController.updateMenu);
router.delete('/restaurant/:restaurant_id/menu/:menu_id', adminAuthMiddleware, menuController.deleteMenu);

module.exports = router;
