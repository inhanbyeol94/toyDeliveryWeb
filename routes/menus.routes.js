const express = require('express');
const router = express.Router();

const MenuConstroller = require('../controllers/menus.controller');
const menuConstroller = new MenuConstroller();

// router.get('/restaurant/:restaurant_id/menu', menuConstroller.getMenu);
// router.post('/restaurant/:restaurant_id/menu', menuConstroller.createMenu);
// router.put('/restaurant/:restaurant_id/menu/menu_id', menuConstroller.updateMenu);
// router.delete('/restaurant/:restaurant_id/menu/menu_id', menuConstroller.deleteMenu);

module.exports = router;
