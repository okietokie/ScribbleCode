/**
 * ScribbleCode Progression Engine - XP Calculator
 * 
 * Calculates XP rewards based on lesson metadata and user performance.
 * All XP values come from configuration or content metadata, never hardcoded.
 */

import { XPBreakdown, XPSource, ProgressionEngineConfig } from '../types';
import { DEFAULT_PROGRESSION_CONFIG } from '../types';

export interface XPCalculationInput {
  baseXP: number; // From lesson/content metadata
  challengesCompleted?: number;
  challengeXP?: number;
  isPerfectScore?: boolean; // All challenges correct on first try
  isFirstAttemptSuccess?: boolean; // Single challenge first try
  currentStreak?: number;
  hintsUsed?: number;
  timeBonus?: number; // Future-ready for speed bonuses
  explorationBonus?: number; // Future-ready for discovery bonuses
}

/**
 * Calculate XP breakdown for a lesson completion
 */
export function calculateLessonXP(
  input: XPCalculationInput,
  _config: ProgressionEngineConfig = DEFAULT_PROGRESSION_CONFIG
): XPBreakdown {
  const { xp: xpConfig } = _config;
  const sources: XPSource[] = [];
  const breakdown: string[] = [];
  
  // Base lesson XP from content metadata
  let baseXP = input.baseXP || xpConfig.baseLessonXP;
  sources.push({
    type: 'lesson',
    amount: baseXP,
    description: 'Lesson Completion',
  });
  breakdown.push(`Base Lesson XP: ${baseXP}`);
  
  // Challenge XP
  let bonusXP = 0;
  
  if (input.challengeXP && input.challengeXP > 0) {
    const challengeTotal = input.challengeXP * xpConfig.challengeMultiplier;
    bonusXP += challengeTotal;
    sources.push({
      type: 'challenge',
      amount: challengeTotal,
      description: `${input.challengesCompleted} challenges completed`,
      metadata: { count: input.challengesCompleted },
    });
    breakdown.push(`Challenge XP (${input.challengesCompleted}): ${challengeTotal}`);
  }
  
  // Perfect score bonus
  if (input.isPerfectScore) {
    bonusXP += xpConfig.perfectScoreBonus;
    sources.push({
      type: 'achievement',
      amount: xpConfig.perfectScoreBonus,
      description: 'Perfect Score',
    });
    breakdown.push(`Perfect Score Bonus: ${xpConfig.perfectScoreBonus}`);
  }
  
  // First attempt success bonus
  if (input.isFirstAttemptSuccess && !input.isPerfectScore) {
    bonusXP += xpConfig.firstTryBonus;
    sources.push({
      type: 'achievement',
      amount: xpConfig.firstTryBonus,
      description: 'First Attempt Success',
    });
    breakdown.push(`First Try Bonus: ${xpConfig.firstTryBonus}`);
  }
  
  // Streak bonus
  let streakBonus = 0;
  if (input.currentStreak && input.currentStreak > 0) {
    streakBonus = Math.min(
      input.currentStreak * xpConfig.streakBonusPerDay,
      xpConfig.maxStreakBonus
    );
    bonusXP += streakBonus;
    sources.push({
      type: 'streak',
      amount: streakBonus,
      description: `${input.currentStreak} day streak`,
      metadata: { streakDays: input.currentStreak },
    });
    breakdown.push(`Streak Bonus (${input.currentStreak} days): ${streakBonus}`);
  }
  
  // Exploration/discovery bonuses (future-ready)
  if (input.explorationBonus && input.explorationBonus > 0) {
    bonusXP += input.explorationBonus;
    sources.push({
      type: 'exploration',
      amount: input.explorationBonus,
      description: 'Exploration Bonus',
    });
    breakdown.push(`Exploration Bonus: ${input.explorationBonus}`);
  }
  
  // Hint penalty
  let penaltyXP = 0;
  if (input.hintsUsed && input.hintsUsed > 0) {
    const penaltyPerHint = baseXP * (xpConfig.hintPenaltyPercent / 100);
    penaltyXP = Math.min(
      penaltyPerHint * input.hintsUsed,
      baseXP * (xpConfig.maxHintPenalty / 100)
    );
    sources.push({
      type: 'lesson',
      amount: -penaltyXP,
      description: `Hint penalty (-${input.hintsUsed} hints)`,
    });
    breakdown.push(`Hint Penalty (-${input.hintsUsed} hints): -${Math.round(penaltyXP)}`);
  }
  
  // Calculate total
  const totalXP = Math.max(0, Math.round(baseXP + bonusXP - penaltyXP));
  
  return {
    baseXP,
    bonusXP: Math.round(bonusXP),
    penaltyXP: Math.round(penaltyXP),
    totalXP,
    sources,
    breakdown,
  };
}

