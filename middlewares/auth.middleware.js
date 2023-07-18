const { Member } = require('../models');

module.exports = async (req, res, next) => {
    try {
        if (!req.session.user) return res.status(401).json({ message: '로그인이 필요합니다.' });

        const user = await Member.findOne({ where: { email: req.session.user.email } });

        if (!user) {
            req.session.destroy();
            return res.status(403).json({ message: '사용자 정보가 변조되어 로그아웃 되었습니다.' });
        }

        // if (!req.session.user) return res.redirect('../');
        next();
    } catch (error) {
        res.status(401).json({
            message: '비정상적인 접근입니다.',
        });
        console.log(error);
        return;
    }
};
