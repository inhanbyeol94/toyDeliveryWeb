const { Member } = require('../models');
const { CustomError } = require('../customClass');

const authMiddlewares = {
    nonAuthMiddleware: async (req, res, next) => {
        try {
            if (req.session.user) throw new CustomError('로그인 상태에서는 작업할 수 없습니다', 401);
            next();
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    },

    allAuthMiddleware: async (req, res, next) => {
        try {
            if (!req.session.user) throw new CustomError('로그인이 필요합니다.', 401);
            next();
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    },

    userAuthMiddleware: async (req, res, next) => {
        try {
            if (!req.session.user) throw new CustomError('로그인이 필요합니다.', 401);
            const findUser = await Member.findOne({ where: { member_id: req.session.user.member_id } });

            if (findUser.group !== 0) throw new CustomError('고객 그룹만 접근이 가능합니다.', 401);

            next();
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    },

    adminAuthMiddleware: async (req, res, next) => {
        try {
            if (!req.session.user) throw new CustomError('로그인이 필요합니다.', 401);
            const findUser = await Member.findOne({ where: { member_id: req.session.user.member_id } });

            if (findUser.group !== 1) throw new CustomError('사장 그룹만 접근이 가능합니다.', 401);
            next();
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    },
};

module.exports = authMiddlewares;
