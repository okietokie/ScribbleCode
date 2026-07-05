"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseStatus = exports.disconnectDatabase = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_js_1 = require("../config/env.js");
const logger_js_1 = require("../shared/utils/logger.js");
let isConnected = false;
const connectDatabase = async () => {
    if (isConnected) {
        return { success: true, message: 'Already connected to database' };
    }
    if (!env_js_1.config.mongodbUri) {
        throw new Error('MONGODB_URI is not configured');
    }
    try {
        const conn = await mongoose_1.default.connect(env_js_1.config.mongodbUri, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        mongoose_1.default.connection.on('connected', () => {
            logger_js_1.logger.info(`MongoDB connected: ${mongoose_1.default.connection.host}`);
            isConnected = true;
        });
        mongoose_1.default.connection.on('error', (err) => {
            logger_js_1.logger.error(`MongoDB connection error: ${err.message}`);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            logger_js_1.logger.warn('MongoDB disconnected');
            isConnected = false;
        });
        mongoose_1.default.connection.on('reconnected', () => {
            logger_js_1.logger.info('MongoDB reconnected');
            isConnected = true;
        });
        return {
            success: true,
            message: `Connected to MongoDB`,
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        logger_js_1.logger.error(`Database connection failed: ${errorMessage}`);
        throw error;
    }
};
exports.connectDatabase = connectDatabase;
const disconnectDatabase = async () => {
    if (mongoose_1.default.connection.readyState !== 0) {
        await mongoose_1.default.disconnect();
        console.log('Database connection closed');
    }
};
exports.disconnectDatabase = disconnectDatabase;
const getDatabaseStatus = () => ({
    connected: mongoose_1.default.connection.readyState === 1,
    readyState: mongoose_1.default.connection.readyState,
    host: mongoose_1.default.connection.host,
    name: mongoose_1.default.connection.name,
});
exports.getDatabaseStatus = getDatabaseStatus;
//# sourceMappingURL=connection.js.map