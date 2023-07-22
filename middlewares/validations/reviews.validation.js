const Joi = require('joi');
const { reviews } = require('./message.json');

const Reviewvalidations = {
    reviewValidation: async (req, res, next) => {
        const { star, review } = req.body;

        const schema = Joi.object().keys({
            star: Joi.number().integer().min(1).max(5).required().messages(reviews.star),
            review: Joi.string().max(300).required().messages(reviews.review),
        });

        try {
            await schema.validateAsync({ star, review });
        } catch (err) {
            return res.status(412).json({ message: err.message });
        }
        next();
    },
};

module.exports = Reviewvalidations;
