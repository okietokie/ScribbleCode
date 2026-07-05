"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.optionalAuth = exports.authMiddleware = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_js_1 = require("../../config/env.js");
const app_errors_js_1 = require("../errors/app-errors.js");
const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new app_errors_js_1.UnauthorizedError('No token provided');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new app_errors_js_1.UnauthorizedError('Invalid token format');
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_js_1.config.jwtSecret);
        req.user = decoded;
        // Add id field for convenience (from userId)
        if (typeof decoded.userId === 'string') {
            req.user.id = decoded.userId;
        }
        else {
            req.user.id = decoded.userId.toString();
        }
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            next(new app_errors_js_1.UnauthorizedError('Token expired'));
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            next(new app_errors_js_1.UnauthorizedError('Invalid token'));
        }
        else {
            next(error);
        }
    }
};
exports.authenticate = authenticate;
// Alias for authenticate to maintain consistency
exports.authMiddleware = exports.authenticate;
const optionalAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, env_js_1.config.jwtSecret);
            req.user = decoded;
        }
        next();
    }
    catch (error) {
        // Silently continue without authentication
        next();
    }
};
exports.optionalAuth = optionalAuth;
// Placeholder for future role-based authorization
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            next(new app_errors_js_1.UnauthorizedError('Authentication required'));
            return;
        }
        if (!roles.includes(req.user.role)) {
            next(new app_errors_js_1.UnauthorizedError(`Required role: ${roles.join(' or ')}`));
            return;
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.js.map