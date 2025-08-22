export class AppErrors extends Error{
    statusCode: number
    constructor(message : string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
    }
}
export class NotFound extends AppErrors {
    constructor(message = 'User not found', statusCode = 404) {
        super(message,statusCode)
    }

}

export class ValidationError extends AppErrors {
    constructor(message = 'Validation error', statusCode = 400) {
        super(message, statusCode)
    }
}

// export class ConflictError extends AppErrors {
//     constructor(message = "Conflict error", statusCode = 409) {
//         super(message, statusCode);
//     }
// }