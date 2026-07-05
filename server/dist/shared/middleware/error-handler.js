"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const env_js_1 = require("../../config/env.js");
const app_errors_js_1 = require("../errors/app-errors.js");
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Internal server error';
    let code = 'INTERNAL_ERROR';
    let details;
    if (err instanceof app_errors_js_1.AppError) {
        statusCode = err.statusCode;
        message = err.message;
        code = err.code;
        details = err.details;
    }
    else if (err.name === 'ValidationError' && err.constructor.name !== 'AppError') {
        // Mongoose validation error
        statusCode = 400;
        message = 'Validation error';
        code = 'VALIDATION_ERROR';
    }
    else if (err.name === 'CastError') {
        // Mongoose cast error
        statusCode = 400;
        message = 'Invalid ID format';
        code = 'INVALID_ID';
    }
    else if (err.name === 'MongoServerError' && err.code === 11000) {
        // MongoDB duplicate key error
        statusCode = 409;
        message = 'Resource already exists';
        code = 'DUPLICATE_KEY';
        const fields = Object.keys(err.keyValue || {});
        details = { fields };
    }
    const isDevelopment = env_js_1.config.env === 'development';
    const response = {
        success: false,
        message: isDevelopment ? message : 'An error occurred',
        timestamp: new Date().toISOString(),
        errors: details ? [{ message: JSON.stringify(details) }] : undefined,
    };
    if (isDevelopment) {
        response.stack = err.stack;
        response.errors = [{ message: err.message }];
    }
    console.error(`[Error] ${statusCode} - ${message} - ${req.method} ${req.path}`);
    res.status(statusCode).json(response);
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res, next) => {
    const error = new app_errors_js_1.AppError(`Route ${req.method} ${req.originalUrl} not found`, 404, 'ROUTE_NOT_FOUND');
    next(error);
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=error-handler.js.map