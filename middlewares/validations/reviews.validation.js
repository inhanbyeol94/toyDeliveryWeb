const Joi = require('joi');
const { review } = require('./message.json');

const Reviewvalidations = {
    reviewValidation: async (req, res, next) => {
        const { star, review } = req.body;

        const schema = Joi.object().keys({
            star: Joi.number().integer().min(1).max(5).required().messages(review.star),
            review: Joi.string().max(300).required().messages(review.review),
        });

        try {
            await schema.validateAsync({ star, review, image });
        } catch (err) {
            return res.status(412).json({ result: err.message });
        }
        next();
    },
};

module.exports = Reviewvalidations;