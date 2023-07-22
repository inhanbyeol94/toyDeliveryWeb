const PointService = require('../services/points.service');

class PointsController {
    pointService = new PointService();

    /** 포인트 생성(추가및 차감)*/
    createPoint = async (req, res) => {
        const url_member_id = req.params.member_id;
        const { point, point_status_code, reason } = req.body;
        const { member_id } = req.session.user;

        try {
            const { status, message, result } = await this.pointService.postPoint(member_id, url_member_id, point, point_status_code, reason);

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });

            return res.status(500).json({ message: '포인트 작성에 실패했습니다.' });
        }
    };

    //해당 멤버 포인트 전체 조회
    // getPoint = async (req, res) => {
    //     const url_member_id = req.params.member_id;
    //     const { member_id } = req.session.user;

    //     try {
    //         const points = await this.pointService.getPoint(member_id, url_member_id);

    //         res.status(200).json({ points });
    //     } catch (error) {
    //         if (error.status) return res.status(error.status).json({ errorMessage: error.message });
    //         return res.status(500).json({ errorMessage: '포인트 조회에 실패했습니다.' });
    //     }
    // };

    /** 해당 member 계산된 포인트 조회 */
    getPoint = async (req, res) => {
        const url_member_id = req.params.member_id;
        const { member_id } = req.session.user;

        try {
            const { status, message, result } = await this.pointService.calculation(member_id, url_member_id);
            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });

            return res.status(500).json({ message: '포인트 조회에 실패했습니다.' });
        }
    };
}

module.exports = PointsController;
