require('dotenv').config;
const { SECRET_KEY, SESSION_SECRET_KEY } = process.env;
const crypto = require('crypto');
const dayjs = require('dayjs');
const sendMail = require('../mail');
const MemberRepository = require('../repositories/members.repository');

class MemberService {
    memberRepository = new MemberRepository();
    signUp = async ({ email, nickname, password, group, name, phone, address, authCode }) => {
        const overlapEmail = await this.memberRepository.findOne({ email });
        if (overlapEmail) throw { code: 405, result: '이미 사용중인 이메일 입니다.' };

        const overlapNickname = overlapEmail?.nickname == nickname;
        if (overlapNickname) throw { code: 405, result: '이미 사용중인 닉네임 입니다.' };

        const isEmailValid = await this.memberRepository.findOneIsEmailValid({ email });
        if (!isEmailValid) throw { code: 405, result: '이메일을 인증해 주세요.' };

        const isEmailValidauthCode = isEmailValid?.auth_code == authCode;
        if (!isEmailValidauthCode) throw { code: 405, result: '인증번호가 일치하지 않습니다.' };

        const isEmailValidExpiryTime = dayjs().diff(new Date(isEmailValid.created_at), 'm') >= 30;
        if (isEmailValidExpiryTime) throw { code: 405, result: '이메일 인증 시간이 초과되었습니다.\n이메일 인증을 재시도 해주세요.' };

        const passwordToCrypto = crypto.pbkdf2Sync(password, SECRET_KEY.toString('hex'), 11524, 64, 'sha512').toString('hex');
        const expiryDate = dayjs().add(1, 'year').endOf('day').$d;

        await this.memberRepository.createMember({ email, nickname, passwordToCrypto, group, name, phone, address, expiryDate });

        return { code: 201, result: '회원가입이 완료되었습니다.' };
    };

    isEmailValid = async ({ email }) => {
        const overlapEmail = await this.memberRepository.findOne({ email });
        if (overlapEmail) throw { code: 405, result: '이미 사용중인 이메일 입니다.' };

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

        return { code: 200, result: '인증번호가 발송되었습니다.\n이메일을 확인해 주세요.' };
    };

    login = async ({ email, password, group }) => {
        const passwordToCrypto = crypto.pbkdf2Sync(password, SECRET_KEY.toString('hex'), 11524, 64, 'sha512').toString('hex');

        const findUser = await this.memberRepository.findOne({ email });
        if (!findUser) throw { code: 401, result: '가입되지 않은 이메일 입니다.' };

        const groupValid = findUser?.group == group;
        if (!groupValid) throw { code: 401, result: '가입되지 않은 이메일 입니다.' };

        const passwordValid = findUser?.password == passwordToCrypto;
        if (!passwordValid) throw { code: 401, result: '패스워드가 일치하지 않습니다.' };

        const payload = {
            email: findUser.email,
            nickname: findUser.nickname,
            defaultName: findUser.MemberInfos.name,
            defaultPhone: findUser.MemberInfos.phone,
            defaultAddress: findUser.MemberInfos.address,
            group: findUser.group,
        };

        return { code: 200, result: '로그인 성공', payload };
    };

    logout = async () => {
        return { code: 200, result: '로그아웃 성공' };
    };
}

module.exports = MemberService;
