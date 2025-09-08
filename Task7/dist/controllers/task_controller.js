import { TaskModel } from '../models/task_models.js';
import { View } from '../views/view.js';
import { ValidationError } from "../errors/error_class.js";
export class TaskController {
    constructor() {
        this.taskModel = new TaskModel();
    }
    async createTask(req, res) {
        try {
            const { title, project_id, status, due_date, assigned_to } = req.body;
            const parsedDueDate = due_date ? new Date(String(due_date)) : undefined;
            if (parsedDueDate && isNaN(parsedDueDate.getTime())) {
                throw new ValidationError("Invalid due date format");
            }
            const task = await this.taskModel.create(String(title), Number(project_id), String(status), parsedDueDate, assigned_to ? Number(assigned_to) : undefined);
            View.sendSuccess(res, task);
        }
        catch (error) {
            View.sendError(res, error);
        }
    }
    async listTasks(req, res) {
        try {
            const { project_id, status, due_date } = req.query;
            const parsedDueDate = due_date ? new Date(String(due_date)) : undefined;
            if ((due_date && !parsedDueDate) || (parsedDueDate && isNaN(parsedDueDate.getTime()))) {
                throw new Error('Invalid due date format');
            }
            const tasks = await this.taskModel.list(project_id ? Number(project_id) : undefined, status ? String(status) : undefined, parsedDueDate);
            View.sendSuccess(res, tasks);
        }
        catch (error) {
            View.sendError(res, error);
        }
    }
    async getTaskDetails(req, res) {
        try {
            const { task_id } = req.params;
            const task = await this.taskModel.detail(Number(task_id));
            View.sendSuccess(res, task);
        }
        catch (error) {
            View.sendError(res, error);
        }
    }
    async updateTaskAssign(req, res) {
        try {
            const { task_id, assigned_to } = req.body;
            const task = await this.taskModel.updateAssign(Number(task_id), Number(assigned_to));
            View.sendSuccess(res, task);
        }
        catch (error) {
            View.sendError(res, error);
        }
    }
}
