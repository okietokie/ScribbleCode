/**
 * ScribbleCode Content Engine - Validators
 * 
 * This module provides validation utilities for all content types.
 * Validators ensure content files are well-formed before being loaded.
 * Invalid content fails fast with meaningful error messages.
 */

import {
  Course,
  World,
  Chapter,
  BaseLesson,
  Challenge,
  Quiz,
  BossBattle,
  Achievement,
  Badge,
  ValidationError,
  ValidationResult,
  Reward,
  Prerequisite,
  ContentSection,
  LearningObjective,
} from '../schemas';

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Create a validation error
 */
function createError(
  entityId: string,
  entityType: string,
  fieldPath: string,
  message: string,
  severity: 'error' | 'warning' | 'info' = 'error'
): ValidationError {
  return { entityId, entityType, fieldPath, message, severity };
}

/**
 * Check if a value is defined and not null
 */
function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

/**
 * Validate required string field
 */
function validateRequiredString(
  entityId: string,
  entityType: string,
  obj: object,
  fieldName: string,
  errors: ValidationError[]
): void {
  const value = (obj as Record<string, unknown>)[fieldName];
  if (!isDefined(value) || typeof value !== 'string' || value.trim() === '') {
    errors.push(createError(entityId, entityType, fieldName, `${fieldName} is required and must be a non-empty string`));
  }
}

/**
 * Validate required number field
 */
function validateRequiredNumber(
  entityId: string,
  entityType: string,
  obj: object,
  fieldName: string,
  errors: ValidationError[],
  options: { min?: number; max?: number } = {}
): void {
  const value = (obj as Record<string, unknown>)[fieldName];
  if (!isDefined(value) || typeof value !== 'number') {
    errors.push(createError(entityId, entityType, fieldName, `${fieldName} is required and must be a number`));
    return;
  }
  
  if (options.min !== undefined && value < options.min) {
    errors.push(createError(entityId, entityType, fieldName, `${fieldName} must be at least ${options.min}`));
  }
  
  if (options.max !== undefined && value > options.max) {
    errors.push(createError(entityId, entityType, fieldName, `${fieldName} must be at most ${options.max}`));
  }
}

/**
 * Validate required array field
 */
function validateRequiredArray(
  entityId: string,
  entityType: string,
  obj: object,
  fieldName: string,
  errors: ValidationError[],
  options: { minLength?: number; maxLength?: number } = {}
): void {
  const value = (obj as Record<string, unknown>)[fieldName];
  if (!Array.isArray(value)) {
    errors.push(createError(entityId, entityType, fieldName, `${fieldName} is required and must be an array`));
    return;
  }
  
  if (options.minLength !== undefined && value.length < options.minLength) {
    errors.push(createError(entityId, entityType, fieldName, `${fieldName} must have at least ${options.minLength} items`));
  }
  
  if (options.maxLength !== undefined && value.length > options.maxLength) {
    errors.push(createError(entityId, entityType, fieldName, `${fieldName} must have at most ${options.maxLength} items`));
  }
}

/**
 * Validate enum value
 */
function validateEnum<T extends string>(
  entityId: string,
  entityType: string,
  obj: object,
  fieldName: string,
  allowedValues: T[],
  errors: ValidationError[],
  required: boolean = true
): void {
  const value = (obj as Record<string, unknown>)[fieldName];
  
  if (!isDefined(value)) {
    if (required) {
      errors.push(createError(entityId, entityType, fieldName, `${fieldName} is required`));
    }
    return;
  }
  
  if (!allowedValues.includes(value as T)) {
    errors.push(createError(
      entityId,
      entityType,
      fieldName,
      `${fieldName} must be one of: ${allowedValues.join(', ')}`
    ));
  }
}

// ============================================================================
// REWARD VALIDATION
// ============================================================================

/**
 * Validate reward structure
 */
function validateReward(
  entityId: string,
  entityType: string,
  reward: Reward | undefined,
  fieldPath: string,
  errors: ValidationError[]
): void {
  if (!reward) {
    errors.push(createError(entityId, entityType, fieldPath, 'Reward is required'));
    return;
  }
  
  if (!reward.xp) {
    errors.push(createError(entityId, entityType, `${fieldPath}.xp`, 'XP reward is required'));
  } else {
    if (reward.xp.base <= 0) {
      errors.push(createError(entityId, entityType, `${fieldPath}.xp.base`, 'XP base must be positive'));
    }
    
    if (reward.xp.minimum !== undefined && reward.xp.minimum < 0) {
      errors.push(createError(entityId, entityType, `${fieldPath}.xp.minimum`, 'XP minimum cannot be negative'));
    }
    
    if (reward.xp.maximum !== undefined && reward.xp.maximum < reward.xp.base) {
      errors.push(createError(entityId, entityType, `${fieldPath}.xp.maximum`, 'XP maximum must be >= base'));
    }
  }
}

