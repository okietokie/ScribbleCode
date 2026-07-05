import mongoose from 'mongoose';
import { ObjectId } from 'bson';

/**
 * Player Profile Settings Interface
 * Stores user preferences for UI, accessibility, and gameplay
 */
export interface IPlayerSettings {
  theme: 'light' | 'dark' | 'system';
  notebookTheme: string;
  accentColor: string;
  reducedMotion: boolean;
  animationIntensity: 'low' | 'medium' | 'high';
  soundEffects: boolean;
  language: string;
  timeFormat: '12h' | '24h';
  timeZone: string;
  notifications: {
    email: boolean;
    push: boolean;
    achievements: boolean;
    progress: boolean;
  };
}

/**
 * User Interface extending Document
 * Represents the complete player profile and account
 */
export interface IUser extends Omit<mongoose.Document, '_id'> {
  _id: ObjectId;
  id: string;
  username: string;
  displayName: string | null;
  email: string;
  passwordHash: string;
  avatar: string;
  bio: string | null;
  level: number;
  xp: number;
  coins: number;
  currentWorld: string | null;
  currentLesson: string | null;
  achievements: string[];
  settings: IPlayerSettings;
  role: 'student' | 'admin' | 'moderator' | 'creator' | 'premium';
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  toPublicJson(): Omit<IUser, 'passwordHash' | 'comparePassword' | '__v' | 'settings'> & { 
    id: string;
    settings?: IPlayerSettings;
  };
  toPrivateJson(): Omit<IUser, 'passwordHash' | 'comparePassword' | '__v'> & { id: string };
}

interface UserModelType extends mongoose.Model<IUser> {
  findByIdWithPassword(id: string): Promise<IUser | null>;
  findByEmailWithPassword(email: string): Promise<IUser | null>;
}

const defaultSettings: IPlayerSettings = {
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

const playerSettingsSchema = new mongoose.Schema<IPlayerSettings>(
  {
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
  },
  { _id: false }
);

const userSchema = new mongoose.Schema<IUser>(
  {
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
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        const { passwordHash, __v, _id, ...rest } = ret as any;
        return {
          ...rest,
          id: (_id as any).toString(),
        };
      },
    },
  }
);

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const bcrypt = await import('bcrypt');
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Static method to find user with password hash when needed for auth
userSchema.statics.findByIdWithPassword = async function (id: string) {
  return this.findById(id).select('+passwordHash');
};

userSchema.statics.findByEmailWithPassword = async function (email: string) {
  return this.findOne({ email }).select('+passwordHash');
};

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ role: 1 });
userSchema.index({ lastLoginAt: 1 });

export const User = mongoose.model<IUser, UserModelType>('User', userSchema);

export default User;
