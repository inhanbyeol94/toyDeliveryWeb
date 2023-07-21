const CartRepository = require('../repositories/carts.repository');

class CartService {
    cartRepository = new CartRepository();
    addCart = async ({ restaurant_id, user, menu_id, count }) => {
        if (count <= 0) return { message: '수량은 0개 미만일 수 없습니다.' };
        const member_id = user.member_id;
        const checkCart = await this.cartRepository.findOne({ restaurant_id, member_id });
        if (!checkCart) {
            await this.cartRepository.addCart({ restaurant_id, member_id, menu_id, count });
            return { message: '장바구니에 메뉴가 추가되었습니다.' };
        } else {
            const cart_id = checkCart.cart_id;

            const findItems = await this.cartRepository.findItem([{ cart_id, menu_id }]);

            if (findItems) {
                await this.cartRepository.updateItem({ cart_id, menu_id, count });
                return { message: '장바구니에 메뉴가 수정되었습니다.' };
            } else {
                await this.cartRepository.addItem({ menu_id, cart_id, count });
                return { message: '장바구니에 메뉴가 추가되었습니다.' };
            }
        }
    };
    getCart = async ({ restaurant_id, member_id }) => {
        const cart = await this.cartRepository.findOne({ restaurant_id, member_id });
        return cart;
    };

    deleteItem = async ({ restaurant_id, member_id, menu_id }) => {
        const checkCart = await this.cartRepository.findOne({ restaurant_id, member_id });
        await this.cartRepository.deleteItem([{ cart_id: checkCart.cart_id, menu_id }]);
        return { message: '메뉴가 정상 삭제되었습니다.' };
    };
}

module.exports = CartService;
