const { Member } = require('../models');

const authMiddlewares = {
    viewNonAuthMiddleware: async (req, res, next) => {
        try {
            if (req.session.user) return res.render('403');
            next();
        } catch (error) {
            console.log(error);
            return res.redirect('/');
        }
    },

    viewAllAuthMiddleware: async (req, res, next) => {
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

    viewUserAuthMiddleware: async (req, res, next) => {
        try {
            if (!req.session.user) return res.redirect('/login');
            const findUser = await Member.findOne({ where: { member_id: req.session.user.member_id } });

            if (!findUser) {
                await req.session.destroy(() => {
                    return res.render('403');
                });
            }

            if (req.session.user.group !== 0) return res.render('403');

            next();
        } catch (error) {
            console.log(error);
            return res.redirect('/');
        }
    },

    viewAdminAuthMiddleware: async (req, res, next) => {
        try {
            if (!req.session.user) return res.redirect('/login');
            const findUser = await Member.findOne({ where: { member_id: req.session.user.member_id } });

            if (!findUser) {
                await req.session.destroy(() => {
                    return res.render('403');
                });
            }

            if (req.session.user.group !== 1) return res.render('403');

            next();
        } catch (error) {
            console.log(error);
            return res.redirect('/');
        }
    },
};

module.exports = authMiddlewares;
