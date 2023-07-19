const Joi = require('joi');
const { user } = require('./message.json');

const Membervalidations = {
    signupValidation: async (req, res, next) => {
        const body = req.body;

        const schema = Joi.object().keys({
            email: Joi.string().required().empty().max(40).messages(user.email),
            // .regex(/'^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'/),
        });

        try {
            await schema.validateAsync(body);
        } catch (err) {
            return res.status(412).json({ err });
            // return res.status(412).json({ message: err.message });
        }

        next();
    },
};

module.exports = Membervalidations;
