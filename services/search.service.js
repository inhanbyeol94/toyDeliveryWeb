const MenuRepository = require('../repositories/menus.repository');
const KeywordRepository = require('../repositories/keywords.repository');
const RestaurantRepository = require('../repositories/restaurants.repository');
const ReviewRepository = require('../repositories/reviews.repository');
class RestaurantService {
    menuRepository = new MenuRepository();
    keywordRepository = new KeywordRepository();
    restaurantRepository = new RestaurantRepository();
    reviewRepository = new ReviewRepository();

    keyword = async (keyword) => {
        const findAll = await this.keywordRepository.findAll();

        //전체 키워드 중 검색한 키워드가 포함된 경우
        const findKeyword = await findAll.filter((key) => {
            if (key.keyword.search(keyword) > -1) return key.restaurant_id;
        });

        let restaurants = [];
        for (let key of findKeyword) {
            const restaurant = await this.restaurantRepository.findRestaurantId({ restaurant_id: key.restaurant_id });
            restaurants.push(restaurant);
        }

        let findAllKeyword = [];
        let findStar = [];
        for (let r of restaurants) {
            const restaurantFindAllKeyword = await this.keywordRepository.findAllKeyword(r.restaurant_id);
            findAllKeyword.push(restaurantFindAllKeyword);
            const restaurantFindAllReview = await this.reviewRepository.findOneRestaurantReviews(r.restaurant_id);
            findStar.push(restaurantFindAllReview);
        }

        return restaurants.map((restaurant) => {
            return {
                restaurant_id: restaurant.restaurant_id,
                restaurant_name: restaurant.name,
                restaurant_number: restaurant.tel,
                restaurant_address: restaurant.address,
                restaurant_keyword: findAllKeyword,
                restaurant_star: findStar,
                desc: restaurant.desc,
                created_at: restaurant.created_at,
                updated_at: restaurant.updated_at,
            };
        });
    };

    menu = async (menu) => {
        const findAll = await this.menuRepository.findAll();

        const findMenu = await findAll.filter((m) => {
            if (m.name.search(menu) > -1) {
                return m.restaurant_id;
            }
        });

        let restaurants = [];
        for (let key of findMenu) {
            const restaurant = await this.restaurantRepository.findRestaurantId({ restaurant_id: key.restaurant_id });
            restaurants.push(restaurant);
        }

        let findAllKeyword = [];
        for (let r of restaurants) {
            const restaurantFindAllKeyword = await this.keywordRepository.findAllKeyword(r.restaurant_id);
            findAllKeyword.push(restaurantFindAllKeyword);
        }
        return restaurants.map((restaurant) => {
            return {
                restaurant_id: restaurant.restaurant_id,
                restaurant_name: restaurant.name,
                restaurant_number: restaurant.tel,
                restaurant_address: restaurant.address,
                restaurant_keyword: findAllKeyword,
                desc: restaurant.desc,
                created_at: restaurant.created_at,
                updated_at: restaurant.updated_at,
            };
        });
    };

    //일단 카테고리는 키워드에 저장해서 그걸 가져다 쓰기로 함.
    category = async (category) => {
        //0:한식, 1:분식, 2:카페&디저트, 3:치킨, 4:피자, 5:아시안, 6:양식, 7:일식, 8:중식
        const findAll = await this.restaurantRepository.findAllRestaurant();
        let num = 0;
        if ('한식'.search(category) > -1) num = 0;
        else if ('분식'.search(category) > -1) num = 1;
        else if ('카페&디저트'.search(category) > -1) num = 2;
        else if ('치킨'.search(category) > -1 || category.search('치킨') > -1) num = 3;
        else if ('피자'.search(category) > -1 || category.search('피자') > -1) num = 4;
        else if ('아시안'.search(category) > -1) num = 5;
        else if ('양식'.search(category) > -1) num = 6;
        else if ('일식'.search(category) > -1) num = 7;
        else if ('중식'.search(category) > -1 || '중국집'.search(category) > -1) num = 8;

        const findCategory = await findAll.filter((n) => n.category == num);

        let findAllKeyword = [];
        for (let r of findCategory) {
            const restaurantFindAllKeyword = await this.keywordRepository.findAllKeyword(r.restaurant_id);
            findAllKeyword.push(restaurantFindAllKeyword);
        }
        return findCategory.map((restaurant) => {
            return {
                restaurant_id: restaurant.restaurant_id,
                restaurant_name: restaurant.name,
                restaurant_number: restaurant.tel,
                restaurant_address: restaurant.address,
                restaurant_keyword: findAllKeyword,
                desc: restaurant.desc,
                created_at: restaurant.created_at,
                updated_at: restaurant.updated_at,
            };
        });
    };
}

module.exports = RestaurantService;
