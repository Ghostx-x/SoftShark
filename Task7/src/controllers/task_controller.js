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
    },

    async details(req, res) {
        try {
            const { task_id } = req.params;
            const task_details = await TaskModel.detail(task_id);
            res.json(task_details)
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async updateAssign(req, res) {
        try {
            const { task_id } = req.params;
            const { new_assigned_to } = req.body;
            const updatedTask = await TaskModel.updateAssign(task_id, new_assigned_to);
            res.json(updatedTask)
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

}