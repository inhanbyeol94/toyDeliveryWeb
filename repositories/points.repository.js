const { Point, Member } = require('../models');

class PointRepository {
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
