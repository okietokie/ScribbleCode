/**
 * Content Engine - Core Module Exports
 */

// Schemas
export * from './schemas';

// Loaders
export {
  loadCourse,
  loadWorld,
  loadChapter,
  loadLesson,
  loadQuiz,
  loadBossBattle,
  loadAchievements,
  loadBadges,
  loadFullCourse,
  buildContentIndex,
  ContentLoadError,
  ContentNotFoundError,
  ContentValidationError,
} from './loaders';
export type { LoaderConfig, CourseContent, ContentIndex } from './loaders';

// Validators
export {
  validateLesson,
  validateChapter,
  validateWorld,
  validateCourse,
  validateQuiz,
  validateBossBattle,
  validateContent,
  hasIdRule,
  hasSectionsRule,
  hasLearningObjectivesRule,
  uniqueSectionIdsRule,
  challengeHasChallengeRule,
  reasonableXPRule,
  orderedHintsRule,
  validPrerequisitesRule,
  multipleChoiceHasOptionsRule,
  defaultRules,
} from './validators';
export type { ValidationOptions, ValidationResult, ValidationRule } from './validators';
