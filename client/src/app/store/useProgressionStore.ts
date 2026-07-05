/**
 * ScribbleCode - Player Progression Store
 * 
 * Zustand store for managing player progression state in React components.
 * Integrates with the Progression Engine for all calculations.
 */

import { create } from 'zustand';
import type {
  PlayerProfile,
  LessonProgressRecord,
  LessonSummary,
} from '@progression-engine/types';
import {
  createPlayerProfile,
  recordLessonCompletion,
  getPlayerSummary,
  getProgressionEventEmitter,
} from '@progression-engine/index';

type EventSubscription = { unsubscribe: () => void };
type ProgressEventHandler = (event: any) => void;

interface ProgressionState {
  // Player Profile
  profile: PlayerProfile | null;
  playerId: string | null;
  
  // UI State
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Recent Events (for notifications)
  recentNotifications: Array<{
    id: string;
    type: 'info' | 'success' | 'warning' | 'celebration';
    title: string;
    message: string;
    icon?: string;
    timestamp: string;
  }>;
  
  // Current Celebration
  activeCelebration: {
    type: 'confetti' | 'fireworks' | 'sparkles' | 'stamp' | 'pop' | 'float' | 'burst';
    intensity: 'low' | 'medium' | 'high';
    metadata?: Record<string, any>;
  } | null;
  
  // Last Lesson Summary
  lastLessonSummary: LessonSummary | null;
  
  // Actions
  initializePlayer: (playerId: string) => void;
  completeLesson: (lessonRecord: LessonProgressRecord) => void;
  clearNotification: (id: string) => void;
  clearAllNotifications: () => void;
  dismissCelebration: () => void;
  resetProgression: () => void;
}

let eventSubscriptions: EventSubscription[] = [];

