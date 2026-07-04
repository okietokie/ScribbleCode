/**
 * ScribbleCode Lesson Engine - Core Types
 * Defines the state machine, events, and renderer contracts.
 */

import { Lesson, Challenge, Section, Reward } from '../../content-engine/schemas';

// -----------------------------------------------------------------------------
// Engine State
// -----------------------------------------------------------------------------

export type LessonStatus = 
  | 'locked' 
  | 'available' 
  | 'started' 
  | 'in_progress' 
  | 'paused' 
  | 'completed' 
  | 'mastered';

export type SectionStatus = 'pending' | 'active' | 'completed' | 'failed';

export interface ChallengeAttempt {
  challengeId: string;
  attempts: number;
  correct: boolean;
  hintsUsed: number;
  timestamp: number;
  submittedAnswer?: any;
  feedback?: string;
}

export interface LessonProgress {
  lessonId: string;
  status: LessonStatus;
  currentSectionIndex: number;
  completedSections: string[]; // section IDs
  challengeAttempts: Record<string, ChallengeAttempt>; // key: challengeId
  startTime: number | null;
  endTime: number | null;
  totalXPGranted: number;
  accuracy: number; // 0-1
}

export interface EngineState {
  lesson: Lesson | null;
  progress: LessonProgress;
  error: string | null;
  isLoading: boolean;
  isTransitioning: boolean; // For animations between sections
}

// -----------------------------------------------------------------------------
// Engine Events & Actions
// -----------------------------------------------------------------------------

export type EngineAction =
  | { type: 'LOAD_LESSON'; payload: { lesson: Lesson } }
  | { type: 'START_LESSON' }
  | { type: 'NEXT_SECTION' }
  | { type: 'PREV_SECTION' }
  | { type: 'JUMP_TO_SECTION'; payload: { index: number } }
  | { type: 'SUBMIT_CHALLENGE'; payload: { challengeId: string; answer: any; isValid: boolean; feedback?: string } }
  | { type: 'USE_HINT'; payload: { challengeId: string } }
  | { type: 'COMPLETE_LESSON' }
  | { type: 'RESET_LESSON' }
  | { type: 'PAUSE_LESSON' }
  | { type: 'RESUME_LESSON' }
  | { type: 'SET_ERROR'; payload: { message: string } };

export interface EngineContext {
  state: EngineState;
  dispatch: React.Dispatch<EngineAction>;
  getCurrentSection: () => Section | undefined;
  getChallengeState: (id: string) => ChallengeAttempt | undefined;
  calculateXP: () => number;
  canProceed: () => boolean;
}

// -----------------------------------------------------------------------------
// Renderer System
// -----------------------------------------------------------------------------

export type SectionType = 
  | 'reading' 
  | 'interactive-explanation'
  | 'multiple-choice'
  | 'fill-blank'
  | 'ordering'
  | 'matching'
  | 'arrange-code'
  | 'code-repair'
  | 'predict-output'
  | 'drag-drop'
  | 'interactive-demo'
  | 'live-playground'
  | 'reflection'
  | 'mini-project'
  | 'boss-battle';

export interface RendererProps {
  section: Section;
  challenge?: Challenge;
  state: ChallengeAttempt | undefined;
  onSubmit: (answer: any) => void;
  onHintRequest: () => void;
  isCompleted: boolean;
  config?: Record<string, any>;
}

export interface RendererModule {
  type: SectionType;
  component: React.FC<RendererProps>;
  validator: (section: Section, answer: any) => { valid: boolean; feedback?: string };
  defaultConfig?: Record<string, any>;
}

export interface RendererRegistry {
  register: (module: RendererModule) => void;
  get: (type: string) => RendererModule | undefined;
  getAllTypes: () => string[];
}

// -----------------------------------------------------------------------------
// Validation Pipeline
// -----------------------------------------------------------------------------

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ValidationRule {
  id: string;
  validate: (lesson: Lesson) => ValidationResult;
}
