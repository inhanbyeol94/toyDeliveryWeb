const Joi = require('joi');
const { menu } = require('./message.json');

const Menuvalidations = {
    menuValidation: async (req, res, next) => {
        const { name, price } = req.body;

        const schema = Joi.object().keys({
            name: Joi.string().empty().required().max(50).messages(menu.name),
            price: Joi.number().empty().required().messages(menu.price),
        });

        try {
            await schema.validateAsync({ name, price });
        } catch (err) {
            return res.status(412).json({ result: err.message });
        }
        next();
    },
};

module.exports = Menuvalidations;
