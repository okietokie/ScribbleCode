# ScribbleCode Player Progression Engine

**Version:** 1.8.0  
**Phase:** Phase 1.8  
**Status:** Complete

---

## Overview

The Player Progression Engine is a comprehensive, data-driven system for tracking, calculating, rewarding, and visualizing every aspect of a learner's journey in ScribbleCode.

### Key Principles

1. **Configuration-Driven**: All XP values, thresholds, and rewards come from metadata/configuration, never hardcoded in components.
2. **Modular Architecture**: Each system has a single responsibility with clean interfaces.
3. **Backend-Agnostic**: Designed for frontend-first implementation with easy backend integration later.
4. **Event-Driven**: Loose coupling through event emission for notifications and celebrations.
5. **Accessible**: Full support for keyboard navigation, screen readers, and reduced motion preferences.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Progression Engine                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │     XP       │  │    Level     │  │    Streak    │          │
│  │  Calculator  │  │  Calculator  │  │  Calculator  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Achievement  │  │    Badge     │  │   Player     │          │
│  │   System     │  │   System     │  │   Profile    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
│  ┌──────────────────────────────────────────────────┐           │
│  │              Event Emitter                        │           │
│  │  (Notifications & Celebrations)                   │           │
│  └──────────────────────────────────────────────────┘           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Learning Engine │ │  World Engine   │ │      UI         │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

---

## Core Modules

### 1. XP Calculator (`core/xp-calculator.ts`)

Calculates experience points from various sources with configurable bonuses and penalties.

#### Features
- Base lesson XP from content metadata
- Challenge completion XP with multipliers
- Perfect score bonuses
- First attempt success bonuses
- Streak bonuses (capped)
- Hint penalties (capped)
- Exploration/discovery bonuses (future-ready)
- Boss battle XP
- Daily/Weekly challenge XP

#### Configuration
```typescript
xp: {
  baseLessonXP: 20,
  challengeMultiplier: 1.5,
  perfectScoreBonus: 25,
  firstTryBonus: 10,
  streakBonusPerDay: 5,
  maxStreakBonus: 50,
  hintPenaltyPercent: 10,
  maxHintPenalty: 50,
}
```

#### Usage Example
```typescript
import { calculateLessonXP } from '@scribblecode/progression-engine';

const result = calculateLessonXP({
  baseXP: 30,
  challengesCompleted: 3,
  challengeXP: 15,
  isPerfectScore: true,
  currentStreak: 5,
  hintsUsed: 0,
});

console.log(result.totalXP); // Total XP earned
console.log(result.breakdown); // Detailed breakdown
```

---

### 2. Level Calculator (`core/level-calculator.ts`)

Manages player level progression with exponential growth formula.

#### Features
- Configurable XP thresholds per level
- Unlimited levels support
- Future prestige system support
- Overflow XP handling
- Smooth progress visualization helpers

#### Level Formula
```
XP for Level N = baseXP × (growthFactor ^ (N - 1))
```

Default: baseXP = 100, growthFactor = 1.2

| Level | XP Required | Cumulative XP |
|-------|-------------|---------------|
| 1 → 2 | 100 | 100 |
| 2 → 3 | 120 | 220 |
| 3 → 4 | 144 | 364 |
| 4 → 5 | 173 | 537 |
| 10 | 516 | 2,917 |
| 20 | 2,683 | 23,092 |
| 50 | 36,052 | 430,626 |

#### Usage Example
```typescript
import { calculateLevelFromXP, calculateLevelUp } from '@scribblecode/progression-engine';

// Get current level info
const levelInfo = calculateLevelFromXP(1500);
console.log(levelInfo.currentLevel); // e.g., 7
console.log(levelInfo.progressToNextLevel); // 0.45 (45%)

// Calculate level-up result
const levelUp = calculateLevelUp(1400, 200);
console.log(levelUp.leveledUp); // true
console.log(levelUp.newLevel); // new level number
```

---

### 3. Coin System

Separate economy from XP for future cosmetic purchases.

#### Features
- Coins awarded separately from XP
- Transaction history tracking
- Configurable coin rate (default: 1 coin per 10 XP)
- Bonus multipliers for perfect lessons, streaks
- Future-ready for shop integration

