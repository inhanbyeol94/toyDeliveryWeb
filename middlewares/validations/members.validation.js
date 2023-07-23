const Joi = require('joi');
const { member } = require('./message.json');

const Membervalidations = {
    signupValidation: async (req, res, next) => {
        const { email, nickname, name, phone, address, password, confirmPassword } = req.body;

        const schema = Joi.object().keys({
            email: Joi.string()
                .empty()
                .max(40)
                .regex(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i)
                .required()
                .messages(member.email),
            nickname: Joi.string()
                .empty()
                .min(2)
                .max(15)
                .regex(/^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/)
                .required()
                .messages(member.nickname),
            name: Joi.string()
                .empty()
                .required()
                .min(2)
                .max(10)
                .regex(/^[가-힣a-zA-Z]+$/)
                .messages(member.name),
            phone: Joi.string()
                .empty()
                .required()
                .min(11)
                .max(15)
                .regex(/^\d{2,3}-?\d{3,4}-?\d{4}$/)
                .messages(member.phone),
            address: Joi.string().empty().required().max(100).messages(member.address),
            password: Joi.string()
                .empty()
                .min(8)
                .max(20)
                .regex(/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])/)
                .required()
                .messages(member.password),
            confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages(member.confirmPassword),
        });

        try {
            await schema.validateAsync({ email, nickname, name, phone, address, password, confirmPassword });
        } catch (err) {
            return res.status(412).json({ message: err.message });
        }

        next();
    },

    createDeliveryInfoValidation: async (req, res, next) => {
        const { name, phone, address } = req.body;

        const schema = Joi.object().keys({
            name: Joi.string()
                .empty()
                .required()
                .min(2)
                .max(10)
                .regex(/^[가-힣a-zA-Z]+$/)
                .messages(member.name),
            phone: Joi.string()
                .empty()
                .required()
                .min(11)
                .max(15)
                .regex(/^\d{2,3}-?\d{3,4}-?\d{4}$/)
                .messages(member.phone),
            address: Joi.string().empty().required().max(100).messages(member.address),
        });

        try {
            await schema.validateAsync({ name, phone, address });
        } catch (err) {
            return res.status(412).json({ message: err.message });
        }

        next();
    },

    loginValidation: async (req, res, next) => {
        const { email, password } = req.body;

        const schema = Joi.object().keys({
            email: Joi.string()
                .empty()
                .max(40)
                .regex(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i)
                .required()
                .messages(member.email),
            password: Joi.string()
                .empty()
                .min(8)
                .max(20)
                .regex(/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])/)
                .required()
                .messages(member.password),
        });

        try {
            await schema.validateAsync({ email, password });
        } catch (err) {
            return res.status(412).json({ message: err.message });
        }

        next();
    },

    isEmailValidation: async (req, res, next) => {
        const { email } = req.body;

        const schema = Joi.object().keys({
            email: Joi.string()
                .empty()
                .max(40)
                .regex(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i)
                .required()
                .messages(member.email),
        });

        try {
            await schema.validateAsync({ email });
        } catch (err) {
            return res.status(412).json({ message: err.message });
        }

        next();
    },
    updateValidation: async (req, res, next) => {
        const { name, nickname, address, phone } = req.body;

        const schema = Joi.object().keys({
            nickname: Joi.string()
                .empty()
                .min(2)
                .max(15)
                .regex(/^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/)
                .required()
                .messages(member.nickname),
            name: Joi.string()
                .empty()
                .required()
                .min(2)
                .max(10)
                .regex(/^[가-힣a-zA-Z]+$/)
                .messages(member.name),
            phone: Joi.string()
                .empty()
                .required()
                .min(11)
                .max(15)
                .regex(/^\d{2,3}-?\d{3,4}-?\d{4}$/)
                .messages(member.phone),
            address: Joi.string().empty().required().max(100).messages(member.address),
        });

        try {
            await schema.validateAsync({ nickname, name, phone, address });
        } catch (err) {
            return res.status(412).json({ message: err.message });
        }

        next();
    },
    updatePwdValidation: async (req, res, next) => {
        const { password, changePwd, confirmPwd } = req.body;

        const schema = Joi.object().keys({
            password: Joi.string()
                .empty()
                .min(8)
                .max(20)
                .regex(/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])/)
                .required()
                .messages(member.password),
            changePwd: Joi.string()
                .min(8)
                .max(20)
                .regex(/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])/)
                .messages(member.password),
            confirmPwd: Joi.string().valid(Joi.ref('changePwd')).messages(member.confirmPassword),
        });

        try {
            await schema.validateAsync({ password, changePwd, confirmPwd });
        } catch (err) {
            return res.status(412).json({ message: err.message });
        }

        next();
    },
};

module.exports = Membervalidations;
