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
        const { member_id } = req.session.user;
        const { name, price, image } = req.body;
        try {
            const { code, result } = await this.menuService.createMenu(member_id, name, price, image);
            res.status(code).json({ result });
        } catch (error) {
            res.status(400).json({ errorMessage: Error });
        }
    };

    updateMenu = async (req, res, next) => {
        const { menu_id } = req.params;
        const { name, price, image } = req.body;
        const { member_id } = req.session.user;
        try {
            const { code, result } = await this.menuService.updateMenu(member_id, menu_id, name, price, image);
            res.status(code).json({ result });
        } catch (error) {
            res.status(400).json({ errorMessage: Error });
        }
    };

    deleteMenu = async (req, res, next) => {
        const { menu_id } = req.params;
        const { member_id } = req.session.user;
        try {
            const { code, result } = await this.menuService.deleteMenu(member_id, menu_id);
            res.status(code).json(result);
        } catch (error) {
            res.status(400).json({ errorMessage: Error });
        }
    };
}

module.exports = MenusController;
