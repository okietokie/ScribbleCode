"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const defaultSettings = {
    theme: 'system',
    notebookTheme: 'default',
    accentColor: '#6366f1',
    reducedMotion: false,
    animationIntensity: 'medium',
    soundEffects: true,
    language: 'en',
    timeFormat: '12h',
    timeZone: 'UTC',
    notifications: {
        email: true,
        push: false,
        achievements: true,
        progress: true,
    },
};
const playerSettingsSchema = new mongoose_1.default.Schema({
    theme: {
        type: String,
        enum: ['light', 'dark', 'system'],
        default: 'system',
    },
    notebookTheme: {
        type: String,
        default: 'default',
    },
    accentColor: {
        type: String,
        default: '#6366f1',
        match: /^#[0-9A-Fa-f]{6}$/,
    },
    reducedMotion: {
        type: Boolean,
        default: false,
    },
    animationIntensity: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    soundEffects: {
        type: Boolean,
        default: true,
    },
    language: {
        type: String,
        default: 'en',
    },
    timeFormat: {
        type: String,
        enum: ['12h', '24h'],
        default: '12h',
    },
    timeZone: {
        type: String,
        default: 'UTC',
    },
    notifications: {
        type: {
            email: { type: Boolean, default: true },
            push: { type: Boolean, default: false },
            achievements: { type: Boolean, default: true },
            progress: { type: Boolean, default: true },
        },
        default: () => ({
            email: true,
            push: false,
            achievements: true,
            progress: true,
        }),
    },
}, { _id: false });
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
        match: /^[a-zA-Z0-9_]+$/,
    },
    displayName: {
        type: String,
        default: null,
        trim: true,
        minlength: 1,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    passwordHash: {
        type: String,
        required: true,
        select: false, // Never return by default
    },
    avatar: {
        type: String,
        default: '/avatars/default.png',
    },
    bio: {
        type: String,
        default: null,
        maxlength: 500,
    },
    level: {
        type: Number,
        default: 1,
        min: 1,
    },
    xp: {
        type: Number,
        default: 0,
        min: 0,
    },
    coins: {
        type: Number,
        default: 0,
        min: 0,
    },
    currentWorld: {
        type: String,
        default: null,
    },
    currentLesson: {
        type: String,
        default: null,
    },
    achievements: {
        type: [String],
        default: [],
    },
    settings: {
        type: playerSettingsSchema,
        default: () => defaultSettings,
    },
    role: {
        type: String,
        enum: ['student', 'admin', 'moderator', 'creator', 'premium'],
        default: 'student',
    },
    lastLoginAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            const { passwordHash, __v, _id, ...rest } = ret;
            return {
                ...rest,
                id: _id.toString(),
            };
        },
    },
});
// Instance method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    const bcrypt = await Promise.resolve().then(() => __importStar(require('bcrypt')));
    return bcrypt.compare(candidatePassword, this.passwordHash);
};
// Static method to find user with password hash when needed for auth
userSchema.statics.findByIdWithPassword = async function (id) {
    return this.findById(id).select('+passwordHash');
};
userSchema.statics.findByEmailWithPassword = async function (email) {
    return this.findOne({ email }).select('+passwordHash');
};
// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ role: 1 });
userSchema.index({ lastLoginAt: 1 });
exports.User = mongoose_1.default.model('User', userSchema);
exports.default = exports.User;
//# sourceMappingURL=user.model.js.map