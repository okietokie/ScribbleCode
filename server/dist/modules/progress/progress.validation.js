"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProgressSchema = exports.syncProgressSchema = exports.worldProgressSchema = exports.lessonProgressSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema for lesson progress update
 */
exports.lessonProgressSchema = zod_1.z.object({
    lessonId: zod_1.z.string().min(1, 'Lesson ID is required'),
    status: zod_1.z.enum(['locked', 'available', 'in-progress', 'completed', 'perfect']).optional(),
    score: zod_1.z.number().min(0).max(100).optional(),
    timeSpent: zod_1.z.number().min(0).optional(),
});
/**
 * Schema for world progress update
 */
exports.worldProgressSchema = zod_1.z.object({
    worldId: zod_1.z.string().min(1, 'World ID is required'),
    completionPercentage: zod_1.z.number().min(0).max(100).optional(),
    unlockedRegions: zod_1.z.array(zod_1.z.string()).optional(),
    completedRegions: zod_1.z.array(zod_1.z.string()).optional(),
    bossBattleCompleted: zod_1.z.boolean().optional(),
    rewardClaimed: zod_1.z.boolean().optional(),
});
/**
 * Schema for syncing progress from client
 */
exports.syncProgressSchema = zod_1.z.object({
    currentWorld: zod_1.z.string().nullable().optional(),
    currentRegion: zod_1.z.string().nullable().optional(),
    currentLesson: zod_1.z.string().nullable().optional(),
    completedLessons: zod_1.z.array(zod_1.z.string()).optional(),
    completedRegions: zod_1.z.array(zod_1.z.string()).optional(),
    completedWorlds: zod_1.z.array(zod_1.z.string()).optional(),
    xp: zod_1.z.number().min(0).optional(),
    level: zod_1.z.number().min(1).optional(),
    coins: zod_1.z.number().min(0).optional(),
    achievements: zod_1.z.array(zod_1.z.object({
        achievementId: zod_1.z.string(),
        category: zod_1.z.string().optional(),
    })).optional(),
    badges: zod_1.z.array(zod_1.z.object({
        badgeId: zod_1.z.string(),
        tier: zod_1.z.enum(['bronze', 'silver', 'gold', 'platinum']).optional(),
    })).optional(),
    currentStreak: zod_1.z.number().min(0).optional(),
    longestStreak: zod_1.z.number().min(0).optional(),
    stats: zod_1.z.object({
        totalXP: zod_1.z.number().min(0).optional(),
        lessonsCompleted: zod_1.z.number().min(0).optional(),
        bossBattlesCompleted: zod_1.z.number().min(0).optional(),
        achievementsEarned: zod_1.z.number().min(0).optional(),
        totalTimeSpent: zod_1.z.number().min(0).optional(),
        averageLessonAccuracy: zod_1.z.number().min(0).max(100).optional(),
        currentStreak: zod_1.z.number().min(0).optional(),
        longestStreak: zod_1.z.number().min(0).optional(),
        perfectLessons: zod_1.z.number().min(0).optional(),
    }).optional(),
    lessonProgress: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
    worldProgress: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
});
/**
 * Schema for general progress update (PATCH /api/v1/progress)
 */
exports.updateProgressSchema = zod_1.z.object({
    currentWorld: zod_1.z.string().nullable().optional(),
    currentRegion: zod_1.z.string().nullable().optional(),
    currentLesson: zod_1.z.string().nullable().optional(),
    xp: zod_1.z.number().min(0).optional(),
    level: zod_1.z.number().min(1).optional(),
    coins: zod_1.z.number().min(0).optional(),
    currentStreak: zod_1.z.number().min(0).optional(),
    longestStreak: zod_1.z.number().min(0).optional(),
});
//# sourceMappingURL=progress.validation.js.map