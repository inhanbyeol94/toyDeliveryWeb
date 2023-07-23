const { Order, Cart, MemberInfo, Menu, CartItem, Restaurant, Point, Member, sequelize } = require('../models');

class OrderRepository {
    findById = async ({ order_id }) => {
        const order = await Order.findByPk(order_id, { raw: true });
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
    findByOrder = async ({ orderId }) => {
        return await Order.findOne({
            where: { order_id: orderId },
            include: [{ model: MemberInfo }, { model: Cart, include: [{ model: CartItem, include: [{ model: Menu }] }] }],
        });
    };
    orderCheck = async ({ restaurant_id }) => {
        const order = await Order.findAll({
            order: ['created_at'],
            where: { restaurant_id },
            include: [
                {
                    model: MemberInfo,
                },
                {
                    model: Cart,
                    include: [{ model: CartItem, include: [{ model: Menu }] }],
                },
            ],
        });
        return order;
    };
    orderUpdate = async ({ order_id, status, addTime }) => {
        const order = await Order.update(
            {
                status,
                arrival_at: addTime,
            },
            {
                where: { order_id },
            }
        );
        return order;
    };

    orderStatusUpdateAndCalculate = async ({ order_id, status, deductionPrice }) => {
        return await sequelize.transaction(async (transaction) => {
            const findByOrder = await Order.findOne({ where: { order_id }, include: [{ model: Restaurant }] }, { transaction });

            await Order.update({ status }, { where: { order_id } }, { transaction });
            await Point.create(
                {
                    member_id: findByOrder.Restaurant.member_id,
                    point_status_code: 1,
                    point: deductionPrice,
                    reason: '상품판매 후 정산',
                },
                { transaction }
            );
        });
    };

    orderStatusUpdate = async ({ order_id, status }) => {
        return await Order.update({ status }, { where: { order_id } });
    };

    orderUpdateAndPointRefund = async ({ order_id, addTime, deductionPrice }) => {
        return await sequelize.transaction(async (transaction) => {
            const findByOrder = await Order.findOne({ where: { order_id }, include: [{ model: MemberInfo }] }, { transaction });
            await Point.create(
                {
                    member_id: findByOrder.MemberInfo.member_id,
                    point_status_code: 1,
                    point: deductionPrice,
                    reason: '주문 비용 환불 : 업체에서 직접 취소',
                },
                { transaction }
            );
            return await Order.update({ status: 0, arrival_at: addTime }, { where: { order_id } }, { transaction });
        });
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
