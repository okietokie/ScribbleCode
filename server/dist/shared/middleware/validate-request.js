"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validateQuery = exports.validateBody = exports.validateRequest = void 0;
const zod_1 = require("zod");
const app_errors_js_1 = require("../errors/app-errors.js");
const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            // Validate request body if present
            if (req.body && Object.keys(req.body).length > 0) {
                schema.parse(req.body);
            }
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errors = error.issues.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                next(new app_errors_js_1.ValidationError('Validation failed', { fields: errors }));
            }
            else {
                next(error);
            }
        }
    };
};
exports.validateRequest = validateRequest;
// Validate specific parts of the request
const validateBody = (schema) => (0, exports.validateRequest)(schema);
exports.validateBody = validateBody;
const validateQuery = (schema) => {
    return async (req, res, next) => {
        try {
            schema.parse(req.query);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errors = error.issues.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                next(new app_errors_js_1.ValidationError('Invalid query parameters', { fields: errors }));
            }
            else {
                next(error);
            }
        }
    };
};
exports.validateQuery = validateQuery;
const validateParams = (schema) => {
    return async (req, res, next) => {
        try {
            schema.parse(req.params);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errors = error.issues.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                next(new app_errors_js_1.ValidationError('Invalid route parameters', { fields: errors }));
            }
            else {
                next(error);
            }
        }
    };
};
exports.validateParams = validateParams;
//# sourceMappingURL=validate-request.js.map