// ============================================================================
// PREREQUISITE VALIDATION
// ============================================================================

/**
 * Validate prerequisite structure
 */
function validatePrerequisite(
  entityId: string,
  entityType: string,
  prereq: Prerequisite,
  index: number,
  errors: ValidationError[]
): void {
  const fieldPath = `prerequisites[${index}]`;
  
  if (!prereq.type) {
    errors.push(createError(entityId, entityType, `${fieldPath}.type`, 'Prerequisite type is required'));
  }
  
  if (!prereq.targetId) {
    errors.push(createError(entityId, entityType, `${fieldPath}.targetId`, 'Prerequisite targetId is required'));
  }
  
  if (prereq.minCompletion !== undefined && (prereq.minCompletion < 0 || prereq.minCompletion > 100)) {
    errors.push(createError(entityId, entityType, `${fieldPath}.minCompletion`, 'minCompletion must be between 0 and 100'));
  }
}

// ============================================================================
// CONTENT SECTION VALIDATION
// ============================================================================

/**
 * Validate content section
 */
function validateContentSection(
  entityId: string,
  entityType: string,
  section: ContentSection,
  index: number,
  errors: ValidationError[]
): void {
  const fieldPath = `sections[${index}]`;
  
  if (!section.type) {
    errors.push(createError(entityId, entityType, `${fieldPath}.type`, 'Section type is required'));
  }
  
  if (!section.id) {
    errors.push(createError(entityId, entityType, `${fieldPath}.id`, 'Section ID is required'));
  }
  
  if (!section.content || typeof section.content !== 'string') {
    errors.push(createError(entityId, entityType, `${fieldPath}.content`, 'Section content is required'));
  }
}

// ============================================================================
// LEARNING OBJECTIVE VALIDATION
// ============================================================================

/**
 * Validate learning objective
 */
function validateLearningObjective(
  entityId: string,
  entityType: string,
  objective: LearningObjective,
  index: number,
  errors: ValidationError[]
): void {
  const fieldPath = `learningObjectives[${index}]`;
  
  if (!objective.id) {
    errors.push(createError(entityId, entityType, `${fieldPath}.id`, 'Objective ID is required'));
  }
  
  if (!objective.statement || objective.statement.trim() === '') {
    errors.push(createError(entityId, entityType, `${fieldPath}.statement`, 'Objective statement is required'));
  }
}

// ============================================================================
// CHALLENGE VALIDATION
// ============================================================================

const VALID_CHALLENGE_TYPES = [
  'multiple-choice',
  'fill-blank',
  'ordering',
  'matching',
  'code-completion',
  'code-repair',
  'true-false',
  'interactive-simulation',
  'code-playground',
  'drag-drop',
  'arrange-steps',
  'debug-code',
] as const;

const VALID_DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'advanced', 'expert'] as const;

/**
 * Validate challenge
 */
