const PointRepository = require('../repositories/points.repository');
const MemberRepository = require('../repositories/members.repository');
class PointService {
    pointRepository = new PointRepository();
    memberRepository = new MemberRepository();

    getPoint = async (member_id_session, member_id) => {
        const findAllPoint = await this.pointRepository.findAllPoint(member_id);
        const error = new Error();
        if (member_id_session != findAllPoint.member_id) {
            error.message = '포인트 조회 권한이 없습니다.';
            error.status = 403;
            throw error;
        }
        findAllPoint.sort((a, b) => {
            return b.created_at - a.created_at;
        });

        return findAllPoint.map((point) => {
            return {
                point_id: point.point_id,
                member_id: point.member.member_id,
                point: point.point,
                point_status_code: point.point_status_code,
                reason: point.reason,
                created_at: point.created_at,
            };
        });
    };

    postPoint = async (member_id_session, member_id, point, point_status_code, reason) => {
        const findMember = await this.memberRepository.findOne(member_id);
        const error = new Error();
        if (!findMember) {
            error.message = '회원 정보가 존재하지 않습니다.';
            error.status = 403;
            throw error;
        } else if (member_id_session != findMember.member_id) {
            error.message = '포인트를 변경할 권한이 없습니다.';
            error.status = 403;
            throw error;
        }

        await this.pointRepository.createPoint(member_id, point, point_status_code, reason);

        return { status: 201, message: '포인트를 변경하였습니다.' };
    };

    // calculation = async (member_id_session, member_id) => {
    //     const findAllPoint = await this.pointRepository.findAllPoint(member_id);
    //     let firstPoint = 0;
    //     const error = new Error();
    //     if (member_id_session != findAllPoint.member_id) {
    //         error.message = '포인트 조회 권한이 없습니다.';
    //         error.status = 403;
    //         throw error;
    //     }

    //     for (let point of findAllPoint) {
    //         if (point[0]) {
    //             firstPoint = point[0].point;
    //         } else if (point.point_status_code == 0) {
    //             firstPoint = firstPoint - point.point;
    //         } else if (point.point_status_code == 1) {
    //             firstPoint = firstPoint + point.point;
    //         }
    //     }
    //     return { status: 200, result: firstPoint };
    // };
}

module.exports = PointService;
