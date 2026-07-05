"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_js_1 = require("./user.model.js");
const user_schema_js_1 = require("./user.schema.js");
const validate_request_js_1 = require("../../shared/middleware/validate-request.js");
const auth_js_1 = require("../../shared/middleware/auth.js");
const async_handler_js_1 = require("../../shared/middleware/async-handler.js");
const response_js_1 = require("../../shared/utils/response.js");
const app_errors_js_1 = require("../../shared/errors/app-errors.js");
const router = (0, express_1.Router)();
/**
 * GET /api/v1/users/me
 * Get the current authenticated user's full profile
 * Private - requires authentication
 */
router.get('/me', auth_js_1.authenticate, (0, async_handler_js_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new app_errors_js_1.ForbiddenError('Authentication required');
    }
    const user = await user_model_js_1.User.findById(req.user.userId);
    if (!user) {
        throw new app_errors_js_1.NotFoundError('User not found');
    }
    // Update last login time
    user.lastLoginAt = new Date();
    await user.save();
    const userData = user.toPrivateJson();
    return (0, response_js_1.createSuccessResponse)(res, { user: userData }, 'Profile retrieved successfully');
}));
/**
 * PATCH /api/v1/users/me
 * Update the current user's profile (displayName, avatar, bio)
 * Private - requires authentication
 */
router.patch('/me', auth_js_1.authenticate, (0, validate_request_js_1.validateRequest)(user_schema_js_1.updateProfileSchema), (0, async_handler_js_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new app_errors_js_1.ForbiddenError('Authentication required');
    }
    const user = await user_model_js_1.User.findById(req.user.userId);
    if (!user) {
        throw new app_errors_js_1.NotFoundError('User not found');
    }
    const updateData = req.body;
    // Update allowed fields only
    if (updateData.displayName !== undefined) {
        user.displayName = updateData.displayName;
    }
    if (updateData.avatar !== undefined) {
        user.avatar = updateData.avatar;
    }
    if (updateData.bio !== undefined) {
        user.bio = updateData.bio;
    }
    await user.save();
    const userData = user.toPrivateJson();
    return (0, response_js_1.createSuccessResponse)(res, { user: userData }, 'Profile updated successfully');
}));
/**
 * GET /api/v1/users/settings
 * Get the current user's settings/preferences
 * Private - requires authentication
 */
router.get('/settings', auth_js_1.authenticate, (0, async_handler_js_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new app_errors_js_1.ForbiddenError('Authentication required');
    }
    const user = await user_model_js_1.User.findById(req.user.userId);
    if (!user) {
        throw new app_errors_js_1.NotFoundError('User not found');
    }
    return (0, response_js_1.createSuccessResponse)(res, { settings: user.settings }, 'Settings retrieved successfully');
}));
/**
 * PATCH /api/v1/users/settings
 * Update the current user's settings/preferences
 * Private - requires authentication
 */
router.patch('/settings', auth_js_1.authenticate, (0, validate_request_js_1.validateRequest)(user_schema_js_1.updateSettingsSchema), (0, async_handler_js_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new app_errors_js_1.ForbiddenError('Authentication required');
    }
    const user = await user_model_js_1.User.findById(req.user.userId);
    if (!user) {
        throw new app_errors_js_1.NotFoundError('User not found');
    }
    const updateData = req.body;
    // Merge settings updates
    if (updateData.theme !== undefined) {
        user.settings.theme = updateData.theme;
    }
    if (updateData.notebookTheme !== undefined) {
        user.settings.notebookTheme = updateData.notebookTheme;
    }
    if (updateData.accentColor !== undefined) {
        user.settings.accentColor = updateData.accentColor;
    }
    if (updateData.reducedMotion !== undefined) {
        user.settings.reducedMotion = updateData.reducedMotion;
    }
    if (updateData.animationIntensity !== undefined) {
        user.settings.animationIntensity = updateData.animationIntensity;
    }
    if (updateData.soundEffects !== undefined) {
        user.settings.soundEffects = updateData.soundEffects;
    }
    if (updateData.language !== undefined) {
        user.settings.language = updateData.language;
    }
    if (updateData.timeFormat !== undefined) {
        user.settings.timeFormat = updateData.timeFormat;
    }
    if (updateData.timeZone !== undefined) {
        user.settings.timeZone = updateData.timeZone;
    }
    if (updateData.notifications !== undefined) {
        user.settings.notifications = {
            ...user.settings.notifications,
            ...updateData.notifications,
        };
    }
    await user.save();
    return (0, response_js_1.createSuccessResponse)(res, { settings: user.settings }, 'Settings updated successfully');
}));
/**
 * GET /api/v1/users/profile/:username
 * Get a public profile by username
 * Public - no authentication required
 * Returns limited information suitable for public display
 */
router.get('/profile/:username', (0, async_handler_js_1.asyncHandler)(async (req, res) => {
    const { username } = req.params;
    const user = await user_model_js_1.User.findOne({ username });
    if (!user) {
        throw new app_errors_js_1.NotFoundError('User not found');
    }
    // Build public profile with limited fields
    const publicProfile = {
        id: user._id.toString(),
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        level: user.level,
        xp: user.xp,
        coins: user.coins,
        currentWorld: user.currentWorld,
        achievements: user.achievements,
        createdAt: user.createdAt.toISOString(),
    };
    return (0, response_js_1.createSuccessResponse)(res, { profile: publicProfile }, 'Public profile retrieved successfully');
}));
exports.default = router;
//# sourceMappingURL=user.routes.js.map