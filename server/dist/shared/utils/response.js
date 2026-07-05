"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorResponse = exports.createSuccessResponse = void 0;
const createSuccessResponse = (res, data, message = 'Success', statusCode = 200) => {
    const response = {
        success: true,
        message,
        data,
        timestamp: new Date().toISOString(),
    };
    return res.status(statusCode).json(response);
};
exports.createSuccessResponse = createSuccessResponse;
const createErrorResponse = (res, message, statusCode = 400, errors) => {
    const response = {
        success: false,
        message,
        errors,
        timestamp: new Date().toISOString(),
    };
    return res.status(statusCode).json(response);
};
exports.createErrorResponse = createErrorResponse;
//# sourceMappingURL=response.js.map