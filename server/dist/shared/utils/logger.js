"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const env_js_1 = require("../../config/env.js");
const logLevels = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
};
const currentLevel = env_js_1.config.logLevel || 'debug';
const currentLevelNum = logLevels[currentLevel] ?? 0;
const formatMessage = (level, message, meta) => {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
};
exports.logger = {
    debug: (message, meta) => {
        if (currentLevelNum <= logLevels.debug) {
            console.debug(formatMessage('debug', message, meta));
        }
    },
    info: (message, meta) => {
        if (currentLevelNum <= logLevels.info) {
            console.info(formatMessage('info', message, meta));
        }
    },
    warn: (message, meta) => {
        if (currentLevelNum <= logLevels.warn) {
            console.warn(formatMessage('warn', message, meta));
        }
    },
    error: (message, meta) => {
        if (currentLevelNum <= logLevels.error) {
            console.error(formatMessage('error', message, meta));
        }
    },
    // HTTP request logging helper
    http: (method, path, statusCode, duration) => {
        const meta = { method, path, statusCode };
        if (duration !== undefined) {
            meta.durationMs = duration;
        }
        exports.logger.info('HTTP Request', meta);
    },
};
//# sourceMappingURL=logger.js.map