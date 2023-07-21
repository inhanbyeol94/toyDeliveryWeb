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

    createMenu = async (member_id, name, price, image) => {
        const findMyrestaurant = await this.restaurantRepository.findRestaurantId({ member_id: member_id });
        const restaurant_id = findMyrestaurant.restaurant_id;
        await this.menuRepository.createMenu(restaurant_id, member_id, name, price, image);
        return { code: 201, result: '메뉴의 추가가 완료되었습니다.' };
    };

    updateMenu = async (member_id, menu_id, name, price, image) => {
        const findMyrestaurant = await this.restaurantRepository.findRestaurantId({ member_id: member_id });
        const restaurant_id = findMyrestaurant.restaurant_id;

        const findMenu = await this.menuRepository.findMenuId(restaurant_id, menu_id);
        if (!findMenu) throw new Error("Menu doesn't exist");

        await this.menuRepository.updateMenu(restaurant_id, menu_id, name, price, image);
        return { code: 200, result: '메뉴의 수정이 완료되었습니다.' };
    };

    deleteMenu = async (member_id, menu_id) => {
        const findMyrestaurant = await this.restaurantRepository.findRestaurantId({ member_id: member_id });
        const restaurant_id = findMyrestaurant.restaurant_id;
        const findMenu = await this.menuRepository.findMenuId(restaurant_id, menu_id);

        if (!findMenu) throw new Error("Menu doesn't exist");

        await this.menuRepository.deleteMenu(restaurant_id, menu_id);

        return { code: 200, result: '메뉴의 삭제가 완료되었습니다.' };
    };
}

module.exports = MenuService;
