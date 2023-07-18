const { Member } = require('../models');

const authMiddlewares = {
    nonAuthMiddleware: async (req, res, next) => {
        try {
            if (req.session.user) throw { code: 401, result: '로그인 상태에서는 작업할 수 없습니다.' };
            next();
        } catch (error) {
            if (error.code) return res.status(401).json({ message: error.result });
            console.log(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    },

    allAuthMiddleware: async (req, res, next) => {
        try {
            if (!req.session.user) throw { code: 401, result: '로그인이 필요합니다.' };
            const findUser = await Member.findOne({ where: { email: req.session.user.email } });

            if (!findUser) {
                await req.session.destroy(() => {
                    throw { code: 401, result: '로그인 정보가 변조되어 로그아웃 되었습니다.' };
                });
            }

            next();
        } catch (error) {
            if (error.code) return res.status(401).json({ message: error.result });
            console.log(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    },

    userAuthMiddleware: async (req, res, next) => {
        try {
            if (!req.session.user) throw { code: 401, result: '로그인이 필요합니다.' };
            const findUser = await Member.findOne({ where: { email: req.session.user.email } });

            if (!findUser) {
                await req.session.destroy(() => {
                    throw { code: 401, result: '로그인 정보가 변조되어 로그아웃 되었습니다.' };
                });
            }

            if (req.session.user.group !== 0) throw { code: 401, result: '사용자만 접근이 가능합니다.' };

            next();
        } catch (error) {
            if (error.code) return res.status(401).json({ message: error.result });
            console.log(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    },

    adminAuthMiddleware: async (req, res, next) => {
        try {
            if (!req.session.user) throw { code: 401, result: '로그인이 필요합니다.' };
            const findUser = await Member.findOne({ where: { email: req.session.user.email } });

            if (!findUser) {
                await req.session.destroy(() => {
                    throw { code: 401, result: '로그인 정보가 변조되어 로그아웃 되었습니다.' };
                });
            }

            if (req.session.user.group !== 1) throw { code: 401, result: '사장님만 접근이 가능합니다.' };

            next();
        } catch (error) {
            if (error.code) return res.status(401).json({ message: error.result });
            console.log(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    },
};

module.exports = authMiddlewares;
