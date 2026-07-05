import { Router } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../users/user.model.js';
import { registerSchema, loginSchema } from './auth.schema.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from './auth.utils.js';
import { validateRequest } from '../../shared/middleware/validate-request.js';
import { authenticate } from '../../shared/middleware/auth.js';
import { asyncHandler } from '../../shared/middleware/async-handler.js';
import { createSuccessResponse } from '../../shared/utils/response.js';
import { ConflictError, AuthenticationError, ValidationError } from '../../shared/errors/app-errors.js';
import { config } from '../../config/env.js';

const router = Router();

// POST /api/v1/auth/register
router.post(
  '/register',
  validateRequest(registerSchema),
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.email === email) {
        throw new ConflictError('Email already registered');
      }
      if (existingUser.username === username) {
        throw new ConflictError('Username already taken');
      }
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await User.create({
      _id: uuidv4(),
      username,
      email,
      passwordHash,
    });

    // Generate tokens
    const tokenPayload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Set refresh token cookie
    const isProduction = config.env === 'production';
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/api/v1/auth/refresh',
    });

    // Return user data without sensitive fields
    const userData = user.toPublicJson();

    return createSuccessResponse(
      res,
      { user: userData, accessToken },
      'Registration successful',
      201
    );
  })
);

// POST /api/v1/auth/login
router.post(
  '/login',
  validateRequest(loginSchema),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user with password hash
    const user = await User.findByEmailWithPassword(email);

    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Update last login time
    user.lastLoginAt = new Date();
    await user.save();

    // Generate tokens
    const tokenPayload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Set refresh token cookie
    const isProduction = config.env === 'production';
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/api/v1/auth/refresh',
    });

    // Return user data
    const userData = user.toPublicJson();

    return createSuccessResponse(res, { user: userData, accessToken }, 'Login successful');
  })
);

// POST /api/v1/auth/logout
router.post(
  '/logout',
  asyncHandler(async (req, res) => {
    // Clear refresh token cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: config.env === 'production',
      sameSite: config.env === 'production' ? 'none' : 'lax',
      path: '/api/v1/auth/refresh',
    });

    return createSuccessResponse(res, {}, 'Logout successful');
  })
);

// POST /api/v1/auth/refresh
router.post(
  '/refresh',
  asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AuthenticationError('No refresh token provided');
    }

    try {
      // Verify refresh token
      const payload = verifyRefreshToken(refreshToken);

      // Find user to ensure they still exist and get current role
      const user = await User.findById(payload.userId);

      if (!user) {
        throw new AuthenticationError('User not found');
      }

      // Generate new token pair (token rotation)
      const newTokenPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
      };

      const newAccessToken = generateAccessToken(newTokenPayload);
      const newRefreshToken = generateRefreshToken(newTokenPayload);

      // Set new refresh token cookie
      const isProduction = config.env === 'production';
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/api/v1/auth/refresh',
      });

      return createSuccessResponse(res, { accessToken: newAccessToken }, 'Token refreshed successfully');
    } catch (error) {
      // Clear invalid refresh token
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: config.env === 'production',
        sameSite: config.env === 'production' ? 'none' : 'lax',
        path: '/api/v1/auth/refresh',
      });
      throw error;
    }
  })
);

// GET /api/v1/auth/me
router.get(
  '/me',
  authenticate,
  asyncHandler(async (req, res) => {
    if (!req.user) {
      throw new AuthenticationError('Not authenticated');
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      throw new AuthenticationError('User not found');
    }

    const userData = user.toPublicJson();

    return createSuccessResponse(res, { user: userData }, 'Current user retrieved successfully');
  })
);

export default router;
