const MenuService = require('../services/menus.service');

class MenusController {
    menuService = new MenuService();

    //** 레스토랑 전체 메뉴 불러오기 */
    getMenuList = async (req, res) => {
        try {
            const { restaurant_id } = req.params;
            const { status, message, result } = await this.menuService.findAllMenu(restaurant_id);

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 레스토랑 단일 메뉴 불러오기 */
    getMenu = async (req, res) => {
        try {
            const { restaurant_id, menu_id } = req.params;
            const { status, message, result } = await this.menuService.findMenu(restaurant_id, menu_id);

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 레스토랑 메뉴 생성 */
    createMenu = async (req, res) => {
        try {
            const { member_id } = req.session.user;
            const { name, price, image } = req.body;
            const { status, message, result } = await this.menuService.createMenu(member_id, name, price, image);

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 레스토랑 특정 메뉴 수정 */
    updateMenu = async (req, res) => {
        try {
            const { menu_id } = req.params;
            const { name, price, image } = req.body;
            const { member_id } = req.session.user;
            const { status, message, result } = await this.menuService.updateMenu(member_id, menu_id, name, price, image);

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 레스토랑 특정 메뉴 삭제 */
    deleteMenu = async (req, res) => {
        try {
            const { menu_id } = req.params;
            const { member_id } = req.session.user;
            const { status, message, result } = await this.menuService.deleteMenu(member_id, menu_id);

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };
    //** 메뉴 사진 추가 */
    updateMenuImage = async (req, res) => {
        try {
            const image = req.file.location;
            const { menu_id } = req.params;
            const { status, message, result } = await this.menuService.updateMenuImage({ image, menu_id });

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 메뉴 사진 삭제 */
    deleteMenuImage = async (req, res) => {
        try {
            const { menu_id } = req.params;
            const { status, message, result } = await this.menuService.deleteMenuImage({ menu_id });

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };
}

module.exports = MenusController;