export function validateChallenge(challenge: Challenge): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  
  // Validate base fields
  validateRequiredString(challenge.id, 'Challenge', challenge, 'id', errors);
  validateRequiredString(challenge.id, 'Challenge', challenge, 'title', errors);
  validateRequiredString(challenge.id, 'Challenge', challenge, 'description', errors);
  validateRequiredString(challenge.id, 'Challenge', challenge, 'question', errors);
  validateRequiredString(challenge.id, 'Challenge', challenge, 'instructions', errors);
  
  validateEnum(challenge.id, 'Challenge', challenge, 'challengeType', VALID_CHALLENGE_TYPES, errors);
  validateEnum(challenge.id, 'Challenge', challenge, 'difficulty', VALID_DIFFICULTY_LEVELS, errors);
  
  validateRequiredNumber(challenge.id, 'Challenge', challenge, 'xpReward', errors, { min: 0 });
  validateRequiredNumber(challenge.id, 'Challenge', challenge, 'estimatedTimeMinutes', errors, { min: 0 });
  
  // Validate hints if present
  if (challenge.hints) {
    if (!challenge.hints.enabled) {
      warnings.push(createError(challenge.id, 'Challenge', 'hints.enabled', 'Hints are disabled but hint bundle exists'));
    }
    
    for (let i = 0; i < challenge.hints.hints.length; i++) {
      const hint = challenge.hints.hints[i];
      if (!hint.id || !hint.text || hint.order === undefined) {
        errors.push(createError(challenge.id, 'Challenge', `hints.hints[${i}]`, `Hint ${i} is missing required fields`));
      }
    }
  }
  
  // Type-specific validation
  switch (challenge.challengeType) {
    case 'multiple-choice':
      if (!challenge.options || challenge.options.length === 0) {
        errors.push(createError(challenge.id, 'Challenge', 'options', 'Multiple choice must have at least one option'));
      }
      
      const correctOptions = challenge.options?.filter(o => o.isCorrect) || [];
      if (correctOptions.length === 0) {
        errors.push(createError(challenge.id, 'Challenge', 'options', 'Multiple choice must have at least one correct answer'));
      }
      break;
      
    case 'fill-blank':
      if (!challenge.content) {
        errors.push(createError(challenge.id, 'Challenge', 'content', 'Fill blank must have content'));
      }
      if (!challenge.answers || challenge.answers.length === 0) {
        errors.push(createError(challenge.id, 'Challenge', 'answers', 'Fill blank must have answers defined'));
      }
      break;
      
    case 'code-completion':
    case 'code-repair':
    case 'code-playground':
    case 'debug-code':
      if (!challenge.language) {
        errors.push(createError(challenge.id, 'Challenge', 'language', 'Code challenges must specify a language'));
      }
      break;
      
    case 'ordering':
      if (!challenge.items || challenge.items.length === 0) {
        errors.push(createError(challenge.id, 'Challenge', 'items', 'Ordering challenge must have items'));
      }
      if (!challenge.orderingContext) {
        errors.push(createError(challenge.id, 'Challenge', 'orderingContext', 'Ordering challenge must have context'));
      }
      break;
      
    case 'matching':
      if (!challenge.leftItems || !challenge.rightItems || !challenge.correctPairs) {
        errors.push(createError(challenge.id, 'Challenge', 'matching', 'Matching challenge must have leftItems, rightItems, and correctPairs'));
      }
      break;
      
    case 'true-false':
      if (!challenge.statement) {
        errors.push(createError(challenge.id, 'Challenge', 'statement', 'True/False must have a statement'));
      }
      if (challenge.correctAnswer === undefined) {
        errors.push(createError(challenge.id, 'Challenge', 'correctAnswer', 'True/False must have correctAnswer'));
      }
      if (!challenge.explanation) {
        warnings.push(createError(challenge.id, 'Challenge', 'explanation', 'True/False should have an explanation'));
      }
      break;
  }
  
  return { isValid: errors.length === 0, errors, warnings };
}

// ============================================================================
// LESSON VALIDATION
// ============================================================================

const VALID_LESSON_TYPES = [
  'reading',
  'interactive-explanation',
  'multiple-choice',
  'fill-blank',
  'drag-drop',
  'arrange-code',
  'code-repair',
  'predict-output',
  'live-playground',
  'reflection',
  'mini-project',
  'boss-battle',
  'quiz',
  'code-challenge',
  'video',
  'animated-tutorial',
] as const;

/**
 * Validate lesson
 */
