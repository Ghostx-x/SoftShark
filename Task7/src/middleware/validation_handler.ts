import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ValidationError } from "../errors/error_class";

export function validate(schema: Joi.ObjectSchema, property: "body" | "query" | "params" = "body") {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[property], { abortEarly: false });
        if (error) {
            return next(new ValidationError(error.details.map(d => d.message).join(", ")));
        }
        next();
    };
}
