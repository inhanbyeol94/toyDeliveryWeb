const OrderRepository = require('../repositories/orders.repository');
const PointRepository = require('../repositories/points.repository');

class OrderService {
    orderRepository = new OrderRepository();
    pointRepository = new PointRepository();

    orderCheck = async (restaurant_id) => {
        const order = await this.orderRepository.orderCheck(restaurant_id);
        return order;
    };
    orderUpdate = async (order_id, status, addTime) => {
        const order = await this.orderRepository.findById(order_id);
        if (!order) {
            throw new Error('주문을 찾을 수 없습니다');
        }
        if (addTime !== null) {
            order.arriveTime = this.calculateArriveTime(addTime);
        }
        order.status = status;

        const updatedOrder = await this.orderRepository.orderUpdate(order);
        // if (updatedOrder.status === 4) {
        //     //주문이 완료되면 레스토랑에 포인트 추가
        //     await this.pointRepository
        // }

        return updatedOrder;
    };

    calculateArriveTime = (addTime) => {
        if (addTime !== null) {
            const currentDateTime = new Date();
            const arrivalDateTime = new Date(currentDateTime.getTime() + addTime * 60000);
            return arrivalDateTime;
        } else {
            return null;
        }
    };
}

module.exports = OrderService;
