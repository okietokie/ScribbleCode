import { config } from '../../config/env.js';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const logLevels: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLevel = (config.logLevel as LogLevel) || 'debug';
const currentLevelNum = logLevels[currentLevel] ?? 0;

const formatMessage = (level: LogLevel, message: string, meta?: Record<string, unknown>): string => {
  const timestamp = new Date().toISOString();
  const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
};

export const logger = {
  debug: (message: string, meta?: Record<string, unknown>) => {
    if (currentLevelNum <= logLevels.debug) {
      console.debug(formatMessage('debug', message, meta));
    }
  },

  info: (message: string, meta?: Record<string, unknown>) => {
    if (currentLevelNum <= logLevels.info) {
      console.info(formatMessage('info', message, meta));
    }
  },

  warn: (message: string, meta?: Record<string, unknown>) => {
    if (currentLevelNum <= logLevels.warn) {
      console.warn(formatMessage('warn', message, meta));
    }
  },

  error: (message: string, meta?: Record<string, unknown>) => {
    if (currentLevelNum <= logLevels.error) {
      console.error(formatMessage('error', message, meta));
    }
  },

  // HTTP request logging helper
  http: (method: string, path: string, statusCode: number, duration?: number) => {
    const meta: Record<string, unknown> = { method, path, statusCode };
    if (duration !== undefined) {
      meta.durationMs = duration;
    }
    logger.info('HTTP Request', meta);
  },
};