export function validateLesson(lesson: BaseLesson): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  
  // Validate base fields
  validateRequiredString(lesson.id, 'Lesson', lesson, 'id', errors);
  validateRequiredString(lesson.id, 'Lesson', lesson, 'title', errors);
  validateRequiredString(lesson.id, 'Lesson', lesson, 'description', errors);
  
  validateEnum(lesson.id, 'Lesson', lesson, 'lessonType', VALID_LESSON_TYPES, errors);
  validateEnum(lesson.id, 'Lesson', lesson, 'difficulty', VALID_DIFFICULTY_LEVELS, errors);
  
  validateRequiredNumber(lesson.id, 'Lesson', lesson, 'estimatedTimeMinutes', errors, { min: 1 });
  
  // Validate learning objectives
  validateRequiredArray(lesson.id, 'Lesson', lesson, 'learningObjectives', errors, { minLength: 1 });
  if (Array.isArray(lesson.learningObjectives)) {
    lesson.learningObjectives.forEach((obj, i) => validateLearningObjective(lesson.id, 'Lesson', obj, i, errors));
  }
  
  // Validate rewards
  validateReward(lesson.id, 'Lesson', lesson.rewards, 'rewards', errors);
  
  // Validate sections
  validateRequiredArray(lesson.id, 'Lesson', lesson, 'sections', errors, { minLength: 1 });
  if (Array.isArray(lesson.sections)) {
    lesson.sections.forEach((section, i) => validateContentSection(lesson.id, 'Lesson', section, i, errors));
  }
  
  // Validate challenges
  if (Array.isArray(lesson.challenges)) {
    lesson.challenges.forEach((challenge, i) => {
      const challengeResult = validateChallenge(challenge);
      errors.push(...challengeResult.errors.map(e => ({
        ...e,
        fieldPath: `challenges[${i}].${e.fieldPath}`,
      })));
      warnings.push(...challengeResult.warnings.map(w => ({
        ...w,
        fieldPath: `challenges[${i}].${w.fieldPath}`,
      })));
    });
  }
  
  // Validate prerequisites
  if (Array.isArray(lesson.prerequisites)) {
    lesson.prerequisites.forEach((prereq, i) => validatePrerequisite(lesson.id, 'Lesson', prereq, i, errors));
  }
  
  // Validate completion conditions
  if (lesson.completionConditions) {
    const conditions = lesson.completionConditions;
    if (conditions.minAccuracy !== undefined && (conditions.minAccuracy < 0 || conditions.minAccuracy > 100)) {
      errors.push(createError(lesson.id, 'Lesson', 'completionConditions.minAccuracy', 'minAccuracy must be between 0 and 100'));
    }
    if (conditions.minTimeSpent !== undefined && conditions.minTimeSpent < 0) {
      errors.push(createError(lesson.id, 'Lesson', 'completionConditions.minTimeSpent', 'minTimeSpent cannot be negative'));
    }
  }
  
  // Warnings
  if (!lesson.nextLessonId && !lesson.relatedLessons?.length) {
    warnings.push(createError(lesson.id, 'Lesson', 'nextLessonId', 'Lesson has no nextLessonId or relatedLessons - may be a dead end'));
  }
  
  if (lesson.challenges.length === 0) {
    warnings.push(createError(lesson.id, 'Lesson', 'challenges', 'Lesson has no challenges - consider adding interactive elements'));
  }
  
  return { isValid: errors.length === 0, errors, warnings };
}

// ============================================================================
// CHAPTER VALIDATION
// ============================================================================

/**
 * Validate chapter
 */
export function validateChapter(chapter: Chapter): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  
  validateRequiredString(chapter.id, 'Chapter', chapter, 'id', errors);
  validateRequiredString(chapter.id, 'Chapter', chapter, 'title', errors);
  validateRequiredString(chapter.id, 'Chapter', chapter, 'description', errors);
  
  validateRequiredNumber(chapter.id, 'Chapter', chapter, 'order', errors, { min: 1 });
  
  validateRequiredArray(chapter.id, 'Chapter', chapter, 'lessonIds', errors, { minLength: 1 });
  
  if (chapter.summary) {
    if (!chapter.summary.overview) {
      warnings.push(createError(chapter.id, 'Chapter', 'summary.overview', 'Chapter should have an overview'));
    }
    
    if (!chapter.summary.whatYouWillLearn || chapter.summary.whatYouWillLearn.length === 0) {
      warnings.push(createError(chapter.id, 'Chapter', 'summary.whatYouWillLearn', 'Chapter should list what learners will learn'));
    }
  }
  
  if (chapter.prerequisites) {
    chapter.prerequisites.forEach((prereq, i) => validatePrerequisite(chapter.id, 'Chapter', prereq, i, errors));
  }
  
  return { isValid: errors.length === 0, errors, warnings };
}

// ============================================================================
// WORLD VALIDATION
// ============================================================================

const VALID_TECHNOLOGIES = [
  'javascript',
  'typescript',
  'react',
  'node',
  'python',
  'java',
  'go',
  'rust',
  'sql',
  'mongodb',
  'docker',
  'git',
  'html',
  'css',
] as const;

/**
 * Validate world
 */
