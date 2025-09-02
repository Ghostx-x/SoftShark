import Joi from "joi";

export const createUserSchema = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    profession: Joi.string().min(3).max(100)
});

export const getUserSchema = Joi.object({
    user_id: Joi.number().integer().required()
});
