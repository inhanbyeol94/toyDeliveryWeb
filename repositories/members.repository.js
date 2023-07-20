const { Member, MemberInfo, Point, IsEmailValid, Restaurant, sequelize } = require('../models');
class MemberRepository {
    findOne = async (target) => {
        return Member.findOne({
            where: target,
            include: [{ model: MemberInfo, where: { default: true } }, { model: Restaurant }],
            nest: true,
            raw: true,
        });
    };

    //general
    createIsEmailValid = async ({ email, authCode }) => {
        return IsEmailValid.create({ email, auth_code: authCode });
    };

    findOneIsEmailValid = async ({ email }) => {
        return IsEmailValid.findOne({ where: { email }, limit: 1, order: [['created_at', 'DESC']] });
    };

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

    updateMember = async (member_id, nickname, name, phone, address, image) => {
        return await sequelize.transaction(async (transaction) => {
            await Member.update({ nickname, image }, { where: { member_id } }, { transaction });
            await MemberInfo.update({ name, address, phone }, { where: { member_id } }, { transaction });
        });
    };

    deleteMember = async (member_id) => {
        const deleteMemberData = await Member.destroy({ where: { member_id } });

        return deleteMemberData;
    };
}

module.exports = MemberRepository;
