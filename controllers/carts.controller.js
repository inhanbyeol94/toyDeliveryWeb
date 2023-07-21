const CartService = require('../services/carts.service');

class CartsController {
    cartService = new CartService();
    addCart = async (req, res) => {
        try {
            const { restaurant_id } = req.params;
            const { menu_id, count } = req.body;
            const user = req.session.user;
            const data = await this.cartService.addCart({ restaurant_id, user, menu_id, count });
            res.status(200).json({ data });
        } catch (err) {
            if (err.code) return res.status(err.code).json({ message: err.result });
            console.error(err);
            return res.status(500).json({ message: err });
        }
    };
    getCart = async (req, res) => {
        const { restaurant_id } = req.params;
        const member_id = req.session.user.member_id;
        const data = await this.cartService.getCart({ restaurant_id, member_id });
        res.status(200).json({ data });
    };

    deleteItem = async (req, res) => {
        try {
            const { itemId } = req.params;
            const { member_id } = req.session.user;
            const { status, result } = await this.cartService.deleteItem({ itemId, member_id });
            res.status(status).json({ result });
        } catch (error) {
            const { status, result } = error;
            if (status) return res.status(error.status).json({ result });
            console.error(error);
            return res.status(500).json({ result: '오류가 발생하였습니다.' });
        }
    };

    getRecentCart = async (req, res) => {
        try {
            const { member_id } = req.session.user;
            const { status, result } = await this.cartService.getRecentCart({ member_id });
            return res.status(status).json({ result });
        } catch (error) {
            const { status, result } = error;
            if (status) return res.status(error.status).json({ result });
            console.error(error);
            return res.status(500).json({ result: '오류가 발생하였습니다.' });
        }
    };
}

module.exports = CartsController;
