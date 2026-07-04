/**
 * useLessonEngine Hook
 * Main React hook for interacting with the lesson engine.
 * Provides state, actions, and helper methods.
 */

import { useReducer, useCallback, useMemo, useEffect } from 'react';
import { Lesson } from '../../content-engine/schemas';
import {
  EngineState,
  EngineAction,
  EngineContext,
  ChallengeAttempt,
} from '../core/types';
import {
  lessonEngineReducer,
  createInitialState,
  getCurrentSection as getCurrentSectionHelper,
  getChallengeState as getChallengeStateHelper,
  canProceedToNextSection,
  isLessonComplete,
} from '../core/state-machine';
import { calculateLessonXP, XPBreakdown } from '../utils/xp-calculator';
import { validateAnswer } from '../core/renderer-registry';

export interface UseLessonEngineOptions {
  /** Initial lesson to load (optional) */
  initialLesson?: Lesson;
  /** Current user streak in days */
  currentStreak?: number;
  /** Custom XP calculation config */
  xpConfig?: Record<string, any>;
  /** Callback when lesson completes */
  onComplete?: (xpBreakdown: XPBreakdown) => void;
  /** Callback on error */
  onError?: (error: string) => void;
  /** Enable debug logging */
  debug?: boolean;
}

export interface UseLessonEngineReturn extends EngineContext {
  // Computed values
  currentSection: any | undefined;
  currentSectionIndex: number;
  totalSections: number;
  progressPercent: number;
  xpBreakdown: XPBreakdown | null;
  isCompleted: boolean;
  canProceed: boolean;
  hintsRemaining: (challengeId: string) => number;
  
  // Actions
  loadLesson: (lesson: Lesson) => void;
  startLesson: () => void;
  nextSection: () => void;
  prevSection: () => void;
  jumpToSection: (index: number) => void;
  submitChallenge: (challengeId: string, answer: any) => void;
  requestHint: (challengeId: string) => void;
  completeLesson: () => void;
  resetLesson: () => void;
  pauseLesson: () => void;
  resumeLesson: () => void;
  
  // Validation
  validateCurrentChallenge: (answer: any) => { valid: boolean; feedback?: string };
}

/**
 * Main lesson engine hook
 */
