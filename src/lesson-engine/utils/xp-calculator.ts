/**
 * XP Calculator
 * Calculates rewards based on lesson metadata and user performance.
 * All XP values come from content, never hardcoded.
 */

import { Lesson, Challenge, Achievement } from '../../content-engine/schemas';
import { LessonProgress, ChallengeAttempt } from './types';

export interface XPCalculationConfig {
  baseLessonXP: number;
  challengeBonusMultiplier: number;
  perfectScoreBonus: number;
  firstTryBonus: number;
  streakBonusPerDay: number;
  maxStreakBonus: number;
  hintPenaltyPercent: number;
  maxHintPenalty: number;
}

const DEFAULT_CONFIG: XPCalculationConfig = {
  baseLessonXP: 10,
  challengeBonusMultiplier: 1.5,
  perfectScoreBonus: 20,
  firstTryBonus: 10,
  streakBonusPerDay: 5,
  maxStreakBonus: 50,
  hintPenaltyPercent: 10,
  maxHintPenalty: 50,
};

export interface XPBreakdown {
  baseXP: number;
  challengeXP: number;
  perfectScoreBonus: number;
  firstTryBonus: number;
  streakBonus: number;
  hintPenalty: number;
  totalXP: number;
  coinReward: number;
  breakdown: string[];
}

/**
 * Calculate XP earned for a completed lesson
 */
export function calculateLessonXP(
  lesson: Lesson,
  progress: LessonProgress,
  config: Partial<XPCalculationConfig> = {},
  currentStreak: number = 0
): XPBreakdown {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const breakdown: string[] = [];
  
  // Base lesson XP from lesson metadata
  let baseXP = lesson.xpReward || finalConfig.baseLessonXP;
  breakdown.push(`Base Lesson XP: ${baseXP}`);

  // Calculate challenge XP
  let challengeXP = 0;
  let allChallengesFirstTry = true;
  let totalHintsUsed = 0;
  const challengeAttempts = Object.values(progress.challengeAttempts);
  
  challengeAttempts.forEach(attempt => {
    if (attempt.correct) {
      // Find the challenge to get its XP value
      const challenge = findChallengeInLesson(lesson, attempt.challengeId);
      const challengeBaseXP = challenge?.xpReward || 5;
      
      challengeXP += challengeBaseXP;
      
      if (attempt.attempts > 1) {
        allChallengesFirstTry = false;
      }
      
      totalHintsUsed += attempt.hintsUsed;
    }
  });

  if (challengeXP > 0) {
    breakdown.push(`Challenge XP: ${challengeXP}`);
  }

  // Perfect score bonus (all challenges correct on first try)
  let perfectBonus = 0;
  if (allChallengesFirstTry && challengeAttempts.length > 0 && challengeAttempts.every(a => a.correct)) {
    perfectBonus = finalConfig.perfectScoreBonus;
    breakdown.push(`Perfect Score Bonus: ${perfectBonus}`);
  }

  // First try bonus (for individual challenges)
  let firstTryBonusTotal = 0;
  challengeAttempts.forEach(attempt => {
    if (attempt.correct && attempt.attempts === 1) {
      firstTryBonusTotal += finalConfig.firstTryBonus;
    }
  });
  
  if (!allChallengesFirstTry && firstTryBonusTotal > 0) {
    breakdown.push(`First Try Bonuses: ${firstTryBonusTotal}`);
  }

  // Streak bonus
  let streakBonus = 0;
  if (currentStreak > 0) {
    streakBonus = Math.min(
      currentStreak * finalConfig.streakBonusPerDay,
      finalConfig.maxStreakBonus
    );
    breakdown.push(`Streak Bonus (${currentStreak} days): ${streakBonus}`);
  }

  // Hint penalty
  let hintPenalty = 0;
  if (totalHintsUsed > 0) {
    const penaltyPerHint = baseXP * (finalConfig.hintPenaltyPercent / 100);
    hintPenalty = Math.min(
      penaltyPerHint * totalHintsUsed,
      baseXP * (finalConfig.maxHintPenalty / 100)
    );
    breakdown.push(`Hint Penalty (-${totalHintsUsed} hints): -${Math.round(hintPenalty)}`);
  }

  // Calculate total
  const totalXP = Math.max(
    0,
    Math.round(baseXP + challengeXP + perfectBonus + firstTryBonusTotal + streakBonus - hintPenalty)
  );

  // Coin reward (typically 10% of XP, rounded)
  const coinReward = Math.floor(totalXP / 10);
  if (coinReward > 0) {
    breakdown.push(`Coin Reward: ${coinReward}`);
  }

  return {
    baseXP,
    challengeXP,
    perfectScoreBonus: perfectBonus,
    firstTryBonus: firstTryBonusTotal,
    streakBonus,
    hintPenalty: Math.round(hintPenalty),
    totalXP,
    coinReward,
    breakdown,
  };
}

/**
 * Calculate XP for a single challenge
 */
export function calculateChallengeXP(
  challenge: Challenge,
  attempt: ChallengeAttempt,
  config: Partial<XPCalculationConfig> = {}
): number {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  let xp = challenge.xpReward || 5;

  // Penalty for multiple attempts
  if (attempt.attempts > 1) {
    xp = xp * 0.5; // 50% reduction for retries
  }

  // Penalty for hints
  if (attempt.hintsUsed > 0) {
    const hintPenalty = xp * (finalConfig.hintPenaltyPercent / 100) * attempt.hintsUsed;
    xp -= hintPenalty;
  }

  return Math.max(0, Math.round(xp));
}

/**
 * Helper to find a challenge within a lesson by ID
 */
function findChallengeInLesson(
  lesson: Lesson,
  challengeId: string
): Challenge | undefined {
  for (const section of lesson.sections) {
    if (section.challenge?.id === challengeId) {
      return section.challenge;
    }
    if (section.challenges) {
      const found = section.challenges.find(c => c.id === challengeId);
      if (found) return found;
    }
  }
  return undefined;
}

/**
 * Get potential maximum XP for a lesson (perfect run, no hints)
 */
export function getMaxPossibleXP(lesson: Lesson, config: Partial<XPCalculationConfig> = {}): number {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  let maxXP = lesson.xpReward || finalConfig.baseLessonXP;
  
  // Add all challenge XP
  lesson.sections.forEach(section => {
    if (section.challenge) {
      maxXP += section.challenge.xpReward || 5;
    }
    if (section.challenges) {
      section.challenges.forEach(c => {
        maxXP += c.xpReward || 5;
      });
    }
  });

  // Add perfect score bonus
  maxXP += finalConfig.perfectScoreBonus;

  return maxXP;
}
