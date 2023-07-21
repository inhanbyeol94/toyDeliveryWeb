const { Op } = require('sequelize');
const { Member, MemberInfo, Point, IsEmailValid, Restaurant, sequelize } = require('../models');
class MemberRepository {
    //** 회원 정보 불러오기 */
    findOne = async (target) => {
        return Member.findOne({
            where: { [Op.and]: target },
            include: [{ model: MemberInfo, where: { default: true } }, { model: Restaurant }],
            nest: true,
            raw: true,
        });
    };

    //** 회원가입 이메일 인증 생성 */
    createIsEmailValid = async ({ email, authCode }) => {
        return IsEmailValid.create({ email, auth_code: authCode });
    };

    //** 회원가입 인증번호 불러오기 */
    findOneIsEmailValid = async ({ email }) => {
        return IsEmailValid.findOne({ where: { email }, limit: 1, order: [['created_at', 'DESC']] });
    };

    //** 회원가입 */
    createMember = async ({ email, nickname, passwordToCrypto, group, name, phone, address, expiryDate }) => {
        await sequelize.transaction(async (transaction) => {
            const memberCreate = await Member.create({ email, nickname, password: passwordToCrypto, group }, { transaction });
            await MemberInfo.create({ member_id: memberCreate.member_id, name, phone, address, default: true }, { transaction });
            await Point.create(
                {
                    member_id: memberCreate.member_id,
                    point_status_code: 1,
                    point: 1000000,
                    reason: '회원가입 축하 포인트 지급',
                    expiry_at: new Date(expiryDate),
                },
                { transaction }
            );
        });
    };

    //** 회원 정보 수정 */
    updateMember = async (member_id, nickname, name, phone, address, image) => {
        return await sequelize.transaction(async (transaction) => {
            await Member.update({ nickname, image }, { where: { member_id } }, { transaction });
            await MemberInfo.update({ name, address, phone }, { where: { member_id } }, { transaction });
        });
    };

    //** 회원 프로필 사진 추가 및 삭제 */
    updateProfileImage = async ({ image, member_id }) => {
        await Member.update({ image }, { where: { member_id } });
    };

    //** 회원 패스워드 수정 */
    updatePassword = async (member_id, changePwdToCrypto) => {
        return await Member.update({ password: changePwdToCrypto }, { where: { member_id } });
    };

    //** 회원 탈퇴 */
    deleteMember = async (member_id) => {
        const deleteMemberData = await Member.destroy({ where: { member_id } });

        return deleteMemberData;
    };
}

module.exports = MemberRepository;
