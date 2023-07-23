const { Op } = require('sequelize');
const { Cart, CartItem, Menu, Restaurant, Order, Member, MemberInfo, sequelize } = require('../models');
class CartRepository {
    //** 카트와 아이템 동시 생성 */
    addCartAndItem = async ({ restaurant_id, member_id, menu_id, count }) => {
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
    };

    //** 장바구니 아이템 삭제 */
    deleteItem = async (target) => {
        return await CartItem.destroy({ where: { [Op.and]: target } });
    };

    //** 장바구니 불러오기 */
    findOne = async ({ restaurant_id, member_id }) => {
        const cart = await Cart.findOne({
            where: { restaurant_id, member_id },
            include: [{ model: Order }],
        });
        return cart;
    };

    //** 장바구니 아이템 불러오기 */
    findItem = async (target) => {
        return await CartItem.findOne({ where: { [Op.and]: target }, include: [{ model: Cart }] });
    };

    //** 장바구니 아이템 수량 업데이트 */
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

    //** 장바구니 아이템 생성 */
    addItem = async (data) => {
        return await CartItem.create(data);
    };

    //** 아이템이 포함되어있는 장바구니의 총 아이템 개수 가져오기 */
    findItemsCount = async (target) => {
        return await sequelize.transaction(async (transaction) => {
            const { cart_id } = await CartItem.findOne({ where: { [Op.and]: target } }, { transaction });
            return CartItem.count({ where: { cart_id } }, { transaction });
        });
    };

    //** 장바구니 삭제와 장바구니 아이템 전체 삭제 */
    deleteCartAndItems = async (target) => {
        return await sequelize.transaction(async (transaction) => {
            const { cart_id } = await CartItem.findOne({ where: { [Op.and]: target } }, { transaction });
            await Cart.destroy({ where: { cart_id } }, { transaction });
        });
    };

    //** 장바구니 삭제 */
    deleteCart = async ({ cart_id, member_id }) => {
        await Cart.destroy({
            where: {
                cart_id,
                member_id,
            },
        });
    };

    memberCartitems = async (data) => {
        return Cart.findOne({ where: data, include: [{ model: CartItem, include: [{ model: Menu }] }] });
    };

    getCurrentCart = async ({ member_id }) => {
        return Cart.findOne({
            where: { member_id },
            limit: 1,
            order: [['created_at', 'DESC']],
            include: [
                { model: CartItem, include: [{ model: Menu }] },
                { model: Restaurant },
                { model: Order },
                { model: Member, include: [{ model: MemberInfo }] },
            ],
        });
    };
}

module.exports = CartRepository;
