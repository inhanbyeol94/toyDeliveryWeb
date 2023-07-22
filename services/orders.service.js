const OrderRepository = require('../repositories/orders.repository');
const PointRepository = require('../repositories/points.repository');
const MemberRepository = require('../repositories/members.repository');

const { CustomError, ServiceReturn } = require('../customClass');
class OrderService {
    orderRepository = new OrderRepository();
    pointRepository = new PointRepository();
    memberRepository = new MemberRepository();

    //** 장바구니 주문 */
    orderCart = async ({ cart_id, member_id }) => {
        const total = await this.calculatePrice({ member_id, cart_id });
        if (total <= 0) throw new CustomError('잔액이 부족합니다.', 404);

        const pricePoint = await this.orderRepository.pricePoint({ cart_id });
        const userInfo = await this.memberRepository.findOne({ member_id });

        await this.pointRepository.createPoint(member_id, total, 0, '주문 비용 지불');
        await this.orderRepository.addOrder(pricePoint.restaurant_id, cart_id, userInfo.MemberInfos.member_info_id);

        return new ServiceReturn('주문이 완료되었습니다.', 200, true);
    };

    //** 특정 레스토랑 전체 주문 불러오기 */
    orderCheck = async ({ restaurant_id }) => {
        const order = await this.orderRepository.orderCheck({ restaurant_id });
        return new ServiceReturn('정상 반환되었습니다.', 200, order);
    };

    //** 특정 회원의 전체 주문 불러오기 */
    findMemberOrder = async ({ member_id }) => {
        const userInfo = await this.memberRepository.findOne({ member_id });
        const order = await this.orderRepository.findByMember(userInfo.MemberInfos.member_info_id);

        return new ServiceReturn('정상 반환되었습니다.', 200, order);
    };

    //** 특정 주문 수정 */
    orderUpdate = async ({ order_id, status, addTime, user }) => {
        const order = await this.orderRepository.findById({ order_id });

        if (!order) throw new CustomError('해당 주문이 존재하지 않습니다.', 404);
        if (addTime === null) throw new CustomError('예상 조리시간을 적어주세요.', 412);

        const arrival_at = this.calculateArriveTime(addTime);
        const updatedOrder = await this.orderRepository.orderUpdate({ order_id, status, addTime, arrival_at });

        if (updatedOrder[0] === 1) {
            const orderCheck = await this.orderRepository.findById({ order_id });

            if (orderCheck.status === 4) {
                const member_id = user.member_id;
                const cart_id = orderCheck.cart_id;
                const point = await this.calculatePrice({ member_id, cart_id });
                const point_status_code = 1;
                const reason = '판매 수익';
                await this.pointRepository.createPoint(member_id, point, point_status_code, reason);
                return new ServiceReturn('배달이 완료되었습니다.', 200, true);
            }

            return new ServiceReturn('정상 반영되었습니다.', 200, true);
        }
    };

    calculateArriveTime = (addTime) => {
        const currentDateTime = new Date();
        const arrivalDateTime = new Date(currentDateTime.getTime() + addTime * 60000);
        return arrivalDateTime;
    };
    calculatePrice = async function ({ member_id, cart_id }) {
        const findAllPoint = await this.pointRepository.findAllPoint(member_id);
        let userPoint = 0;
        for (let i in findAllPoint) {
            if (i == 0) {
                userPoint = findAllPoint[0].point;
            } else if (findAllPoint[i].point_status_code == 0) {
                userPoint = userPoint - findAllPoint[i].point;
            } else if (findAllPoint[i].point_status_code == 1) {
                userPoint = userPoint + findAllPoint[i].point;
            }
        }

        const pricePoint = await this.orderRepository.pricePoint({ cart_id });
        const price = userPoint - pricePoint['CartItems.count'] * pricePoint['CartItems.Menu.price'];
        return price;
    };
}

module.exports = OrderService;
