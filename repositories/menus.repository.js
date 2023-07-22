const { Menu } = require('../models');
const { Op } = require('sequelize');

class MenuRepository {
    findOne = async (menu_id) => {
        return await Menu.findOne({ where: { menu_id } });
    };
    findAllMenu = async (restaurant_id) => {
        return await Menu.findAll({ where: { restaurant_id } });
    };

    findAll = async () => {
        return await Menu.findAll();
    };

    findMenuId = async (restaurant_id, menu_id) => {
        return await Menu.findOne({
            where: { [Op.and]: [{ restaurant_id }, { menu_id }] },
        });
    };

    createMenu = async (restaurant_id, member_id, name, price, image) => {
        return await Menu.create({ restaurant_id, member_id, name, price, image });
    };

    updateMenu = async (restaurant_id, menu_id, name, price, image) => {
        const updateMenu = await Menu.update(
            { name, price, image },
            {
                where: { [Op.and]: [{ restaurant_id }, { menu_id }] },
            }
        );
        return updateMenu;
    };

    deleteMenu = async (restaurant_id, menu_id) => {
        return await Menu.destroy({ where: { [Op.and]: [{ restaurant_id }, { menu_id }] } });
    };
    //** 메뉴 프로필 사진 추가 및 삭제 */
    updateMenuImage = async ({ image, menu_id }) => {
        await Menu.update({ image }, { where: { menu_id } });
    };
}

module.exports = MenuRepository;
