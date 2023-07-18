const MenuRepository = require('../repositories/menus.repository');
const KeywordRepository = require('../repositories/keywords.repository');
const RestaurantRepository = require('../repositories/restaurants.repository');
class RestaurantService {
    menuRepository = new MenuRepository();
    keywordRepository = new KeywordRepository();
    restaurantRepository = new RestaurantRepository();

    keyword = async (keyword) => {
        const findAll = await this.keywordRepository.findAll();

        //전체 키워드 중 검색한 키워드가 포함된 경우
        const findKeyword = await findAll.map((key) => {
            if (key.keyword.search(keyword) > -1) {
                return this.keywordRepository.searchKeyword(key.keyword);
            }
        });
        findKeyword.sort((a, b) => {
            return b.created_at - a.created_at;
        });

        return findKeyword.map((key) => {
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

    menu = async (menu) => {
        const findAll = await this.menuRepository.findAll();

        const findMenu = await findAll.map((m) => {
            if (m.name.search(menu) > -1) {
                return this.menuRepository.searchMenu(m.name);
            }
        });

        findMenu.sort((a, b) => {
            return b.created_at - a.created_at;
        });

        return findMenu.map((menu) => {
            return {
                restaurant_id: menu.restaurant.restaurant_id,
                restaurant_name: menu.restaurant.name,
                restaurant_number: menu.restaurant.tel,
                restaurant_address: menu.restaurant.address,
                desc: menu.restaurant.desc,
                created_at: menu.restaurant.created_at,
                updated_at: menu.restaurant.updated_at,
            };
        });
    };

    //카테고리는 보류
    // category = async (category) => {
    //     const findAll = await this.restaurantRepository.findAll();

    //     const findMenu = await findAll.map((c) => {
    //         if (c.category.search(category) > -1) {
    //             return this.restaurantRepository.searchCategory(c.category);
    //         }
    //     });

    //     findMenu.sort((a, b) => {
    //         return b.created_at - a.created_at;
    //     });

    //     return findMenu.map((category) => {
    //         return {
    //             restaurant_id: category.restaurant_id,
    //             restaurant_name: category.name,
    //             restaurant_number: category.tel,
    //             restaurant_address: category.address,
    //             desc: category.desc,
    //             created_at: category.created_at,
    //             updated_at: category.updated_at,
    //         };
    //     });
    // };
}

module.exports = RestaurantService;