#### Usage Example
```typescript
import { calculateCoinReward } from '@scribblecode/progression-engine';

const coins = calculateCoinReward(
  100, // total XP
  true, // isPerfectLesson
  true  // hasStreakBonus
);
console.log(coins); // ~18 coins with multipliers
```

---

### 4. Streak Calculator (`core/streak-calculator.ts`)

Tracks daily learning consistency with grace period support.

#### Features
- Current streak tracking
- Longest streak record
- Grace period (future-ready)
- Missed day recovery (future-ready)
- Streak history archiving

#### Usage Example
```typescript
import { updateStreak, getStreakStatus } from '@scribblecode/progression-engine';

const result = updateStreak(currentStreakData);
console.log(result.result.streakContinued); // true/false
console.log(result.result.isRecord); // true if new personal best

const status = getStreakStatus(streakData);
console.log(status.message); // "Great! You're on a 7 day streak!"
```

---

### 5. Achievement System (`systems/achievement-system.ts`)

Data-driven achievement evaluation with automatic triggering.

#### Built-in Achievements

| ID | Name | Category | Rarity | Reward |
|----|------|----------|--------|--------|
| first_lesson | First Steps | Progress | Common | 25 XP, 10 coins |
| ten_lessons | Getting Started | Progress | Uncommon | 50 XP, 25 coins |
| fifty_lessons | Dedicated Learner | Progress | Rare | 100 XP, 50 coins |
| hundred_lessons | Master Student | Progress | Epic | 250 XP, 100 coins |
| perfect_score | Perfectionist | Mastery | Uncommon | 30 XP, 15 coins |
| week_streak | Week Warrior | Streak | Uncommon | 50 XP, 25 coins |
| month_streak | Monthly Master | Streak | Rare | 150 XP, 75 coins |
| year_streak | Yearly Legend | Streak | Legendary | 500 XP, 250 coins |
| first_boss | Boss Slayer | Mastery | Uncommon | 75 XP, 40 coins |
| thousand_xp | XP Collector | Progress | Common | 50 XP, 25 coins |

#### Achievement Categories
- `progress` - Milestone-based achievements
- `mastery` - Skill-based achievements
- `streak` - Consistency achievements
- `speed` - Time-based achievements
- `perfection` - Accuracy achievements
- `exploration` - Discovery achievements
- `social` - Community achievements (future)
- `seasonal` - Limited-time achievements (future)

#### Rarity Levels
- `common` - Easy to obtain
- `uncommon` - Moderate effort
- `rare` - Significant accomplishment
- `epic` - Major achievement
- `legendary` - Elite status

#### Usage Example
```typescript
import { evaluateAchievements, DEFAULT_ACHIEVEMENTS } from '@scribblecode/progression-engine';

const newAchievements = evaluateAchievements(
  DEFAULT_ACHIEVEMENTS,
  earnedAchievementIds,
  playerStatistics,
  recentLesson
);

newAchievements.forEach(ach => {
  console.log(`🏆 Unlocked: ${ach.name}`);
});
```

---

### 6. Badge System (`systems/badge-system.ts`)

Collectible visual badges representing accomplishments.

#### Badge Tiers

| Tier | Color | Description |
|------|-------|-------------|
| Bronze | #cd7f32 | Beginner accomplishments |
| Silver | #c0c0c0 | Intermediate milestones |
| Gold | #ffd700 | Advanced achievements |
| Platinum | #e5e4e2 | Expert recognition |
| Legendary | #ff6b6b | Ultimate mastery |

#### Built-in Badges
- Hello World (Bronze) - First line of code
- First Steps (Bronze) - First chapter complete
- Code Explorer (Silver) - 25 lessons
- Challenge Master (Silver) - 50 challenges
- React Ninja (Gold) - Master React basics
- Bug Hunter (Gold) - Fix 100 bugs
- Full Stack (Platinum) - Complete frontend & backend
- Speed Demon (Platinum) - Fast perfect lesson
- ScribbleCode Legend (Legendary) - Reach level 50
- Perfect Journey (Legendary) - World without hints

