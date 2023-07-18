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
        //레스토랑 추가해야함
        const error = new Error();

        //권한 존재 여부, 업장 존재 여부 추가해야함
        if (findAllKeyword.length == 5) {
            error.message = '키워드는 최대 5개까지만 허용합니다.';
            error.status = 412;
            throw error;
        } else if (findOneKeyword) {
            error.message = '중복되는 키워드는 제외해주세요.';
            error.status = 412;
            throw error;
        }

        const createKeyword = await this.keywordRepository.createKeyword(restaurant_id, keyword);

        return {
            keyword_id: createKeyword.keyword_id,
            restaurant_id: createKeyword.restaurant_id,
            keyword: createKeyword.keyword,
            created_at: createKeyword.created_at,
            updated_at: createKeyword.updated_at,
        };
    };

    updateKeyword = async (keyword_id, restaurant_id, member_id, keyword) => {
        const findOneKeywordById = await this.keywordRepository.findOneKeyword(keyword_id);
        //레스토랑 추가해야함
        const error = new Error();

        //수정 권한 여부, 업장 존재 여부 추가해야함
        if (!findOneKeywordById) {
            error.message = '키워드가 존재하지 않습니다.';
            error.status = 404;
            throw error;
        }

        await this.keywordRepository.updateKeyword(keyword_id, restaurant_id, keyword);
        const updateKeyword = await this.keywordRepository.findOneKeyword(keyword_id);
        return {
            keyword_id: updateKeyword.keyword_id,
            restaurant_id: updateKeyword.restaurant_id,
            keyword: updateKeyword.keyword,
            created_at: updateKeyword.created_at,
            updated_at: updateKeyword.updated_at,
        };
    };

    deleteKeyword = async (keyword_id, restaurant_id, member_id) => {
        const findOneKeywordById = await this.keywordRepository.findOneKeyword(keyword_id);
        //레스토랑 추가해야함
        const error = new Error();

        //삭제 권한 여부, 업장 여부 추가해야함
        if (!findOneKeywordById) {
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
