import { Request, Response } from "express";
import { ProjectModel } from "../models/project_models";
import { View } from "../views/view";
import { ValidationError } from "../errors/error_class";
import { createProjectSchema, listProjectsSchema } from "../validations/project_validator";

export class ProjectController {
    static async create(req: Request, res: Response): Promise<void> {
        try {
            const { error, value }: { error?: any; value: object } = createProjectSchema.validate(req.body);
            if (error) throw new ValidationError(error.details[0].message);

            const project: object = await ProjectModel.create(value);
            View.sendSuccess(res, project, 201);
        } catch (err: any) {
            View.sendError(res, err);
        }
    }

    static async list(req: Request, res: Response): Promise<void> {
        try {
            const { error, value }: { error?: any; value: object } = listProjectsSchema.validate(req.query);
            if (error) throw new ValidationError(error.details[0].message);

            const projects: object = await ProjectModel.list(value);
            View.sendSuccess(res, projects);
        } catch (err: any) {
            View.sendError(res, err);
        }
    }

    static async getById(req: Request, res: Response): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            if (isNaN(id)) throw new ValidationError("Invalid project id");

            const project: object | null = await ProjectModel.getById(id);
            View.sendSuccess(res, project);
        } catch (err: any) {
            View.sendError(res, err);
        }
    }
}
