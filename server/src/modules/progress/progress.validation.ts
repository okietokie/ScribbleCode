import { z } from 'zod';

/**
 * Schema for lesson progress update
 */
export const lessonProgressSchema = z.object({
  lessonId: z.string().min(1, 'Lesson ID is required'),
  status: z.enum(['locked', 'available', 'in-progress', 'completed', 'perfect']).optional(),
  score: z.number().min(0).max(100).optional(),
  timeSpent: z.number().min(0).optional(),
});

/**
 * Schema for world progress update
 */
export const worldProgressSchema = z.object({
  worldId: z.string().min(1, 'World ID is required'),
  completionPercentage: z.number().min(0).max(100).optional(),
  unlockedRegions: z.array(z.string()).optional(),
  completedRegions: z.array(z.string()).optional(),
  bossBattleCompleted: z.boolean().optional(),
  rewardClaimed: z.boolean().optional(),
});

/**
 * Schema for syncing progress from client
 */
export const syncProgressSchema = z.object({
  currentWorld: z.string().nullable().optional(),
  currentRegion: z.string().nullable().optional(),
  currentLesson: z.string().nullable().optional(),
  completedLessons: z.array(z.string()).optional(),
  completedRegions: z.array(z.string()).optional(),
  completedWorlds: z.array(z.string()).optional(),
  xp: z.number().min(0).optional(),
  level: z.number().min(1).optional(),
  coins: z.number().min(0).optional(),
  achievements: z.array(z.object({
    achievementId: z.string(),
    category: z.string().optional(),
  })).optional(),
  badges: z.array(z.object({
    badgeId: z.string(),
    tier: z.enum(['bronze', 'silver', 'gold', 'platinum']).optional(),
  })).optional(),
  currentStreak: z.number().min(0).optional(),
  longestStreak: z.number().min(0).optional(),
  stats: z.object({
    totalXP: z.number().min(0).optional(),
    lessonsCompleted: z.number().min(0).optional(),
    bossBattlesCompleted: z.number().min(0).optional(),
    achievementsEarned: z.number().min(0).optional(),
    totalTimeSpent: z.number().min(0).optional(),
    averageLessonAccuracy: z.number().min(0).max(100).optional(),
    currentStreak: z.number().min(0).optional(),
    longestStreak: z.number().min(0).optional(),
    perfectLessons: z.number().min(0).optional(),
  }).optional(),
  lessonProgress: z.record(z.string(), z.any()).optional(),
  worldProgress: z.record(z.string(), z.any()).optional(),
});

/**
 * Schema for general progress update (PATCH /api/v1/progress)
 */
export const updateProgressSchema = z.object({
  currentWorld: z.string().nullable().optional(),
  currentRegion: z.string().nullable().optional(),
  currentLesson: z.string().nullable().optional(),
  xp: z.number().min(0).optional(),
  level: z.number().min(1).optional(),
  coins: z.number().min(0).optional(),
  currentStreak: z.number().min(0).optional(),
  longestStreak: z.number().min(0).optional(),
});

/**
 * Type exports
 */
export type LessonProgressInput = z.infer<typeof lessonProgressSchema>;
export type WorldProgressInput = z.infer<typeof worldProgressSchema>;
export type SyncProgressInput = z.infer<typeof syncProgressSchema>;
export type UpdateProgressInput = z.infer<typeof updateProgressSchema>;
