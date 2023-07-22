const { Point, Member } = require('../models');

class PointRepository {
    /**member에 해당하는 포인트 모두 조회*/
    findAllPoint = async (member_id) => {
        const findAllPointData = await Point.findAll({
            where: { member_id },
            include: [
                {
                    model: Member,
                },
            ],
        });

        return findAllPointData;
    };

    /** 포인트 생성(추가및 차감)*/
    createPoint = async (member_id, point, point_status_code, reason, expiryDate) => {
        await Point.create({
            member_id,
            point_status_code,
            point,
            reason,
            expiry_at: new Date(expiryDate),
        });
    };
}

module.exports = PointRepository;