export function validateWorld(world: World): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  
  validateRequiredString(world.id, 'World', world, 'id', errors);
  validateRequiredString(world.id, 'World', world, 'title', errors);
  validateRequiredString(world.id, 'World', world, 'description', errors);
  
  validateRequiredNumber(world.id, 'World', world, 'order', errors, { min: 1 });
  
  validateEnum(world.id, 'World', world, 'technology', VALID_TECHNOLOGIES, errors);
  
  validateRequiredArray(world.id, 'World', world, 'chapterIds', errors, { minLength: 1 });
  
  validateRequiredNumber(world.id, 'World', world, 'totalXPAvailable', errors, { min: 0 });
  
  if (world.introduction) {
    if (!world.introduction.welcomeMessage) {
      warnings.push(createError(world.id, 'World', 'introduction.welcomeMessage', 'World should have a welcome message'));
    }
  }
  
  if (world.prerequisites) {
    world.prerequisites.forEach((prereq, i) => validatePrerequisite(world.id, 'World', prereq, i, errors));
  }
  
  return { isValid: errors.length === 0, errors, warnings };
}

// ============================================================================
// COURSE VALIDATION
// ============================================================================

const VALID_COURSE_STATUSES = ['draft', 'beta', 'published', 'archived'] as const;

/**
 * Validate course
 */
export function validateCourse(course: Course): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  
  validateRequiredString(course.id, 'Course', course, 'id', errors);
  validateRequiredString(course.id, 'Course', course, 'title', errors);
  validateRequiredString(course.id, 'Course', course, 'description', errors);
  validateRequiredString(course.id, 'Course', course, 'slug', errors);
  
  validateEnum(course.id, 'Course', course, 'technology', VALID_TECHNOLOGIES, errors);
  validateEnum(course.id, 'Course', course, 'skillLevel', VALID_DIFFICULTY_LEVELS, errors);
  validateEnum(course.id, 'Course', course, 'status', VALID_COURSE_STATUSES, errors);
  
  validateRequiredArray(course.id, 'Course', course, 'worldIds', errors, { minLength: 1 });
  
  validateRequiredNumber(course.id, 'Course', course, 'estimatedDurationHours', errors, { min: 0 });
  validateRequiredNumber(course.id, 'Course', course, 'totalXP', errors, { min: 0 });
  
  if (!course.coverImage) {
    warnings.push(createError(course.id, 'Course', 'coverImage', 'Course should have a cover image'));
  }
  
  if (!course.instructors || course.instructors.length === 0) {
    warnings.push(createError(course.id, 'Course', 'instructors', 'Course should have at least one instructor'));
  }
  
  if (course.pricing && !course.pricing.isFree && !course.pricing.priceCents) {
    errors.push(createError(course.id, 'Course', 'pricing', 'Non-free course must have a price'));
  }
  
  return { isValid: errors.length === 0, errors, warnings };
}

// ============================================================================
// QUIZ VALIDATION
// ============================================================================

/**
 * Validate quiz
 */
export function validateQuiz(quiz: Quiz): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  
  validateRequiredString(quiz.id, 'Quiz', quiz, 'id', errors);
  validateRequiredString(quiz.id, 'Quiz', quiz, 'title', errors);
  validateRequiredString(quiz.id, 'Quiz', quiz, 'description', errors);
  
  validateRequiredArray(quiz.id, 'Quiz', quiz, 'questions', errors, { minLength: 1 });
  
  validateRequiredNumber(quiz.id, 'Quiz', quiz, 'passingScore', errors, { min: 0, max: 100 });
  
  if (quiz.questions) {
    quiz.questions.forEach((question, i) => {
      const fieldPath = `questions[${i}]`;
      
      if (!question.question) {
        errors.push(createError(quiz.id, 'Quiz', `${fieldPath}.question`, 'Question text is required'));
      }
      
      if (!question.points || question.points <= 0) {
        errors.push(createError(quiz.id, 'Quiz', `${fieldPath}.points`, 'Points must be positive'));
      }
      
      if (!question.challenge) {
        errors.push(createError(quiz.id, 'Quiz', `${fieldPath}.challenge`, 'Question must have a challenge'));
      }
    });
  }
  
  if (quiz.timeLimitMinutes !== undefined && quiz.timeLimitMinutes <= 0) {
    errors.push(createError(quiz.id, 'Quiz', 'timeLimitMinutes', 'Time limit must be positive if set'));
  }
  
  if (quiz.maxAttempts !== undefined && quiz.maxAttempts <= 0) {
    errors.push(createError(quiz.id, 'Quiz', 'maxAttempts', 'Max attempts must be positive if set'));
  }
  
  return { isValid: errors.length === 0, errors, warnings };
}

// ============================================================================
// BOSS BATTLE VALIDATION
// ============================================================================

/**
 * Validate boss battle
 */
