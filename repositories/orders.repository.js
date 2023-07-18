const { Order, Cart, User } = require('../models');

class OrderRepository {
    findById = async (order_id) => {
        const order = await Order.findByPk(order_id);
        return order;
    };
    orderCheck = async (restaurant_id) => {
        const order = await Order.findAll({
            attributes: ['order_id', 'nickname', 'status', 'createdAt'],
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
}

module.exports = OrderRepository;
