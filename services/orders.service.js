const OrderRepository = require('../repositories/orders.repository');
const PointRepository = require('../repositories/points.repository');
const MemberRepository = require('../repositories/members.repository');
const CartRepository = require('../repositories/carts.repository');

const { CustomError, ServiceReturn } = require('../customClass');
class OrderService {
    orderRepository = new OrderRepository();
    pointRepository = new PointRepository();
    memberRepository = new MemberRepository();
    cartRepository = new CartRepository();

    findOrder = async ({ order_id }) => {
        const order = await this.orderRepository.findById({ order_id });
        return new ServiceReturn('정상 반환되었습니다.', 200, order);
    };

    //** 장바구니 주문 */
    orderCart = async ({ cart_id, member_id, deliveryInfoId }) => {
        const findbyCart = await this.cartRepository.memberCartitems({ cart_id });
        if (findbyCart.member_id !== member_id) throw new CustomError('주문 정보가 존재하지 않습니다.');

        const total = await this.calculatePrice({ member_id, cart_id });
        if (total <= 0) throw new CustomError('잔액이 부족합니다.', 404);

        const { restaurant_id } = findbyCart;
        const [deductionPrice] = findbyCart.CartItems.map((x) => x.count * x.Menu.price);

        await this.orderRepository.addOrder({ cart_id, member_id, restaurant_id, deliveryInfoId, deductionPrice });

        return new ServiceReturn('주문이 완료되었습니다.', 200, true);
    };

    //** 특정 레스토랑 전체 주문 불러오기 */
    orderCheck = async ({ member_id }) => {
        const findUser = await this.memberRepository.findOne({ member_id });
        const restaurantId = findUser?.Restaurant.restaurant_id;

        if (!restaurantId) throw new CustomError('레스토랑 관리에서 레스토랑을 먼저 생성해 주세요.', 403);

        const findAllOrder = await this.orderRepository.orderCheck({ restaurant_id: restaurantId });

        return new ServiceReturn('정상 반환되었습니다.', 200, findAllOrder);
    };
    /** 단일 주문 불러오기 */
    findByOrder = async ({ orderId }) => {
        const findByOrderData = await this.orderRepository.findByOrder({ orderId });

        return new ServiceReturn('정상 반환되었습니다.', 200, findByOrderData);
    };

    //** 특정 회원의 전체 주문 불러오기 */
    findMemberOrder = async ({ member_id }) => {
        const userInfo = await this.memberRepository.findOne({ member_id });
        const order = await this.orderRepository.findByMember(userInfo.MemberInfos.member_info_id);

        return new ServiceReturn('정상 반환되었습니다.', 200, order);
    };

    //** 특정 주문 수정 */
    orderUpdate = async ({ order_id, statusNum, addTime, user }) => {
        const order = await this.orderRepository.findById({ order_id });

        if (!order) throw new CustomError('해당 주문이 존재하지 않습니다.', 404);
        if (addTime === null) throw new CustomError('예상 조리시간을 적어주세요.', 412);

        if (statusNum == 0) {
            const findbyCart = await this.cartRepository.memberCartitems({ cart_id: order.cart_id });
            const [deductionPrice] = findbyCart.CartItems.map((x) => x.count * x.Menu.price);

            await this.orderRepository.orderUpdateAndPointRefund({ order_id, addTime, deductionPrice });

            return new ServiceReturn('주문이 취소되었습니다.', 200, true);
        } else {
            if (addTime == -1) {
                if (statusNum == 4) {
                    const findbyCart = await this.cartRepository.memberCartitems({ cart_id: order.cart_id });
                    const [deductionPrice] = findbyCart.CartItems.map((x) => x.count * x.Menu.price);

                    await this.orderRepository.orderStatusUpdateAndCalculate({
                        order_id,
                        status: statusNum,
                        deductionPrice,
                    });

                    return new ServiceReturn('배달이 종료되었습니다.', 200, true);
                } else {
                    await this.orderRepository.orderStatusUpdate({
                        order_id,
                        status: statusNum,
                    });
                    return new ServiceReturn('배달이 시작되었습니다.\n배달이 완료될 경우 배달완료 버튼을 클릭해 주세요.', 200, true);
                }
            } else {
                const arrivalAt = new Date();
                await this.orderRepository.orderUpdate({
                    order_id,
                    status: statusNum,
                    addTime: arrivalAt.setMinutes(arrivalAt.getMinutes() + addTime),
                });

                return new ServiceReturn('주문이 정상 등록되었습니다.\n조리를 시작해 주세요.', 200, true);
            }
        }
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
