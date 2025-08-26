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
    }

}