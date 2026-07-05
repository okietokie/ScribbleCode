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
    toPrivateJson(): Omit<IUser, 'passwordHash' | 'comparePassword' | '__v'> & {
        id: string;
    };
}
interface UserModelType extends mongoose.Model<IUser> {
    findByIdWithPassword(id: string): Promise<IUser | null>;
    findByEmailWithPassword(email: string): Promise<IUser | null>;
}
export declare const User: UserModelType;
export default User;
//# sourceMappingURL=user.model.d.ts.map