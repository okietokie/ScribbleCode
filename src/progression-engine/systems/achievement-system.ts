/**
 * ScribbleCode Progression Engine - Achievement System
 * 
 * Data-driven achievement evaluation and tracking.
 * Achievements are defined in content/metadata and evaluated automatically.
 */

import {
  AchievementDefinition,
  EarnedAchievement,
  PlayerStatistics,
  LessonProgressRecord,
  AchievementTriggerCondition,
} from '../types';

/**
 * Built-in achievement definitions that can be extended via metadata
 */
export const DEFAULT_ACHIEVEMENTS: AchievementDefinition[] = [
  // Progress Achievements
  {
    id: 'first_lesson',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    category: 'progress',
    rarity: 'common',
    trigger: {
      type: 'lesson_complete',
      condition: { count: 1 } as AchievementTriggerCondition,
    },
    xpReward: 25,
    coinReward: 10,
    isHidden: false,
  },
  {
    id: 'ten_lessons',
    name: 'Getting Started',
    description: 'Complete 10 lessons',
    icon: '📚',
    category: 'progress',
    rarity: 'uncommon',
    trigger: {
      type: 'lesson_complete',
      condition: { count: 10 } as AchievementTriggerCondition,
    },
    xpReward: 50,
    coinReward: 25,
    isHidden: false,
  },
  {
    id: 'fifty_lessons',
    name: 'Dedicated Learner',
    description: 'Complete 50 lessons',
    icon: '🏆',
    category: 'progress',
    rarity: 'rare',
    trigger: {
      type: 'lesson_complete',
      condition: { count: 50 } as AchievementTriggerCondition,
    },
    xpReward: 100,
    coinReward: 50,
    isHidden: false,
  },
  {
    id: 'hundred_lessons',
    name: 'Master Student',
    description: 'Complete 100 lessons',
    icon: '👑',
    category: 'progress',
    rarity: 'epic',
    trigger: {
      type: 'lesson_complete',
      condition: { count: 100 } as AchievementTriggerCondition,
    },
    xpReward: 250,
    coinReward: 100,
    isHidden: false,
  },
  
  // Mastery Achievements
  {
    id: 'perfect_score',
    name: 'Perfectionist',
    description: 'Complete a lesson with perfect accuracy',
    icon: '💯',
    category: 'mastery',
    rarity: 'uncommon',
    trigger: {
      type: 'lesson_perfect',
      condition: { accuracy: 100 } as AchievementTriggerCondition,
    },
    xpReward: 30,
    coinReward: 15,
    isHidden: false,
  },
  {
    id: 'no_hints',
    name: 'Self-Sufficient',
    description: 'Complete a lesson without using any hints',
    icon: '🧠',
    category: 'mastery',
    rarity: 'uncommon',
    trigger: {
      type: 'lesson_no_hints',
      condition: { hintsUsed: 0 } as AchievementTriggerCondition,
    },
    xpReward: 25,
    coinReward: 10,
    isHidden: false,
  },
  {
    id: 'first_try_hero',
    name: 'First Try Hero',
    description: 'Complete 10 challenges on the first attempt',
    icon: '⚡',
    category: 'mastery',
    rarity: 'rare',
    trigger: {
      type: 'first_attempt',
      condition: { count: 10 } as AchievementTriggerCondition,
    },
    xpReward: 75,
    coinReward: 40,
    isHidden: false,
  },
  
  // Streak Achievements
  {
    id: 'week_streak',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    category: 'streak',
    rarity: 'uncommon',
    trigger: {
      type: 'streak',
      condition: { days: 7 } as AchievementTriggerCondition,
    },
    xpReward: 50,
    coinReward: 25,
    isHidden: false,
  },
  {
    id: 'month_streak',
    name: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    icon: '🌟',
    category: 'streak',
    rarity: 'rare',
    trigger: {
      type: 'streak',
      condition: { days: 30 } as AchievementTriggerCondition,
    },
    xpReward: 150,
    coinReward: 75,
    isHidden: false,
  },
  {
    id: 'year_streak',
    name: 'Yearly Legend',
    description: 'Maintain a 365-day streak',
    icon: '👑',
    category: 'streak',
    rarity: 'legendary',
    trigger: {
      type: 'streak',
      condition: { days: 365 } as AchievementTriggerCondition,
    },
    xpReward: 500,
    coinReward: 250,
    isHidden: false,
  },
  
  // Speed Achievements
  {
    id: 'speed_learner',
    name: 'Speed Learner',
    description: 'Complete 5 lessons in one day',
    icon: '🏃',
    category: 'speed',
    rarity: 'rare',
    trigger: {
      type: 'lessons_per_day',
      condition: { count: 5, period: 'day' } as AchievementTriggerCondition,
    },
    xpReward: 75,
    coinReward: 40,
    isHidden: false,
  },
  
  // Exploration Achievements
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Visit all regions in a world',
    icon: '🗺️',
    category: 'exploration',
    rarity: 'uncommon',
    trigger: {
      type: 'world_explore',
      condition: { regionsVisited: 'all' } as AchievementTriggerCondition,
    },
    xpReward: 40,
    coinReward: 20,
    isHidden: false,
  },
  {
    id: 'hidden_discovery',
    name: 'Secret Finder',
    description: 'Discover a hidden easter egg',
    icon: '🥚',
    category: 'exploration',
    rarity: 'rare',
    trigger: {
      type: 'discovery',
      condition: { type: 'easter_egg' } as AchievementTriggerCondition,
    },
    xpReward: 100,
    coinReward: 50,
    isHidden: true,
  },
  
  // Boss Achievements
  {
    id: 'first_boss',
    name: 'Boss Slayer',
    description: 'Defeat your first boss',
    icon: '⚔️',
    category: 'mastery',
    rarity: 'uncommon',
    trigger: {
      type: 'boss_defeat',
      condition: { count: 1 },
    },
    xpReward: 75,
    coinReward: 40,
    isHidden: false,
  },
  {
    id: 'boss_master',
    name: 'Boss Master',
    description: 'Defeat 10 bosses',
    icon: '🐲',
    category: 'mastery',
    rarity: 'epic',
    trigger: {
      type: 'boss_defeat',
      condition: { count: 10 },
    },
    xpReward: 200,
    coinReward: 100,
    isHidden: false,
  },
  
  // XP Milestones
  {
    id: 'thousand_xp',
    name: 'XP Collector',
    description: 'Earn 1,000 total XP',
    icon: '✨',
    category: 'progress',
    rarity: 'common',
    trigger: {
      type: 'xp_milestone',
      condition: { total: 1000 },
    },
    xpReward: 50,
    coinReward: 25,
    isHidden: false,
  },
  {
    id: 'ten_thousand_xp',
    name: 'XP Master',
    description: 'Earn 10,000 total XP',
    icon: '💫',
    category: 'progress',
    rarity: 'rare',
    trigger: {
      type: 'xp_milestone',
      condition: { total: 10000 },
    },
    xpReward: 150,
    coinReward: 75,
    isHidden: false,
  },
];

