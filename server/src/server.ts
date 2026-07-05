import app from './app.js';
import { config } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './database/connection.js';
import { logger } from './shared/utils/logger.js';

const PORT = config.port;

let server: any = null;

const gracefulShutdown = async (signal: string): Promise<void> => {
  logger.info(`Graceful shutdown initiated with signal: ${signal}`);
  
  if (server) {
    server.close(async () => {
      logger.info('HTTP server closed');
      await disconnectDatabase();
      process.exit(0);
    });
    
    // Force close after timeout
    setTimeout(() => {
      logger.error('Forced shutdown due to timeout');
      process.exit(1);
    }, 30000);
  } else {
    await disconnectDatabase();
    process.exit(0);
  }
};

const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDatabase();
    
    // Start HTTP server
    server = app.listen(PORT, () => {
      logger.info(`ScribbleCode API server running on port ${PORT}`);
      logger.info(`Environment: ${config.env}`);
      logger.info(`Health check: http://localhost:${PORT}/api/v1/health`);
    });
    
    // Handle graceful shutdown
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    
    // Handle uncaught errors
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', { error: error.message });
      gracefulShutdown('uncaughtException');
    });
    
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection at:', { promise: String(promise), reason: String(reason) });
      gracefulShutdown('unhandledRejection');
    });
    
  } catch (error) {
    logger.error('Failed to start server:', { error: error instanceof Error ? error.message : String(error) });
    process.exit(1);
  }
};

startServer();
