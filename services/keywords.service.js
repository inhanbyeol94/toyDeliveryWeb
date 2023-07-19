const KeywordRepository = require('../repositories/keywords.repository');
const RestaurantRepository = require('../repositories/restaurants.repository');

class KeywordService {
    keywordRepository = new KeywordRepository();
    restaurantRepository = new RestaurantRepository();

    findKeyword = async (restaurant_id) => {
        const keywords = await this.keywordRepository.findAllKeyword(restaurant_id);

        return keywords.map((keyword) => {
            return {
                keyword_id: keyword.keyword_id,
                restaurant_id: keyword.restaurant_id,
                keyword: keyword.keyword,
                created_at: keyword.created_at,
                updated_at: keyword.updated_at,
            };
        });
    };

    createKeyword = async (restaurant_id, member_id, keyword) => {
        const findAllKeyword = await this.keywordRepository.findAllKeyword(restaurant_id);
        const findOneKeyword = await this.keywordRepository.findOneKeyword(keyword);
        const findOneRestaurant = await this.restaurantRepository.findRestaurantId({ restaurant_id: restaurant_id });
        const error = new Error();

        if (!findOneRestaurant) {
            error.message = '업장이 존재하지 않습니다.';
            error.status = 404;
            throw error;
        } else if (member_id != findOneRestaurant.member_id) {
            error.message = '키워드 생성 권한이 존재하지 않습니다.';
            error.status = 403;
            throw error;
        } else if (findAllKeyword.length == 5) {
            error.message = '키워드는 최대 5개까지만 허용합니다.';
            error.status = 412;
            throw error;
        } else if (findOneKeyword) {
            error.message = '중복되는 키워드는 제외해주세요.';
            error.status = 412;
            throw error;
        }

        await this.keywordRepository.createKeyword(restaurant_id, keyword);
        return { status: 201, message: '키워드를 추가했습니다.' };
    };

    updateKeyword = async (keyword_id, restaurant_id, member_id, keyword) => {
        const findOneKeywordById = await this.keywordRepository.findOneKeywordById(keyword_id);
        const findOneRestaurant = await this.restaurantRepository.findRestaurantId({ restaurant_id: restaurant_id });
        const findAllKeyword = await this.keywordRepository.findAllKeyword(restaurant_id);
        const error = new Error();

        if (!findOneRestaurant) {
            error.message = '업장이 존재하지 않습니다.';
            error.status = 404;
            throw error;
        } else if (member_id != findOneRestaurant.member_id) {
            error.message = '키워드 수정 권한이 존재하지 않습니다.';
            error.status = 403;
            throw error;
        } else if (!findOneKeywordById) {
            error.message = '키워드가 존재하지 않습니다.';
            error.status = 404;
            throw error;
        }
        const find = findAllKeyword.filter((key) => key.keyword == keyword);

        if (find.length) {
            error.message = '이미 존재하는 키워드입니다.';
            error.status = 412;
            throw error;
        }

        await this.keywordRepository.updateKeyword(keyword_id, restaurant_id, keyword);
        const updateKeyword = await this.keywordRepository.findOneKeywordById(keyword_id);
        return {
            keyword_id: updateKeyword.keyword_id,
            restaurant_id: updateKeyword.restaurant_id,
            keyword: updateKeyword.keyword,
            created_at: updateKeyword.created_at,
            updated_at: updateKeyword.updated_at,
        };
    };

    deleteKeyword = async (keyword_id, restaurant_id, member_id) => {
        const findOneKeywordById = await this.keywordRepository.findOneKeywordById(keyword_id);
        const findOneRestaurant = await this.restaurantRepository.findRestaurantId({ restaurant_id: restaurant_id });
        const error = new Error();

        if (!findOneRestaurant) {
            error.message = '업장이 존재하지 않습니다.';
            error.status = 404;
            throw error;
        } else if (member_id != findOneRestaurant.member_id) {
            error.message = '키워드 삭제 권한이 존재하지 않습니다.';
            error.status = 403;
            throw error;
        } else if (!findOneKeywordById) {
            error.message = '키워드가 존재하지 않습니다.';
            error.status = 404;
            throw error;
        }

        await this.keywordRepository.deleteKeyword(keyword_id, restaurant_id);

        return {
            keyword_id: findOneKeywordById.keyword_id,
            restaurant_id: findOneKeywordById.restaurant_id,
            keyword: findOneKeywordById.keyword,
            created_at: findOneKeywordById.created_at,
            updated_at: findOneKeywordById.updated_at,
        };
    };
}

module.exports = KeywordService;
