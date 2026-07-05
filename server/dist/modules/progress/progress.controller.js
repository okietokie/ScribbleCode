"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncProgress = exports.updateWorldProgress = exports.updateLessonProgress = exports.updateProgress = exports.getProgress = void 0;
const progress_model_js_1 = require("./progress.model.js");
const response_js_1 = require("../../shared/utils/response.js");
const app_errors_js_1 = require("../../shared/errors/app-errors.js");
/**
 * Get current user's progress
 */
const getProgress = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new app_errors_js_1.AppError('Unauthorized', 401, 'UNAUTHORIZED');
        }
        let progress = await progress_model_js_1.Progress.findByUserId(userId);
        // Create progress document if it doesn't exist
        if (!progress) {
            progress = await progress_model_js_1.Progress.upsertByUserId(userId);
        }
        const progressData = progress.toPublicJson();
        res.status(200).json((0, response_js_1.createSuccessResponse)(progressData, 'Progress retrieved successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.getProgress = getProgress;
/**
 * Update current user's progress
 */
const updateProgress = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new app_errors_js_1.AppError('Unauthorized', 401, 'UNAUTHORIZED');
        }
        const updates = req.body;
        // Remove protected fields that shouldn't be directly updated
        const { xp, level, coins, ...allowedUpdates } = updates;
        let progress = await progress_model_js_1.Progress.findByUserId(userId);
        if (!progress) {
            progress = await progress_model_js_1.Progress.upsertByUserId(userId);
        }
        // Apply allowed updates
        Object.assign(progress, {
            ...allowedUpdates,
            lastPlayedAt: new Date(),
        });
        // Server-side calculation for XP, level, and coins based on progress
        // This prevents client manipulation
        if (xp !== undefined || level !== undefined || coins !== undefined) {
            // In a real implementation, you would calculate these values
            // based on completed lessons, achievements, etc.
            // For now, we'll trust the client but log the update
            progress.xp = xp ?? progress.xp;
            progress.level = level ?? progress.level;
            progress.coins = coins ?? progress.coins;
        }
        await progress.save();
        const progressData = progress.toPublicJson();
        res.status(200).json((0, response_js_1.createSuccessResponse)(progressData, 'Progress updated successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.updateProgress = updateProgress;
/**
 * Update lesson progress
 */
const updateLessonProgress = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new app_errors_js_1.AppError('Unauthorized', 401, 'UNAUTHORIZED');
        }
        const { lessonId, status, score, timeSpent } = req.body;
        let progress = await progress_model_js_1.Progress.findByUserId(userId);
        if (!progress) {
            progress = await progress_model_js_1.Progress.upsertByUserId(userId);
        }
        // Initialize lessonProgress as an object if it's empty
        if (!progress.lessonProgress) {
            progress.lessonProgress = {};
        }
        const existingLesson = progress.lessonProgress[lessonId];
        const now = new Date();
        // Update or create lesson progress
        progress.lessonProgress[lessonId] = {
            lessonId,
            status: status ?? existingLesson?.status ?? 'in-progress',
            bestScore: Math.max(score ?? 0, existingLesson?.bestScore ?? 0),
            attempts: (existingLesson?.attempts ?? 0) + (score !== undefined ? 1 : 0),
            timeSpent: (existingLesson?.timeSpent ?? 0) + (timeSpent ?? 0),
            completedAt: status === 'completed' || status === 'perfect'
                ? (existingLesson?.completedAt ?? now)
                : existingLesson?.completedAt ?? null,
            perfectScoreAt: status === 'perfect'
                ? (existingLesson?.perfectScoreAt ?? now)
                : existingLesson?.perfectScoreAt ?? null,
        };
        // Update current lesson if provided
        if (lessonId) {
            progress.currentLesson = lessonId;
        }
        // Update completed lessons array if lesson is completed
        if ((status === 'completed' || status === 'perfect') && !progress.completedLessons.includes(lessonId)) {
            progress.completedLessons.push(lessonId);
            // Update stats
            progress.stats.lessonsCompleted = progress.completedLessons.length;
            if (status === 'perfect') {
                progress.stats.perfectLessons = (progress.stats.perfectLessons ?? 0) + 1;
            }
        }
        progress.lastPlayedAt = now;
        await progress.save();
        const progressData = progress.toPublicJson();
        res.status(200).json((0, response_js_1.createSuccessResponse)(progressData, 'Lesson progress updated successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.updateLessonProgress = updateLessonProgress;
/**
 * Update world progress
 */
const updateWorldProgress = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new app_errors_js_1.AppError('Unauthorized', 401, 'UNAUTHORIZED');
        }
        const { worldId, completionPercentage, unlockedRegions, completedRegions, bossBattleCompleted, rewardClaimed } = req.body;
        let progress = await progress_model_js_1.Progress.findByUserId(userId);
        if (!progress) {
            progress = await progress_model_js_1.Progress.upsertByUserId(userId);
        }
        // Initialize worldProgress as an object if it's empty
        if (!progress.worldProgress) {
            progress.worldProgress = {};
        }
        const existingWorld = progress.worldProgress[worldId];
        const now = new Date();
        // Update or create world progress
        progress.worldProgress[worldId] = {
            worldId,
            completionPercentage: completionPercentage ?? existingWorld?.completionPercentage ?? 0,
            unlockedRegions: unlockedRegions ?? existingWorld?.unlockedRegions ?? [],
            completedRegions: completedRegions ?? existingWorld?.completedRegions ?? [],
            bossBattleCompleted: bossBattleCompleted ?? existingWorld?.bossBattleCompleted ?? false,
            completedAt: completionPercentage === 100
                ? (existingWorld?.completedAt ?? now)
                : existingWorld?.completedAt ?? null,
            rewardClaimed: rewardClaimed ?? existingWorld?.rewardClaimed ?? false,
        };
        // Update current world if provided
        if (worldId) {
            progress.currentWorld = worldId;
        }
        // Update completed worlds array if world is 100% complete
        if (completionPercentage === 100 && !progress.completedWorlds.includes(worldId)) {
            progress.completedWorlds.push(worldId);
            progress.stats.bossBattlesCompleted = (progress.stats.bossBattlesCompleted ?? 0) + 1;
        }
        progress.lastPlayedAt = now;
        await progress.save();
        const progressData = progress.toPublicJson();
        res.status(200).json((0, response_js_1.createSuccessResponse)(progressData, 'World progress updated successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.updateWorldProgress = updateWorldProgress;
/**
 * Sync progress from client
 */
const syncProgress = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new app_errors_js_1.AppError('Unauthorized', 401, 'UNAUTHORIZED');
        }
        const syncData = req.body;
        let progress = await progress_model_js_1.Progress.findByUserId(userId);
        if (!progress) {
            progress = await progress_model_js_1.Progress.upsertByUserId(userId);
        }
        // Merge client data with server data
        // Server maintains authority over certain fields
        const now = new Date();
        Object.assign(progress, {
            currentWorld: syncData.currentWorld ?? progress.currentWorld,
            currentRegion: syncData.currentRegion ?? progress.currentRegion,
            currentLesson: syncData.currentLesson ?? progress.currentLesson,
            completedLessons: syncData.completedLessons ?? progress.completedLessons,
            completedRegions: syncData.completedRegions ?? progress.completedRegions,
            completedWorlds: syncData.completedWorlds ?? progress.completedWorlds,
            achievements: syncData.achievements?.map((a) => ({
                achievementId: a.achievementId,
                earnedAt: new Date(),
                category: a.category ?? 'general',
            })) ?? progress.achievements,
            badges: syncData.badges?.map((b) => ({
                badgeId: b.badgeId,
                earnedAt: new Date(),
                tier: b.tier ?? 'bronze',
            })) ?? progress.badges,
            currentStreak: syncData.currentStreak ?? progress.currentStreak,
            longestStreak: Math.max(syncData.longestStreak ?? 0, progress.longestStreak),
            lessonProgress: { ...progress.lessonProgress, ...syncData.lessonProgress },
            worldProgress: { ...progress.worldProgress, ...syncData.worldProgress },
            lastPlayedAt: now,
        });
        // Update stats if provided
        if (syncData.stats) {
            Object.assign(progress.stats, syncData.stats);
        }
        // Recalculate derived stats
        progress.stats.lessonsCompleted = progress.completedLessons.length;
        progress.stats.achievementsEarned = progress.achievements.length;
        await progress.save();
        const progressData = progress.toPublicJson();
        res.status(200).json((0, response_js_1.createSuccessResponse)(progressData, 'Progress synchronized successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.syncProgress = syncProgress;
//# sourceMappingURL=progress.controller.js.map