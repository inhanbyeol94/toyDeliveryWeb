const { Keyword, Restaurant } = require('../models');
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

    findAll = async () => {
        const findAll = await Keyword.findAll();

        return findAll;
    };

    searchKeyword = async (keyword) => {
        const search = await Keyword.findAll({
            where: { keyword },
            include: [
                {
                    model: Restaurant,
                },
            ],
        });

        return search;
    };

    findOneKeyword = async (keyword) => {
        const findOne = await Keyword.findOne({ where: { keyword } });

        return findOne;
    };

    findOneKeywordById = async (keyword_id) => {
        const findOne = await Keyword.findOne({ where: { keyword_id } });

        return findOne;
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
