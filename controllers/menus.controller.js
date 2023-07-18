const MenuService = require('../services/menus.service');

class MenusController {
    menuService = new MenuService();
}

module.exports = MenusController;
