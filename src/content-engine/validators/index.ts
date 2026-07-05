/**
 * Content Validators
 * Validate lesson content files during development.
 * Fail fast with meaningful error messages.
 */

import {
  Lesson,
  Chapter,
  World,
  Course,
  Challenge,
  Quiz,
  BossBattle,
} from '../schemas';
import { ValidationResult, ValidationRule } from './types';

// -----------------------------------------------------------------------------
// Validation Rules
// -----------------------------------------------------------------------------

/**
 * Rule: Lesson must have an ID
 */
export const hasIdRule: ValidationRule = {
  id: 'has-id',
  validate: (lesson: Lesson): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!lesson.id || lesson.id.trim() === '') {
      errors.push('Lesson must have a non-empty id');
    }

    // Check for valid ID format (kebab-case recommended)
    if (lesson.id && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(lesson.id)) {
      warnings.push('Lesson ID should use kebab-case (e.g., "js-intro-variables")');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  },
};

/**
 * Rule: Lesson must have sections
 */
export const hasSectionsRule: ValidationRule = {
  id: 'has-sections',
  validate: (lesson: Lesson): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!lesson.sections || lesson.sections.length === 0) {
      errors.push('Lesson must have at least one section');
    }

    if (lesson.sections && lesson.sections.length > 20) {
      warnings.push('Lesson has many sections (>20). Consider splitting into multiple lessons.');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  },
};

/**
 * Rule: Lesson must have learning objectives
 */
