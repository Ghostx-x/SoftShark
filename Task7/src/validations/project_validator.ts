import Joi from "joi";

export const createProjectSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional().allow(""),
});

export const listProjectsSchema = Joi.object({
    q: Joi.string().optional(),
    offset: Joi.number().integer().min(0).default(0),
    limit: Joi.number().integer().min(1).max(100).default(10),
});
