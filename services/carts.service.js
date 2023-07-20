const CartRepository = require('../repositories/carts.repository');

class CartService {
    cartRepository = new CartRepository();
    addCart = async ({ restaurant_id, user, menu_id, count }) => {
        const member_id = user.member_id;
        console.log('서비스 멤버아이디', member_id);
        console.log('서비스 레스토랑아이디', restaurant_id);
        const checkCart = await this.cartRepository.findOne({ restaurant_id, member_id });
        console.log('cart찾아온거', checkCart);
        if (!checkCart) {
            await this.cartRepository.addCart({ restaurant_id, member_id, menu_id, count });
            return { message: '장바구니에 메뉴가 추가되었습니다.' };
        } else {
            const cart_id = checkCart.cart_id;
            const updateCart = await this.cartRepository.addItem({ cart_id, member_id, menu_id, count });
            if (updateCart.count >= 0) {
                await this.cartRepository.deleteCart({ cart_id, member_id });
            }
            return { message: '장바구니에 메뉴가 수정되었습니다.' };
        }
    };
    getCart = async ({ restaurant_id, member_id }) => {
        const cart = await this.cartRepository.findOne({ restaurant_id, member_id });
        return cart;
    };
}

module.exports = CartService;
