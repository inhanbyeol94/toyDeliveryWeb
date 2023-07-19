const CartService = require('../services/carts.service');

class CartsController {
    cartService = new CartService();
    addCart = async (req, res) => {
        try {
            const { restaurant_id } = req.params;
            const { menu_id, count } = req.body;
            const user = req.session.user;
            const data = await this.cartService.addCart(restaurant_id, user, menu_id, count);
            res.status(200).json({ data });
        } catch (err) {
            if (err.code) return res.status(err.code).json({ message: err.result });
            console.error(err);
            return res.status(500).json({ message: err });
        }
    };
    getCart = async (req, res) => {
        const { restaurant_id } = req.params;
        const user = req.session.user;
        const data = await this.cartService.addCart(restaurant_id, user);
        res.status(200).json({ data });
    };
}

module.exports = CartsController;
