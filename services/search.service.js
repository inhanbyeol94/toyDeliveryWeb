const MenuRepository = require('../repositories/menus.repository');
const KeywordRepository = require('../repositories/keywords.repository');
const RestaurantRepository = require('../repositories/restaurants.repository');
const ReviewRepository = require('../repositories/reviews.repository');
const { ServiceReturn } = require('../customClass');
class SearchService {
    menuRepository = new MenuRepository();
    keywordRepository = new KeywordRepository();
    restaurantRepository = new RestaurantRepository();
    reviewRepository = new ReviewRepository();

    /** 키워드 검색시 해당 레스토랑 전체 조회 */
    keyword = async (keyword) => {
        const findAll = await this.keywordRepository.findAll();

        //전체 키워드 중 검색한 키워드가 포함된 경우
        const findKeyword = await findAll.filter((key) => {
            if (key.keyword.search(keyword) > -1) return key.restaurant_id;
        });

        //같은 레스토랑이 여러개 들어감. 수정함.
        let restaurants = [];
        for (let key of findKeyword) {
            const restaurant = await this.restaurantRepository.findRestaurantId({ restaurant_id: key.restaurant_id });

            if (restaurants.length > 0) {
                for (let i in restaurants) {
                    if (restaurant.restaurant_id != restaurants[i].restaurant_id) restaurants.push(restaurant);
                }
            } else restaurants.push(restaurant);
        }

        //여기가 문제인걸로 보임.
        let findAllKeyword = [];
        let findStar = [];
        for (let r of restaurants) {
            //각 레스토랑의 키워드들 [[{restaurant_id:1},{restaurant_id:1}],[{restaurant_id:2}]]로
            const restaurantFindAllKeyword = await this.keywordRepository.findAllKeyword(r.restaurant_id);
            let findKey = [];
            for (let key in restaurantFindAllKeyword) {
                findKey[key] = {
                    restaurantId: restaurantFindAllKeyword[key].restaurant_id,
                    keywordId: restaurantFindAllKeyword[key].keyword_id,
                    keyword: restaurantFindAllKeyword[key].keyword,
                };
            }
            findAllKeyword.push(findKey);

            //각 레스토랑의 리뷰들 [[{restaurant_id:1},{restaurant_id:1}],[{restaurant_id:2}]]로
            const restaurantFindAllReview = await this.reviewRepository.findAllReview(r.restaurant_id);
            let findReview = [];
            for (let review in restaurantFindAllReview) {
                findReview[review] = {
                    restaurantId: restaurantFindAllReview[review].restaurant_id,
                    reviewId: restaurantFindAllReview[review].review_id,
                    star: restaurantFindAllReview[review].star,
                };
            }
            findStar.push(findReview);
        }

        const result = restaurants.map((restaurant) => {
            return {
                restaurantId: restaurant.restaurant_id,
                restaurantName: restaurant.name,
                restaurantNumber: restaurant.tel,
                restaurantAddress: restaurant.address,
                restaurantKeyword: findAllKeyword,
                restaurantStar: findStar,
                restaurantImage: restaurant.image,
                desc: restaurant.desc,
                createdAt: restaurant.created_at,
                updatedAt: restaurant.updated_at,
            };
        });

        return new ServiceReturn('키워드로 레스토랑을 조회했습니다.', 200, result);
    };

