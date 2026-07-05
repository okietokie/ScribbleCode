"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRateLimiter = exports.registerLimiter = exports.refreshLimiter = exports.authLimiter = exports.apiLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_js_1 = require("../../config/env.js");
const logger_js_1 = require("../utils/logger.js");
const app_errors_js_1 = require("../errors/app-errors.js");
/**
 * General API rate limiter
 * Applies to all API routes by default
 */
exports.apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: env_js_1.config.rateLimitWindowMs,
    max: env_js_1.config.rateLimitMaxRequests,
    message: 'Too many requests from this IP, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        // Use user ID if authenticated, otherwise use IP
        return req.user?.id || req.ip || 'unknown';
    },
    handler: (req, res, next, options) => {
        logger_js_1.logger.warn('Rate limit exceeded', {
            ip: req.ip,
            path: req.path,
            method: req.method,
            userId: req.user?.id,
        });
        next(new app_errors_js_1.TooManyRequestsError(options.message));
    },
});
/**
 * Strict rate limiter for authentication endpoints
 * More restrictive to prevent brute force attacks
 */
exports.authLimiter = (0, express_rate_limit_1.default)({
    windowMs: env_js_1.config.authRateLimitWindowMs,
    max: env_js_1.config.authRateLimitMaxRequests,
    message: 'Too many login attempts, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false, // Count failed attempts too
    keyGenerator: (req) => {
        // Use email from request body if available, otherwise IP
        const email = req.body?.email;
        if (email) {
            return `auth:${email.toLowerCase()}`;
        }
        return `auth:${req.ip || 'unknown'}`;
    },
    handler: (req, res, next, options) => {
        logger_js_1.logger.warn('Auth rate limit exceeded', {
            ip: req.ip,
            path: req.path,
            method: req.method,
            email: req.body?.email,
        });
        next(new app_errors_js_1.TooManyRequestsError(options.message));
    },
});
/**
 * Refresh token endpoint rate limiter
 * Prevents token refresh abuse
 */
exports.refreshLimiter = (0, express_rate_limit_1.default)({
    windowMs: env_js_1.config.authRateLimitWindowMs,
    max: 10, // Allow more refreshes than login attempts
    message: 'Too many token refresh attempts',
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        return `refresh:${req.ip || 'unknown'}`;
    },
    handler: (req, res, next, options) => {
        logger_js_1.logger.warn('Refresh rate limit exceeded', {
            ip: req.ip,
            path: req.path,
            method: req.method,
        });
        next(new app_errors_js_1.TooManyRequestsError(options.message));
    },
});
/**
 * Registration rate limiter
 * Prevents mass account creation
 */
exports.registerLimiter = (0, express_rate_limit_1.default)({
    windowMs: env_js_1.config.authRateLimitWindowMs,
    max: 3, // Very strict for registration
    message: 'Too many registration attempts from this IP',
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        return `register:${req.ip || 'unknown'}`;
    },
    handler: (req, res, next, options) => {
        logger_js_1.logger.warn('Registration rate limit exceeded', {
            ip: req.ip,
            path: req.path,
            method: req.method,
            email: req.body?.email,
        });
        next(new app_errors_js_1.TooManyRequestsError(options.message));
    },
});
/**
 * Create a custom rate limiter with specific configuration
 */
const createRateLimiter = (options) => {
    return (0, express_rate_limit_1.default)({
        windowMs: options.windowMs || env_js_1.config.rateLimitWindowMs,
        max: options.max || env_js_1.config.rateLimitMaxRequests,
        message: options.message || 'Too many requests',
        standardHeaders: true,
        legacyHeaders: false,
        keyGenerator: options.keyGenerator || ((req) => req.ip || 'unknown'),
        handler: (req, res, next, limiterOptions) => {
            logger_js_1.logger.warn('Custom rate limit exceeded', {
                ip: req.ip,
                path: req.path,
                method: req.method,
            });
            next(new app_errors_js_1.TooManyRequestsError(limiterOptions.message));
        },
    });
};
exports.createRateLimiter = createRateLimiter;
//# sourceMappingURL=rate-limiter.js.map