/**
 * ScribbleCode Progression Engine - Core Types
 * 
 * Type definitions for the Player Progression Engine.
 * These types define the contracts for tracking, calculating, and rewarding player progress.
 */

// ============================================================================
// XP & Level System Types
// ============================================================================

export interface XPSource {
  type: 'lesson' | 'challenge' | 'boss' | 'achievement' | 'streak' | 'daily' | 'weekly' | 'exploration' | 'discovery';
  amount: number;
  description?: string;
  metadata?: Record<string, any>;
}

export interface XPBreakdown {
  baseXP: number;
  bonusXP: number;
  penaltyXP: number;
  totalXP: number;
  sources: XPSource[];
  breakdown: string[];
}

export interface LevelConfig {
  baseXP: number;
  growthFactor: number;
  maxLevel?: number;
  prestigeEnabled?: boolean;
  prestigeThreshold?: number;
}

export interface LevelInfo {
  currentLevel: number;
  currentXP: number;
  xpForCurrentLevel: number;
  xpForNextLevel: number;
  progressToNextLevel: number; // 0-1 percentage
  overflowXP: number;
  isPrestige?: boolean;
  prestigeRank?: number;
}

export interface LevelUpResult {
  leveledUp: boolean;
  newLevel: number;
  levelsGained: number;
  overflowXP: number;
  previousLevel: number;
}

// ============================================================================
// Coin Economy Types
// ============================================================================

export interface CoinSource {
  type: 'lesson' | 'challenge' | 'boss' | 'achievement' | 'streak' | 'daily' | 'weekly' | 'bonus';
  amount: number;
  description?: string;
}

export interface CoinBalance {
  totalEarned: number;
  totalSpent: number;
  currentBalance: number;
}

export interface CoinTransaction {
  id: string;
  type: 'earn' | 'spend';
  amount: number;
  source: CoinSource;
  timestamp: string;
  metadata?: Record<string, any>;
}

// ============================================================================
// Achievement System Types
// ============================================================================

export type AchievementCategory =
  | 'progress'
  | 'mastery'
  | 'streak'
  | 'speed'
  | 'perfection'
  | 'exploration'
  | 'social'
  | 'seasonal'
  | 'hidden';

export type AchievementRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface AchievementTriggerCondition {
  type?: string;
  count?: number;
  accuracy?: number;
  hintsUsed?: number;
  days?: number;
  period?: string;
  regionsVisited?: string;
  targetValue?: number;
  threshold?: number;
  context?: Record<string, any>;
  [key: string]: any;
}

export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  trigger: {
    type: string;
    condition: AchievementTriggerCondition;
  };
  xpReward: number;
  coinReward: number;
  isHidden: boolean;
  metadata?: Record<string, any>;
}

export interface EarnedAchievement extends AchievementDefinition {
  earnedAt: string;
  context: Record<string, any>;
}

// ============================================================================
// Badge System Types
// ============================================================================

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'legendary';

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: BadgeTier;
  category: string;
  requirement: {
    type: string;
    condition: Record<string, any>;
  };
  isAnimated?: boolean;
  metadata?: Record<string, any>;
}

export interface EarnedBadge extends BadgeDefinition {
  earnedAt: string;
  context: Record<string, any>;
}

// ============================================================================
// Streak System Types
// ============================================================================

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  streakHistory: {
    startDate: string;
    endDate: string;
    length: number;
  }[];
  gracePeriodRemaining?: number; // Future-ready
  missedDayRecoveryAvailable?: boolean; // Future-ready
}

export interface StreakUpdateResult {
  streakContinued: boolean;
  newStreak: number;
  isRecord: boolean;
  streakBroken: boolean;
  daysMissed: number;
}

// ============================================================================
// Challenge System Types
// ============================================================================

export type ChallengeType = 'daily' | 'weekly' | 'special';

export interface ChallengeDefinition {
  id: string;
  type: ChallengeType;
  title: string;
  description: string;
  objective: {
    type: string;
    target: number;
    metric: string;
  };
  reward: {
    xp: number;
    coins: number;
    badgeId?: string;
    achievementId?: string;
  };
  expiresAt: string;
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface ChallengeProgress {
  challengeId: string;
  currentProgress: number;
  isCompleted: boolean;
  completedAt?: string;
  claimedAt?: string;
}

// ============================================================================
// Milestone System Types
// ============================================================================

export interface MilestoneDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  trigger: {
    type: string;
    condition: Record<string, any>;
  };
  reward: {
    xp: number;
    coins: number;
    celebrationType: string;
  };
}

export interface EarnedMilestone extends MilestoneDefinition {
  earnedAt: string;
  context: Record<string, any>;
}

// ============================================================================
// Player Statistics Types
// ============================================================================

export interface PlayerStatistics {
  // Totals
  totalXP: number;
  totalCoins: number;
  
  // Completion Stats
  lessonsCompleted: number;
  challengesCompleted: number;
  bossBattlesCompleted: number;
  worldsCompleted: number;
  chaptersCompleted: number;
  
  // Time Stats
  totalTimeSpentMinutes: number;
  averageSessionMinutes: number;
  
  // Performance Stats
  averageAccuracy: number;
  perfectLessons: number;
  hintsUsed: number;
  firstAttemptSuccesses: number;
  
  // Progression Stats
  currentLevel: number;
  longestStreak: number;
  currentStreak: number;
  
  // Challenge Stats
  dailyChallengesCompleted: number;
  weeklyChallengesCompleted: number;
  
  // Collection Stats
  achievementsEarned: number;
  badgesEarned: number;
  milestonesReached: number;
  
  // Metadata
  lastUpdated: string;
  accountCreatedAt: string;
}

