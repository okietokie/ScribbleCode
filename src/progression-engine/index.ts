/**
 * ScribbleCode Progression Engine - Main Entry Point
 * 
 * Central export hub for all progression engine modules.
 * Provides clean interfaces for integration with other engines.
 */

// ============================================================================
// Core Calculators
// ============================================================================

export {
  calculateLevelFromXP,
  calculateLevelUp,
  getXPForLevel,
  getCumulativeXPForLevel,
  getMaxLevelXP,
  canPrestige,
  calculatePrestigeRank,
  getLevelInfoWithPrestige,
  getSmoothProgress,
} from './core/level-calculator';

export {
  calculateLessonXP,
  calculateChallengeXP,
  calculateBossBattleXP,
  calculateDailyChallengeXP,
  getMaxPossibleXP,
  calculateCoinReward,
  type XPCalculationInput,
} from './core/xp-calculator';

export {
  updateStreak,
  createNewStreak,
  getLocalDateString,
  isToday,
  isYesterday,
  getDaysBetweenDates,
  calculateStreakStartDate,
  getStreakStatus,
  formatStreak,
} from './core/streak-calculator';

export {
  createPlayerProfile,
  recordLessonCompletion,
  spendCoins,
  getPlayerSummary,
} from './core/player-profile';

// ============================================================================
// Systems
// ============================================================================

export {
  DEFAULT_ACHIEVEMENTS,
  checkAchievementCondition,
  evaluateAchievements,
  getAchievementsByCategory,
  getAchievementsByRarity,
  getAchievementProgress,
  getRarityStyle,
} from './systems/achievement-system';

export {
  DEFAULT_BADGES,
  checkBadgeRequirement,
  evaluateBadges,
  getBadgesByTier,
  getBadgesByCategory,
  getBadgeCollectionProgress,
  getTierStyle,
  formatBadgeEarnedDate,
} from './systems/badge-system';

// ============================================================================
// Events
// ============================================================================

export {
  ProgressionEventEmitter,
  createNotificationFromEvent,
  createCelebrationFromEvent,
  getProgressionEventEmitter,
  resetProgressionEventEmitter,
  type EventListener,
  type EventSubscription,
} from './events/event-emitter';

// ============================================================================
// Types (Re-export all types)
// ============================================================================

export type {
  // XP & Level
  XPSource,
  XPBreakdown,
  LevelConfig,
  LevelInfo,
  LevelUpResult,
  
  // Coins
  CoinSource,
  CoinBalance,
  CoinTransaction,
  
  // Achievements
  AchievementCategory,
  AchievementRarity,
  AchievementTriggerCondition,
  AchievementDefinition,
  EarnedAchievement,
  
  // Badges
  BadgeTier,
  BadgeDefinition,
  EarnedBadge,
  
  // Streaks
  StreakData,
  StreakUpdateResult,
  
  // Challenges
  ChallengeType,
  ChallengeDefinition,
  ChallengeProgress,
  
  // Milestones
  MilestoneDefinition,
  EarnedMilestone,
  
  // Statistics
  PlayerStatistics,
  
  // Progress Records
  LessonProgressRecord,
  ChapterProgressRecord,
  WorldProgressRecord,
  
  // Profile
  PlayerProfile,
  
  // Events
  ProgressEventType,
  ProgressEvent,
  NotificationData,
  CelebrationData,
  
  // Summary
  LessonSummary,
  
  // Configuration
  ProgressionEngineConfig,
} from './types';

export {
  DEFAULT_PROGRESSION_CONFIG,
} from './types';

// ============================================================================
// Engine Version
// ============================================================================

export const PROGRESSION_ENGINE_VERSION = '1.8.0';
