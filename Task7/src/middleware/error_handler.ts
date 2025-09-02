import { Request, Response, NextFunction } from "express";
import { AppErrors } from "../errors/error_class";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppErrors) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    } else {
        console.error("Unexpected error:", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
