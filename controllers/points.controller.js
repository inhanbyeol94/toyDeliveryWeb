const PointService = require('../services/points.service');

class PointsController {
    pointService = new PointService();

    /** 포인트 생성(추가및 차감)*/
    createPoint = async (req, res) => {
        try {
            const { point, point_status_code, reason } = req.body;
            const { member_id } = req.session.user;
            const { status, message, result } = await this.pointService.postPoint(member_id, point, point_status_code, reason);

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    /** 해당 member 계산된 포인트 조회 */
    getPoint = async (req, res) => {
        try {
            const { member_id } = req.session.user;
            const { status, message, result } = await this.pointService.calculation(member_id);

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    /** point history 조회 */
    getPointHistory = async (req, res) => {
        try {
            const { member_id } = req.session.user;
            const { status, message, result } = await this.pointService.getPoint(member_id);

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };
}

module.exports = PointsController;
