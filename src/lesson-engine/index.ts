/**
 * Lesson Engine - Core Module Exports
 */

// Types
export * from './core/types';

// State Machine
export {
  lessonEngineReducer,
  createInitialState,
  createInitialProgress,
  getCurrentSection,
  getChallengeState,
  canProceedToNextSection,
  isLessonComplete,
} from './core/state-machine';

// Renderer Registry
export {
  rendererRegistry,
  getRenderer,
  registerRenderers,
  getRendererComponent,
  validateAnswer,
} from './core/renderer-registry';

// Hooks
export { useLessonEngine } from './hooks/useLessonEngine';
export type { UseLessonEngineOptions, UseLessonEngineReturn } from './hooks/useLessonEngine';

// XP Calculator
export {
  calculateLessonXP,
  calculateChallengeXP,
  getMaxPossibleXP,
} from './utils/xp-calculator';
export type { XPCalculationConfig, XPBreakdown } from './utils/xp-calculator';
