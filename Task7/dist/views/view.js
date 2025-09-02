import { AppErrors } from "../errors/error_class.js";
export class View {
    static sendSuccess(res, data, statusCode = 200) {
        res.status(statusCode).json({
            success: true,
            data,
        });
    }
    static sendError(res, error) {
        const statusCode = error instanceof AppErrors ? error.statusCode : 500;
        const message = error instanceof AppErrors ? error.message : "Internal Server Error";
        res.status(statusCode).json({
            success: false,
            message,
        });
    }
}
