import { RateLimitRequestHandler } from 'express-rate-limit';
import { Request } from 'express';
/**
 * General API rate limiter
 * Applies to all API routes by default
 */
export declare const apiLimiter: RateLimitRequestHandler;
/**
 * Strict rate limiter for authentication endpoints
 * More restrictive to prevent brute force attacks
 */
export declare const authLimiter: RateLimitRequestHandler;
/**
 * Refresh token endpoint rate limiter
 * Prevents token refresh abuse
 */
export declare const refreshLimiter: RateLimitRequestHandler;
/**
 * Registration rate limiter
 * Prevents mass account creation
 */
export declare const registerLimiter: RateLimitRequestHandler;
/**
 * Create a custom rate limiter with specific configuration
 */
export declare const createRateLimiter: (options: {
    windowMs?: number;
    max?: number;
    message?: string;
    keyGenerator?: (req: Request) => string;
}) => RateLimitRequestHandler;
//# sourceMappingURL=rate-limiter.d.ts.map