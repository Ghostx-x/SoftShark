//user doesn't exist
//project doesn't exist
//task doesn't exist
//task status: invalid input
//due date - after, before
export class AppErrors extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
export class UserNotFound extends AppErrors {
    constructor(message = 'User not found', statusCode = 404) {
        super(message, statusCode);
    }
}
export class TaskNotFound extends AppErrors {
    constructor(message = 'Task not found', statusCode = 404) {
        super(message, statusCode);
    }
}
export class ProjectNotFound extends AppErrors {
    constructor(message = 'Project not found', statusCode = 404) {
        super(message, statusCode);
    }
}
export class InvalidTaskStatusError extends AppErrors {
    constructor(message = 'Invalid task status', statusCode = 400) {
        super(message, statusCode);
    }
}
export class ValidationError extends AppErrors {
    constructor(message = 'Validation error', statusCode = 400) {
        super(message, statusCode);
    }
}
export class DueDateBeforeError extends AppErrors {
    constructor(message = "Due date cannot be in the past") {
        super(message, 400);
    }
}
export class DueDateAfterError extends AppErrors {
    constructor(message = "Due date exceeds allowed range") {
        super(message, 400);
    }
}
