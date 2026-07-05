import jwt, { SignOptions } from 'jsonwebtoken';
import { StringValue } from 'ms';
import { config } from '../../config/env.js';
import { JwtPayload } from '../../shared/middleware/auth.js';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export const generateAccessToken = (payload: JwtPayload): string => {
  const options: SignOptions = {
    expiresIn: config.jwtExpiresIn as StringValue,
  };
  return jwt.sign(payload, config.jwtSecret, options);
};

export const generateRefreshToken = (payload: JwtPayload): string => {
  const options: SignOptions = {
    expiresIn: config.jwtRefreshExpiresIn as StringValue,
  };
  return jwt.sign(payload, config.jwtRefreshSecret, options);
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwtSecret) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwtRefreshSecret) as JwtPayload;
};

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwt.decode(token) as JwtPayload | null;
  } catch {
    return null;
  }
};

export const getAccessTokenExpiry = (): number => {
  // Parse the expires_in config (e.g., "15m", "1h")
  const expiresIn = config.jwtExpiresIn;
  const match = expiresIn.match(/^(\d+)([smhd])$/);
  if (!match) return 900000; // Default 15 minutes in ms
  
  const value = parseInt(match[1], 10);
  const unit = match[2];
  
  switch (unit) {
    case 's': return value * 1000;
    case 'm': return value * 60 * 1000;
    case 'h': return value * 60 * 60 * 1000;
    case 'd': return value * 24 * 60 * 60 * 1000;
    default: return 900000;
  }
};

export const getRefreshTokenExpiry = (): number => {
  const expiresIn = config.jwtRefreshExpiresIn;
  const match = expiresIn.match(/^(\d+)([smhd])$/);
  if (!match) return 604800000; // Default 7 days in ms
  
  const value = parseInt(match[1], 10);
  const unit = match[2];
  
  switch (unit) {
    case 's': return value * 1000;
    case 'm': return value * 60 * 1000;
    case 'h': return value * 60 * 60 * 1000;
    case 'd': return value * 24 * 60 * 60 * 1000;
    default: return 604800000;
  }
};
