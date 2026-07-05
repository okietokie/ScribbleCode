/**
 * ScribbleCode Progression Engine - Badge System
 * 
 * Collectible badges with tier system (Bronze, Silver, Gold, Platinum, Legendary).
 * Badges serve as visual representations of accomplishments.
 */

import { BadgeDefinition, EarnedBadge, PlayerStatistics } from '../types';

/**
 * Default badge definitions
 */
export const DEFAULT_BADGES: BadgeDefinition[] = [
  // Beginner Badges
  {
    id: 'hello_world',
    name: 'Hello World',
    description: 'Write your first line of code',
    icon: '👋',
    tier: 'bronze',
    category: 'beginner',
    requirement: {
      type: 'lesson_complete',
      condition: { count: 1 },
    },
    isAnimated: false,
  },
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first chapter',
    icon: '👣',
    tier: 'bronze',
    category: 'beginner',
    requirement: {
      type: 'chapter_complete',
      condition: { count: 1 },
    },
    isAnimated: false,
  },
  
  // Intermediate Badges
  {
    id: 'code_explorer',
    name: 'Code Explorer',
    description: 'Complete 25 lessons',
    icon: '🧭',
    tier: 'silver',
    category: 'intermediate',
    requirement: {
      type: 'lesson_complete',
      condition: { count: 25 },
    },
    isAnimated: false,
  },
  {
    id: 'challenge_master',
    name: 'Challenge Master',
    description: 'Complete 50 challenges',
    icon: '🏅',
    tier: 'silver',
    category: 'intermediate',
    requirement: {
      type: 'challenge_complete',
      condition: { count: 50 },
    },
    isAnimated: true,
  },
  
  // Advanced Badges
  {
    id: 'react_ninja',
    name: 'React Ninja',
    description: 'Master all React basics lessons',
    icon: '⚛️',
    tier: 'gold',
    category: 'advanced',
    requirement: {
      type: 'course_complete',
      condition: { course: 'react-basics' },
    },
    isAnimated: true,
  },
  {
    id: 'bug_hunter',
    name: 'Bug Hunter',
    description: 'Fix 100 bugs in challenges',
    icon: '🐛',
    tier: 'gold',
    category: 'advanced',
    requirement: {
      type: 'bugs_fixed',
      condition: { count: 100 },
    },
    isAnimated: true,
  },
  
  // Expert Badges
  {
    id: 'full_stack',
    name: 'Full Stack Developer',
    description: 'Complete courses in both frontend and backend',
    icon: '🌐',
    tier: 'platinum',
    category: 'expert',
    requirement: {
      type: 'courses_complete',
      condition: { categories: ['frontend', 'backend'], count: 2 },
    },
    isAnimated: true,
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Complete a lesson in under 2 minutes with perfect score',
    icon: '⚡',
    tier: 'platinum',
    category: 'expert',
    requirement: {
      type: 'speed_perfect',
      condition: { timeMinutes: 2, accuracy: 100 },
    },
    isAnimated: true,
  },
  
  // Legendary Badges
  {
    id: 'scribblecode_legend',
    name: 'ScribbleCode Legend',
    description: 'Reach level 50',
    icon: '👑',
    tier: 'legendary',
    category: 'legendary',
    requirement: {
      type: 'level_reach',
      condition: { level: 50 },
    },
    isAnimated: true,
  },
  {
    id: 'perfect_journey',
    name: 'Perfect Journey',
    description: 'Complete an entire world without using hints',
    icon: '✨',
    tier: 'legendary',
    category: 'legendary',
    requirement: {
      type: 'world_perfect',
      condition: { hintsUsed: 0 },
    },
    isAnimated: true,
  },
];

/**
 * Check if a badge requirement is met
 */
