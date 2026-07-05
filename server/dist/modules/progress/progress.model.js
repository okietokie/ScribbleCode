"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Progress = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Lesson Progress Sub-schema
 */
const lessonProgressSchema = new mongoose_1.default.Schema({
    lessonId: { type: String, required: true },
    status: {
        type: String,
        enum: ['locked', 'available', 'in-progress', 'completed', 'perfect'],
        default: 'locked',
    },
    bestScore: { type: Number, default: 0, min: 0, max: 100 },
    attempts: { type: Number, default: 0, min: 0 },
    timeSpent: { type: Number, default: 0, min: 0 },
    completedAt: { type: Date, default: null },
    perfectScoreAt: { type: Date, default: null },
}, { _id: false });
/**
 * World Progress Sub-schema
 */
const worldProgressSchema = new mongoose_1.default.Schema({
    worldId: { type: String, required: true },
    completionPercentage: { type: Number, default: 0, min: 0, max: 100 },
    unlockedRegions: { type: [String], default: [] },
    completedRegions: { type: [String], default: [] },
    bossBattleCompleted: { type: Boolean, default: false },
    completedAt: { type: Date, default: null },
    rewardClaimed: { type: Boolean, default: false },
}, { _id: false });
/**
 * Achievement Entry Sub-schema
 */
const achievementEntrySchema = new mongoose_1.default.Schema({
    achievementId: { type: String, required: true },
    earnedAt: { type: Date, default: Date.now },
    category: { type: String, default: 'general' },
}, { _id: false });
/**
 * Badge Entry Sub-schema
 */
const badgeEntrySchema = new mongoose_1.default.Schema({
    badgeId: { type: String, required: true },
    earnedAt: { type: Date, default: Date.now },
    tier: {
        type: String,
        enum: ['bronze', 'silver', 'gold', 'platinum'],
        default: 'bronze',
    },
}, { _id: false });
/**
 * Player Stats Sub-schema
 */
const playerStatsSchema = new mongoose_1.default.Schema({
    totalXP: { type: Number, default: 0, min: 0 },
    lessonsCompleted: { type: Number, default: 0, min: 0 },
    bossBattlesCompleted: { type: Number, default: 0, min: 0 },
    achievementsEarned: { type: Number, default: 0, min: 0 },
    totalTimeSpent: { type: Number, default: 0, min: 0 },
    averageLessonAccuracy: { type: Number, default: 0, min: 0, max: 100 },
    currentStreak: { type: Number, default: 0, min: 0 },
    longestStreak: { type: Number, default: 0, min: 0 },
    perfectLessons: { type: Number, default: 0, min: 0 },
}, { _id: false });
/**
 * Main Progress Schema
 */
const progressSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    currentWorld: { type: String, default: null },
    currentRegion: { type: String, default: null },
    currentLesson: { type: String, default: null },
    completedLessons: { type: [String], default: [] },
    completedRegions: { type: [String], default: [] },
    completedWorlds: { type: [String], default: [] },
    xp: { type: Number, default: 0, min: 0 },
    level: { type: Number, default: 1, min: 1 },
    coins: { type: Number, default: 0, min: 0 },
    achievements: { type: [achievementEntrySchema], default: [] },
    badges: { type: [badgeEntrySchema], default: [] },
    currentStreak: { type: Number, default: 0, min: 0 },
    longestStreak: { type: Number, default: 0, min: 0 },
    stats: { type: playerStatsSchema, default: () => ({}) },
    // Using objects instead of Maps for MongoDB compatibility
    lessonProgress: { type: Object, default: {} },
    worldProgress: { type: Object, default: {} },
    lastPlayedAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            const { __v, _id, ...rest } = ret;
            return {
                ...rest,
                id: _id.toString(),
                userId: ret.userId._id
                    ? ret.userId._id.toString()
                    : ret.userId.toString(),
            };
        },
    },
});
// Indexes for performance
progressSchema.index({ userId: 1 });
progressSchema.index({ currentWorld: 1 });
progressSchema.index({ level: 1 });
progressSchema.index({ lastPlayedAt: 1 });
// Static method to find progress by user ID
progressSchema.statics.findByUserId = async function (userId) {
    return this.findOne({ userId });
};
// Static method to upsert progress for a user
progressSchema.statics.upsertByUserId = async function (userId) {
    const existing = await this.findOne({ userId });
    if (existing) {
        return existing;
    }
    const newProgress = await this.create({
        userId,
        stats: {
            totalXP: 0,
            lessonsCompleted: 0,
            bossBattlesCompleted: 0,
            achievementsEarned: 0,
            totalTimeSpent: 0,
            averageLessonAccuracy: 0,
            currentStreak: 0,
            longestStreak: 0,
            perfectLessons: 0,
        },
    });
    return newProgress;
};
// Instance method to convert to public JSON
progressSchema.methods.toPublicJson = function () {
    const doc = this.toObject();
    const { __v, _id, ...rest } = doc;
    return {
        ...rest,
        id: _id.toString(),
        userId: doc.userId._id
            ? doc.userId._id.toString()
            : doc.userId.toString(),
        // Convert Maps to Records if they exist
        lessonProgress: doc.lessonProgress || {},
        worldProgress: doc.worldProgress || {},
    };
};
exports.Progress = mongoose_1.default.model('Progress', progressSchema);
exports.default = exports.Progress;
//# sourceMappingURL=progress.model.js.map