"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const user_model_js_1 = require("../users/user.model.js");
const auth_schema_js_1 = require("./auth.schema.js");
const auth_utils_js_1 = require("./auth.utils.js");
const validate_request_js_1 = require("../../shared/middleware/validate-request.js");
const auth_js_1 = require("../../shared/middleware/auth.js");
const async_handler_js_1 = require("../../shared/middleware/async-handler.js");
const response_js_1 = require("../../shared/utils/response.js");
const app_errors_js_1 = require("../../shared/errors/app-errors.js");
const env_js_1 = require("../../config/env.js");
const router = (0, express_1.Router)();
// POST /api/v1/auth/register
router.post('/register', (0, validate_request_js_1.validateRequest)(auth_schema_js_1.registerSchema), (0, async_handler_js_1.asyncHandler)(async (req, res) => {
    const { username, email, password } = req.body;
    // Check for existing user
    const existingUser = await user_model_js_1.User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        if (existingUser.email === email) {
            throw new app_errors_js_1.ConflictError('Email already registered');
        }
        if (existingUser.username === username) {
            throw new app_errors_js_1.ConflictError('Username already taken');
        }
    }
    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt_1.default.hash(password, saltRounds);
    // Create user
    const user = await user_model_js_1.User.create({
        _id: (0, uuid_1.v4)(),
        username,
        email,
        passwordHash,
    });
    // Generate tokens
    const tokenPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_js_1.generateAccessToken)(tokenPayload);
    const refreshToken = (0, auth_utils_js_1.generateRefreshToken)(tokenPayload);
    // Set refresh token cookie
    const isProduction = env_js_1.config.env === 'production';
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/api/v1/auth/refresh',
    });
    // Return user data without sensitive fields
    const userData = user.toPublicJson();
    return (0, response_js_1.createSuccessResponse)(res, { user: userData, accessToken }, 'Registration successful', 201);
}));
// POST /api/v1/auth/login
router.post('/login', (0, validate_request_js_1.validateRequest)(auth_schema_js_1.loginSchema), (0, async_handler_js_1.asyncHandler)(async (req, res) => {
    const { email, password } = req.body;
    // Find user with password hash
    const user = await user_model_js_1.User.findByEmailWithPassword(email);
    if (!user) {
        throw new app_errors_js_1.AuthenticationError('Invalid credentials');
    }
    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new app_errors_js_1.AuthenticationError('Invalid credentials');
    }
    // Update last login time
    user.lastLoginAt = new Date();
    await user.save();
    // Generate tokens
    const tokenPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_js_1.generateAccessToken)(tokenPayload);
    const refreshToken = (0, auth_utils_js_1.generateRefreshToken)(tokenPayload);
    // Set refresh token cookie
    const isProduction = env_js_1.config.env === 'production';
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/api/v1/auth/refresh',
    });
    // Return user data
    const userData = user.toPublicJson();
    return (0, response_js_1.createSuccessResponse)(res, { user: userData, accessToken }, 'Login successful');
}));
// POST /api/v1/auth/logout
router.post('/logout', (0, async_handler_js_1.asyncHandler)(async (req, res) => {
    // Clear refresh token cookie
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: env_js_1.config.env === 'production',
        sameSite: env_js_1.config.env === 'production' ? 'none' : 'lax',
        path: '/api/v1/auth/refresh',
    });
    return (0, response_js_1.createSuccessResponse)(res, {}, 'Logout successful');
}));
// POST /api/v1/auth/refresh
router.post('/refresh', (0, async_handler_js_1.asyncHandler)(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new app_errors_js_1.AuthenticationError('No refresh token provided');
    }
    try {
        // Verify refresh token
        const payload = (0, auth_utils_js_1.verifyRefreshToken)(refreshToken);
        // Find user to ensure they still exist and get current role
        const user = await user_model_js_1.User.findById(payload.userId);
        if (!user) {
            throw new app_errors_js_1.AuthenticationError('User not found');
        }
        // Generate new token pair (token rotation)
        const newTokenPayload = {
            userId: user._id,
            email: user.email,
            role: user.role,
        };
        const newAccessToken = (0, auth_utils_js_1.generateAccessToken)(newTokenPayload);
        const newRefreshToken = (0, auth_utils_js_1.generateRefreshToken)(newTokenPayload);
        // Set new refresh token cookie
        const isProduction = env_js_1.config.env === 'production';
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/api/v1/auth/refresh',
        });
        return (0, response_js_1.createSuccessResponse)(res, { accessToken: newAccessToken }, 'Token refreshed successfully');
    }
    catch (error) {
        // Clear invalid refresh token
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: env_js_1.config.env === 'production',
            sameSite: env_js_1.config.env === 'production' ? 'none' : 'lax',
            path: '/api/v1/auth/refresh',
        });
        throw error;
    }
}));
// GET /api/v1/auth/me
router.get('/me', auth_js_1.authenticate, (0, async_handler_js_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new app_errors_js_1.AuthenticationError('Not authenticated');
    }
    const user = await user_model_js_1.User.findById(req.user.userId);
    if (!user) {
        throw new app_errors_js_1.AuthenticationError('User not found');
    }
    const userData = user.toPublicJson();
    return (0, response_js_1.createSuccessResponse)(res, { user: userData }, 'Current user retrieved successfully');
}));
exports.default = router;
//# sourceMappingURL=auth.routes.js.map