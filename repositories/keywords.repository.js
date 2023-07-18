const { Keyword } = require('../models');
const { Op } = require('sequelize');
class KeywordRepository {
    //
    createKeyword = async (restaurant_id, keyword) => {
        const createKeywordData = await Keyword.create({ restaurant_id, keyword });
        return createKeywordData;
    };

    findAllKeyword = async (restaurant_id) => {
        const findAllKeywordData = await Keyword.findAll({ where: { restaurant_id } });

        return findAllKeywordData;
    };

    findOneKeywordById = async (keyword_id) => {
        const findOneKeywordData = await Keyword.findOne({ where: { keyword_id } });

        return findOneKeywordData;
    };

    findOneKeyword = async (keyword) => {
        const findOneKeyword = await Keyword.findOne({ where: { keyword } });

        return findOneKeyword;
    };

    updateKeyword = async (keyword_id, restaurant_id, keyword) => {
        const updateKeywordData = await Keyword.update({ keyword }, { where: { [Op.and]: [{ keyword_id }, { restaurant_id }] } });

        return updateKeywordData;
    };

    deleteKeyword = async (keyword_id, restaurant_id) => {
        const deleteKeywordData = await Keyword.destroy({ where: { [Op.and]: [{ keyword_id }, { restaurant_id }] } });

        return deleteKeywordData;
    };
}

module.exports = KeywordRepository;
