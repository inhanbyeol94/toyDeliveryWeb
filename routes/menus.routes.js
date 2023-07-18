const express = require('express');
const router = express.Router();

const MenuController = require('../controllers/menus.controller');
const menuController = new MenuController();
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/restaurant/:restaurant_id/menu', menuController.getMenuList);
router.get('/restaurant/:restaurant_id/menu/:menu_id', menuController.getMenu);
router.post('/restaurant/:restaurant_id/menu', authMiddleware, menuController.createMenu);
router.put('/restaurant/:restaurant_id/menu/:menu_id', authMiddleware, menuController.updateMenu);
router.delete('/restaurant/:restaurant_id/menu/:menu_id', authMiddleware, menuController.deleteMenu);

module.exports = router;
