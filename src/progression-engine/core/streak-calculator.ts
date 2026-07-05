/**
 * ScribbleCode Progression Engine - Streak Calculator
 * 
 * Manages daily learning streaks with grace period support.
 * Independent from UI, easily testable logic.
 */

import { StreakData, StreakUpdateResult } from '../types';

/**
 * Get the date string in local timezone (YYYY-MM-DD format)
 */
export function getLocalDateString(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

/**
 * Calculate days between two date strings
 */
export function getDaysBetweenDates(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Check if a date is today
 */
export function isToday(dateString: string): boolean {
  return dateString === getLocalDateString();
}

/**
 * Check if a date is yesterday
 */
export function isYesterday(dateString: string): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateString === getLocalDateString(yesterday);
}

/**
 * Initialize a new streak record
 */
export function createNewStreak(): StreakData {
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: null,
    streakHistory: [],
  };
}

/**
 * Update streak based on activity
 * Returns the updated streak and result information
 */
export function updateStreak(
  currentStreak: StreakData,
  activityDate: string = getLocalDateString(),
  gracePeriodDays: number = 1
): { streak: StreakData; result: StreakUpdateResult } {
  const lastActive = currentStreak.lastActiveDate;
  
  // If already active today, no change needed
  if (lastActive && isToday(lastActive)) {
    return {
      streak: currentStreak,
      result: {
        streakContinued: true,
        newStreak: currentStreak.currentStreak,
        isRecord: false,
        streakBroken: false,
        daysMissed: 0,
      },
    };
  }
  
  let newStreakData: StreakData = { ...currentStreak };
  let result: StreakUpdateResult;
  
  // First ever activity
  if (!lastActive) {
    newStreakData.currentStreak = 1;
    newStreakData.longestStreak = 1;
    newStreakData.lastActiveDate = activityDate;
    
    result = {
      streakContinued: true,
      newStreak: 1,
      isRecord: true,
      streakBroken: false,
      daysMissed: 0,
    };
  } else if (isYesterday(lastActive)) {
    // Continued streak (yesterday was active)
    const newCurrentStreak = currentStreak.currentStreak + 1;
    const isRecord = newCurrentStreak > currentStreak.longestStreak;
    
    newStreakData.currentStreak = newCurrentStreak;
    if (isRecord) {
      newStreakData.longestStreak = newCurrentStreak;
    }
    newStreakData.lastActiveDate = activityDate;
    
    result = {
      streakContinued: true,
      newStreak: newCurrentStreak,
      isRecord,
      streakBroken: false,
      daysMissed: 0,
    };
  } else {
    // Calculate days missed
    const daysMissed = getDaysBetweenDates(lastActive, activityDate) - 1;
    
    // Check if within grace period (future-ready)
    const withinGracePeriod = daysMissed <= gracePeriodDays;
    
    if (withinGracePeriod && currentStreak.gracePeriodRemaining && currentStreak.gracePeriodRemaining > 0) {
      // Use grace period to maintain streak
      newStreakData.currentStreak += 1;
      newStreakData.gracePeriodRemaining = (newStreakData.gracePeriodRemaining || gracePeriodDays) - 1;
      newStreakData.lastActiveDate = activityDate;
      
      result = {
        streakContinued: true,
        newStreak: newStreakData.currentStreak,
        isRecord: false,
        streakBroken: false,
        daysMissed,
      };
    } else {
      // Streak broken - archive current streak and start new one
      if (currentStreak.currentStreak > 0) {
        newStreakData.streakHistory = [
          ...newStreakData.streakHistory,
          {
            startDate: calculateStreakStartDate(currentStreak),
            endDate: lastActive,
            length: currentStreak.currentStreak,
          },
        ];
      }
      
      newStreakData.currentStreak = 1;
      newStreakData.lastActiveDate = activityDate;
      
      result = {
        streakContinued: false,
        newStreak: 1,
        isRecord: false,
        streakBroken: true,
        daysMissed,
      };
    }
  }
  
  return { streak: newStreakData, result };
}

/**
 * Calculate the start date of the current streak
 */
export function calculateStreakStartDate(streak: StreakData): string {
  if (!streak.lastActiveDate || streak.currentStreak === 0) {
    return '';
  }
  
  const lastActive = new Date(streak.lastActiveDate);
  lastActive.setDate(lastActive.getDate() - (streak.currentStreak - 1));
  return getLocalDateString(lastActive);
}

/**
 * Apply grace period recovery (future-ready feature)
 */
export function recoverStreakWithGrace(
  streak: StreakData,
  _recoveryCost: number,
  canAfford: boolean
): { streak: StreakData; success: boolean } {
  if (!canAfford || !streak.gracePeriodRemaining || streak.gracePeriodRemaining <= 0) {
    return { streak, success: false };
  }
  
  // This would be called when user pays to recover a broken streak
  // Implementation depends on coin system integration
  return { streak, success: false };
}

/**
 * Get streak status for display
 */
export function getStreakStatus(streak: StreakData): {
  isActive: boolean;
  daysUntilLost: number;
  message: string;
} {
  if (!streak.lastActiveDate) {
    return {
      isActive: false,
      daysUntilLost: 0,
      message: 'Start your streak today!',
    };
  }
  
  if (isToday(streak.lastActiveDate)) {
    return {
      isActive: true,
      daysUntilLost: 2, // Will be lost if miss tomorrow and day after (with grace)
      message: `Great! You're on a ${streak.currentStreak} day streak!`,
    };
  }
  
  if (isYesterday(streak.lastActiveDate)) {
    return {
      isActive: true,
      daysUntilLost: 1,
      message: 'Complete a lesson today to keep your streak!',
    };
  }
  
  return {
    isActive: false,
    daysUntilLost: 0,
    message: 'Your streak has ended. Start a new one!',
  };
}

/**
 * Format streak for display with proper pluralization
 */
export function formatStreak(streak: number): string {
  if (streak === 0) return 'No streak yet';
  if (streak === 1) return '1 day streak';
  return `${streak} day streak`;
}
