import { z } from 'zod';

/**
 * Schema for updating player profile fields
 * Allows partial updates for displayName, avatar, and bio
 */
export const updateProfileSchema = z.object({
  displayName: z
    .string()
    .min(1, 'Display name must be at least 1 character')
    .max(50, 'Display name must be less than 50 characters')
    .optional(),
  avatar: z.string().url('Avatar must be a valid URL').optional(),
  bio: z
    .string()
    .max(500, 'Bio must be less than 500 characters')
    .optional()
    .nullable(),
});

/**
 * Schema for updating player settings
 * All fields are optional to allow partial updates
 */
export const updateSettingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).optional(),
  notebookTheme: z.string().optional(),
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Accent color must be a valid hex color').optional(),
  reducedMotion: z.boolean().optional(),
  animationIntensity: z.enum(['low', 'medium', 'high']).optional(),
  soundEffects: z.boolean().optional(),
  language: z.string().optional(),
  timeFormat: z.enum(['12h', '24h']).optional(),
  timeZone: z.string().optional(),
  notifications: z
    .object({
      email: z.boolean().optional(),
      push: z.boolean().optional(),
      achievements: z.boolean().optional(),
      progress: z.boolean().optional(),
    })
    .optional(),
});

/**
 * Schema for public profile response (no validation needed, just type reference)
 */
export const publicProfileSchema = z.object({
  id: z.string(),
  username: z.string(),
  displayName: z.string().nullable(),
  avatar: z.string(),
  level: z.number(),
  xp: z.number(),
  coins: z.number(),
  currentWorld: z.string().nullable(),
  achievements: z.array(z.string()),
  createdAt: z.string(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
export type PublicProfile = z.infer<typeof publicProfileSchema>;
