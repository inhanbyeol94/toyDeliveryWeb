const MenuService = require('../services/menus.service');

class MenusController {
    menuService = new MenuService();

    getMenuList = async (req, res, next) => {
        const { restaurant_id } = req.params;
        const menus = await this.menuService.findAllMenu(restaurant_id);
        res.status(200).json({ data: menus });
    };

    getMenu = async (req, res, next) => {
        const { restaurant_id, menu_id } = req.params;
        const menu = await this.menuService.findMenu(restaurant_id, menu_id);
        res.status(200).json({ data: menu });
    };

    createMenu = async (req, res, next) => {
        const { restaurant_id } = req.params;
        const { name, price, image } = req.body;
        const createMenu = await this.menuService.createMenu(name, price, image);
        res.status(201).json({ data: createMenu });
    };

    updateMenu = async (req, res, next) => {
        const { restaurant_id, menu_id } = req.params;
        const { name, price, image } = req.body;
        const updateMenu = await this.menuService.updateMenu(restaurant_id, menu_id, name, price, image);

        res.status(200).json({ data: updateMenu });
    };

    deleteMenu = async (req, res, next) => {
        const { restaurant_id, menu_id } = req.params;
        const deleteMenu = await this.menuService.deleteMenu(restaurant_id, menu_id);

        res.status(200).json({ data: deleteMenu });
    };
}

module.exports = MenusController;
