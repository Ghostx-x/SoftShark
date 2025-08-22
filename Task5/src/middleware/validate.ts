import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { ValidationError } from "../errors/error-class";

/**
 * Validate user by joi configs
 * @throws {ValidationError} For validation errors
 */
export function validate(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return next(new ValidationError(error.details.map(d => d.message).join(", ")));
        }
        next();
    };
}
