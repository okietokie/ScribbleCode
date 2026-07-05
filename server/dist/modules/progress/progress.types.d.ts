import mongoose from 'mongoose';
/**
 * Lesson Progress Status
 */
export type LessonStatus = 'locked' | 'available' | 'in-progress' | 'completed' | 'perfect';
/**
 * Individual lesson progress tracking
 */
export interface ILessonProgress {
    lessonId: string;
    status: LessonStatus;
    bestScore: number;
    attempts: number;
    timeSpent: number;
    completedAt: Date | null;
    perfectScoreAt: Date | null;
}
/**
 * World progress tracking
 */
export interface IWorldProgress {
    worldId: string;
    completionPercentage: number;
    unlockedRegions: string[];
    completedRegions: string[];
    bossBattleCompleted: boolean;
    completedAt: Date | null;
    rewardClaimed: boolean;
}
/**
 * Player statistics
 */
export interface IPlayerStats {
    totalXP: number;
    lessonsCompleted: number;
    bossBattlesCompleted: number;
    achievementsEarned: number;
    totalTimeSpent: number;
    averageLessonAccuracy: number;
    currentStreak: number;
    longestStreak: number;
    perfectLessons: number;
}
/**
 * Achievement entry
 */
export interface IAchievementEntry {
    achievementId: string;
    earnedAt: Date;
    category: string;
}
/**
 * Badge entry
 */
export interface IBadgeEntry {
    badgeId: string;
    earnedAt: Date;
    tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}
/**
 * Main Progress Document Interface
 */
export interface IProgress extends Omit<mongoose.Document, '_id'> {
    _id: mongoose.Types.ObjectId;
    id: string;
    userId: mongoose.Types.ObjectId;
    currentWorld: string | null;
    currentRegion: string | null;
    currentLesson: string | null;
    completedLessons: string[];
    completedRegions: string[];
    completedWorlds: string[];
    xp: number;
    level: number;
    coins: number;
    achievements: IAchievementEntry[];
    badges: IBadgeEntry[];
    currentStreak: number;
    longestStreak: number;
    stats: IPlayerStats;
    lessonProgress: Record<string, ILessonProgress>;
    worldProgress: Record<string, IWorldProgress>;
    lastPlayedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Progress document with methods
 */
export interface ProgressDocumentType extends IProgress {
    toPublicJson(): Omit<IProgress, '__v' | 'lessonProgress' | 'worldProgress'> & {
        id: string;
        userId: string;
        lessonProgress: Record<string, ILessonProgress>;
        worldProgress: Record<string, IWorldProgress>;
    };
}
interface ProgressModelType extends mongoose.Model<IProgress> {
    findByUserId(userId: string): Promise<IProgress | null>;
    upsertByUserId(userId: string): Promise<IProgress>;
}
export interface ProgressDocument extends IProgress {
    toPublicJson(): any;
}
export type { ProgressModelType };
//# sourceMappingURL=progress.types.d.ts.map