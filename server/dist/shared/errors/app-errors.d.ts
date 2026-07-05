/**
 * Application Error Classes
 */
export declare class AppError extends Error {
    readonly statusCode: number;
    readonly code?: string;
    readonly details?: Record<string, unknown>;
    readonly isOperational: boolean;
    constructor(message: string, statusCode?: number, code?: string, details?: Record<string, unknown>);
}
export declare class ValidationError extends AppError {
    constructor(message?: string, details?: Record<string, unknown>);
}
export declare class NotFoundError extends AppError {
    constructor(message?: string);
}
export declare class UnauthorizedError extends AppError {
    constructor(message?: string);
}
export declare class ForbiddenError extends AppError {
    constructor(message?: string);
}
export declare class ConflictError extends AppError {
    constructor(message?: string, details?: Record<string, unknown>);
}
export declare class DatabaseError extends AppError {
    constructor(message?: string, details?: Record<string, unknown>);
}
export declare class AuthenticationError extends AppError {
    constructor(message?: string, details?: Record<string, unknown>);
}
export declare class TooManyRequestsError extends AppError {
    constructor(message?: string, details?: Record<string, unknown>);
}
//# sourceMappingURL=app-errors.d.ts.map