import { Router, Request, Response } from 'express';
import { config } from '../../config/env.js';
import { getDatabaseStatus } from '../../database/connection.js';
import { createSuccessResponse } from '../../shared/utils/response.js';

const router = Router();

// GET /api/v1/health
router.get(
  '/',
  (req: Request, res: Response) => {
    const dbStatus = getDatabaseStatus();
    
    const healthData = {
      status: 'healthy',
      environment: config.env,
      version: 'v1',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        connected: dbStatus.connected,
        readyState: dbStatus.readyState,
      },
    };

    return createSuccessResponse(res, healthData, 'Service is healthy');
  }
);

// GET /api/v1/status
router.get(
  '/status',
  (req: Request, res: Response) => {
    const dbStatus = getDatabaseStatus();
    
    const statusData = {
      application: {
        name: 'ScribbleCode API',
        version: '0.1.0',
        environment: config.env,
        uptime: process.uptime(),
        uptimeFormatted: formatUptime(process.uptime()),
      },
      server: {
        timestamp: new Date().toISOString(),
        memoryUsage: process.memoryUsage(),
      },
      database: {
        connected: dbStatus.connected,
        readyState: dbStatus.readyState,
        host: dbStatus.host,
        name: dbStatus.name,
      },
    };

    return createSuccessResponse(res, statusData, 'Status retrieved successfully');
  }
);

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / (24 * 3600));
  const hours = Math.floor((seconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

export default router;
