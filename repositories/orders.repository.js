const { Order, Cart, MemberInfo, Menu, CartItem, Restaurant, Point, sequelize } = require('../models');

class OrderRepository {
    findById = async ({ order_id }) => {
        const order = await Order.findOne({
            where: { order_id },
            include: [
                { model: Restaurant, attributes: ['name'] },
                {
                    model: Cart,
                    include: [
                        {
                            model: CartItem,
                            attributes: ['count'],
                            include: [
                                {
                                    model: Menu,
                                    attributes: ['name', 'price'],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        return order;
    };
    findByMember = async (member_info_id) => {
        const order = await Order.findAll({
            where: { member_info_id },
            include: [
                {
                    model: MemberInfo,
                },
                {
                    model: Restaurant,
                    attributes: ['name', 'image'],
                },
                {
                    model: Cart,
                    include: [
                        {
                            model: CartItem,
                            attributes: ['count'],
                            include: [
                                {
                                    model: Menu,
                                    attributes: ['name', 'price'],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        return order;
    };
    orderCheck = async ({ restaurant_id }) => {
        const order = await Order.findAll({
            attributes: ['order_id', 'status', 'created_at'],
            order: ['created_at'],
            where: { restaurant_id },
            raw: true,
            include: [
                {
                    model: MemberInfo,
                    attributes: ['name', 'phone', 'address'],
                },
            ],
        });
        return order;
    };
    orderUpdate = async ({ order_id, status, addTime, arrival_at }) => {
        const order = await Order.update(
            {
                status,
                addTime,
                arrival_at,
            },
            {
                where: { order_id },
            }
        );
        return order;
    };
    pricePoint = async ({ cart_id }) => {
        const cart = await Cart.findByPk(cart_id, {
            raw: true,
            attributes: ['restaurant_id'],
            include: {
                model: CartItem,
                attributes: ['count'],
                include: [
                    {
                        model: Menu,
                        attributes: ['price'],
                    },
                ],
            },
        });
        return cart;
    };
    addOrder = async ({ cart_id, member_id, deliveryInfoId, restaurant_id, deductionPrice }) => {
        await sequelize.transaction(async (transaction) => {
            await Point.create({ member_id, point_status_code: 0, point: deductionPrice, reason: '주문 비용 지불' }, { transaction });
            await Order.create({ restaurant_id, member_info_id: deliveryInfoId, cart_id }, { transaction });
        });
    };
}

module.exports = OrderRepository;
