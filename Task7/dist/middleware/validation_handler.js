import { ValidationError } from "../errors/error_class.js";
export function validate(schema, property = "body") {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], { abortEarly: false });
        if (error) {
            return next(new ValidationError(error.details.map(d => d.message).join(", ")));
        }
        next();
    };
}
