/**
 * Lesson Engine State Machine
 * Manages lesson lifecycle, progress tracking, and state transitions.
 */

import { Lesson, Section, Challenge } from '../../content-engine/schemas';
import {
  EngineState,
  EngineAction,
  LessonProgress,
  ChallengeAttempt,
  LessonStatus,
} from './types';

// -----------------------------------------------------------------------------
// Initial State Factory
// -----------------------------------------------------------------------------

export function createInitialProgress(lesson: Lesson): LessonProgress {
  return {
    lessonId: lesson.id,
    status: 'available',
    currentSectionIndex: 0,
    completedSections: [],
    challengeAttempts: {},
    startTime: null,
    endTime: null,
    totalXPGranted: 0,
    accuracy: 0,
  };
}

export function createInitialState(): EngineState {
  return {
    lesson: null,
    progress: createInitialProgress({
      id: '',
      title: '',
      description: '',
      type: 'reading',
      difficulty: 'beginner',
      estimatedTimeMinutes: 0,
      learningObjectives: [],
      sections: [],
      xpReward: 0,
      coinReward: 0,
    }),
    error: null,
    isLoading: false,
    isTransitioning: false,
  };
}

// -----------------------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------------------

export function lessonEngineReducer(
  state: EngineState,
  action: EngineAction
): EngineState {
  switch (action.type) {
    case 'LOAD_LESSON': {
      const progress = createInitialProgress(action.payload.lesson);
      return {
        ...state,
        lesson: action.payload.lesson,
        progress,
        error: null,
        isLoading: false,
      };
    }

    case 'START_LESSON': {
      if (!state.lesson) return state;
      return {
        ...state,
        progress: {
          ...state.progress,
          status: 'started',
          startTime: Date.now(),
        },
      };
    }

    case 'NEXT_SECTION': {
      if (!state.lesson) return state;
      const nextIndex = state.progress.currentSectionIndex + 1;
      const maxIndex = state.lesson.sections.length - 1;

      if (nextIndex > maxIndex) {
        // All sections completed, trigger lesson completion
        return {
          ...state,
          isTransitioning: true,
          progress: {
            ...state.progress,
            status: 'completed',
            endTime: Date.now(),
          },
        };
      }

      return {
        ...state,
        isTransitioning: true,
        progress: {
          ...state.progress,
          currentSectionIndex: nextIndex,
        },
      };
    }

    case 'PREV_SECTION': {
      const prevIndex = Math.max(0, state.progress.currentSectionIndex - 1);
      return {
        ...state,
        isTransitioning: true,
        progress: {
          ...state.progress,
          currentSectionIndex: prevIndex,
        },
      };
    }

    case 'JUMP_TO_SECTION': {
      return {
        ...state,
        isTransitioning: true,
        progress: {
          ...state.progress,
          currentSectionIndex: action.payload.index,
        },
      };
    }

    case 'SUBMIT_CHALLENGE': {
      const { challengeId, answer, isValid, feedback } = action.payload;
      const existingAttempt = state.progress.challengeAttempts[challengeId];
      
      const newAttempt: ChallengeAttempt = {
        challengeId,
        attempts: (existingAttempt?.attempts || 0) + 1,
        correct: isValid,
        hintsUsed: existingAttempt?.hintsUsed || 0,
        timestamp: Date.now(),
        submittedAnswer: answer,
        feedback,
      };

      // Update accuracy
      const totalChallenges = Object.keys(state.progress.challengeAttempts).length + 1;
      const correctChallenges = Object.values(state.progress.challengeAttempts)
        .filter(a => a.correct).length + (isValid ? 1 : 0);
      const newAccuracy = correctChallenges / totalChallenges;

      let newCompletedSections = [...state.progress.completedSections];
      let newSectionIndex = state.progress.currentSectionIndex;

      // If correct and this section wasn't completed, mark it complete
      if (isValid && !state.progress.completedSections.includes(challengeId)) {
        newCompletedSections.push(challengeId);
        
        // Auto-advance to next section after successful challenge
        if (!state.lesson) return state;
        const nextIndex = state.progress.currentSectionIndex + 1;
        if (nextIndex < state.lesson.sections.length) {
          newSectionIndex = nextIndex;
        } else {
          // Last section completed
          return {
            ...state,
            isTransitioning: true,
            progress: {
              ...state.progress,
              challengeAttempts: {
                ...state.progress.challengeAttempts,
                [challengeId]: newAttempt,
              },
              completedSections: newCompletedSections,
              currentSectionIndex: newSectionIndex,
              accuracy: newAccuracy,
              status: 'completed' as LessonStatus,
              endTime: Date.now(),
            },
          };
        }
      }

      return {
        ...state,
        progress: {
          ...state.progress,
          challengeAttempts: {
            ...state.progress.challengeAttempts,
            [challengeId]: newAttempt,
          },
          completedSections: newCompletedSections,
          currentSectionIndex: newSectionIndex,
          accuracy: newAccuracy,
        },
      };
    }

    case 'USE_HINT': {
      const { challengeId } = action.payload;
      const existingAttempt = state.progress.challengeAttempts[challengeId];

      if (!existingAttempt) {
        // Create attempt entry for hint tracking
        const newAttempt: ChallengeAttempt = {
          challengeId,
          attempts: 0,
          correct: false,
          hintsUsed: 1,
          timestamp: Date.now(),
        };

        return {
          ...state,
          progress: {
            ...state.progress,
            challengeAttempts: {
              ...state.progress.challengeAttempts,
              [challengeId]: newAttempt,
            },
          },
        };
      }

      return {
        ...state,
        progress: {
          ...state.progress,
          challengeAttempts: {
            ...state.progress.challengeAttempts,
            [challengeId]: {
              ...existingAttempt,
              hintsUsed: existingAttempt.hintsUsed + 1,
            },
          },
        },
      };
    }

    case 'COMPLETE_LESSON': {
      return {
        ...state,
        progress: {
          ...state.progress,
          status: 'completed',
          endTime: Date.now(),
        },
        isTransitioning: true,
      };
    }

    case 'RESET_LESSON': {
      if (!state.lesson) return state;
      return {
        ...state,
        progress: createInitialProgress(state.lesson),
        isTransitioning: true,
      };
    }

    case 'PAUSE_LESSON': {
      return {
        ...state,
        progress: {
          ...state.progress,
          status: 'paused',
        },
      };
    }

    case 'RESUME_LESSON': {
      return {
        ...state,
        progress: {
          ...state.progress,
          status: 'in_progress',
        },
      };
    }

    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload.message,
        isLoading: false,
      };
    }

    default:
      return state;
  }
}

// -----------------------------------------------------------------------------
// Helper Functions
// -----------------------------------------------------------------------------

export function getCurrentSection(state: EngineState): Section | undefined {
  if (!state.lesson) return undefined;
  return state.lesson.sections[state.progress.currentSectionIndex];
}

export function getChallengeState(
  state: EngineState,
  challengeId: string
): ChallengeAttempt | undefined {
  return state.progress.challengeAttempts[challengeId];
}

export function canProceedToNextSection(state: EngineState): boolean {
  if (!state.lesson) return false;
  
  const currentSection = state.lesson.sections[state.progress.currentSectionIndex];
  if (!currentSection) return false;

  // If section has a challenge, it must be completed
  if (currentSection.challenge) {
    const attempt = state.progress.challengeAttempts[currentSection.challenge.id];
    return !!attempt?.correct;
  }

  // Reading sections can always proceed
  return true;
}

export function isLessonComplete(state: EngineState): boolean {
  return state.progress.status === 'completed';
}
