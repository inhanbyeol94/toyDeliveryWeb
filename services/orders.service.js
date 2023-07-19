const OrderRepository = require('../repositories/orders.repository');
const PointRepository = require('../repositories/points.repository');

class OrderService {
    orderRepository = new OrderRepository();
    pointRepository = new PointRepository();
    orderCart = async (cart_id, user) => {
        const userPoint = await this.pointRepository.userPoint(user.member_id);
        const pricePoint = await this.orderRepository.pricePoint(cart_id);
        const total = userPoint.point - pricePoint.count * pricePoint.price;
        if (total >= 0) {
            throw { code: 404, message: '잔액이 부족합니다' };
        }
        const userInfo = this.userInfoRepository.getUserInfo(user.member_id); //수정필요
        await this.pointRepository.payPoint(total); //point사용 추가 수정필요
        const order = await this.orderRepository.addOrder(pricePoint.restaurant_id, cart_id, userInfo.member_info_id); //수정필요

        return order;
    };
    orderCheck = async (restaurant_id) => {
        const order = await this.orderRepository.orderCheck(restaurant_id);
        if (!order) {
            throw { code: 404, message: '주문 목록을 불러오는중 오류가 생겼습니다' };
        }
        return order;
    };
    orderUpdate = async (order_id, status, addTime, user) => {
        const order = await this.orderRepository.findById(order_id);
        if (!order) {
            throw { code: 404, message: '해당 주문이 존재하지 않습니다' };
        }
        if (addTime !== null) {
            order.arriveTime = this.calculateArriveTime(addTime);
        }
        order.status = status;

        const updatedOrder = await this.orderRepository.orderUpdate(order);
        if (updatedOrder.status === 4) {
            //주문이 완료되면 레스토랑에 포인트 추가
            await this.pointRepository.addPoint(user.member_id);
            //가격은 cartItem에서 받아와야함
        }

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
