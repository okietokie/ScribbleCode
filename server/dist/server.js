"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const env_js_1 = require("./config/env.js");
const connection_js_1 = require("./database/connection.js");
const logger_js_1 = require("./shared/utils/logger.js");
const PORT = env_js_1.config.port;
let server = null;
const gracefulShutdown = async (signal) => {
    logger_js_1.logger.info(`Graceful shutdown initiated with signal: ${signal}`);
    if (server) {
        server.close(async () => {
            logger_js_1.logger.info('HTTP server closed');
            await (0, connection_js_1.disconnectDatabase)();
            process.exit(0);
        });
        // Force close after timeout
        setTimeout(() => {
            logger_js_1.logger.error('Forced shutdown due to timeout');
            process.exit(1);
        }, 30000);
    }
    else {
        await (0, connection_js_1.disconnectDatabase)();
        process.exit(0);
    }
};
const startServer = async () => {
    try {
        // Connect to database
        await (0, connection_js_1.connectDatabase)();
        // Start HTTP server
        server = app_js_1.default.listen(PORT, () => {
            logger_js_1.logger.info(`ScribbleCode API server running on port ${PORT}`);
            logger_js_1.logger.info(`Environment: ${env_js_1.config.env}`);
            logger_js_1.logger.info(`Health check: http://localhost:${PORT}/api/v1/health`);
        });
        // Handle graceful shutdown
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
        // Handle uncaught errors
        process.on('uncaughtException', (error) => {
            logger_js_1.logger.error('Uncaught Exception:', { error: error.message });
            gracefulShutdown('uncaughtException');
        });
        process.on('unhandledRejection', (reason, promise) => {
            logger_js_1.logger.error('Unhandled Rejection at:', { promise: String(promise), reason: String(reason) });
            gracefulShutdown('unhandledRejection');
        });
    }
    catch (error) {
        logger_js_1.logger.error('Failed to start server:', { error: error instanceof Error ? error.message : String(error) });
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map