import { Response } from "express";
import { AppErrors } from "../errors/error_class.js";

export class View {

    static sendSuccess(res: Response, data: any, statusCode = 200): void {
        res.status(statusCode).json({
            success: true,
            data,
        });
    }
    static sendError(res: Response, error: Error): void {
        const statusCode = error instanceof AppErrors ? error.statusCode : 500;
        const message = error instanceof AppErrors ? error.message : "Internal Server Error";

        res.status(statusCode).json({
            success: false,
            message,
        });
    }
}
