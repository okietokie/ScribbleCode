import { z } from 'zod';
/**
 * Schema for lesson progress update
 */
export declare const lessonProgressSchema: z.ZodObject<{
    lessonId: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<{
        locked: "locked";
        available: "available";
        "in-progress": "in-progress";
        completed: "completed";
        perfect: "perfect";
    }>>;
    score: z.ZodOptional<z.ZodNumber>;
    timeSpent: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
/**
 * Schema for world progress update
 */
export declare const worldProgressSchema: z.ZodObject<{
    worldId: z.ZodString;
    completionPercentage: z.ZodOptional<z.ZodNumber>;
    unlockedRegions: z.ZodOptional<z.ZodArray<z.ZodString>>;
    completedRegions: z.ZodOptional<z.ZodArray<z.ZodString>>;
    bossBattleCompleted: z.ZodOptional<z.ZodBoolean>;
    rewardClaimed: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
/**
 * Schema for syncing progress from client
 */
export declare const syncProgressSchema: z.ZodObject<{
    currentWorld: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    currentRegion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    currentLesson: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    completedLessons: z.ZodOptional<z.ZodArray<z.ZodString>>;
    completedRegions: z.ZodOptional<z.ZodArray<z.ZodString>>;
    completedWorlds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    xp: z.ZodOptional<z.ZodNumber>;
    level: z.ZodOptional<z.ZodNumber>;
    coins: z.ZodOptional<z.ZodNumber>;
    achievements: z.ZodOptional<z.ZodArray<z.ZodObject<{
        achievementId: z.ZodString;
        category: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
    badges: z.ZodOptional<z.ZodArray<z.ZodObject<{
        badgeId: z.ZodString;
        tier: z.ZodOptional<z.ZodEnum<{
            bronze: "bronze";
            silver: "silver";
            gold: "gold";
            platinum: "platinum";
        }>>;
    }, z.core.$strip>>>;
    currentStreak: z.ZodOptional<z.ZodNumber>;
    longestStreak: z.ZodOptional<z.ZodNumber>;
    stats: z.ZodOptional<z.ZodObject<{
        totalXP: z.ZodOptional<z.ZodNumber>;
        lessonsCompleted: z.ZodOptional<z.ZodNumber>;
        bossBattlesCompleted: z.ZodOptional<z.ZodNumber>;
        achievementsEarned: z.ZodOptional<z.ZodNumber>;
        totalTimeSpent: z.ZodOptional<z.ZodNumber>;
        averageLessonAccuracy: z.ZodOptional<z.ZodNumber>;
        currentStreak: z.ZodOptional<z.ZodNumber>;
        longestStreak: z.ZodOptional<z.ZodNumber>;
        perfectLessons: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    lessonProgress: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    worldProgress: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, z.core.$strip>;
/**
 * Schema for general progress update (PATCH /api/v1/progress)
 */
export declare const updateProgressSchema: z.ZodObject<{
    currentWorld: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    currentRegion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    currentLesson: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    xp: z.ZodOptional<z.ZodNumber>;
    level: z.ZodOptional<z.ZodNumber>;
    coins: z.ZodOptional<z.ZodNumber>;
    currentStreak: z.ZodOptional<z.ZodNumber>;
    longestStreak: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
/**
 * Type exports
 */
export type LessonProgressInput = z.infer<typeof lessonProgressSchema>;
export type WorldProgressInput = z.infer<typeof worldProgressSchema>;
export type SyncProgressInput = z.infer<typeof syncProgressSchema>;
export type UpdateProgressInput = z.infer<typeof updateProgressSchema>;
//# sourceMappingURL=progress.validation.d.ts.map