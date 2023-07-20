const MemberService = require('../services/members.service');

class MembersController {
    memberService = new MemberService();
    signUp = async (req, res) => {
        try {
            const { url } = req;
            const { email, nickname, password, name, phone, address, authCode } = req.body;
            const { code, result } = await this.memberService.signUp({ email, nickname, password, name, phone, address, authCode, url });
            return res.status(code).json({ result });
        } catch (err) {
            if (err.code) return res.status(err.code).json({ result: err.result });
            console.error(err);
            return res.status(500).json({ result: '오류가 발생하였습니다.' });
        }
    };
    isEmailValid = async (req, res) => {
        try {
            const { email } = req.body;
            const { code, result } = await this.memberService.isEmailValid({ email });
            return res.status(code).json({ result });
        } catch (err) {
            if (err.code) return res.status(err.code).json({ result: err.result });
            console.error(err);
            return res.status(500).json({ result: '오류가 발생하였습니다.' });
        }
    };

    login = async (req, res) => {
        try {
            const { url } = req;
            const { email, password } = req.body;
            const { code, result, payload } = await this.memberService.login({ email, password, url });
            req.session.user = payload;
            return res.status(code).json({ result });
        } catch (err) {
            if (err.code) return res.status(err.code).json({ result: err.result });
            console.error(err);
            return res.status(500).json({ result: '오류가 발생하였습니다.' });
        }
    };

    logout = async (req, res) => {
        try {
            const { code, result } = await this.memberService.logout();

            await req.session.destroy(() => {
                return res.status(code).json({ result });
            });
        } catch (err) {
            if (err.code) return res.status(err.code).json({ result: err.result });
            console.error(err);
            return res.status(500).json({ result: '오류가 발생하였습니다.' });
        }
    };

    getMember = async (req, res) => {
        try {
            const member_id = req.session.user?.member_id || null;
            const { code, member } = await this.memberService.findMember(member_id);

            res.status(code).json({ member });
        } catch (err) {
            if (err.status) return res.status(err.status).json({ message: err.message });
            return res.status(500).json({ message: '회원 정보 조회에 실패하였습니다.' });
        }
    };

    updateMember = async (req, res) => {
        try {
            const { name, nickname, address, phone, image } = req.body;
            const { member_id } = req.session.user;
            // await req.session.destroy();
            const { code, result } = await this.memberService.updateMember(member_id, name, nickname, address, phone, image);
            return res.status(code).json({ result });
        } catch (err) {
            if (err.status) return res.status(err.status).json({ message: err.message });

            return res.status(500).json({ message: '회원 정보를 수정 할 수 없습니다.' });
        }
    };

    updatePassword = async (req, res) => {
        try {
            const { password, changePwd, confirmPwd } = req.body;
            const { member_id } = req.session.user;
            const { code, result } = await this.memberService.updatePassword(member_id, password, changePwd, confirmPwd);
            return res.status(code).json({ result });
        } catch (err) {
            if (err.status) return res.status(err.status).json({ message: err.message });

            return res.status(500).json({ message: '비밀번호를 수정 할 수 없습니다.' });
        }
    };

    deleteMember = async (req, res) => {
        try {
            const url_member_id = req.params.member_id;
            const { password } = req.body;
            const { member_id } = req.session.user;

            const { code, result } = await this.memberService.deleteMember(member_id, url_member_id, password);

            await req.session.destroy(() => {
                return res.status(code).json({ message: result });
            });
        } catch (err) {
            if (err.status) return res.status(err.status).json({ message: err.message });

            return res.status(500).json({ message: '회원 탈퇴에 실패하였습니다.' });
        }
    };
}

module.exports = MembersController;
