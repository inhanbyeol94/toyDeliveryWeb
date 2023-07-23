const OrderService = require('../services/orders.service');

class OrdersController {
    orderService = new OrderService();

    //** 장바구니 주문 */
    orderCart = async (req, res) => {
        try {
            const { deliveryInfoId } = req.body;
            const { cart_id } = req.params;
            const { member_id } = req.session.user;
            const { status, message, result } = await this.orderService.orderCart({ cart_id, member_id, deliveryInfoId });

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 특정 레스토랑 전체 주문 불러오기 */
    orderCheck = async (req, res) => {
        try {
            const { restaurant_id } = req.params;
            const { status, message, result } = await this.orderService.orderCheck({ restaurant_id });

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 특정 회원의 전체 주문 불러오기 */
    findMemberOrder = async (req, res) => {
        try {
            const { member_id } = req.session.user;
            const { status, message, result } = await this.orderService.findMemberOrder({ member_id });

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 특정 주문 수정 */
    orderUpdate = async (req, res) => {
        try {
            const { order_id } = req.params;
            const { statusNum, addTime } = req.body;
            const user = req.session.user;
            const { status, message, result } = await this.orderService.orderUpdate({ order_id, statusNum, addTime, user });

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };
}

module.exports = OrdersController;
