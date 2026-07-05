import dotenv from 'dotenv';

dotenv.config();

/**
 * Environment configuration with strict validation
 * Fails fast on missing required variables in production
 */

const getRequiredEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  
  if (!value && process.env.NODE_ENV === 'production') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  
  return value || '';
};

const getOptionalEnv = (key: string, defaultValue: string): string => {
  return process.env[key] || defaultValue;
};

// Validate NODE_ENV
const nodeEnv = process.env.NODE_ENV || 'development';
if (!['development', 'test', 'production'].includes(nodeEnv)) {
  console.warn(`Warning: Unknown NODE_ENV value: ${nodeEnv}. Using 'development' defaults.`);
}

export const config = {
  env: nodeEnv as 'development' | 'test' | 'production',
  port: parseInt(getRequiredEnv('PORT', '3000'), 10),
  mongodbUri: getRequiredEnv('MONGODB_URI'),
  jwtSecret: getRequiredEnv('JWT_SECRET', 'default-secret-change-in-production'),
  jwtRefreshSecret: getRequiredEnv('JWT_REFRESH_SECRET', 'default-refresh-secret-change-in-production'),
  jwtExpiresIn: getOptionalEnv('JWT_EXPIRES_IN', '15m'),
  jwtRefreshExpiresIn: getOptionalEnv('JWT_REFRESH_EXPIRES_IN', '7d'),
  clientUrl: getRequiredEnv('CLIENT_URL', 'http://localhost:5173'),
  logLevel: getOptionalEnv('LOG_LEVEL', 'debug'),
  
  // Rate limiting configuration
  rateLimitWindowMs: parseInt(getOptionalEnv('RATE_LIMIT_WINDOW_MS', '900000'), 10), // 15 minutes
  rateLimitMaxRequests: parseInt(getOptionalEnv('RATE_LIMIT_MAX_REQUESTS', '100'), 10),
  
  // Auth-specific rate limits (more restrictive)
  authRateLimitWindowMs: parseInt(getOptionalEnv('AUTH_RATE_LIMIT_WINDOW_MS', '900000'), 10), // 15 minutes
  authRateLimitMaxRequests: parseInt(getOptionalEnv('AUTH_RATE_LIMIT_MAX_REQUESTS', '5'), 10),
  
  // Security settings
  cookieSecure: nodeEnv === 'production',
  cookieSameSite: nodeEnv === 'production' ? 'none' : 'lax',
} as const;

// Validate critical environment variables at startup
const validateConfig = (): void => {
  const errors: string[] = [];
  
  // MongoDB URI is always required
  if (!config.mongodbUri) {
    errors.push('MONGODB_URI is required');
  }
  
  // JWT secrets are required in production
  if (config.env === 'production') {
    if (config.jwtSecret === 'default-secret-change-in-production') {
      errors.push('JWT_SECRET must be changed in production');
    }
    if (config.jwtRefreshSecret === 'default-refresh-secret-change-in-production') {
      errors.push('JWT_REFRESH_SECRET must be changed in production');
    }
    if (!config.clientUrl.startsWith('https://')) {
      errors.push('CLIENT_URL should use HTTPS in production');
    }
  }
  
  if (errors.length > 0) {
    console.error('Configuration validation failed:');
    errors.forEach(err => console.error(`  - ${err}`));
    throw new Error(`Configuration validation failed: ${errors.join(', ')}`);
  }
};

validateConfig();

export default config;
