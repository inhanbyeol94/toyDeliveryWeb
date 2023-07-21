const { Op } = require('sequelize');
const { Cart, CartItem, sequelize } = require('../models');
class CartRepository {
    addCart = async ({ restaurant_id, member_id, menu_id, count }) => {
        try {
            await sequelize.transaction(async (t) => {
                const cart = await Cart.create(
                    {
                        member_id,
                        restaurant_id,
                    },
                    { transaction: t }
                );
                await CartItem.create(
                    {
                        menu_id,
                        count,
                        cart_id: cart.cart_id,
                    },
                    { transaction: t }
                );
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    deleteItem = async (target) => {
        return await CartItem.destroy({ where: { [Op.and]: target } });
    };

    findOne = async ({ restaurant_id, member_id }) => {
        const cart = await Cart.findOne({
            where: { restaurant_id, member_id },
        });
        return cart;
    };
    updateItem = async ({ cart_id, menu_id, count }) => {
        const updateCart = await CartItem.update(
            { count },
            {
                where: {
                    cart_id,
                    menu_id,
                },
            }
        );
        return updateCart;
    };
    findItem = async (target) => {
        return await CartItem.findOne({ where: { [Op.and]: target } });
    };

    addItem = async (data) => {
        return await CartItem.create(data);
    };
    deleteCart = async ({ cart_id, member_id }) => {
        await Cart.destroy({
            where: {
                cart_id,
                member_id,
            },
        });
    };

    memberCartitems = async (data) => {
        return Cart.findOne({ where: data, include: [{ model: CartItem }] });
    };
}

module.exports = CartRepository;
