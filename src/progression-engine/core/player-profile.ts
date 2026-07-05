/**
 * ScribbleCode Progression Engine - Player Profile Manager
 * 
 * Centralized player profile management that integrates all progression systems.
 * Provides a unified interface for tracking and updating player progress.
 */

import {
  PlayerProfile,
  PlayerStatistics,
  LessonProgressRecord,
  XPSource,
  CoinTransaction,
  EarnedAchievement,
  EarnedBadge,
  EarnedMilestone,
  LevelInfo,
  StreakData,
  ChallengeProgress,
  ProgressionEngineConfig,
} from '../types';
import { DEFAULT_PROGRESSION_CONFIG } from '../types';
import { calculateLevelFromXP, calculateLevelUp } from '../core/level-calculator';
import { updateStreak, createNewStreak } from '../core/streak-calculator';
import { evaluateAchievements, DEFAULT_ACHIEVEMENTS } from '../systems/achievement-system';
import { evaluateBadges, DEFAULT_BADGES } from '../systems/badge-system';
import { getProgressionEventEmitter } from '../events/event-emitter';

// ============================================================================
// Player Profile Factory
// ============================================================================

/**
 * Create a new player profile with default values
 */
export function createPlayerProfile(playerId: string): PlayerProfile {
  const now = new Date().toISOString();
  
  return {
    playerId,
    level: {
      currentLevel: 1,
      currentXP: 0,
      xpForCurrentLevel: 0,
      xpForNextLevel: DEFAULT_PROGRESSION_CONFIG.level.baseXP,
      progressToNextLevel: 0,
      overflowXP: 0,
    },
    xpHistory: [],
    coinBalance: {
      totalEarned: 0,
      totalSpent: 0,
      currentBalance: 0,
    },
    coinTransactions: [],
    achievements: [],
    badges: [],
    milestones: [],
    streak: createNewStreak(),
    activeDailyChallenge: undefined,
    activeWeeklyChallenge: undefined,
    completedChallenges: [],
    statistics: createInitialStatistics(now),
    lessonHistory: [],
    chapterHistory: [],
    worldHistory: [],
    lastActiveAt: now,
    createdAt: now,
    version: '1.0.0',
  };
}

/**
 * Create initial statistics object
 */
function createInitialStatistics(accountCreatedAt: string): PlayerStatistics {
  return {
    totalXP: 0,
    totalCoins: 0,
    lessonsCompleted: 0,
    challengesCompleted: 0,
    bossBattlesCompleted: 0,
    worldsCompleted: 0,
    chaptersCompleted: 0,
    totalTimeSpentMinutes: 0,
    averageSessionMinutes: 0,
    averageAccuracy: 0,
    perfectLessons: 0,
    hintsUsed: 0,
    firstAttemptSuccesses: 0,
    currentLevel: 1,
    longestStreak: 0,
    currentStreak: 0,
    dailyChallengesCompleted: 0,
    weeklyChallengesCompleted: 0,
    achievementsEarned: 0,
    badgesEarned: 0,
    milestonesReached: 0,
    lastUpdated: accountCreatedAt,
    accountCreatedAt,
  };
}

// ============================================================================
// Profile Update Functions
// ============================================================================

/**
 * Record lesson completion and update all related progress
 */
