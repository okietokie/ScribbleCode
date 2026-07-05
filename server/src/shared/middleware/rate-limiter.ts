import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import { config } from '../../config/env.js';
import { logger } from '../utils/logger.js';
import { TooManyRequestsError } from '../errors/app-errors.js';

/**
 * General API rate limiter
 * Applies to all API routes by default
 */
export const apiLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMaxRequests,
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    // Use user ID if authenticated, otherwise use IP
    return (req.user?.id as string) || req.ip || 'unknown';
  },
  handler: (req: Request, res: Response, next: NextFunction, options: any) => {
    logger.warn('Rate limit exceeded', {
      ip: req.ip,
      path: req.path,
      method: req.method,
      userId: req.user?.id,
    });
    next(new TooManyRequestsError(options.message));
  },
});

/**
 * Strict rate limiter for authentication endpoints
 * More restrictive to prevent brute force attacks
 */
export const authLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: config.authRateLimitWindowMs,
  max: config.authRateLimitMaxRequests,
  message: 'Too many login attempts, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false, // Count failed attempts too
  keyGenerator: (req: Request) => {
    // Use email from request body if available, otherwise IP
    const email = req.body?.email;
    if (email) {
      return `auth:${email.toLowerCase()}`;
    }
    return `auth:${req.ip || 'unknown'}`;
  },
  handler: (req: Request, res: Response, next: NextFunction, options: any) => {
    logger.warn('Auth rate limit exceeded', {
      ip: req.ip,
      path: req.path,
      method: req.method,
      email: req.body?.email,
    });
    next(new TooManyRequestsError(options.message));
  },
});

/**
 * Refresh token endpoint rate limiter
 * Prevents token refresh abuse
 */
export const refreshLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: config.authRateLimitWindowMs,
  max: 10, // Allow more refreshes than login attempts
  message: 'Too many token refresh attempts',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    return `refresh:${req.ip || 'unknown'}`;
  },
  handler: (req: Request, res: Response, next: NextFunction, options: any) => {
    logger.warn('Refresh rate limit exceeded', {
      ip: req.ip,
      path: req.path,
      method: req.method,
    });
    next(new TooManyRequestsError(options.message));
  },
});

/**
 * Registration rate limiter
 * Prevents mass account creation
 */
export const registerLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: config.authRateLimitWindowMs,
  max: 3, // Very strict for registration
  message: 'Too many registration attempts from this IP',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    return `register:${req.ip || 'unknown'}`;
  },
  handler: (req: Request, res: Response, next: NextFunction, options: any) => {
    logger.warn('Registration rate limit exceeded', {
      ip: req.ip,
      path: req.path,
      method: req.method,
      email: req.body?.email,
    });
    next(new TooManyRequestsError(options.message));
  },
});

/**
 * Create a custom rate limiter with specific configuration
 */
export const createRateLimiter = (options: {
  windowMs?: number;
  max?: number;
  message?: string;
  keyGenerator?: (req: Request) => string;
}): RateLimitRequestHandler => {
  return rateLimit({
    windowMs: options.windowMs || config.rateLimitWindowMs,
    max: options.max || config.rateLimitMaxRequests,
    message: options.message || 'Too many requests',
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: options.keyGenerator || ((req: Request) => req.ip || 'unknown'),
    handler: (req: Request, res: Response, next: NextFunction, limiterOptions: any) => {
      logger.warn('Custom rate limit exceeded', {
        ip: req.ip,
        path: req.path,
        method: req.method,
      });
      next(new TooManyRequestsError(limiterOptions.message));
    },
  });
};
