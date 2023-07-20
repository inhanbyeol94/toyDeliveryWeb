const Joi = require('joi');
const { restaurant } = require('./message.json');

const Restaurantvalidations = {
    restaurantValidation: async (req, res, next) => {
        const { name, address, tel, desc } = req.body;

        const schema = Joi.object().keys({
            name: Joi.string()
                .empty()
                .required()
                .max(30)
                .regex(/^(?! )[가-힣a-zA-Z\s]*(?<! )$/)
                .messages(restaurant.name),
            address: Joi.string().empty().required().max(100).messages(restaurant.address),
            tel: Joi.string()
                .empty()
                .max(15)
                .regex(/^\d{3,4}-\d{3,4}-\d{4}$/)
                .required()
                .messages(restaurant.tel),
            desc: Joi.string().empty().max(1000).required().messages(restaurant.desc),
        });

        try {
            await schema.validateAsync({ name, address, tel, desc });
        } catch (err) {
            return res.status(412).json({ result: err.message });
        }
        next();
    },
};

module.exports = Restaurantvalidations;
