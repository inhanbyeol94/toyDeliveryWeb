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

    createPoint = async (member_id, point, point_status_code, reason) => {
        const createPointData = await Point.create({ member_id, point, point_status_code, reason });

        return createPointData;
    };
}

module.exports = PointRepository;