export function checkBadgeRequirement(
  requirement: BadgeDefinition['requirement'],
  stats: PlayerStatistics,
  level: number
): boolean {
  switch (requirement.type) {
    case 'lesson_complete':
      return stats.lessonsCompleted >= (requirement.condition.count || 1);
    
    case 'chapter_complete':
      return stats.chaptersCompleted >= (requirement.condition.count || 1);
    
    case 'challenge_complete':
      return stats.challengesCompleted >= (requirement.condition.count || 1);
    
    case 'course_complete':
      // Would need course-specific tracking
      return false;
    
    case 'bugs_fixed':
      // Would need bug fix tracking
      return false;
    
    case 'courses_complete':
      // Would need multi-course tracking
      return false;
    
    case 'speed_perfect':
      // Would need speed tracking per lesson
      return false;
    
    case 'level_reach':
      return level >= (requirement.condition.level || 1);
    
    case 'world_perfect':
      // Would need world-level hint tracking
      return false;
    
    default:
      return false;
  }
}

/**
 * Evaluate all badges against player stats
 * Returns newly earned badges
 */
export function evaluateBadges(
  badges: BadgeDefinition[],
  earnedBadgeIds: string[],
  stats: PlayerStatistics,
  level: number
): EarnedBadge[] {
  const newBadges: EarnedBadge[] = [];
  
  for (const badge of badges) {
    // Skip already earned badges
    if (earnedBadgeIds.includes(badge.id)) {
      continue;
    }
    
    // Check if requirement is met
    if (checkBadgeRequirement(badge.requirement, stats, level)) {
      newBadges.push({
        ...badge,
        earnedAt: new Date().toISOString(),
        context: {
          evaluatedAt: new Date().toISOString(),
          statsSnapshot: { ...stats },
          level,
        },
      });
    }
  }
  
  return newBadges;
}

/**
 * Get badges by tier
 */
export function getBadgesByTier(
  badges: BadgeDefinition[],
  tier: string
): BadgeDefinition[] {
  return badges.filter(b => b.tier === tier);
}

/**
 * Get badges by category
 */
export function getBadgesByCategory(
  badges: BadgeDefinition[],
  category: string
): BadgeDefinition[] {
  return badges.filter(b => b.category === category);
}

/**
 * Calculate badge collection progress
 */
export function getBadgeCollectionProgress(
  earnedIds: string[],
  totalBadges: number
): {
  percentage: number;
  earned: number;
  remaining: number;
} {
  const earned = earnedIds.length;
  const remaining = totalBadges - earned;
  const percentage = totalBadges > 0 ? Math.round((earned / totalBadges) * 100) : 0;
  
  return {
    percentage,
    earned,
    remaining,
  };
}

/**
 * Get tier color/styling for UI
 */
export function getTierStyle(tier: string): {
  color: string;
  gradient: string;
  borderColor: string;
  shadowColor: string;
} {
  const styles: Record<string, { color: string; gradient: string; borderColor: string; shadowColor: string }> = {
    bronze: {
      color: '#cd7f32',
      gradient: 'linear-gradient(135deg, #cd7f32 0%, #8b4513 100%)',
      borderColor: '#daa520',
      shadowColor: 'rgba(205, 127, 50, 0.4)',
    },
    silver: {
      color: '#c0c0c0',
      gradient: 'linear-gradient(135deg, #e8e8e8 0%, #a0a0a0 100%)',
      borderColor: '#d3d3d3',
      shadowColor: 'rgba(192, 192, 192, 0.4)',
    },
    gold: {
      color: '#ffd700',
      gradient: 'linear-gradient(135deg, #ffd700 0%, #b8860b 100%)',
      borderColor: '#ffec8b',
      shadowColor: 'rgba(255, 215, 0, 0.5)',
    },
    platinum: {
      color: '#e5e4e2',
      gradient: 'linear-gradient(135deg, #ffffff 0%, #e5e4e2 50%, #cccccc 100%)',
      borderColor: '#f0f0f0',
      shadowColor: 'rgba(229, 228, 226, 0.5)',
    },
    legendary: {
      color: '#ff6b6b',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ffd700 50%, #ff6b6b 100%)',
      borderColor: '#ff8787',
      shadowColor: 'rgba(255, 107, 107, 0.6)',
    },
  };
  
  return styles[tier] || styles.bronze;
}

/**
 * Format badge earned date for display
 */
export function formatBadgeEarnedDate(earnedAt: string): string {
  const date = new Date(earnedAt);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
