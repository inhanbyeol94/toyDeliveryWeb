const MenuRepository = require('../repositories/menus.repository');
const RestaurantRepository = require('../repositories/restaurants.repository');

class MenuService {
    menuRepository = new MenuRepository();
    restaurantRepository = new RestaurantRepository();

    findAllMenu = async (restaurant_id) => {
        const allMenu = await this.menuRepository.findAllMenu(restaurant_id);

        allMenu.sort((a, b) => {
            return b.createAt - a.createAt;
        });
        const menus = allMenu.map((menu) => {
            return {
                menu_id: menu.menu_id,
                name: menu.name,
                price: menu.price,
                image: menu.image,
                createdAt: menu.createdAt,
                updatedAt: menu.updatedAt,
            };
        });

        return menus;
    };

    findMenu = async (restaurant_id, menu_id) => {
        const findmenu = await this.menuRepository.findMenuId(restaurant_id, menu_id);
        const menu = {
            menu_id: findmenu.menu_id,
            name: findmenu.name,
            price: findmenu.price,
            image: findmenu.image,
            createdAt: findmenu.createdAt,
            updatedAt: findmenu.updatedAt,
        };
        return menu;
    };

    createMenu = async (restaurant_id, name, price, image) => {
        const createMenu = await this.menuRepository.createMenu(restaurant_id, name, price, image);
        return {
            menu_id: createMenu.menu_id,
            restaurant_id: createMenu.restaurant_id,
            name: createMenu.name,
            price: createMenu.price,
            image: createMenu.image,
            createdAt: createMenu.createdAt,
            updatedAt: createMenu.updatedAt,
        };
    };

    updateMenu = async (restaurant_id, member_id, menu_id, name, price, image) => {
        const findMenu = await this.menuRepository.findMenuId(restaurant_id, menu_id);
        const findMember = await this.restaurantRepository.findMemberId(restaurant_id);
        if (!findMenu) throw new Error("Menu doesn't exist");
        if (findMember.member_id !== member_id) throw new Error('권한이 없습니다.');

        await this.menuRepository.updateMenu(restaurant_id, menu_id, name, price, image);

        const updateMenu = await this.menuRepository.findMenuId(restaurant_id, menu_id);

        return {
            menu_id: updateMenu.menu_id,
            name: updateMenu.name,
            price: updateMenu.price,
            image: updateMenu.image,
            createdAt: updateMenu.createdAt,
            updatedAt: updateMenu.updatedAt,
        };
    };

    deleteMenu = async (restaurant_id, member_id, menu_id) => {
        const findMenu = await this.menuRepository.findMenuId(restaurant_id, menu_id);
        const findMember = await this.restaurantRepository.findMemberId(restaurant_id);

        if (!findMenu) throw new Error("Menu doesn't exist");
        if (findMember.member_id !== member_id) throw new Error('권한이 없습니다.');

        await this.menuRepository.deleteMenu(restaurant_id, menu_id);

        return {
            menu_id: findMenu.menu_id,
            name: findMenu.name,
        };
    };
}

module.exports = MenuService;
