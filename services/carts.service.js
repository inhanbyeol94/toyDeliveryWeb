const CartRepository = require('../repositories/carts.repository');
const { CustomError, ServiceReturn } = require('../customClass');

class CartService {
    cartRepository = new CartRepository();

    /** 장바구니에 아이템 추가 */
    addItem = async ({ restaurant_id, memberId, menu_id, count }) => {
        if (count <= 0) throw new CustomError('상품 수량은 1개 이상 선택해 주세요.', 403);

        const cartToValid = await this.cartRepository.findOne({ restaurant_id, member_id: memberId });

        if (!cartToValid) {
            await this.cartRepository.addCartAndItem({ restaurant_id, member_id: memberId, menu_id, count });
            return new ServiceReturn('장바구니에 메뉴가 추가되었습니다.', 200, true);
        } else {
            const cartId = cartToValid.cart_id;
            const findItem = await this.cartRepository.findItem([{ cart_id: cartId, menu_id }]);

            if (findItem) {
                await this.cartRepository.updateItem({ cart_id: cartId, menu_id, count });
                return new ServiceReturn('메뉴 수량이 수정되었습니다.', 200, true);
            } else {
                await this.cartRepository.addItem({ menu_id, cart_id: cartId, count });
                return new ServiceReturn('장바구니에 메뉴가 추가되었습니다.', 200, true);
            }
        }
    };

    /** 선택한 장바구니 아이템 삭제 */
    deleteItem = async ({ itemId, member_id }) => {
        const findItem = await this.cartRepository.findItem({ cart_item_id: itemId });
        if (!findItem) throw new CustomError('장바구니 상품을 찾을 수 없습니다.', 404);

        const authToValid = findItem.Cart.member_id == member_id;
        if (!authToValid) throw new CustomError('타인의 장바구니 상품을 삭제할 수 없습니다.', 403);

        const findItemsCount = await this.cartRepository.findItemsCount({ cart_item_id: itemId });
        if (findItemsCount == 1) {
            await this.cartRepository.deleteCartAndItems({ cart_item_id: itemId });
            return new ServiceReturn('장바구니 상품이 정상적으로 삭제되었습니다.', 200, true);
        } else {
            await this.cartRepository.deleteItem({ cart_item_id: itemId });
            return new ServiceReturn('장바구니 상품이 정상적으로 삭제되었습니다.', 200, true);
        }
    };

    /** 현재 사용중인 장바구니 읽기 */
    getCurrentCart = async ({ member_id }) => {
        const getCurrentCartData = await this.cartRepository.getCurrentCart({ member_id });
        if (!getCurrentCartData) throw new CustomError('현재 사용중인 장바구니가 없습니다.', 404, false);

        const sumPrice = getCurrentCartData.CartItems.map((x) => x.Menu.price * x.count).reduce((acc, cur) => acc + cur, 0);
        return new ServiceReturn('정상 반환되었습니다.', 200, [getCurrentCartData, sumPrice]);
    };

    /** 팀원 중 사용하는분이 없을 경우 제거 */
    getCart = async ({ restaurant_id, member_id }) => {
        const cart = await this.cartRepository.findOne({ restaurant_id, member_id });
        return cart;
    };
}

module.exports = CartService;