export function validateBossBattle(bossBattle: BossBattle): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  
  validateRequiredString(bossBattle.id, 'BossBattle', bossBattle, 'id', errors);
  validateRequiredString(bossBattle.id, 'BossBattle', bossBattle, 'title', errors);
  validateRequiredString(bossBattle.id, 'BossBattle', bossBattle, 'description', errors);
  validateRequiredString(bossBattle.id, 'BossBattle', bossBattle, 'bossName', errors);
  validateRequiredString(bossBattle.id, 'BossBattle', bossBattle, 'bossLore', errors);
  validateRequiredString(bossBattle.id, 'BossBattle', bossBattle, 'introduction', errors);
  validateRequiredString(bossBattle.id, 'BossBattle', bossBattle, 'victoryMessage', errors);
  
  validateEnum(bossBattle.id, 'BossBattle', bossBattle, 'difficulty', VALID_DIFFICULTY_LEVELS, errors);
  
  validateRequiredNumber(bossBattle.id, 'BossBattle', bossBattle, 'totalXPReward', errors, { min: 0 });
  
  validateRequiredArray(bossBattle.id, 'BossBattle', bossBattle, 'phases', errors, { minLength: 1 });
  
  if (bossBattle.phases) {
    bossBattle.phases.forEach((phase, i) => {
      const fieldPath = `phases[${i}]`;
      
      if (!phase.id) {
        errors.push(createError(bossBattle.id, 'BossBattle', `${fieldPath}.id`, 'Phase ID is required'));
      }
      
      if (!phase.name) {
        errors.push(createError(bossBattle.id, 'BossBattle', `${fieldPath}.name`, 'Phase name is required'));
      }
      
      if (!phase.challenges || phase.challenges.length === 0) {
        errors.push(createError(bossBattle.id, 'BossBattle', `${fieldPath}.challenges`, 'Phase must have challenges'));
      }
      
      validateRequiredNumber(bossBattle.id, 'BossBattle', phase, 'minScoreToAdvance', errors, { min: 0 });
    });
  }
  
  if (!bossBattle.finalReward) {
    warnings.push(createError(bossBattle.id, 'BossBattle', 'finalReward', 'Boss battle should have a final reward'));
  }
  
  return { isValid: errors.length === 0, errors, warnings };
}

// ============================================================================
// ACHIEVEMENT VALIDATION
// ============================================================================

const VALID_ACHIEVEMENT_CATEGORIES = [
  'progress',
  'mastery',
  'streak',
  'challenge',
  'social',
  'exploration',
  'speed',
  'perfectionist',
  'seasonal',
] as const;

const VALID_ACHIEVEMENT_RARITIES = ['common', 'uncommon', 'rare', 'epic', 'legendary'] as const;

/**
 * Validate achievement
 */
export function validateAchievement(achievement: Achievement): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  
  validateRequiredString(achievement.id, 'Achievement', achievement, 'id', errors);
  validateRequiredString(achievement.id, 'Achievement', achievement, 'name', errors);
  validateRequiredString(achievement.id, 'Achievement', achievement, 'description', errors);
  validateRequiredString(achievement.id, 'Achievement', achievement, 'icon', errors);
  
  validateEnum(achievement.id, 'Achievement', achievement, 'category', VALID_ACHIEVEMENT_CATEGORIES, errors);
  validateEnum(achievement.id, 'Achievement', achievement, 'rarity', VALID_ACHIEVEMENT_RARITIES, errors);
  
  validateRequiredNumber(achievement.id, 'Achievement', achievement, 'xpReward', errors, { min: 0 });
  
  if (!achievement.trigger || !achievement.trigger.type) {
    errors.push(createError(achievement.id, 'Achievement', 'trigger.type', 'Trigger type is required'));
  }
  
  return { isValid: errors.length === 0, errors, warnings };
}

// ============================================================================
// BADGE VALIDATION
// ============================================================================

/**
 * Validate badge
 */
export function validateBadge(badge: Badge): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  
  validateRequiredString(badge.id, 'Badge', badge, 'id', errors);
  validateRequiredString(badge.id, 'Badge', badge, 'name', errors);
  validateRequiredString(badge.id, 'Badge', badge, 'description', errors);
  validateRequiredString(badge.id, 'Badge', badge, 'icon', errors);
  
  if (!badge.requirement || !badge.requirement.type) {
    errors.push(createError(badge.id, 'Badge', 'requirement.type', 'Requirement type is required'));
  }
  
  return { isValid: errors.length === 0, errors, warnings };
}