---

### 7. Event System (`events/event-emitter.ts`)

Centralized event emission for notifications and celebrations.

#### Event Types
- `xp_earned` - XP gained
- `level_up` - Level increased
- `coins_earned` / `coins_spent` - Coin transactions
- `achievement_unlocked` - New achievement
- `badge_earned` - New badge
- `milestone_reached` - Major milestone
- `streak_updated` / `streak_broken` - Streak changes
- `challenge_completed` - Daily/weekly challenge done
- `lesson_completed` / `chapter_completed` / `world_completed`
- `boss_defeated` - Boss battle won

#### Usage Example
```typescript
import { getProgressionEventEmitter } from '@scribblecode/progression-engine';

const emitter = getProgressionEventEmitter();

// Subscribe to level up events
emitter.on('level_up', (event) => {
  console.log(`🎉 Level ${event.payload.newLevel}!`);
  // Trigger celebration animation
});

// Subscribe to all events
emitter.on('*', (event) => {
  console.log(`Event: ${event.type}`, event.payload);
});
```

---

### 8. Player Profile Manager (`core/player-profile.ts`)

Unified interface for all player progression data.

#### Features
- Centralized state management
- Atomic updates across all systems
- Automatic achievement/badge evaluation
- Event emission on changes
- Summary generation for UI

#### Usage Example
```typescript
import { createPlayerProfile, recordLessonCompletion } from '@scribblecode/progression-engine';

// Create new profile
const profile = createPlayerProfile('player-123');

// Record lesson completion
const result = recordLessonCompletion(profile, {
  lessonId: 'react-101-intro',
  completedAt: new Date().toISOString(),
  xpEarned: 45,
  coinsEarned: 5,
  accuracy: 100,
  timeSpentMinutes: 8,
  hintsUsed: 0,
  attempts: 1,
  isFirstAttempt: true,
});

console.log(result.leveledUp); // true/false
console.log(result.newAchievements); // Array of new achievements
console.log(result.newBadges); // Array of new badges
```

---

## Integration Guide

### With Learning Engine

```typescript
// When a lesson completes in the Learning Engine:
import { 
  calculateLessonXP, 
  calculateCoinReward,
  recordLessonCompletion 
} from '@scribblecode/progression-engine';

function onLessonComplete(lesson, progress, playerProfile) {
  // Calculate rewards
  const xpBreakdown = calculateLessonXP({
    baseXP: lesson.xpReward,
    challengesCompleted: progress.challengesCompleted,
    challengeXP: progress.totalChallengeXP,
    isPerfectScore: progress.accuracy === 100,
    isFirstAttemptSuccess: progress.allFirstAttempt,
    currentStreak: playerProfile.streak.currentStreak,
    hintsUsed: progress.totalHintsUsed,
  });
  
  const coins = calculateCoinReward(
    xpBreakdown.totalXP,
    progress.accuracy === 100,
    playerProfile.streak.currentStreak > 0
  );
  
  // Update profile
  const result = recordLessonCompletion(playerProfile, {
    lessonId: lesson.id,
    completedAt: new Date().toISOString(),
    xpEarned: xpBreakdown.totalXP,
    coinsEarned: coins,
    accuracy: progress.accuracy,
    timeSpentMinutes: progress.timeSpent,
    hintsUsed: progress.totalHintsUsed,
    attempts: progress.totalAttempts,
    isFirstAttempt: progress.allFirstAttempt,
  });
  
  return {
    xpBreakdown,
    coins,
    leveledUp: result.leveledUp,
    newAchievements: result.newAchievements,
    newBadges: result.newBadges,
    updatedProfile: result.profile,
  };
}
```

### With World Engine

```typescript
// When a world/chapter completes:
import { getProgressionEventEmitter } from '@scribblecode/progression-engine';

function onWorldComplete(worldId, playerProfile) {
  const emitter = getProgressionEventEmitter();
  
  // Emit world completion event
  emitter.emit('world_completed', {
    worldId,
    worldName: world.title,
    chaptersCompleted: world.chapters.length,
  }, playerProfile.playerId);
  
  // Trigger fireworks celebration
  emitter.emit('celebration', {
    type: 'fireworks',
    intensity: 'high',
    duration: 3000,
  }, playerProfile.playerId);
}
```

