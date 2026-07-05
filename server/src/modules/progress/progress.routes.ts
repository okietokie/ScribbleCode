import { Router } from 'express';
import { asyncHandler } from '../../shared/middleware/async-handler.js';
import { validateRequest } from '../../shared/middleware/validate-request.js';
import { authMiddleware } from '../../shared/middleware/auth.js';
import * as progressController from './progress.controller.js';
import { 
  updateProgressSchema, 
  lessonProgressSchema, 
  worldProgressSchema, 
  syncProgressSchema 
} from './progress.validation.js';

const router = Router();

// All progress routes require authentication
router.use(authMiddleware);

/**
 * GET /api/v1/progress
 * Get current user's learning progress
 */
router.get('/', asyncHandler(progressController.getProgress));

/**
 * PATCH /api/v1/progress
 * Update current user's general progress
 */
router.patch('/', 
  validateRequest(updateProgressSchema),
  asyncHandler(progressController.updateProgress)
);

/**
 * PATCH /api/v1/progress/lesson
 * Update lesson-specific progress
 */
router.patch('/lesson',
  validateRequest(lessonProgressSchema),
  asyncHandler(progressController.updateLessonProgress)
);

/**
 * PATCH /api/v1/progress/world
 * Update world-specific progress
 */
router.patch('/world',
  validateRequest(worldProgressSchema),
  asyncHandler(progressController.updateWorldProgress)
);

/**
 * POST /api/v1/progress/sync
 * Synchronize full progress state from client
 */
router.post('/sync',
  validateRequest(syncProgressSchema),
  asyncHandler(progressController.syncProgress)
);

export default router;