export const hasLearningObjectivesRule: ValidationRule = {
  id: 'has-learning-objectives',
  validate: (lesson: Lesson): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!lesson.learningObjectives || lesson.learningObjectives.length === 0) {
      errors.push('Lesson must have at least one learning objective');
    }

    // Check Bloom's taxonomy level
    lesson.learningObjectives?.forEach((obj, index) => {
      if (!obj.bloomLevel) {
        warnings.push(`Learning objective ${index + 1} missing Bloom's taxonomy level`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  },
};

/**
 * Rule: Sections must have unique IDs
 */
export const uniqueSectionIdsRule: ValidationRule = {
  id: 'unique-section-ids',
  validate: (lesson: Lesson): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    const sectionIds = new Set<string>();
    lesson.sections.forEach((section, index) => {
      if (!section.id) {
        errors.push(`Section ${index + 1} is missing an id`);
      } else if (sectionIds.has(section.id)) {
        errors.push(`Duplicate section id: ${section.id}`);
      } else {
        sectionIds.add(section.id);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  },
};

/**
 * Rule: Challenge sections must have challenges
 */
export const challengeHasChallengeRule: ValidationRule = {
  id: 'challenge-has-challenge',
  validate: (lesson: Lesson): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    lesson.sections.forEach((section, index) => {
      if ('challenge' in section && !section.challenge) {
        errors.push(`Section ${index + 1} (${section.type}) is missing a challenge`);
      }

      // Check challenge type matches section type
      if ('challenge' in section && section.challenge) {
        const challengeType = section.challenge.type;
        const sectionType = section.type;

        // Some section types are wrappers around challenges
        const challengeSectionTypes: Array<Lesson['sections'][number]['type']> = [
          'multiple-choice',
          'fill-blank',
          'ordering',
          'matching',
          'arrange-code',
          'code-repair',
          'predict-output',
          'drag-drop',
          'live-playground',
        ];

        if (challengeSectionTypes.includes(sectionType)) {
          if (challengeType !== sectionType && challengeType !== 'code-playground') {
            warnings.push(
              `Section ${index + 1}: section type "${sectionType}" doesn't match challenge type "${challengeType}"`
            );
          }
        }
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  },
};

/**
 * Rule: XP values should be reasonable
 */
export const reasonableXPRule: ValidationRule = {
  id: 'reasonable-xp',
  validate: (lesson: Lesson): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (lesson.xpReward < 0) {
      errors.push('XP reward cannot be negative');
    }

    if (lesson.xpReward > 500) {
      warnings.push('XP reward is very high (>500). Verify this is intentional.');
    }

    if (lesson.xpReward < 5) {
      warnings.push('XP reward is very low (<5). Consider increasing for engagement.');
    }

    // Check challenge XP
    lesson.sections.forEach((section, index) => {
      if ('challenge' in section && section.challenge) {
        const challengeXP = section.challenge.xpReward;
        if (challengeXP < 0) {
          errors.push(`Section ${index + 1}: Challenge XP cannot be negative`);
        }
        if (challengeXP > 100) {
          warnings.push(`Section ${index + 1}: Challenge XP is very high (>100)`);
        }
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  },
};

/**
 * Rule: Hints must be ordered correctly
 */
export const orderedHintsRule: ValidationRule = {
  id: 'ordered-hints',
  validate: (lesson: Lesson): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    lesson.sections.forEach((section, index) => {
      if ('challenge' in section && section.challenge?.hints) {
        const hints = section.challenge.hints;
        let lastOrder = -1;

        hints.forEach((hint, hintIndex) => {
          if (hint.order <= lastOrder) {
            errors.push(
              `Section ${index + 1}, Hint ${hintIndex + 1}: Hints must be in ascending order (current: ${hint.order}, previous: ${lastOrder})`
            );
          }
          lastOrder = hint.order;
        });
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  },
};

/**
 * Rule: Prerequisites must reference existing content
 */
export const validPrerequisitesRule: ValidationRule = {
  id: 'valid-prerequisites',
  validate: (lesson: Lesson): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (lesson.prerequisites) {
      lesson.prerequisites.forEach((prereq, index) => {
        if (!prereq.type) {
          errors.push(`Prerequisite ${index + 1} is missing a type`);
        }

        // For lesson/chapter/world prerequisites, an ID should be provided
        if (
          ['lesson', 'chapter', 'world'].includes(prereq.type) &&
          !prereq.id
        ) {
          errors.push(
            `Prerequisite ${index + 1} (${prereq.type}) is missing a target id`
          );
        }

        // For xp/streak prerequisites, a threshold should be provided
        if (
          ['xp', 'streak'].includes(prereq.type) &&
          !prereq.xpThreshold &&
          !prereq.streakDays
        ) {
          errors.push(
            `Prerequisite ${index + 1} (${prereq.type}) is missing a threshold value`
          );
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  },
};

/**
 * Rule: Multiple choice challenges must have options
 */
export const multipleChoiceHasOptionsRule: ValidationRule = {
  id: 'mc-has-options',
  validate: (lesson: Lesson): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    lesson.sections.forEach((section, index) => {
      if ('challenge' in section && section.challenge) {
        const challenge = section.challenge;

        if (challenge.type === 'multiple-choice') {
          const mcChallenge = challenge as any;
          if (!mcChallenge.options || mcChallenge.options.length === 0) {
            errors.push(`Section ${index + 1}: Multiple choice challenge must have options`);
          }

          // Check for at least one correct answer
          if (mcChallenge.options) {
            const correctCount = mcChallenge.options.filter(
              (opt: any) => opt.isCorrect
            ).length;

            if (correctCount === 0) {
              errors.push(
                `Section ${index + 1}: Multiple choice challenge must have at least one correct answer`
              );
            }

            if (correctCount > 1 && !mcChallenge.allowMultiple) {
              warnings.push(
                `Section ${index + 1}: Multiple choice has multiple correct answers but allowMultiple is not set`
              );
            }
          }
        }
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  },
};

// -----------------------------------------------------------------------------
// Validator Runner
// -----------------------------------------------------------------------------

export const defaultRules: ValidationRule[] = [
  hasIdRule,
  hasSectionsRule,
  hasLearningObjectivesRule,
  uniqueSectionIdsRule,
  challengeHasChallengeRule,
  reasonableXPRule,
  orderedHintsRule,
  validPrerequisitesRule,
  multipleChoiceHasOptionsRule,
];

export interface ValidationOptions {
  rules?: ValidationRule[];
  failOnWarnings?: boolean;
  verbose?: boolean;
}

export function validateLesson(
  lesson: Lesson,
  options: ValidationOptions = {}
): ValidationResult {
  const {
    rules = defaultRules,
    failOnWarnings = false,
    verbose = false,
  } = options;

  const allErrors: string[] = [];
  const allWarnings: string[] = [];

  rules.forEach((rule) => {
    const result = rule.validate(lesson);
    allErrors.push(...result.errors.map((e) => `[${rule.id}] ${e}`));
    allWarnings.push(...result.warnings.map((w) => `[${rule.id}] ${w}`));

    if (verbose && result.errors.length > 0) {
      console.warn(`Validation rule "${rule.id}" found ${result.errors.length} errors`);
    }
  });

  if (failOnWarnings && allWarnings.length > 0) {
    allErrors.push(...allWarnings);
    allWarnings.length = 0;
  }

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
  };
}

export function validateChapter(chapter: Chapter): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!chapter.id) errors.push('Chapter must have an id');
  if (!chapter.title) errors.push('Chapter must have a title');
  if (!chapter.lessons || chapter.lessons.length === 0) {
    errors.push('Chapter must have at least one lesson');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateWorld(world: World): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!world.id) errors.push('World must have an id');
  if (!world.title) errors.push('World must have a title');
  if (!world.chapters || world.chapters.length === 0) {
    errors.push('World must have at least one chapter');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateCourse(course: Course): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!course.id) errors.push('Course must have an id');
  if (!course.title) errors.push('Course must have a title');
  if (!course.worlds || course.worlds.length === 0) {
    errors.push('Course must have at least one world');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateQuiz(quiz: Quiz): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!quiz.id) errors.push('Quiz must have an id');
  if (!quiz.title) errors.push('Quiz must have a title');
  if (!quiz.questions || quiz.questions.length === 0) {
    errors.push('Quiz must have at least one question');
  }

  if (quiz.passingScore < 0 || quiz.passingScore > 100) {
    errors.push('Quiz passing score must be between 0 and 100');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateBossBattle(boss: BossBattle): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!boss.id) errors.push('Boss battle must have an id');
  if (!boss.title) errors.push('Boss battle must have a title');
  if (!boss.bossName) errors.push('Boss battle must have a boss name');
  if (!boss.challenges || boss.challenges.length === 0) {
    errors.push('Boss battle must have at least one challenge');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate any content type
 */
export function validateContent(
  content: any,
  type: 'lesson' | 'chapter' | 'world' | 'course' | 'quiz' | 'boss-battle'
): ValidationResult {
  switch (type) {
    case 'lesson':
      return validateLesson(content as Lesson);
    case 'chapter':
      return validateChapter(content as Chapter);
    case 'world':
      return validateWorld(content as World);
    case 'course':
      return validateCourse(content as Course);
    case 'quiz':
      return validateQuiz(content as Quiz);
    case 'boss-battle':
      return validateBossBattle(content as BossBattle);
    default:
      return {
        isValid: false,
        errors: [`Unknown content type: ${type}`],
        warnings: [],
      };
  }
}
