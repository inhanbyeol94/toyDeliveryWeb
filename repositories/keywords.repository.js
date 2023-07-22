const { Keyword, Restaurant } = require('../models');
const { Op } = require('sequelize');
class KeywordRepository {
    //키워드 생성
    createKeyword = async (restaurant_id, keyword) => {
        const createKeywordData = await Keyword.create({ restaurant_id, keyword });
        return createKeywordData;
    };

    //레스토랑에 관한 키워드 모두 조회
    findAllKeyword = async (restaurant_id) => {
        const findAllKeywordData = await Keyword.findAll({ where: { restaurant_id } });

        return findAllKeywordData;
    };

    //전체 키워드 조회 (검색시 사용)
    findAll = async () => {
        const findAll = await Keyword.findAll();

        return findAll;
    };

    //키워드 생성시 해당 키워드가 존재하는지 조회
    findOneKeyword = async (restaurant_id, keyword) => {
        const findOne = await Keyword.findOne({ where: { [Op.and]: [{ restaurant_id }, { keyword }] } });

        return findOne;
    };

    //키워드 수정, 삭제시 id값을 조회
    findOneKeywordById = async (keyword_id) => {
        const findOne = await Keyword.findOne({ where: { keyword_id }, include: [{ model: Restaurant }] });

        return findOne;
    };

    //키워드 수정
    updateKeyword = async (keyword_id, restaurant_id, keyword) => {
        const updateKeywordData = await Keyword.update({ keyword }, { where: { [Op.and]: [{ keyword_id }, { restaurant_id }] } });

        return updateKeywordData;
    };

    //키워드 삭제
    deleteKeyword = async (keyword_id, restaurant_id) => {
        const deleteKeywordData = await Keyword.destroy({ where: { [Op.and]: [{ keyword_id }, { restaurant_id }] } });

        return deleteKeywordData;
    };
}

module.exports = KeywordRepository;
