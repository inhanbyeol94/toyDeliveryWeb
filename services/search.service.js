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

    //일단 카테고리는 키워드에 저장해서 그걸 가져다 쓰기로 함.
    category = async (category) => {
        //0:한식, 1:분식, 2:카페&디저트, 3:치킨, 4:피자, 5:아시안, 6:양식, 7:일식, 8:중식
        const findAll = await this.restaurantRepository.findAll();
        let num = 0;
        if ('한식'.search(category) > -1) num = 0;
        else if ('분식'.search(category) > -1) num = 1;
        else if ('카페&디저트'.search(category) > -1) num = 2;
        else if ('치킨'.search(category) > -1) num = 3;
        else if ('피자'.search(category) > -1) num = 4;
        else if ('아시안'.search(category) > -1) num = 5;
        else if ('양식'.search(category) > -1) num = 6;
        else if ('일식'.search(category) > -1) num = 7;
        else if ('중식'.search(category) > -1 || '중국집'.search(category) > -1) num = 8;

        const findCategory = await findAll.map(() => {
            return this.restaurantRepository.searchCategory(num);
        });

        findCategory.sort((a, b) => {
            return b.created_at - a.created_at;
        });

        return findCategory.map((restaurant) => {
            return {
                restaurant_id: restaurant.restaurant_id,
                restaurant_name: restaurant.name,
                restaurant_number: restaurant.tel,
                restaurant_address: restaurant.address,
                desc: restaurant.desc,
                created_at: restaurant.created_at,
                updated_at: restaurant.updated_at,
            };
        });
    };
}

module.exports = RestaurantService;
