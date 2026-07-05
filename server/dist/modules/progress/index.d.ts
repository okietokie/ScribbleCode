/**
 * Progress Module - Cloud Learning Progress Engine
 *
 * This module handles all learning progress persistence and synchronization.
 * It serves as the single source of truth for a learner's journey through ScribbleCode.
 */
export { Progress } from './progress.model.js';
export type { IProgress, ILessonProgress, IWorldProgress, IPlayerStats } from './progress.types.js';
export { default as progressRoutes } from './progress.routes.js';
export * as progressController from './progress.controller.js';
export * as progressValidation from './progress.validation.js';
//# sourceMappingURL=index.d.ts.map