export const useProgressionStore = create<ProgressionState>((set, get) => ({
  // Initial State
  profile: null,
  playerId: null,
  isInitialized: false,
  isLoading: false,
  error: null,
  recentNotifications: [],
  activeCelebration: null,
  lastLessonSummary: null,
  
  // Initialize player profile
  initializePlayer: (playerId: string) => {
    const emitter = getProgressionEventEmitter();
    
    // Clean up previous subscriptions
    eventSubscriptions.forEach(sub => sub.unsubscribe());
    eventSubscriptions = [];
    
    // Subscribe to events
    eventSubscriptions.push(
      emitter.on('level_up', (event) => {
        set((state) => ({
          activeCelebration: {
            type: 'fireworks',
            intensity: 'high',
            metadata: { level: event.payload.newLevel },
          },
          recentNotifications: [
            ...state.recentNotifications.slice(-9),
            {
              id: `notif_${Date.now()}`,
              type: 'celebration',
              title: '🎉 Level Up!',
              message: `You reached Level ${event.payload.newLevel}!`,
              icon: '🆙',
              timestamp: new Date().toISOString(),
            },
          ],
        }));
      })
    );
    
    eventSubscriptions.push(
      emitter.on('achievement_unlocked', (event) => {
        set((state) => ({
          activeCelebration: {
            type: 'stamp',
            intensity: 'medium',
            metadata: { achievementId: event.payload.id },
          },
          recentNotifications: [
            ...state.recentNotifications.slice(-9),
            {
              id: `notif_${Date.now()}`,
              type: 'celebration',
              title: '🏆 Achievement Unlocked!',
              message: event.payload.name || 'New Achievement',
              icon: '✨',
              timestamp: new Date().toISOString(),
            },
          ],
        }));
      })
    );
    
    eventSubscriptions.push(
      emitter.on('badge_earned', (event) => {
        set((state) => ({
          activeCelebration: {
            type: 'pop',
            intensity: 'medium',
            metadata: { badgeId: event.payload.id },
          },
          recentNotifications: [
            ...state.recentNotifications.slice(-9),
            {
              id: `notif_${Date.now()}`,
              type: 'celebration',
              title: '🎖️ Badge Earned!',
              message: event.payload.name || 'New Badge',
              icon: '🌟',
              timestamp: new Date().toISOString(),
            },
          ],
        }));
      })
    );
    
    eventSubscriptions.push(
      emitter.on('xp_earned', (event) => {
        if (event.payload.amount >= 50) {
          set((state) => ({
            recentNotifications: [
              ...state.recentNotifications.slice(-9),
              {
                id: `notif_${Date.now()}`,
                type: 'success',
                title: '+XP Earned!',
                message: `+${event.payload.amount} XP`,
                icon: '⭐',
                timestamp: new Date().toISOString(),
              },
            ],
          }));
        }
      })
    );
    
    // Create or load player profile
    const profile = createPlayerProfile(playerId);
    
    set({
      profile,
      playerId,
      isInitialized: true,
      isLoading: false,
      error: null,
    });
  },
  
  // Complete a lesson and update progression
  completeLesson: (lessonRecord: LessonProgressRecord) => {
    const state = get();
    
    if (!state.profile || !state.isInitialized) {
      set({ error: 'Player not initialized' });
      return;
    }
    
    try {
      const result = recordLessonCompletion(state.profile, lessonRecord);
      
      // Get summary for display
      const summary: LessonSummary = {
        lessonId: lessonRecord.lessonId,
        lessonTitle: lessonRecord.lessonId, // Would get actual title from content
        xpEarned: {
          baseXP: lessonRecord.xpEarned,
          bonusXP: 0,
          penaltyXP: 0,
          totalXP: lessonRecord.xpEarned,
          sources: [],
          breakdown: [],
        },
        coinsEarned: lessonRecord.coinsEarned,
        accuracy: lessonRecord.accuracy,
        timeSpentMinutes: lessonRecord.timeSpentMinutes,
        hintsUsed: lessonRecord.hintsUsed,
        attempts: lessonRecord.attempts,
        levelBefore: state.profile.level.currentLevel,
        levelAfter: result.profile.level.currentLevel,
        leveledUp: result.leveledUp,
        newAchievements: result.newAchievements,
        newBadges: result.newBadges,
        streakBefore: state.profile.streak.currentStreak,
        streakAfter: result.profile.streak.currentStreak,
        streakContinued: result.profile.streak.currentStreak >= state.profile.streak.currentStreak,
        completionPercentage: 100,
      };
      
      set({
        profile: result.profile,
        lastLessonSummary: summary,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to complete lesson',
      });
    }
  },
  
  // Clear a specific notification
  clearNotification: (id: string) => {
    set((state) => ({
      recentNotifications: state.recentNotifications.filter(n => n.id !== id),
    }));
  },
  
  // Clear all notifications
  clearAllNotifications: () => {
    set({ recentNotifications: [] });
  },
  
  // Dismiss active celebration
  dismissCelebration: () => {
    set({ activeCelebration: null });
  },
  
  // Reset all progression (for testing/debugging)
  resetProgression: () => {
    // Clean up subscriptions
    eventSubscriptions.forEach(sub => sub.unsubscribe());
    eventSubscriptions = [];
    
    set({
      profile: null,
      playerId: null,
      isInitialized: false,
      isLoading: false,
      error: null,
      recentNotifications: [],
      activeCelebration: null,
      lastLessonSummary: null,
    });
  },
}));

// Cleanup on unmount (for React strict mode)
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    eventSubscriptions.forEach(sub => sub.unsubscribe());
  });
}

// Selectors for common use cases
export const selectPlayerSummary = (state: ProgressionState) => {
  if (!state.profile) return null;
  return getPlayerSummary(state.profile);
};

export const selectCurrentLevel = (state: ProgressionState) => {
  return state.profile?.level.currentLevel ?? 1;
};

export const selectCurrentXP = (state: ProgressionState) => {
  return state.profile?.level.currentXP ?? 0;
};

export const selectXPProgress = (state: ProgressionState) => {
  if (!state.profile) return 0;
  return Math.round(state.profile.level.progressToNextLevel * 100);
};

export const selectCoinBalance = (state: ProgressionState) => {
  return state.profile?.coinBalance.currentBalance ?? 0;
};

export const selectCurrentStreak = (state: ProgressionState) => {
  return state.profile?.streak.currentStreak ?? 0;
};

export const selectHasUnreadNotifications = (state: ProgressionState) => {
  return state.recentNotifications.length > 0;
};
