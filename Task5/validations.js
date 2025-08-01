const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    profession: Joi.string().alphanum()
});

module.exports = userSchema;