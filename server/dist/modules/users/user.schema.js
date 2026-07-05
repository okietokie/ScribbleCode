"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicProfileSchema = exports.updateSettingsSchema = exports.updateProfileSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema for updating player profile fields
 * Allows partial updates for displayName, avatar, and bio
 */
exports.updateProfileSchema = zod_1.z.object({
    displayName: zod_1.z
        .string()
        .min(1, 'Display name must be at least 1 character')
        .max(50, 'Display name must be less than 50 characters')
        .optional(),
    avatar: zod_1.z.string().url('Avatar must be a valid URL').optional(),
    bio: zod_1.z
        .string()
        .max(500, 'Bio must be less than 500 characters')
        .optional()
        .nullable(),
});
/**
 * Schema for updating player settings
 * All fields are optional to allow partial updates
 */
exports.updateSettingsSchema = zod_1.z.object({
    theme: zod_1.z.enum(['light', 'dark', 'system']).optional(),
    notebookTheme: zod_1.z.string().optional(),
    accentColor: zod_1.z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Accent color must be a valid hex color').optional(),
    reducedMotion: zod_1.z.boolean().optional(),
    animationIntensity: zod_1.z.enum(['low', 'medium', 'high']).optional(),
    soundEffects: zod_1.z.boolean().optional(),
    language: zod_1.z.string().optional(),
    timeFormat: zod_1.z.enum(['12h', '24h']).optional(),
    timeZone: zod_1.z.string().optional(),
    notifications: zod_1.z
        .object({
        email: zod_1.z.boolean().optional(),
        push: zod_1.z.boolean().optional(),
        achievements: zod_1.z.boolean().optional(),
        progress: zod_1.z.boolean().optional(),
    })
        .optional(),
});
/**
 * Schema for public profile response (no validation needed, just type reference)
 */
exports.publicProfileSchema = zod_1.z.object({
    id: zod_1.z.string(),
    username: zod_1.z.string(),
    displayName: zod_1.z.string().nullable(),
    avatar: zod_1.z.string(),
    level: zod_1.z.number(),
    xp: zod_1.z.number(),
    coins: zod_1.z.number(),
    currentWorld: zod_1.z.string().nullable(),
    achievements: zod_1.z.array(zod_1.z.string()),
    createdAt: zod_1.z.string(),
});
//# sourceMappingURL=user.schema.js.map