import { TaskModel } from "../models/task_models.js";

export const TaskController = {
    async create(req, res) {
        const { title, project_id, status, due_date, assigned_to } = req.body;
        try {
            const newTask = await TaskModel.create(title, project_id, status, due_date, assigned_to);
            res.json(newTask);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async list(req, res) {
        try {
            const { project_id, status, due_date } = req.query;

            const tasks = await TaskModel.list(project_id, status, due_date);
            res.json(tasks);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

}