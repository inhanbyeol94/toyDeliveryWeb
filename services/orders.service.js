const OrderRepository = require('../repositories/orders.repository');
const PointRepository = require('../repositories/points.repository');
const MemberRepository = require('../repositories/members.repository');
class OrderService {
    orderRepository = new OrderRepository();
    pointRepository = new PointRepository();
    memberRepository = new MemberRepository();
    orderCart = async (cart_id, user) => {
        const total = this.calculatePrice(user.member_id, cart_id);
        if (total >= 0) {
            throw { code: 404, message: '잔액이 부족합니다' };
        }
        const pricePoint = await this.orderRepository.pricePoint(cart_id);
        const userInfo = this.memberRepository.findOne(user.member_id);

        await this.pointRepository.createPoint(user.member_id, total, 0, '주문 비용 지불'); //point사용 추가 수정필요
        const order = await this.orderRepository.addOrder(pricePoint.restaurant_id, cart_id, userInfo.member_info_id);

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
            const price = this.calculatePrice(user.member_id, order.order_id);
            await this.pointRepository.createPoint(user.member_id, price, 1, '판매 수익 입금');
            return { message: '배달완료처리 되었습니다' };
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
    calculatePrice = async function (member_id, cart_id) {
        const userPoint = await this.pointRepository.userPoint(member_id);
        const pricePoint = await this.orderRepository.pricePoint(cart_id);
        return userPoint.point - pricePoint.count * pricePoint.price;
    };
}

module.exports = OrderService;