export function useLessonEngine(options: UseLessonEngineOptions = {}): UseLessonEngineReturn {
  const {
    initialLesson,
    currentStreak = 0,
    xpConfig = {},
    onComplete,
    onError,
    debug = false,
  } = options;

  const [state, dispatch] = useReducer(lessonEngineReducer, createInitialState());

  // Load initial lesson if provided
  useEffect(() => {
    if (initialLesson) {
      dispatch({ type: 'LOAD_LESSON', payload: { lesson: initialLesson } });
    }
  }, [initialLesson]);

  // Handle completion callback
  useEffect(() => {
    if (state.progress.status === 'completed' && state.lesson && onComplete) {
      const xpBreakdown = calculateLessonXP(
        state.lesson,
        state.progress,
        xpConfig,
        currentStreak
      );
      onComplete(xpBreakdown);
    }
  }, [state.progress.status, state.lesson, onComplete, xpConfig, currentStreak]);

  // Handle errors
  useEffect(() => {
    if (state.error && onError) {
      onError(state.error);
    }
  }, [state.error, onError]);

  // Debug logging
  useEffect(() => {
    if (debug) {
      console.log('[LessonEngine] State:', {
        status: state.progress.status,
        section: state.progress.currentSectionIndex,
        completed: state.progress.completedSections,
      });
    }
  }, [state.progress, debug]);

  // Helper to get current section
  const getCurrentSection = useCallback(() => {
    return getCurrentSectionHelper(state);
  }, [state]);

  // Helper to get challenge state
  const getChallengeState = useCallback(
    (id: string): ChallengeAttempt | undefined => {
      return getChallengeStateHelper(state, id);
    },
    [state]
  );

  // Calculate XP
  const calculateXP = useCallback((): number => {
    if (!state.lesson) return 0;
    const breakdown = calculateLessonXP(
      state.lesson,
      state.progress,
      xpConfig,
      currentStreak
    );
    return breakdown.totalXP;
  }, [state.lesson, state.progress, xpConfig, currentStreak]);

  // Check if can proceed
  const canProceed = useCallback(() => {
    return canProceedToNextSection(state);
  }, [state]);

  // Action creators
  const loadLesson = useCallback((lesson: Lesson) => {
    dispatch({ type: 'LOAD_LESSON', payload: { lesson } });
  }, []);

  const startLesson = useCallback(() => {
    dispatch({ type: 'START_LESSON' });
  }, []);

  const nextSection = useCallback(() => {
    dispatch({ type: 'NEXT_SECTION' });
  }, []);

  const prevSection = useCallback(() => {
    dispatch({ type: 'PREV_SECTION' });
  }, []);

  const jumpToSection = useCallback((index: number) => {
    dispatch({ type: 'JUMP_TO_SECTION', payload: { index } });
  }, []);

  const submitChallenge = useCallback(
    (challengeId: string, answer: any) => {
      const section = getCurrentSection();
      if (!section || !section.challenge) {
        dispatch({
          type: 'SET_ERROR',
          payload: { message: 'No active challenge to submit' },
        });
        return;
      }

      // Validate using the renderer's validator
      const validation = validateAnswer(
        section.type,
        section,
        answer
      );

      dispatch({
        type: 'SUBMIT_CHALLENGE',
        payload: {
          challengeId,
          answer,
          isValid: validation.valid,
          feedback: validation.feedback,
        },
      });
    },
    [getCurrentSection]
  );

  const requestHint = useCallback((challengeId: string) => {
    dispatch({ type: 'USE_HINT', payload: { challengeId } });
  }, []);

  const completeLesson = useCallback(() => {
    dispatch({ type: 'COMPLETE_LESSON' });
  }, []);

  const resetLesson = useCallback(() => {
    dispatch({ type: 'RESET_LESSON' });
  }, []);

  const pauseLesson = useCallback(() => {
    dispatch({ type: 'PAUSE_LESSON' });
  }, []);

  const resumeLesson = useCallback(() => {
    dispatch({ type: 'RESUME_LESSON' });
  }, []);

  // Get hints remaining for a challenge
  const hintsRemaining = useCallback(
    (challengeId: string): number => {
      const section = state.lesson?.sections.find(s => 
        s.challenge?.id === challengeId || 
        s.challenges?.some(c => c.id === challengeId)
      );
      
      if (!section?.challenge) {
        // Check challenges array
        const challenge = section?.challenges?.find(c => c.id === challengeId);
        if (!challenge) return 0;
        
        const attempt = getChallengeState(challengeId);
        const maxHints = challenge.hints?.length || 0;
        const usedHints = attempt?.hintsUsed || 0;
        return Math.max(0, maxHints - usedHints);
      }

      const attempt = getChallengeState(challengeId);
      const maxHints = section.challenge.hints?.length || 0;
      const usedHints = attempt?.hintsUsed || 0;
      return Math.max(0, maxHints - usedHints);
    },
    [state.lesson, getChallengeState]
  );

  // Validate current challenge answer
  const validateCurrentChallenge = useCallback(
    (answer: any): { valid: boolean; feedback?: string } => {
      const section = getCurrentSection();
      if (!section) {
        return { valid: false, feedback: 'No active section' };
      }
      return validateAnswer(section.type, section, answer);
    },
    [getCurrentSection]
  );

  // Computed values
  const currentSection = useMemo(() => getCurrentSection(), [getCurrentSection]);
  const currentSectionIndex = state.progress.currentSectionIndex;
  const totalSections = state.lesson?.sections.length || 0;
  const progressPercent = totalSections > 0 
    ? Math.round(((currentSectionIndex + 1) / totalSections) * 100)
    : 0;
  
  const xpBreakdown = useMemo(() => {
    if (!state.lesson || state.progress.status !== 'completed') return null;
    return calculateLessonXP(state.lesson, state.progress, xpConfig, currentStreak);
  }, [state.lesson, state.progress, xpConfig, currentStreak]);

  const isCompleted = useMemo(() => isLessonComplete(state), [state]);
  const canProceedValue = useMemo(() => canProceed(), [canProceed]);

  return {
    state,
    dispatch,
    getCurrentSection,
    getChallengeState,
    calculateXP,
    canProceed: canProceedValue,
    
    // Computed
    currentSection,
    currentSectionIndex,
    totalSections,
    progressPercent,
    xpBreakdown,
    isCompleted,
    canProceed: canProceedValue,
    hintsRemaining,
    
    // Actions
    loadLesson,
    startLesson,
    nextSection,
    prevSection,
    jumpToSection,
    submitChallenge,
    requestHint,
    completeLesson,
    resetLesson,
    pauseLesson,
    resumeLesson,
    
    // Validation
    validateCurrentChallenge,
  };
}

export default useLessonEngine;
