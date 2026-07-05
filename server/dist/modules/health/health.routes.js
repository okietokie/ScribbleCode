"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const env_js_1 = require("../../config/env.js");
const connection_js_1 = require("../../database/connection.js");
const response_js_1 = require("../../shared/utils/response.js");
const router = (0, express_1.Router)();
// GET /api/v1/health
router.get('/', (req, res) => {
    const dbStatus = (0, connection_js_1.getDatabaseStatus)();
    const healthData = {
        status: 'healthy',
        environment: env_js_1.config.env,
        version: 'v1',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: {
            connected: dbStatus.connected,
            readyState: dbStatus.readyState,
        },
    };
    return (0, response_js_1.createSuccessResponse)(res, healthData, 'Service is healthy');
});
// GET /api/v1/status
router.get('/status', (req, res) => {
    const dbStatus = (0, connection_js_1.getDatabaseStatus)();
    const statusData = {
        application: {
            name: 'ScribbleCode API',
            version: '0.1.0',
            environment: env_js_1.config.env,
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
    return (0, response_js_1.createSuccessResponse)(res, statusData, 'Status retrieved successfully');
});
function formatUptime(seconds) {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
}
exports.default = router;
//# sourceMappingURL=health.routes.js.map