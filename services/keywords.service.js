const KeywordRepository = require('../repositories/keywords.repository');
const RestaurantRepository = require('../repositories/restaurants.repository');
const { CustomError, ServiceReturn } = require('../customClass');

class KeywordService {
    keywordRepository = new KeywordRepository();
    restaurantRepository = new RestaurantRepository();

    /**레스토랑 키워드 모두 조회*/
    findKeyword = async (restaurant_id) => {
        const keywords = await this.keywordRepository.findAllKeyword(restaurant_id);
        const result = keywords.map((keyword) => {
            return {
                keyword_id: keyword.keyword_id,
                restaurant_id: keyword.restaurant_id,
                keyword: keyword.keyword,
                created_at: keyword.created_at,
                updated_at: keyword.updated_at,
            };
        });
        return new ServiceReturn('정상 반환되었습니다.', 200, result);
    };

    /**키워드 생성*/
    createKeyword = async (restaurant_id, member_id, keyword) => {
        const findAllKeyword = await this.keywordRepository.findAllKeyword(restaurant_id);
        const findOneKeyword = await this.keywordRepository.findOneKeyword(restaurant_id, keyword);
        const findOneRestaurant = await this.restaurantRepository.findRestaurantId({ restaurant_id: restaurant_id });

        if (!findOneRestaurant) throw new CustomError('업장이 존재하지 않습니다.', 404);
        else if (member_id != findOneRestaurant.member_id) throw new CustomError('키워드 생성 권한이 존재하지 않습니다.', 403);
        else if (findAllKeyword.length == 5) throw new CustomError('키워드는 최대 5개까지만 허용합니다.', 412);
        else if (findOneKeyword) throw new CustomError('중복되는 키워드는 제외해주세요.', 412);

        await this.keywordRepository.createKeyword(restaurant_id, keyword);
        return new ServiceReturn('키워드를 추가했습니다.', 201, true);
    };

    /**키워드 수정*/
    updateKeyword = async (keyword_id, restaurant_id, member_id, keyword) => {
        const findOneKeywordById = await this.keywordRepository.findOneKeywordById(keyword_id);
        const findOneRestaurant = await this.restaurantRepository.findRestaurantId({ restaurant_id: restaurant_id });
        const findAllKeyword = await this.keywordRepository.findAllKeyword(restaurant_id);

        if (!findOneRestaurant) throw new CustomError('업장이 존재하지 않습니다.', 404);
        else if (member_id != findOneRestaurant.member_id) throw new CustomError('키워드 수정 권한이 존재하지 않습니다.', 403);
        else if (!findOneKeywordById) throw new CustomError('키워드가 존재하지 않습니다.', 404);

        const find = findAllKeyword.filter((key) => key.keyword == keyword);

        if (find.length) throw new CustomError('이미 존재하는 키워드입니다.', 412);

        await this.keywordRepository.updateKeyword(keyword_id, restaurant_id, keyword);

        return new ServiceReturn('키워드를 수정하였습니다.', 200, true);
    };

    /**키워드 삭제*/
    deleteKeyword = async (keyword_id, restaurant_id, member_id) => {
        const findOneKeywordById = await this.keywordRepository.findOneKeywordById(keyword_id);
        const findOneRestaurant = await this.restaurantRepository.findRestaurantId({ restaurant_id: restaurant_id });

        if (!findOneRestaurant) throw new CustomError('업장이 존재하지 않습니다.', 404);
        else if (member_id != findOneRestaurant.member_id) throw new CustomError('키워드 삭제 권한이 존재하지 않습니다.', 403);
        else if (!findOneKeywordById) throw new CustomError('키워드가 존재하지 않습니다.', 404);

        await this.keywordRepository.deleteKeyword(keyword_id, restaurant_id);

        return new ServiceReturn('키워드가 정상적으로 삭제되었습니다.', 200, true);
    };
}

module.exports = KeywordService;
