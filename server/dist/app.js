"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const env_js_1 = require("./config/env.js");
const error_handler_js_1 = require("./shared/middleware/error-handler.js");
const request_id_js_1 = require("./shared/middleware/request-id.js");
const health_routes_js_1 = __importDefault(require("./modules/health/health.routes.js"));
const auth_routes_js_1 = __importDefault(require("./modules/auth/auth.routes.js"));
const user_routes_js_1 = __importDefault(require("./modules/users/user.routes.js"));
const progress_routes_js_1 = __importDefault(require("./modules/progress/progress.routes.js"));
const app = (0, express_1.default)();
// Trust proxy for production (behind load balancer)
app.set('trust proxy', 1);
// Security middleware
app.use((0, helmet_1.default)());
// CORS configuration
app.use((0, cors_1.default)({
    origin: env_js_1.config.clientUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
}));
// Compression
app.use((0, compression_1.default)());
// Request ID
app.use(request_id_js_1.requestIdHandler);
// Body parsing with size limits
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Cookie parser
app.use((0, cookie_parser_1.default)());
// HTTP request logging
app.use((0, morgan_1.default)('combined'));
// API Versioning - v1 routes
const apiV1 = express_1.default.Router();
// Health endpoints
apiV1.use('/health', health_routes_js_1.default);
apiV1.use('/status', health_routes_js_1.default);
// Auth endpoints
apiV1.use('/auth', auth_routes_js_1.default);
// User/Profile endpoints
apiV1.use('/users', user_routes_js_1.default);
// Progress endpoints
apiV1.use('/progress', progress_routes_js_1.default);
// Mount v1 API
app.use('/api/v1', apiV1);
// 404 handler
app.use(error_handler_js_1.notFoundHandler);
// Global error handler
app.use(error_handler_js_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map