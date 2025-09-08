import { Request, Response } from "express";
import { UserModel } from "../models/user_models";
import { View } from "../views/view";
import { ValidationError } from "../errors/error_class";
import {createUserSchema} from "../validations/user_validator";

export class UserController {
    static async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { error, value }: { error?: any; value: object } = createUserSchema.validate(req.body);
            if (error) throw new ValidationError(error.details[0].message);

            const user: object = await UserModel.create(value);
            View.sendSuccess(res, user, 201);
        } catch (error: any) {
            View.sendError(res, error);
        }
    }

    static async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const { user_id } = req.params;
            const user: object | null = await UserModel.getById(Number(user_id));
            View.sendSuccess(res, user);
        } catch (error: any) {
            View.sendError(res, error);
        }
    }
}
