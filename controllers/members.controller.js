const MemberService = require('../services/members.service');

class MembersController {
    memberService = new MemberService();

    //** 회원가입 */
    signUp = async (req, res) => {
        try {
            const { url } = req;
            const { email, nickname, password, name, phone, address, authCode } = req.body;
            const { status, message, result } = await this.memberService.signUp({ email, nickname, password, name, phone, address, authCode, url });

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 회원가입 이메일 인증 */
    isEmailValid = async (req, res) => {
        try {
            const { email } = req.body;
            const { status, message, result } = await this.memberService.isEmailValid({ email });

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 로그인 */
    login = async (req, res) => {
        try {
            const { url } = req;
            const { email, password } = req.body;
            const { status, message, result } = await this.memberService.login({ email, password, url });

            req.session.user = result;
            return res.status(status).json({ message }); //** 멤버 인덱스를 반환하는 경우 보안 이슈 우려가 있기에 message만 반환 */
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 로그아웃 */
    logout = async (req, res) => {
        try {
            const { status, message, result } = await this.memberService.logout();

            await req.session.destroy(() => res.status(status).json({ message, result }));
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 회원 정보 불러오기 */
    getMember = async (req, res) => {
        try {
            const member_id = req.session.user?.member_id || null;
            const { status, message, result } = await this.memberService.findMember(member_id);

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 회원 정보 수정 */
    updateMember = async (req, res) => {
        try {
            const { name, nickname, address, phone, image } = req.body;
            const { member_id } = req.session.user;
            const { status, message, result } = await this.memberService.updateMember(member_id, name, nickname, address, phone, image);

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 회원 비밀번호 변경 */
    updatePassword = async (req, res) => {
        try {
            const { password, changePwd, confirmPwd } = req.body;
            const { member_id } = req.session.user;
            const { status, message, result } = await this.memberService.updatePassword(member_id, password, changePwd, confirmPwd);

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 회원 탈퇴 */
    deleteMember = async (req, res) => {
        try {
            const { password } = req.body;
            const { member_id } = req.session.user;
            const { status, message, result } = await this.memberService.deleteMember(member_id, password);

            await req.session.destroy(() => res.status(status).json({ message, result }));
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 회원 프로필 사진 추가 */
    updateMemberImage = async (req, res) => {
        try {
            const image = req.file.location;
            const { member_id } = req.session.user;
            const { status, message, result } = await this.memberService.updateProfileImage({ image, member_id });

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 회원 프로필 사진 삭제 */
    deleteProfileImage = async (req, res) => {
        try {
            const { member_id } = req.session.user;
            const { status, message, result } = await this.memberService.deleteProfileImage({ member_id });

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    //** 회원 배달지 정보 추가 */
    createDeliveryInfo = async (req, res) => {
        try {
            const { member_id } = req.session.user;
            const { name, phone, address } = req.body;
            const { status, message, result } = await this.memberService.createDeliveryInfo({ name, phone, address, member_id });

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    updateDeliveryInfo = async (req, res) => {
        try {
            const { member_id } = req.session.user;
            const { memberInfoId } = req.body;
            const { status, message, result } = await this.memberService.updateDeliveryInfo({ memberInfoId, member_id });

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };
}

module.exports = MembersController;
