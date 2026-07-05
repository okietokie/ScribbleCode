/**
 * ScribbleCode Progression Engine - Level Calculator
 * 
 * Calculates player levels based on XP with configurable formulas.
 * Supports unlimited levels and future prestige system.
 */

import { LevelConfig, LevelInfo, LevelUpResult } from '../types';
import { DEFAULT_PROGRESSION_CONFIG } from '../types';

/**
 * Calculate the XP required to reach a specific level
 * Formula: baseXP * (growthFactor ^ (level - 1))
 */
export function getXPForLevel(level: number, config: LevelConfig): number {
  if (level <= 1) return 0;
  
  const { baseXP, growthFactor } = config;
  return Math.floor(baseXP * Math.pow(growthFactor, level - 1));
}

/**
 * Calculate total cumulative XP needed to reach a level
 */
export function getCumulativeXPForLevel(level: number, config: LevelConfig): number {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += getXPForLevel(i + 1, config);
  }
  return total;
}

/**
 * Calculate current level info from total XP
 */
export function calculateLevelFromXP(
  totalXP: number,
  config: LevelConfig = DEFAULT_PROGRESSION_CONFIG.level
): LevelInfo {
  let currentLevel = 1;
  let cumulativeXP = 0;
  
  // Find current level
  while (true) {
    const xpForNextLevel = getXPForLevel(currentLevel + 1, config);
    if (cumulativeXP + xpForNextLevel > totalXP) {
      break;
    }
    cumulativeXP += xpForNextLevel;
    currentLevel++;
    
    // Safety check for infinite loops
    if (currentLevel > 10000) {
      break;
    }
  }
  
  const xpForCurrentLevel = getXPForLevel(currentLevel, config);
  const xpForNextLevel = getXPForLevel(currentLevel + 1, config);
  const xpInCurrentLevel = totalXP - cumulativeXP;
  const progressToNextLevel = xpForNextLevel > 0 ? xpInCurrentLevel / xpForNextLevel : 1;
  const overflowXP = Math.max(0, xpInCurrentLevel - xpForNextLevel);
  
  return {
    currentLevel,
    currentXP: totalXP,
    xpForCurrentLevel,
    xpForNextLevel,
    progressToNextLevel: Math.min(1, Math.max(0, progressToNextLevel)),
    overflowXP,
  };
}

/**
 * Calculate level-up result when XP is added
 */
export function calculateLevelUp(
  currentTotalXP: number,
  xpGained: number,
  config: LevelConfig = DEFAULT_PROGRESSION_CONFIG.level
): LevelUpResult {
  const previousLevel = calculateLevelFromXP(currentTotalXP, config);
  const newTotalXP = currentTotalXP + xpGained;
  const newLevel = calculateLevelFromXP(newTotalXP, config);
  
  return {
    leveledUp: newLevel.currentLevel > previousLevel.currentLevel,
    newLevel: newLevel.currentLevel,
    levelsGained: newLevel.currentLevel - previousLevel.currentLevel,
    overflowXP: newLevel.overflowXP,
    previousLevel: previousLevel.currentLevel,
  };
}

/**
 * Get the total XP needed to reach max level (if configured)
 */
export function getMaxLevelXP(config: LevelConfig): number | null {
  if (!config.maxLevel) return null;
  return getCumulativeXPForLevel(config.maxLevel, config);
}

/**
 * Check if prestige is available
 */
export function canPrestige(totalXP: number, config: LevelConfig): boolean {
  if (!config.prestigeEnabled || !config.prestigeThreshold) return false;
  return totalXP >= config.prestigeThreshold;
}

/**
 * Calculate prestige rank from total XP
 */
export function calculatePrestigeRank(
  totalXP: number,
  config: LevelConfig
): number {
  if (!config.prestigeEnabled || !config.prestigeThreshold) return 0;
  return Math.floor(totalXP / config.prestigeThreshold);
}

/**
 * Get level info with prestige support
 */
export function getLevelInfoWithPrestige(
  totalXP: number,
  config: LevelConfig = DEFAULT_PROGRESSION_CONFIG.level
): LevelInfo {
  const baseLevelInfo = calculateLevelFromXP(totalXP, config);
  
  if (!config.prestigeEnabled || !config.prestigeThreshold) {
    return baseLevelInfo;
  }
  
  const prestigeRank = calculatePrestigeRank(totalXP, config);
  const xpAfterPrestige = totalXP % config.prestigeThreshold;
  const levelAfterPrestige = calculateLevelFromXP(xpAfterPrestige, config);
  
  return {
    ...levelAfterPrestige,
    isPrestige: prestigeRank > 0,
    prestigeRank,
  };
}

/**
 * Generate smooth progress bar percentage with easing
 */
export function getSmoothProgress(
  currentXP: number,
  xpForCurrentLevel: number,
  xpForNextLevel: number
): number {
  const rawProgress = (currentXP - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel);
  // Apply smooth easing for visual appeal
  return rawProgress * rawProgress * (3 - 2 * rawProgress);
}
