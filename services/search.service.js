const RestaurantRepository = require('../repositories/restaurants.repository');
const MenuRepository = require('../repositories/menus.repository');
const KeywordRepository = require('../repositories/keywords.repository');
class RestaurantService {
    restaurantRepository = new RestaurantRepository();
    menuRepository = new MenuRepository();
    keywordRepository = new KeywordRepository();

    keyword = async (keyword) => {
        const findKeyword = await this.keywordRepository.findAllKeyword(keyword);

        findKeyword.sort((a, b) => {
            return b.created_at - a.created_at;
        });

        const searchKeyword = await findKeyword.map((key) => {
            return this.keywordRepository.searchKeyword(key.keyword, key.restaurant_id);
        });

        return searchKeyword.map((key) => {
            return {
                restaurant_id: key.restaurant.restaurant_id,
                restaurant_name: key.restaurant.name,
                restaurant_number: key.restaurant.tel,
                restaurant_address: key.restaurant.address,
                desc: key.restaurant.desc,
                created_at: key.restaurant.created_at,
                updated_at: key.restaurant.updated_at,
            };
        });
    };

    //레스토랑, 메뉴 변경 필요
    menu = async (menu) => {
        const findMenu = await this.menuRepository.findOne(menu);

        findMenu.sort((a, b) => {
            return b.created_at - a.created_at;
        });

        const searchKeyword = await findMenu.map((key) => {
            return this.menuRepository.searchMenu(key.keyword, key.restaurant_id);
        });

        return searchKeyword.map((key) => {
            return {
                restaurant_id: key.restaurant.restaurant_id,
                restaurant_name: key.restaurant.name,
                restaurant_number: key.restaurant.tel,
                restaurant_address: key.restaurant.address,
                desc: key.restaurant.desc,
                created_at: key.restaurant.created_at,
                updated_at: key.restaurant.updated_at,
            };
        });
    };
}

module.exports = RestaurantService;
