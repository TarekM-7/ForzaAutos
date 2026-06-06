const Joi = require('joi')

module.exports.autoSchema = Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    price: Joi.number().required().min(0),
    carClass: Joi.number().required().min(100).max(999),
    country: Joi.string().required(),
    image: Joi.string().allow('', null)
});