---

## Progress Summary Screen

After every lesson, display a summary showing:

```typescript
interface LessonSummary {
  // Rewards
  xpEarned: XPBreakdown;
  coinsEarned: number;
  
  // Performance
  accuracy: number;
  timeSpentMinutes: number;
  hintsUsed: number;
  
  // Progression
  levelBefore: number;
  levelAfter: number;
  leveledUp: boolean;
  
  // New Unlocks
  newAchievements: EarnedAchievement[];
  newBadges: EarnedBadge[];
  
  // Streak
  streakBefore: number;
  streakAfter: number;
  streakContinued: boolean;
  
  // Next Steps
  nextLessonId?: string;
  completionPercentage: number;
}
```

---

## Accessibility

All progression features support:

- **Keyboard Navigation**: Tab through all interactive elements
- **Screen Readers**: ARIA labels for XP gains, level-ups, achievements
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **High Contrast**: Sufficient color contrast for all indicators
- **Announcements**: Live regions for achievement unlocks and level-ups

---

## Performance Considerations

1. **Memoization**: Derived statistics are memoized where possible
2. **Batch Updates**: Multiple changes processed in single transaction
3. **Lazy Evaluation**: Achievements evaluated only on relevant actions
4. **Event Debouncing**: Rapid events can be debounced for UI updates
5. **History Limits**: Event history capped at 100 entries

---

## Future Extensions

### Prestige System
```typescript
// When enabled in config:
level: {
  baseXP: 100,
  growthFactor: 1.2,
  prestigeEnabled: true,
  prestigeThreshold: 100000, // XP needed for prestige
}
```

### Grace Period Recovery
```typescript
// Spend coins to recover broken streak
spendCoins(profile, 100, 'Streak Recovery');
```

### Seasonal Challenges
```typescript
// Add seasonal achievement definitions
const holidayAchievements: AchievementDefinition[] = [
  {
    id: 'holiday_2024',
    name: 'Holiday Coder',
    // ...
  }
];
```

### Social Features
```typescript
// Future social achievements
{
  id: 'study_buddy',
  name: 'Study Buddy',
  trigger: { type: 'collaborative_lessons', condition: { count: 10 } }
}
```

---

## Testing

```typescript
import { describe, it, expect } from 'vitest';
import { calculateLessonXP, calculateLevelFromXP } from '@scribblecode/progression-engine';

describe('XP Calculator', () => {
  it('calculates base lesson XP correctly', () => {
    const result = calculateLessonXP({ baseXP: 20 });
    expect(result.totalXP).toBe(20);
  });
  
  it('applies perfect score bonus', () => {
    const result = calculateLessonXP({
      baseXP: 20,
      isPerfectScore: true,
    });
    expect(result.totalXP).toBe(45); // 20 + 25 bonus
  });
});

describe('Level Calculator', () => {
  it('starts at level 1 with 0 XP', () => {
    const level = calculateLevelFromXP(0);
    expect(level.currentLevel).toBe(1);
    expect(level.progressToNextLevel).toBe(0);
  });
  
  it('levels up at correct thresholds', () => {
    const level = calculateLevelFromXP(100);
    expect(level.currentLevel).toBe(2);
  });
});
```

---

## API Reference

See individual module files for complete API documentation:

- `types/index.ts` - All type definitions
- `core/level-calculator.ts` - Level calculation functions
- `core/xp-calculator.ts` - XP calculation functions
- `core/streak-calculator.ts` - Streak management functions
- `core/player-profile.ts` - Profile management functions
- `systems/achievement-system.ts` - Achievement evaluation
- `systems/badge-system.ts` - Badge evaluation
- `events/event-emitter.ts` - Event system

---

## Version History

- **1.8.0** (Current) - Initial Progression Engine implementation
  - XP, Level, Coin systems
  - Achievement and Badge systems
  - Streak tracking
  - Event emission for notifications/celebrations
  - Player profile management

---

*This documentation is part of ScribbleCode Phase 1.8: Player Progression Engine*