export function recordLessonCompletion(
  profile: PlayerProfile,
  lessonRecord: LessonProgressRecord,
  config: ProgressionEngineConfig = DEFAULT_PROGRESSION_CONFIG
): {
  profile: PlayerProfile;
  newAchievements: EarnedAchievement[];
  newBadges: EarnedBadge[];
  leveledUp: boolean;
  levelChange: number;
} {
  const emitter = getProgressionEventEmitter();
  let newProfile = { ...profile };
  
  // Store previous state for comparison
  const previousLevel = newProfile.level.currentLevel;
  const previousStreak = newProfile.streak.currentStreak;
  
  // Add lesson to history
  newProfile.lessonHistory = [...newProfile.lessonHistory, lessonRecord];
  
  // Update statistics
  newProfile.statistics = {
    ...newProfile.statistics,
    lessonsCompleted: newProfile.statistics.lessonsCompleted + 1,
    totalTimeSpentMinutes: newProfile.statistics.totalTimeSpentMinutes + lessonRecord.timeSpentMinutes,
    hintsUsed: newProfile.statistics.hintsUsed + lessonRecord.hintsUsed,
    firstAttemptSuccesses: lessonRecord.isFirstAttempt 
      ? newProfile.statistics.firstAttemptSuccesses + 1 
      : newProfile.statistics.firstAttemptSuccesses,
    perfectLessons: lessonRecord.accuracy === 100 
      ? newProfile.statistics.perfectLessons + 1 
      : newProfile.statistics.perfectLessons,
    lastUpdated: new Date().toISOString(),
  };
  
  // Recalculate average accuracy
  const totalLessons = newProfile.lessonHistory.length;
  const totalAccuracy = newProfile.lessonHistory.reduce((sum, l) => sum + l.accuracy, 0);
  newProfile.statistics.averageAccuracy = totalAccuracy / totalLessons;
  
  // Add XP
  const xpSource: XPSource = {
    type: 'lesson',
    amount: lessonRecord.xpEarned,
    description: `Completed: ${lessonRecord.lessonId}`,
    metadata: { lessonId: lessonRecord.lessonId },
  };
  
  newProfile.xpHistory = [...newProfile.xpHistory, xpSource];
  const newTotalXP = newProfile.statistics.totalXP + lessonRecord.xpEarned;
  newProfile.statistics.totalXP = newTotalXP;
  
  // Calculate level change
  const levelResult = calculateLevelUp(newProfile.statistics.totalXP - lessonRecord.xpEarned, lessonRecord.xpEarned, config.level);
  newProfile.level = calculateLevelFromXP(newTotalXP, config.level);
  newProfile.statistics.currentLevel = newProfile.level.currentLevel;
  
  // Add coins
  if (lessonRecord.coinsEarned > 0) {
    const coinTransaction: CoinTransaction = {
      id: `coin_${Date.now()}_${Math.random()}`,
      type: 'earn',
      amount: lessonRecord.coinsEarned,
      source: {
        type: 'lesson',
        amount: lessonRecord.coinsEarned,
        description: 'Lesson completion reward',
      },
      timestamp: new Date().toISOString(),
    };
    
    newProfile.coinTransactions = [...newProfile.coinTransactions, coinTransaction];
    newProfile.coinBalance = {
      totalEarned: newProfile.coinBalance.totalEarned + lessonRecord.coinsEarned,
      totalSpent: newProfile.coinBalance.totalSpent,
      currentBalance: newProfile.coinBalance.currentBalance + lessonRecord.coinsEarned,
    };
    newProfile.statistics.totalCoins = newProfile.statistics.totalCoins + lessonRecord.coinsEarned;
  }
  
  // Update streak
  const streakResult = updateStreak(newProfile.streak, undefined, config.streak.gracePeriodDays);
  newProfile.streak = streakResult.streak;
  newProfile.statistics.currentStreak = newProfile.streak.currentStreak;
  newProfile.statistics.longestStreak = newProfile.streak.longestStreak;
  
  // Evaluate achievements
  const newAchievements = evaluateAchievements(
    DEFAULT_ACHIEVEMENTS,
    newProfile.achievements.map(a => a.id),
    newProfile.statistics,
    lessonRecord
  );
  
  // Add achievement rewards
  for (const achievement of newAchievements) {
    newProfile.achievements = [...newProfile.achievements, achievement];
    newProfile.statistics.achievementsEarned = newProfile.achievements.length;
    
    // Award achievement XP and coins
    if (achievement.xpReward > 0) {
      const achXPSource: XPSource = {
        type: 'achievement',
        amount: achievement.xpReward,
        description: `Achievement: ${achievement.name}`,
      };
      newProfile.xpHistory = [...newProfile.xpHistory, achXPSource];
      newProfile.statistics.totalXP += achievement.xpReward;
    }
    
    if (achievement.coinReward > 0) {
      const achCoinTransaction: CoinTransaction = {
        id: `coin_${Date.now()}_${Math.random()}`,
        type: 'earn',
        amount: achievement.coinReward,
        source: {
          type: 'achievement',
          amount: achievement.coinReward,
          description: `Achievement reward: ${achievement.name}`,
        },
        timestamp: new Date().toISOString(),
      };
      newProfile.coinTransactions = [...newProfile.coinTransactions, achCoinTransaction];
      newProfile.coinBalance.currentBalance += achievement.coinReward;
      newProfile.coinBalance.totalEarned += achievement.coinReward;
      newProfile.statistics.totalCoins += achievement.coinReward;
    }
    
    // Emit achievement event
    emitter.emit('achievement_unlocked', {
      id: achievement.id,
      name: achievement.name,
      rarity: achievement.rarity,
      xpReward: achievement.xpReward,
      coinReward: achievement.coinReward,
    }, profile.playerId);
  }
  
  // Re-calculate level after achievement XP
  newProfile.level = calculateLevelFromXP(newProfile.statistics.totalXP, config.level);
  
  // Evaluate badges
  const newBadges = evaluateBadges(
    DEFAULT_BADGES,
    newProfile.badges.map(b => b.id),
    newProfile.statistics,
    newProfile.level.currentLevel
  );
  
  for (const badge of newBadges) {
    newProfile.badges = [...newProfile.badges, badge];
    newProfile.statistics.badgesEarned = newProfile.badges.length;
    
    // Emit badge event
    emitter.emit('badge_earned', {
      id: badge.id,
      name: badge.name,
      tier: badge.tier,
    }, profile.playerId);
  }
  
  // Update last active
  newProfile.lastActiveAt = new Date().toISOString();
  
  // Emit events
  if (lessonRecord.xpEarned > 0) {
    emitter.emit('xp_earned', {
      amount: lessonRecord.xpEarned,
      source: 'lesson',
      lessonId: lessonRecord.lessonId,
    }, profile.playerId);
  }
  
  if (newProfile.level.currentLevel > previousLevel) {
    emitter.emit('level_up', {
      previousLevel,
      newLevel: newProfile.level.currentLevel,
      levelsGained: newProfile.level.currentLevel - previousLevel,
    }, profile.playerId);
  }
  
  if (streakResult.result.streakContinued && newProfile.streak.currentStreak > previousStreak) {
    emitter.emit('streak_updated', {
      newStreak: newProfile.streak.currentStreak,
      isRecord: streakResult.result.isRecord,
    }, profile.playerId);
  }
  
  emitter.emit('lesson_completed', {
    lessonId: lessonRecord.lessonId,
    xpEarned: lessonRecord.xpEarned,
    accuracy: lessonRecord.accuracy,
  }, profile.playerId);
  
  return {
    profile: newProfile,
    newAchievements,
    newBadges,
    leveledUp: newProfile.level.currentLevel > previousLevel,
    levelChange: newProfile.level.currentLevel - previousLevel,
  };
}

