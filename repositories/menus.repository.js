const { Menu } = require('../models');
const { Op } = require('sequelize');

class MenuRepository {
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
}

module.exports = MenuRepository;
