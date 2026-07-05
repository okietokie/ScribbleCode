import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { config } from './config/env.js';
import { errorHandler, notFoundHandler } from './shared/middleware/error-handler.js';
import { requestIdHandler } from './shared/middleware/request-id.js';
import healthRoutes from './modules/health/health.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/user.routes.js';
import progressRoutes from './modules/progress/progress.routes.js';

const app = express();

// Trust proxy for production (behind load balancer)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  })
);

// Compression
app.use(compression());

// Request ID
app.use(requestIdHandler);

// Body parsing with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser
app.use(cookieParser());

// HTTP request logging
app.use(morgan('combined'));

// API Versioning - v1 routes
const apiV1 = express.Router();

// Health endpoints
apiV1.use('/health', healthRoutes);
apiV1.use('/status', healthRoutes);

// Auth endpoints
apiV1.use('/auth', authRoutes);

// User/Profile endpoints
apiV1.use('/users', userRoutes);

// Progress endpoints
apiV1.use('/progress', progressRoutes);

// Mount v1 API
app.use('/api/v1', apiV1);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;
