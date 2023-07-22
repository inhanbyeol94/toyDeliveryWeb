const express = require('express');
const router = express.Router();

const { adminAuthMiddleware } = require('../middlewares/api.auth.middleware');
const MenuController = require('../controllers/menus.controller');
const { menuValidation } = require('../middlewares/validations/menus.validation');
const imageUploader = require('../imageUploader');
const menuController = new MenuController();

router.get('/restaurant/:restaurant_id/menu/:menu_id', menuController.getMenu);
router.get('/restaurant/:restaurant_id/menu', menuController.getMenuList);
router.post('/restaurant/menu', menuValidation, adminAuthMiddleware, menuController.createMenu);
router.put('/restaurant/menu/:menu_id', menuValidation, adminAuthMiddleware, menuController.updateMenu);
router.delete('/restaurant/menu/:menu_id', adminAuthMiddleware, menuController.deleteMenu);
router.post('/menu/:menu_id/image', adminAuthMiddleware, imageUploader.single('image'), menuController.updateMenuImage);
router.delete('/menu/:menu_id/image', adminAuthMiddleware, menuController.deleteMenuImage);

module.exports = router;
