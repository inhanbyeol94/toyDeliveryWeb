const MemberService = require('../services/members.service');

class MembersController {
    memberService = MemberService;

    signUp = async (req, res) => {
        try {
            const { email, nickname, password, group, name, phone, address } = req.body;
            const { code, result } = await this.memberService.signUp({ email, nickname, password, group, name, phone, address });

            return res.status(code).json({ result });
        } catch (err) {
            if (err.code) return res.status(err.code).json({ message: err.result });
            console.error(err);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };
}

module.exports = MembersController;
