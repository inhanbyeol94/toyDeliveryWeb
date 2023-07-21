const Joi = require('joi');
const { keywordVal } = require('./message.json');

const keywordValidations = {
    keywordValidation: async (req, res, next) => {
        const { keyword } = req.body;

        const schema = Joi.object().keys({
            keyword: Joi.string()
                .empty()
                .max(50)
                .regex(/^[가-힣a-zA-Z0-9\s]{3,50}$/)
                .required()
                .messages(keywordVal.keyword),
        });

        try {
            await schema.validateAsync({ keyword });
        } catch (err) {
            return res.status(412).json({ result: err.message });
        }

        next();
    },
    searchValidation: async (req, res, next) => {
        const { search } = req.params;

        const schema = Joi.object().keys({
            search: Joi.string()
                .empty()
                .max(50)
                .regex(/^[가-힣a-zA-Z0-9\s]{1,50}$/)
                .required()
                .messages(keywordVal.search),
        });

        try {
            await schema.validateAsync({ search });
        } catch (err) {
            return res.status(412).json({ result: err.message });
        }

        next();
    },
};

module.exports = keywordValidations;
