const { Member } = require('../models');

const authMiddlewares = {
    nonAuthMiddleware: async (req, res, next) => {
        try {
            if (req.session.user) return res.render('403');
            next();
        } catch (error) {
            console.log(error);
            return res.redirect('/');
        }
    },

    allAuthMiddleware: async (req, res, next) => {
        try {
            if (!req.session.user) return res.redirect('/login');
            const findUser = await Member.findOne({ where: { member_id: req.session.user.member_id } });

            if (!findUser) {
                await req.session.destroy(() => {
                    return res.render('403');
                });
            }

            next();
        } catch (error) {
            console.log(error);
            return res.redirect('/');
        }
    },

    userAuthMiddleware: async (req, res, next) => {
        try {
            if (!req.session.user) return res.redirect('/login');
            const findUser = await Member.findOne({ where: { member_id: req.session.user.member_id } });

            if (!findUser) {
                await req.session.destroy(() => {
                    return res.render('403');
                });
            }

            if (findUser.group !== 0) return res.render('403');

            next();
        } catch (error) {
            console.log(error);
            return res.redirect('/');
        }
    },

    adminAuthMiddleware: async (req, res, next) => {
        try {
            if (!req.session.user) return res.redirect('/login');
            const findUser = await Member.findOne({ where: { member_id: req.session.user.member_id } });

            if (!findUser) {
                await req.session.destroy(() => {
                    return res.render('403');
                });
            }

            if (findUser.group !== 1) return res.render('403');

            next();
        } catch (error) {
            console.log(error);
            return res.redirect('/');
        }
    },
};

module.exports = authMiddlewares;
