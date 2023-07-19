const CartRepository = require('../repositories/carts.repository');

class CartService {
    cartRepository = new CartRepository();
    addCart = async (restaurant_id, user, menu_id, count) => {
        const checkCart = await this.cartRepository.findOne(restaurant_id, user);
        const member_id = user.member_id;
        if (!checkCart) {
            await this.cartRepository.addCart(restaurant_id, member_id, menu_id, count);
            return { message: '장바구니에 메뉴가 추가되었습니다.' };
        } else {
            const updateCart = await this.cartRepository.addItem(checkCart.cart_id, member_id, menu_id, count);
            if (updateCart.count >= 0) {
                await this.cartRepository.deleteCart(checkCart.cart_id, member_id);
            }
            return { message: '장바구니에 메뉴가 수정되었습니다.' };
        }
    };
    getCart = async (restaurant_id, user) => {
        const cart = await this.cartRepository.findOne(restaurant_id, user);
        return cart;
    };
}

module.exports = CartService;
