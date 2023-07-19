const { Order, Cart, User, Menu, CartItem } = require('../models');

class OrderRepository {
    findById = async (order_id) => {
        const order = await Order.findByPk(order_id);
        return order;
    };
    orderCheck = async (restaurant_id) => {
        const order = await Order.findAll({
            attributes: ['order_id', 'status', 'createdAt'],
            order: [['createdAt']],
            where: { restaurant_id },
            include: [
                {
                    model: Cart,
                    include: [
                        {
                            model: User,
                            attributes: ['nickname'],
                        },
                    ],
                },
            ],
        });
        return order;
    };
    orderUpdate = async (order) => {
        const updatedOrder = await order.save();
        return updatedOrder;
    };
    pricePoint = async (cart_id) => {
        const cart = await Cart.findByPk(cart_id, {
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
    addOrder = async (restaurant_id, cart_id, member_info_id) => {
        const order = await Order.create({
            restaurant_id,
            cart_id,
            status: 1,
            member_info_id,
        });
        return order;
    };
}

module.exports = OrderRepository;
