const OrderService = require('../services/orders.service');

class OrdersController {
    orderService = new OrderService();
    orderCart = async (req, res) => {
        const { cart_id } = req.params;
        const { member_id } = req.session.user;
        console.log(2);
        const data = await this.orderService.orderCart({ cart_id, member_id });
        res.status(200).json({ data });
    };
    orderCheck = async (req, res) => {
        try {
            const { restaurant_id } = req.params;
            const data = await this.orderService.orderCheck({ restaurant_id });
            res.status(200).json({ data });
        } catch (err) {
            if (err.code) return res.status(err.code).json({ message: err.message });
            console.error(err);
            return res.status(500).json({ message: err });
        }
    };
    findMemberOrder = async (req, res) => {
        try {
            const { member_id } = req.session.user;
            const data = await this.orderService.findMemberOrder({ member_id });
            res.status(200).json({ data });
        } catch (err) {
            if (err.code) return res.status(err.code).json({ message: err.message });
            console.error(err);
            return res.status(500).json({ message: err });
        }
    };
    orderUpdate = async (req, res) => {
        try {
            let { order_id } = req.params;
            order_id = Number(order_id);
            const { status, addTime } = req.body;
            const user = req.session.user;
            const data = await this.orderService.orderUpdate({ order_id, status, addTime, user });
            res.status(200).json({ data });
        } catch (err) {
            if (err.code) return res.status(err.code).json({ message: err.message });
            return res.status(500).json({ message: err });
        }
    };
}

module.exports = OrdersController;
