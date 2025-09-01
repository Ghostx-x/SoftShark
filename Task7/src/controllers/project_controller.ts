import { Request, Response } from "express";
import { ProjectModel } from "../models/project_models.js";
import { View } from "../views/view.js";
import { ValidationError } from "../errors/error_class.js";
import { createProjectSchema, listProjectsSchema } from "../validations/project_validator.js";

export class ProjectController {
    static async create(req: Request, res: Response) {
        try {
            const { error, value } = createProjectSchema.validate(req.body);
            if (error) throw new ValidationError(error.details[0].message);

            const project = await ProjectModel.create(value);
            View.sendSuccess(res, project, 201);
        } catch (err: any) {
            View.sendError(res, err);
        }
    }

    static async list(req: Request, res: Response) {
        try {
            const { error, value } = listProjectsSchema.validate(req.query);
            if (error) throw new ValidationError(error.details[0].message);

            const projects = await ProjectModel.list(value);
            View.sendSuccess(res, projects);
        } catch (err: any) {
            View.sendError(res, err);
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) throw new ValidationError("Invalid project id");

            const project = await ProjectModel.getById(id);
            View.sendSuccess(res, project);
        } catch (err: any) {
            View.sendError(res, err);
        }
    }
}
