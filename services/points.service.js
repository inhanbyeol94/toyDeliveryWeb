const dayjs = require('dayjs');
const PointRepository = require('../repositories/points.repository');
const MemberRepository = require('../repositories/members.repository');
const { CustomError, ServiceReturn } = require('../customClass');
class PointService {
    pointRepository = new PointRepository();
    memberRepository = new MemberRepository();

    // getPoint = async (member_id_session, member_id) => {
    //     const findAllPoint = await this.pointRepository.findAllPoint(member_id);
    //     const error = new Error();
    //     if (member_id_session != findAllPoint.member_id) {
    //         error.message = '포인트 조회 권한이 없습니다.';
    //         error.status = 403;
    //         throw error;
    //     }
    //     findAllPoint.sort((a, b) => {
    //         return b.created_at - a.created_at;
    //     });

    //     return findAllPoint.map((point) => {
    //         return {
    //             point_id: point.point_id,
    //             member_id: point.member.member_id,
    //             point: point.point,
    //             point_status_code: point.point_status_code,
    //             reason: point.reason,
    //             created_at: point.created_at,
    //         };
    //     });
    // };

    /** 포인트 생성(추가및 차감)*/
    postPoint = async (member_id_session, member_id, point, point_status_code, reason) => {
        const findMember = await this.memberRepository.findOne({ member_id });

        if (!findMember) throw new CustomError('회원 정보가 존재하지 않습니다.', 403);
        else if (member_id_session != findMember.member_id) throw new CustomError('포인트를 변경할 권한이 없습니다.', 403);
        else if (point_status_code < 0 || point_status_code > 1) throw new CustomError('포인트 상태 코드를 사용할 수 없습니다.', 412);

        const findAllPoint = await this.pointRepository.findAllPoint(member_id);
        let firstPoint = 0;
        for (let i in findAllPoint) {
            if (i == 0) {
                firstPoint = findAllPoint[0].point;
            } else if (findAllPoint[i].point_status_code == 0) {
                firstPoint = firstPoint - findAllPoint[i].point;
            } else if (findAllPoint[i].point_status_code == 1) {
                firstPoint = firstPoint + findAllPoint[i].point;
            }
        }
        if (point_status_code == 0) {
            if (point > firstPoint) {
                throw new CustomError('소지하고 있는 포인트보다 높은 값은 사용 할 수 없습니다.', 400);
            }
        }

        const expiryDate = dayjs().add(1, 'year').endOf('day').$d;
        await this.pointRepository.createPoint(member_id, point, point_status_code, reason, expiryDate);
        return new ServiceReturn('포인트를 변경하였습니다.', 201, true);
    };

    /** 포인트 계산후 출력*/
    calculation = async (member_id_session, member_id) => {
        const findAllPoint = await this.pointRepository.findAllPoint(member_id);
        let firstPoint = 0;

        if (member_id_session != findAllPoint[0].member_id) throw new CustomError('포인트 조회 권한이 없습니다.', 403);

        for (let i in findAllPoint) {
            if (i == 0) {
                firstPoint = findAllPoint[0].point;
            } else if (findAllPoint[i].point_status_code == 0) {
                firstPoint = firstPoint - findAllPoint[i].point;
            } else if (findAllPoint[i].point_status_code == 1) {
                firstPoint = firstPoint + findAllPoint[i].point;
            }
        }

        const resultPoint = await this.memberRepository.findOne({ member_id });

        const result = {
            member_id: resultPoint.member_id,
            name: resultPoint.MemberInfos.name,
            nickname: resultPoint.nickname,
            point: firstPoint,
        };
        return new ServiceReturn('포인트 조회에 성공하였습니다.', 200, result);
    };
}

module.exports = PointService;
