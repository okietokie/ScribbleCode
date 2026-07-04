/**
 * Validator Types
 */

import { Lesson } from '../schemas';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ValidationRule {
  id: string;
  validate: (lesson: Lesson) => ValidationResult;
}