// ============================================================================
// Progress Tracking Types
// ============================================================================

export interface LessonProgressRecord {
  lessonId: string;
  completedAt: string;
  xpEarned: number;
  coinsEarned: number;
  accuracy: number;
  timeSpentMinutes: number;
  hintsUsed: number;
  attempts: number;
  isFirstAttempt: boolean;
}

export interface ChapterProgressRecord {
  chapterId: string;
  completedAt: string;
  lessonsCompleted: number;
  totalLessons: number;
  xpEarned: number;
}

export interface WorldProgressRecord {
  worldId: string;
  completedAt: string;
  chaptersCompleted: number;
  totalChapters: number;
  xpEarned: number;
}

export interface PlayerProfile {
  playerId: string;
  
  // Core Progression
  level: LevelInfo;
  xpHistory: XPSource[];
  coinBalance: CoinBalance;
  coinTransactions: CoinTransaction[];
  
  // Achievements & Badges
  achievements: EarnedAchievement[];
  badges: EarnedBadge[];
  milestones: EarnedMilestone[];
  
  // Streaks
  streak: StreakData;
  
  // Challenges
  activeDailyChallenge?: ChallengeProgress;
  activeWeeklyChallenge?: ChallengeProgress;
  completedChallenges: ChallengeProgress[];
  
  // Statistics
  statistics: PlayerStatistics;
  
  // History
  lessonHistory: LessonProgressRecord[];
  chapterHistory: ChapterProgressRecord[];
  worldHistory: WorldProgressRecord[];
  
  // Metadata
  lastActiveAt: string;
  createdAt: string;
  version: string;
}

// ============================================================================
// Event Types
// ============================================================================

export type ProgressEventType =
  | 'xp_earned'
  | 'level_up'
  | 'coins_earned'
  | 'coins_spent'
  | 'achievement_unlocked'
  | 'badge_earned'
  | 'milestone_reached'
  | 'streak_updated'
  | 'streak_broken'
  | 'challenge_completed'
  | 'lesson_completed'
  | 'chapter_completed'
  | 'world_completed'
  | 'boss_defeated';

export interface ProgressEvent {
  type: ProgressEventType;
  payload: Record<string, any>;
  timestamp: string;
  playerId: string;
}

export interface NotificationData {
  id: string;
  type: 'info' | 'success' | 'warning' | 'celebration';
  title: string;
  message: string;
  icon?: string;
  action?: {
    label: string;
    handler: () => void;
  };
  duration?: number;
  isDismissible: boolean;
}

export interface CelebrationData {
  type: 'confetti' | 'fireworks' | 'sparkles' | 'stamp' | 'pop' | 'float' | 'burst';
  intensity: 'low' | 'medium' | 'high';
  duration: number;
  metadata?: Record<string, any>;
}

// ============================================================================
// Summary Screen Types
// ============================================================================

export interface LessonSummary {
  lessonId: string;
  lessonTitle: string;
  
  // Rewards
  xpEarned: XPBreakdown;
  coinsEarned: number;
  
  // Performance
  accuracy: number;
  timeSpentMinutes: number;
  hintsUsed: number;
  attempts: number;
  
  // Progression Impact
  levelBefore: number;
  levelAfter: number;
  leveledUp: boolean;
  
  // New Unlocks
  newAchievements: EarnedAchievement[];
  newBadges: EarnedBadge[];
  
  // Streak Status
  streakBefore: number;
  streakAfter: number;
  streakContinued: boolean;
  
  // Next Steps
  nextLessonId?: string;
  completionPercentage: number;
}

// ============================================================================
// Configuration Types
// ============================================================================

export interface ProgressionEngineConfig {
  // XP Configuration
  xp: {
    baseLessonXP: number;
    challengeMultiplier: number;
    perfectScoreBonus: number;
    firstTryBonus: number;
    streakBonusPerDay: number;
    maxStreakBonus: number;
    hintPenaltyPercent: number;
    maxHintPenalty: number;
  };
  
  // Level Configuration
  level: LevelConfig;
  
  // Coin Configuration
  coins: {
    baseCoinRate: number; // Coins per XP
    bonusMultipliers: Record<string, number>;
  };
  
  // Streak Configuration
  streak: {
    gracePeriodDays: number;
    recoveryCost?: number; // Future-ready
    maxGracePeriod?: number;
  };
  
  // Challenge Configuration
  challenges: {
    dailyRefreshHour: number;
    weeklyRefreshDay: number;
    maxActiveDaily: number;
    maxActiveWeekly: number;
  };
}

// Default configuration values
export const DEFAULT_PROGRESSION_CONFIG: ProgressionEngineConfig = {
  xp: {
    baseLessonXP: 20,
    challengeMultiplier: 1.5,
    perfectScoreBonus: 25,
    firstTryBonus: 10,
    streakBonusPerDay: 5,
    maxStreakBonus: 50,
    hintPenaltyPercent: 10,
    maxHintPenalty: 50,
  },
  level: {
    baseXP: 100,
    growthFactor: 1.2,
    maxLevel: undefined,
    prestigeEnabled: false,
    prestigeThreshold: 100,
  },
  coins: {
    baseCoinRate: 0.1, // 1 coin per 10 XP
    bonusMultipliers: {
      perfectLesson: 1.5,
      streakBonus: 1.2,
      firstTry: 1.1,
    },
  },
  streak: {
    gracePeriodDays: 1,
    recoveryCost: 100,
    maxGracePeriod: 3,
  },
  challenges: {
    dailyRefreshHour: 0, // Midnight UTC
    weeklyRefreshDay: 1, // Monday
    maxActiveDaily: 3,
    maxActiveWeekly: 5,
  },
};