/**
 * Spend coins from player balance
 */
export function spendCoins(
  profile: PlayerProfile,
  amount: number,
  description: string
): { profile: PlayerProfile; success: boolean; error?: string } {
  if (amount <= 0) {
    return { profile, success: false, error: 'Amount must be positive' };
  }
  
  if (profile.coinBalance.currentBalance < amount) {
    return { profile, success: false, error: 'Insufficient coins' };
  }
  
  const transaction: CoinTransaction = {
    id: `coin_spend_${Date.now()}_${Math.random()}`,
    type: 'spend',
    amount,
    source: {
      type: 'bonus',
      amount: -amount,
      description,
    },
    timestamp: new Date().toISOString(),
    metadata: { description },
  };
  
  const newProfile = {
    ...profile,
    coinTransactions: [...profile.coinTransactions, transaction],
    coinBalance: {
      totalEarned: profile.coinBalance.totalEarned,
      totalSpent: profile.coinBalance.totalSpent + amount,
      currentBalance: profile.coinBalance.currentBalance - amount,
    },
    lastActiveAt: new Date().toISOString(),
  };
  
  return { profile: newProfile, success: true };
}

/**
 * Get summary data for UI display
 */
export function getPlayerSummary(profile: PlayerProfile): {
  level: number;
  currentXP: number;
  xpForNextLevel: number;
  progressPercent: number;
  totalCoins: number;
  currentStreak: number;
  achievementsCount: number;
  badgesCount: number;
  lessonsCompleted: number;
} {
  return {
    level: profile.level.currentLevel,
    currentXP: profile.level.currentXP,
    xpForNextLevel: profile.level.xpForNextLevel,
    progressPercent: Math.round(profile.level.progressToNextLevel * 100),
    totalCoins: profile.coinBalance.currentBalance,
    currentStreak: profile.streak.currentStreak,
    achievementsCount: profile.achievements.length,
    badgesCount: profile.badges.length,
    lessonsCompleted: profile.statistics.lessonsCompleted,
  };
}
