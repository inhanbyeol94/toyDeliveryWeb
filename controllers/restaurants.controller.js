const RestaurantService = require('../services/restaurants.service');

class RestaurantsController {
    restaurantService = new RestaurantService();

    //** 전체 레스토랑 불러오기 */
    getRestaurantList = async (req, res) => {
        try {
            const { status, message, result } = await this.restaurantService.findAllRestaurant();

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 특정 레스토랑 불러오기 */
    getRestaurant = async (req, res) => {
        try {
            const { restaurant_id } = req.params;
            const { status, message, result } = await this.restaurantService.findRestaurant(restaurant_id);

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 나의 레스토랑 불러오기 - 특정 레스토랑은 restaurant_id를 param값으로 받고, myrestaurant는 session의 member_id를 받음 */
    getMyrestaurant = async (req, res) => {
        try {
            const { member_id } = req.session.user;
            const { status, message, result } = await this.restaurantService.findMyrestaurant(member_id);

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 레스토랑 생성 */
    createRestaurant = async (req, res) => {
        try {
            const { name, address, tel, desc, category, image } = req.body;
            const { member_id } = req.session.user;
            const { status, message, result } = await this.restaurantService.createRestaurant(member_id, name, address, tel, desc, category, image);

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 레스토랑 수정 */
    updateRestaurant = async (req, res) => {
        try {
            const { restaurant_id } = req.params;
            const { name, address, tel, desc, category, image } = req.body;
            const { member_id } = req.session.user;
            const { status, message, result } = await this.restaurantService.updateRestaurant(
                member_id,
                restaurant_id,
                name,
                address,
                tel,
                desc,
                category,
                image
            );

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 레스토랑 대표 이미지 수정 */
    updateRestaurantImg = async (req, res) => {
        try {
            const { restaurant_id } = req.params;
            const image = req.file.location;
            const { status, message, result } = await this.restaurantService.updateRestaurantImg({ image, restaurant_id });

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 레스토랑 삭제 */
    deleteRestaurant = async (req, res) => {
        try {
            const deleteRestaurant = await this.restaurantService.deleteRestaurant(restaurant_id, member_id);
            res.status(200).json({ status: 200, result: deleteRestaurant });
        } catch (error) {
            res.status(400).json({ status: 400, result: Error });
        }
    };

    //** 레스토랑 대표 이미지 삭제 */
    deleteRestaurantImg = async (req, res) => {
        try {
            const { restaurant_id } = req.params;
            const { status, message, result } = await this.restaurantService.deleteProfileImage({ restaurant_id });

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };
}

module.exports = RestaurantsController;
