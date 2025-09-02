import { Request, Response } from 'express';
import { TaskModel } from '../models/task_models';
import { View } from '../views/view';
import {AppErrors, ValidationError} from "../errors/error_class";

export class TaskController {
    static async createTask(req: Request, res: Response): Promise<void> {
        try {
            const { title, project_id, status, due_date, assigned_to } = req.body;
            let parsedDueDate: Date | undefined;

            if (due_date) {
                parsedDueDate = new Date(due_date);
                if (isNaN(parsedDueDate.getTime())) {
                    throw new ValidationError("Invalid due date format");
                }
            }
            const task: object = await TaskModel.create(String(title), Number(project_id), String(status), parsedDueDate,
                assigned_to ? Number(assigned_to) : undefined);
            View.sendSuccess(res, task);
        } catch (error: any) {
            View.sendError(res, error);
        }
    }

    static async listTasks(req: Request, res: Response): Promise<void> {
        try {
            const { project_id, status, due_date } = req.query;
            let parsedDueDate: Date | undefined;

            if (due_date) {
                parsedDueDate = new Date(String(due_date));
                if (isNaN(parsedDueDate.getTime())) {
                    throw new ValidationError("Invalid due date format");
                }
            }

            const tasks: object = await TaskModel.list({
                project_id: project_id ? Number(project_id) : undefined,
                status: status ? String(status) : undefined,
                due_date: parsedDueDate
            });

            View.sendSuccess(res, tasks);
        } catch (error: any) {
            View.sendError(res, error);
        }
    }


    static async getTaskDetails(req: Request, res: Response): Promise<void> {
        try {
            const { task_id } = req.params;
            const task: object | null = await TaskModel.detail(Number(task_id));
            View.sendSuccess(res, task);
        } catch (error: any) {
            View.sendError(res, error);
        }
    }

    static async updateAssignedToField(req: Request, res: Response): Promise<void> {
        try {
            const { task_id, assigned_to } = req.body;
            const task: object | null = await TaskModel.updateAssignedToField(Number(task_id), Number(assigned_to));
            View.sendSuccess(res, task);
        } catch (error: any) {
            View.sendError(res, error);
        }
    }
}
