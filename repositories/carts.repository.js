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
    findOne = async ({ restaurant_id, member_id }) => {
        const cart = await Cart.findOne({
            where: { restaurant_id, member_id },
        });
        return cart;
    };
    addItem = async ({ cart_id, member_id, menu_id, count }) => {
        const updateCart = await Cart.update(
            { menu_id, count },
            {
                where: {
                    cart_id,
                    member_id,
                },
            }
        );
        return updateCart;
    };
    deleteCart = async ({ cart_id, member_id }) => {
        await Cart.destroy({
            where: {
                cart_id,
                member_id,
            },
        });
    };
}

module.exports = CartRepository;
