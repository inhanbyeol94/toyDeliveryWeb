const MemberService = require('../services/members.service');

class MembersController {
    memberService = new MemberService();

    signUp = async (req, res) => {
        try {
            const { email, nickname, password, group, name, phone, address, authCode } = req.body;
            const { code, result } = await this.memberService.signUp({ email, nickname, password, group, name, phone, address, authCode });
            return res.status(code).json({ result });
        } catch (err) {
            if (err.code) return res.status(err.code).json({ message: err.result });
            console.error(err);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };
    isEmailValid = async (req, res) => {
        try {
            const { email } = req.body;

            const { code, result } = await this.memberService.isEmailValid({ email });
            return res.status(code).json({ result });
        } catch (err) {
            if (err.code) return res.status(err.code).json({ message: err.result });
            console.error(err);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    login = async (req, res) => {
        try {
            const { email, password, group } = req.body;

            const { code, result, payload } = await this.memberService.login({ email, password, group });
            req.session.user = payload;
            return res.status(code).json({ result });
        } catch (err) {
            if (err.code) return res.status(err.code).json({ message: err.result });
            console.error(err);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    logout = async (req, res) => {
        try {
            console.log(req.session.user);
            const { code, result } = await this.memberService.logout();

            await req.session.destroy(() => {
                return res.status(code).json({ result });
            });
        } catch (err) {
            if (err.code) return res.status(err.code).json({ message: err.result });
            console.error(err);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };
}

module.exports = MembersController;
