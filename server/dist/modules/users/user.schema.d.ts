import { z } from 'zod';
/**
 * Schema for updating player profile fields
 * Allows partial updates for displayName, avatar, and bio
 */
export declare const updateProfileSchema: z.ZodObject<{
    displayName: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodString>;
    bio: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
/**
 * Schema for updating player settings
 * All fields are optional to allow partial updates
 */
export declare const updateSettingsSchema: z.ZodObject<{
    theme: z.ZodOptional<z.ZodEnum<{
        light: "light";
        dark: "dark";
        system: "system";
    }>>;
    notebookTheme: z.ZodOptional<z.ZodString>;
    accentColor: z.ZodOptional<z.ZodString>;
    reducedMotion: z.ZodOptional<z.ZodBoolean>;
    animationIntensity: z.ZodOptional<z.ZodEnum<{
        low: "low";
        medium: "medium";
        high: "high";
    }>>;
    soundEffects: z.ZodOptional<z.ZodBoolean>;
    language: z.ZodOptional<z.ZodString>;
    timeFormat: z.ZodOptional<z.ZodEnum<{
        "12h": "12h";
        "24h": "24h";
    }>>;
    timeZone: z.ZodOptional<z.ZodString>;
    notifications: z.ZodOptional<z.ZodObject<{
        email: z.ZodOptional<z.ZodBoolean>;
        push: z.ZodOptional<z.ZodBoolean>;
        achievements: z.ZodOptional<z.ZodBoolean>;
        progress: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema for public profile response (no validation needed, just type reference)
 */
export declare const publicProfileSchema: z.ZodObject<{
    id: z.ZodString;
    username: z.ZodString;
    displayName: z.ZodNullable<z.ZodString>;
    avatar: z.ZodString;
    level: z.ZodNumber;
    xp: z.ZodNumber;
    coins: z.ZodNumber;
    currentWorld: z.ZodNullable<z.ZodString>;
    achievements: z.ZodArray<z.ZodString>;
    createdAt: z.ZodString;
}, z.core.$strip>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
export type PublicProfile = z.infer<typeof publicProfileSchema>;
//# sourceMappingURL=user.schema.d.ts.map