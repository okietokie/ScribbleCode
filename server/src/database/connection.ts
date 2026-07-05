import mongoose from 'mongoose';
import { config } from '../config/env.js';
import { logger } from '../shared/utils/logger.js';

interface ConnectionResult {
  success: boolean;
  message: string;
}

let isConnected = false;

export const connectDatabase = async (): Promise<ConnectionResult> => {
  if (isConnected) {
    return { success: true, message: 'Already connected to database' };
  }

  if (!config.mongodbUri) {
    throw new Error('MONGODB_URI is not configured');
  }

  try {
    const conn = await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    mongoose.connection.on('connected', () => {
      logger.info(`MongoDB connected: ${mongoose.connection.host}`);
      isConnected = true;
    });

    mongoose.connection.on('error', (err) => {
      logger.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
      isConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
      isConnected = true;
    });

    return {
      success: true,
      message: `Connected to MongoDB`,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Database connection failed: ${errorMessage}`);
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    console.log('Database connection closed');
  }
};

export const getDatabaseStatus = (): {
  connected: boolean;
  readyState: number;
  host: string | null;
  name: string | null;
} => ({
  connected: mongoose.connection.readyState === 1,
  readyState: mongoose.connection.readyState,
  host: mongoose.connection.host,
  name: mongoose.connection.name,
});