/**
 * Calculate XP for a single challenge
 */
export function calculateChallengeXP(
  baseXP: number,
  attempts: number,
  hintsUsed: number,
  _config: ProgressionEngineConfig = DEFAULT_PROGRESSION_CONFIG
): number {
  const { xp: xpConfig } = _config;
  
  let xp = baseXP;
  
  // Penalty for multiple attempts
  if (attempts > 1) {
    xp = xp * 0.5; // 50% reduction for retries
  }
  
  // Penalty for hints
  if (hintsUsed > 0) {
    const hintPenalty = xp * (xpConfig.hintPenaltyPercent / 100) * hintsUsed;
    xp -= hintPenalty;
  }
  
  return Math.max(0, Math.round(xp));
}

/**
 * Calculate XP for boss battle completion
 */
export function calculateBossBattleXP(
  baseXP: number,
  perfectClear: boolean,
  _config: ProgressionEngineConfig = DEFAULT_PROGRESSION_CONFIG
): XPBreakdown {
  const { xp: xpConfig } = _config;
  
  const sources: XPSource[] = [
    {
      type: 'boss',
      amount: baseXP,
      description: 'Boss Battle Victory',
    },
  ];
  
  let totalXP = baseXP;
  const breakdown = [`Boss Battle Base XP: ${baseXP}`];
  
  if (perfectClear) {
    const perfectBonus = baseXP * xpConfig.perfectScoreBonus / 100;
    totalXP += perfectBonus;
    sources.push({
      type: 'achievement',
      amount: perfectBonus,
      description: 'Perfect Boss Clear',
    });
    breakdown.push(`Perfect Clear Bonus: ${perfectBonus}`);
  }
  
  return {
    baseXP,
    bonusXP: perfectClear ? Math.round(baseXP * xpConfig.perfectScoreBonus / 100) : 0,
    penaltyXP: 0,
    totalXP: Math.round(totalXP),
    sources,
    breakdown,
  };
}

/**
 * Calculate XP for daily/weekly challenge completion
 */
export function calculateDailyChallengeXP(
  baseXP: number,
  isWeekly: boolean,
  _config: ProgressionEngineConfig = DEFAULT_PROGRESSION_CONFIG
): XPBreakdown {
  const multiplier = isWeekly ? 3 : 1;
  
  return {
    baseXP: baseXP * multiplier,
    bonusXP: 0,
    penaltyXP: 0,
    totalXP: baseXP * multiplier,
    sources: [{
      type: isWeekly ? 'weekly' : 'daily',
      amount: baseXP * multiplier,
      description: isWeekly ? 'Weekly Challenge Complete' : 'Daily Challenge Complete',
    }],
    breakdown: [`${isWeekly ? 'Weekly' : 'Daily'} Challenge XP: ${baseXP * multiplier}`],
  };
}

/**
 * Get potential maximum XP for a lesson (perfect run, no hints, with streak)
 */
export function getMaxPossibleXP(
  baseLessonXP: number,
  totalChallengeXP: number,
  currentStreak: number,
  _config: ProgressionEngineConfig = DEFAULT_PROGRESSION_CONFIG
): number {
  const { xp: xpConfig } = _config;
  
  let maxXP = baseLessonXP;
  maxXP += totalChallengeXP * xpConfig.challengeMultiplier;
  maxXP += xpConfig.perfectScoreBonus;
  
  // Add max streak bonus
  maxXP += Math.min(
    currentStreak * xpConfig.streakBonusPerDay,
    xpConfig.maxStreakBonus
  );
  
  return maxXP;
}

/**
 * Calculate coin reward from XP
 */
export function calculateCoinReward(
  totalXP: number,
  isPerfectLesson: boolean,
  hasStreakBonus: boolean,
  config: ProgressionEngineConfig = DEFAULT_PROGRESSION_CONFIG
): number {
  const { coins } = config;
  
  let coinsEarned = Math.floor(totalXP * coins.baseCoinRate);
  
  // Apply bonus multipliers
  if (isPerfectLesson && coins.bonusMultipliers.perfectLesson) {
    coinsEarned = Math.floor(coinsEarned * coins.bonusMultipliers.perfectLesson);
  }
  
  if (hasStreakBonus && coins.bonusMultipliers.streakBonus) {
    coinsEarned = Math.floor(coinsEarned * coins.bonusMultipliers.streakBonus);
  }
  
  return coinsEarned;
}
