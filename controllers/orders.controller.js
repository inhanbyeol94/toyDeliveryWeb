const OrderService = require('../services/orders.service');

class OrdersController {
    orderService = new OrderService();
    orderCheck = async (req, res) => {
        const { restaurant_id } = req.params;
        const data = await this.orderService.orderCheck(restaurant_id);
        res.status(200).json({ data });
    };
    orderUpdate = async (req, res) => {
        const { order_id } = req.params;
        const { status, addTime } = req.body;
        const data = await this.orderService.orderUpdate(order_id, status, addTime);
        res.status(200).json({ data });
    };
}

module.exports = OrdersController;