    /** 메뉴 검색시 해당 레스토랑 전체 조회 */
    menu = async (menu) => {
        const findAll = await this.menuRepository.findAll();

        //전체 메뉴 중 검색한 메뉴가 포함된 경우
        const findMenu = await findAll.filter((m) => {
            if (m.name.search(menu) > -1) {
                return m.restaurant_id;
            }
        });

        //같은 레스토랑이 여러개 들어감. 수정함.
        let restaurants = [];
        for (let key of findMenu) {
            const restaurant = await this.restaurantRepository.findRestaurantId({ restaurant_id: key.restaurant_id });

            if (restaurants.length > 0) {
                for (let i in restaurants) {
                    if (restaurant.restaurant_id != restaurants[i].restaurant_id) restaurants.push(restaurant);
                }
            } else restaurants.push(restaurant);
        }

        //여기가 문제인걸로 보임.
        let findAllKeyword = [];
        let findStar = [];
        for (let r of restaurants) {
            //각 레스토랑의 키워드들 [[{restaurant_id:1},{restaurant_id:1}],[{restaurant_id:2}]]로
            const restaurantFindAllKeyword = await this.keywordRepository.findAllKeyword(r.restaurant_id);
            let findKey = [];
            for (let key in restaurantFindAllKeyword) {
                findKey[key] = {
                    restaurantId: restaurantFindAllKeyword[key].restaurant_id,
                    keywordId: restaurantFindAllKeyword[key].keyword_id,
                    keyword: restaurantFindAllKeyword[key].keyword,
                };
            }
            findAllKeyword.push(findKey);

            //각 레스토랑의 리뷰들 [[{restaurant_id:1},{restaurant_id:1}],[{restaurant_id:2}]]로
            const restaurantFindAllReview = await this.reviewRepository.findAllReview(r.restaurant_id);
            let findReview = [];
            for (let review in restaurantFindAllReview) {
                findReview[review] = {
                    restaurantId: restaurantFindAllReview[review].restaurant_id,
                    reviewId: restaurantFindAllReview[review].review_id,
                    star: restaurantFindAllReview[review].star,
                };
            }
            findStar.push(findReview);
        }

        const result = restaurants.map((restaurant) => {
            return {
                restaurantId: restaurant.restaurant_id,
                restaurantName: restaurant.name,
                restaurantNumber: restaurant.tel,
                restaurantAddress: restaurant.address,
                restaurantKeyword: findAllKeyword,
                restaurantStar: findStar,
                restaurantImage: restaurant.image,
                desc: restaurant.desc,
                createdAt: restaurant.created_at,
                updatedAt: restaurant.updated_at,
            };
        });

        return new ServiceReturn('메뉴로 레스토랑을 조회했습니다.', 200, result);
    };

    /** 카테고리 검색(선택)시 해당 레스토랑 전체 조회 */
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

        //여기가 문제인걸로 보임.
        let findAllKeyword = [];
        let findStar = [];
        for (let r of findCategory) {
            //각 레스토랑의 키워드들 [[{restaurant_id:1},{restaurant_id:1}],[{restaurant_id:2}]]로
            const restaurantFindAllKeyword = await this.keywordRepository.findAllKeyword(r.restaurant_id);
            let findKey = [];
            for (let key in restaurantFindAllKeyword) {
                findKey[key] = {
                    restaurantId: restaurantFindAllKeyword[key].restaurant_id,
                    keywordId: restaurantFindAllKeyword[key].keyword_id,
                    keyword: restaurantFindAllKeyword[key].keyword,
                };
            }
            findAllKeyword.push(findKey);

            //각 레스토랑의 리뷰들 [[{restaurant_id:1},{restaurant_id:1}],[{restaurant_id:2}]]로
            const restaurantFindAllReview = await this.reviewRepository.findAllReview(r.restaurant_id);
            let findReview = [];
            for (let review in restaurantFindAllReview) {
                findReview[review] = {
                    restaurantId: restaurantFindAllReview[review].restaurant_id,
                    reviewId: restaurantFindAllReview[review].review_id,
                    star: restaurantFindAllReview[review].star,
                };
            }
            findStar.push(findReview);
        }

        const result = findCategory.map((restaurant) => {
            return {
                restaurantId: restaurant.restaurant_id,
                restaurantName: restaurant.name,
                restaurantNumber: restaurant.tel,
                restaurantAddress: restaurant.address,
                restaurantKeyword: findAllKeyword,
                restaurantStar: findStar,
                restaurantImage: restaurant.image,
                desc: restaurant.desc,
                createdAt: restaurant.created_at,
                updatedAt: restaurant.updated_at,
            };
        });

        return new ServiceReturn('카테고리로 레스토랑을 조회했습니다.', 200, result);
    };
}

module.exports = SearchService;
