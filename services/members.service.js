require('dotenv').config;
const { SECRET_KEY } = process.env;
const crypto = require('crypto');
const dayjs = require('dayjs');
const sendMail = require('../mail');
const MemberRepository = require('../repositories/members.repository');
const AWS = require('aws-sdk');
const { CustomError, ServiceReturn } = require('../customClass');

class MemberService {
    memberRepository = new MemberRepository();

    //** 회원가입 */
    signUp = async ({ email, nickname, password, name, phone, address, authCode, url }) => {
        const overlapEmail = await this.memberRepository.findOne([{ email }]);
        if (overlapEmail) throw new CustomError('이미 사용중인 이메일 입니다.', 403);

        const overlapNickname = overlapEmail?.nickname == nickname;
        if (overlapNickname) throw new CustomError('이미 사용중인 닉네임 입니다.', 403);

        const isEmailValid = await this.memberRepository.findOneIsEmailValid({ email });
        if (!isEmailValid) throw new CustomError('이메일을 인증해 주세요.', 402);

        const isEmailValidauthCode = isEmailValid?.auth_code == authCode;
        if (!isEmailValidauthCode) throw new CustomError('인증번호가 일치하지 않습니다.', 401);

        const isEmailValidExpiryTime = dayjs().diff(new Date(isEmailValid.created_at), 'm') >= 30;
        if (isEmailValidExpiryTime) throw new CustomError('이메일 인증 시간이 초과되었습니다.\n이메일 인증을 재시도 해주세요.', 408);

        const passwordToCrypto = crypto.pbkdf2Sync(password, SECRET_KEY.toString('hex'), 11524, 64, 'sha512').toString('hex');
        const expiryDate = dayjs().add(1, 'year').endOf('day').$d;
        const group = url == '/user/signup' ? 0 : 1;

        await this.memberRepository.createMember({ email, nickname, passwordToCrypto, group, name, phone, address, expiryDate });

        return new ServiceReturn('회원가입이 완료되었습니다.', 201, true);
    };

    //** 회원가입 이메일 인증 */
    isEmailValid = async ({ email }) => {
        const overlapEmail = await this.memberRepository.findOne({ email });
        if (overlapEmail) throw new CustomError('이미 사용중인 이메일 입니다.', 403);

        const authCode = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
        await this.memberRepository.createIsEmailValid({ email, authCode });

        try {
            await sendMail({
                email,
                title: '[ToyDeliveryWeb] 가입 인증번호 입니다.',
                body: `사용자의 가입 인증번호는 <b>'${authCode}'</b> 입니다.`,
            });
        } catch (err) {
            console.error('[이메일 발송 실패]', err);
        }

        return new ServiceReturn('인증번호가 발송되었습니다.\n이메일을 확인해 주세요.', 200, true);
    };

    //** 로그인 */
    login = async ({ email, password, url }) => {
        const passwordToCrypto = crypto.pbkdf2Sync(password, SECRET_KEY.toString('hex'), 11524, 64, 'sha512').toString('hex');
        const group = url == '/user/login' ? 0 : 1;
        const findUser = await this.memberRepository.findOne({ email });
        if (!findUser) throw new CustomError('가입되지 않은 이메일 입니다.', 401);

        const groupValid = findUser?.group == group;
        if (!groupValid) throw new CustomError('가입되지 않은 이메일 입니다.', 401);

        const passwordValid = findUser?.password == passwordToCrypto;
        if (!passwordValid) throw new CustomError('패스워드가 일치하지 않습니다.', 401);

        const payload = { member_id: findUser.member_id };

        return new ServiceReturn('로그인에 성공하였습니다', 200, payload);
    };

    //** 로그아웃 */
    logout = async () => {
        return new ServiceReturn('정상 로그아웃 되었습니다.', 200, true);
    };

    //** 회원 정보 수정 */
    updateMember = async (member_id, name, nickname, address, phone, image) => {
        await this.memberRepository.updateMember(member_id, nickname, name, phone, address, image);
        return new ServiceReturn('회원 정보를 수정하였습니다.', 200, true);
    };

    //** 회원 비밀번호 변경 */
    updatePassword = async (member_id, password, changePwd) => {
        const passwordToCrypto = crypto.pbkdf2Sync(password, SECRET_KEY.toString('hex'), 11524, 64, 'sha512').toString('hex');

        const currentPasswordIsValid = await this.memberRepository.findOne({ password: passwordToCrypto });
        if (!currentPasswordIsValid) throw new CustomError('현재 암호가 일치하지 않습니다.', 401);

        const changePwdToCrypto = crypto.pbkdf2Sync(changePwd, SECRET_KEY.toString('hex'), 11524, 64, 'sha512').toString('hex');
        await this.memberRepository.updatePassword(member_id, changePwdToCrypto);

        return new ServiceReturn('패스워드 변경이 완료되었습니다.', 200, true);
    };

    //** 회원 정보 불러오기 */
    findMember = async (member_id) => {
        const findMember = await this.memberRepository.findOne({ member_id });

        const member = {
            member_id: findMember.member_id,
            email: findMember.email,
            nickname: findMember.nickname,
            name: findMember.MemberInfos.name,
            phone: findMember.MemberInfos.phone,
            address: findMember.MemberInfos.address,
            group: findMember.group,
            image: findMember.image,
            created_at: findMember.created_at,
            updated_at: findMember.updated_at,
        };
        return new ServiceReturn('회원 정보를 정상적으로 전달하였습니다', 200, member);
    };

    //** 회원 탈퇴 */
    deleteMember = async (member_id_session, member_id, password) => {
        const passwordToCrypto = crypto.pbkdf2Sync(password, SECRET_KEY.toString('hex'), 11524, 64, 'sha512').toString('hex');
        const findMember = await this.memberRepository.findOne([{ member_id, password: passwordToCrypto }]);

        if (!findMember) throw new CustomError('패스워드가 일치하지 않습니다.', 401);
        await this.memberRepository.deleteMember(member_id);

        return new ServiceReturn('회원 탈퇴에 성공하였습니다.', 200, true);
    };

    //** 회원 프로필 사진 추가 */
    updateProfileImage = async ({ member_id, image }) => {
        await this.memberRepository.updateProfileImage({ member_id, image });
        return new ServiceReturn('프로필 사진이 정상 저장되었습니다.', 200, true);
    };

    //** 회원 프로필 사진 삭제 */
    deleteProfileImage = async ({ member_id }) => {
        const findUser = await this.memberRepository.findOne({ member_id: member_id });
        const imageKey = findUser.image.replace('https://toydeliverycloud.s3.ap-northeast-2.amazonaws.com/', '');

        const s3 = new AWS.S3();

        s3.deleteObject(
            {
                Bucket: 'toydeliverycloud',
                Key: imageKey,
            },
            async (err) => {
                if (err) throw new CustomError('삭제에 실패하였습니다.', 500);
                await this.memberRepository.updateProfileImage({ member_id, image: null });
            }
        );

        return new ServiceReturn('정상적으로 삭제되었습니다.', 200, true);
    };
}

module.exports = MemberService;