/**
 * Check if an achievement condition is met
 */
export function checkAchievementCondition(
  condition: AchievementTriggerCondition,
  stats: PlayerStatistics,
  recentLesson?: LessonProgressRecord
): boolean {
  switch (condition.type) {
    case 'lesson_complete':
      return stats.lessonsCompleted >= (condition.threshold || 1);
    
    case 'lesson_perfect':
      if (!recentLesson) return false;
      return recentLesson.accuracy >= 100;
    
    case 'lesson_no_hints':
      if (!recentLesson) return false;
      return recentLesson.hintsUsed === 0;
    
    case 'first_attempt':
      return stats.firstAttemptSuccesses >= (condition.threshold || 1);
    
    case 'streak':
      return stats.currentStreak >= (condition.threshold || 1);
    
    case 'lessons_per_day':
      // This would need daily tracking - simplified for now
      return false;
    
    case 'world_explore':
      return stats.worldsCompleted >= 1;
    
    case 'discovery':
      // Handled by specific discovery events
      return false;
    
    case 'boss_defeat':
      return stats.bossBattlesCompleted >= (condition.threshold || 1);
    
    case 'xp_milestone':
      return stats.totalXP >= (condition.threshold || 1);
    
    default:
      return false;
  }
}

/**
 * Evaluate all achievements against player stats
 * Returns newly unlocked achievements
 */
export function evaluateAchievements(
  achievements: AchievementDefinition[],
  earnedAchievementIds: string[],
  stats: PlayerStatistics,
  recentLesson?: LessonProgressRecord
): EarnedAchievement[] {
  const newAchievements: EarnedAchievement[] = [];
  
  for (const achievement of achievements) {
    // Skip already earned achievements
    if (earnedAchievementIds.includes(achievement.id)) {
      continue;
    }
    
    // Skip hidden achievements unless specifically triggered
    if (achievement.isHidden) {
      continue;
    }
    
    // Check if condition is met
    if (checkAchievementCondition(achievement.trigger.condition, stats, recentLesson)) {
      newAchievements.push({
        ...achievement,
        earnedAt: new Date().toISOString(),
        context: {
          evaluatedAt: new Date().toISOString(),
          statsSnapshot: { ...stats },
        },
      });
    }
  }
  
  return newAchievements;
}

/**
 * Get achievements by category
 */
export function getAchievementsByCategory(
  achievements: AchievementDefinition[],
  category: string
): AchievementDefinition[] {
  return achievements.filter(a => a.category === category);
}

/**
 * Get achievements by rarity
 */
export function getAchievementsByRarity(
  achievements: AchievementDefinition[],
  rarity: string
): AchievementDefinition[] {
  return achievements.filter(a => a.rarity === rarity);
}

/**
 * Calculate achievement completion percentage
 */
export function getAchievementProgress(
  earnedIds: string[],
  totalAchievements: number
): number {
  if (totalAchievements === 0) return 0;
  return Math.round((earnedIds.length / totalAchievements) * 100);
}

/**
 * Get rarity color/class mapping for UI
 */
export function getRarityStyle(rarity: string): {
  color: string;
  borderColor: string;
  glowColor: string;
} {
  const styles: Record<string, { color: string; borderColor: string; glowColor: string }> = {
    common: {
      color: '#6b7280',
      borderColor: '#9ca3af',
      glowColor: 'rgba(156, 163, 175, 0.3)',
    },
    uncommon: {
      color: '#22c55e',
      borderColor: '#4ade80',
      glowColor: 'rgba(74, 222, 128, 0.3)',
    },
    rare: {
      color: '#3b82f6',
      borderColor: '#60a5fa',
      glowColor: 'rgba(96, 165, 250, 0.3)',
    },
    epic: {
      color: '#a855f7',
      borderColor: '#c084fc',
      glowColor: 'rgba(192, 132, 252, 0.3)',
    },
    legendary: {
      color: '#f59e0b',
      borderColor: '#fbbf24',
      glowColor: 'rgba(251, 191, 36, 0.5)',
    },
  };
  
  return styles[rarity] || styles.common;
}
