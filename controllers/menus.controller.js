const MenuService = require('../services/menus.service');

class MenusController {
    menuService = new MenuService();

    getMenuList = async (req, res, next) => {
        const { restaurant_id } = req.params;
        const menus = await this.menuService.findAllMenu(restaurant_id);
        res.status(200).json({ menus });
    };

    getMenu = async (req, res, next) => {
        const { restaurant_id, menu_id } = req.params;
        const menu = await this.menuService.findMenu(restaurant_id, menu_id);
        res.status(200).json({ menu });
    };

    createMenu = async (req, res, next) => {
        const { restaurant_id } = req.params;
        const { member_id } = req.session.user;
        const { name, price, image } = req.body;
        try {
            const createMenu = await this.menuService.createMenu(restaurant_id, member_id, name, price, image);
            res.status(201).json({ data: createMenu });
        } catch (error) {
            res.status(400).json({ errorMessage: Error });
        }
    };

    updateMenu = async (req, res, next) => {
        const { restaurant_id, menu_id } = req.params;
        const { name, price, image } = req.body;
        const { member_id } = req.session.user;
        try {
            const updateMenu = await this.menuService.updateMenu(restaurant_id, member_id, menu_id, name, price, image);
            res.status(200).json({ data: updateMenu });
        } catch (error) {
            res.status(400).json({ errorMessage: Error });
        }
    };

    deleteMenu = async (req, res, next) => {
        const { restaurant_id, menu_id } = req.params;
        const { member_id } = req.session.user;
        try {
            const deleteMenu = await this.menuService.deleteMenu(restaurant_id, member_id, menu_id);
            res.status(200).json({ data: deleteMenu });
        } catch (error) {
            res.status(400).json({ errorMessage: Error });
        }
    };
}

module.exports = MenusController;
