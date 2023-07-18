const express = require('express');
const router = express.Router();

const MenuController = require('../controllers/menus.controller');
const menuController = new MenuController();

router.get('/restaurant/:restaurant_id/menu', menuController.getMenuList);
router.get('/restaurant/:restaurant_id/menu/menu_id', menuController.getMenu);
router.post('/restaurant/:restaurant_id/menu', menuController.createMenu);
router.put('/restaurant/:restaurant_id/menu/:menu_id', menuController.updateMenu);
router.delete('/restaurant/:restaurant_id/menu/:menu_id', menuController.deleteMenu);

module.exports = router;
