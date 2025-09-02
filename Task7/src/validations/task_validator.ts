import Joi from "joi";

export const createTaskSchema = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    project_id: Joi.number().integer().required(),
    status: Joi.string().valid("todo", "in_progress", "done").required(),
    due_date: Joi.date().optional(),
    assigned_to: Joi.number().integer().optional()
});

export const listTasksSchema = Joi.object({
    project_id: Joi.number().integer().optional(),
    status: Joi.string().valid("todo", "in_progress", "done").optional(),
    due_date: Joi.date().optional()
});

export const updateAssignSchema = Joi.object({
    task_id: Joi.number().integer().required(),
    assigned_to: Joi.number().integer().required()
});