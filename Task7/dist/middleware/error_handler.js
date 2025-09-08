import { AppErrors } from "../errors/error_class.js";
export function errorHandler(err, req, res, next) {
    if (err instanceof AppErrors) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }
    else {
        console.error("Unexpected error:", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
