const CartService = require('../services/carts.service');

class CartsController {
    cartService = new CartService();

    /** 장바구니에 아이템 추가 */
    addItem = async (req, res) => {
        try {
            const { restaurant_id } = req.params;
            const { menu_id, count } = req.body;
            const memberId = req.session.user?.member_id;
            const { status, message, result } = await this.cartService.addItem({ restaurant_id, memberId, menu_id, count });

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    /** 선택한 장바구니 아이템 삭제 */
    deleteItem = async (req, res) => {
        try {
            const { itemId } = req.params;
            const { member_id } = req.session.user;
            const { status, message, result } = await this.cartService.deleteItem({ itemId, member_id });

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    /** 현재 사용중인 장바구니 읽기 */
    getCurrentCart = async (req, res) => {
        try {
            const { member_id } = req.session.user;
            const { status, message, result } = await this.cartService.getCurrentCart({ member_id });

            return res.status(status).json({ result, message });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    /** 팀원 중 사용하는분이 없을 경우 제거 */
    getCart = async (req, res) => {
        const { restaurant_id } = req.params;
        const member_id = req.session.user.member_id;
        const data = await this.cartService.getCart({ restaurant_id, member_id });
        res.status(200).json({ data });
    };
}

module.exports = CartsController;
