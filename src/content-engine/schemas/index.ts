/**
 * ScribbleCode Content Engine - Core Schemas
 * TypeScript interfaces for all learning content types.
 */

// -----------------------------------------------------------------------------
// Base Types
// -----------------------------------------------------------------------------

export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type ContentType = 
  | 'course'
  | 'world'
  | 'chapter'
  | 'lesson'
  | 'quiz'
  | 'boss-battle'
  | 'achievement'
  | 'badge';

export interface LocalizedString {
  en: string;
  es?: string;
  fr?: string;
  de?: string;
  [key: string]: string | undefined;
}

// -----------------------------------------------------------------------------
// Metadata & Tagging
// -----------------------------------------------------------------------------

export interface ContentMetadata {
  version: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  tags: string[];
  keywords: string[];
  category: string;
  technology: string;
  isPublished: boolean;
  isPremium?: boolean;
}

// -----------------------------------------------------------------------------
// Rewards System
// -----------------------------------------------------------------------------

export interface XPReward {
  amount: number;
  type: 'lesson' | 'challenge' | 'boss' | 'achievement' | 'streak' | 'daily';
  description?: string;
}

export interface CoinReward {
  amount: number;
  description?: string;
}

export interface Reward {
  xp: XPReward;
  coins?: CoinReward;
  achievementIds?: string[];
  badgeIds?: string[];
  unlockables?: string[];
}

// -----------------------------------------------------------------------------
// Hints System
// -----------------------------------------------------------------------------

export interface Hint {
  id: string;
  text: string;
  order: number;
  xpPenalty?: number;
}

export interface ProgressiveHints {
  hints: Hint[];
  revealExplanation?: string;
}

// -----------------------------------------------------------------------------
// Challenges
// -----------------------------------------------------------------------------

export type ChallengeType =
  | 'multiple-choice'
  | 'fill-blank'
  | 'ordering'
  | 'matching'
  | 'arrange-code'
  | 'code-repair'
  | 'predict-output'
  | 'drag-drop'
  | 'interactive-simulation'
  | 'code-playground'
  | 'arrange-steps'
  | 'debug-code'
  | 'true-false'
  | 'code-completion';

export interface ChallengeOption {
  id: string;
  text: string;
  isCorrect?: boolean;
  explanation?: string;
}

export interface CodeSnippet {
  code: string;
  language: string;
  highlightLines?: number[];
  isEditable?: boolean;
  expectedOutput?: string;
}

export interface BaseChallenge {
  id: string;
  type: ChallengeType;
  title: string;
  instructions: string;
  xpReward: number;
  difficulty: Difficulty;
  hints?: Hint[];
  feedback?: {
    correct: string;
    incorrect: string;
  };
  metadata?: Record<string, any>;
}

export interface MultipleChoiceChallenge extends BaseChallenge {
  type: 'multiple-choice';
  options: ChallengeOption[];
  allowMultiple?: boolean;
}

export interface FillBlankChallenge extends BaseChallenge {
  type: 'fill-blank';
  blanks: {
    id: string;
    acceptedAnswers: string[];
    placeholder?: string;
    caseSensitive?: boolean;
  }[];
  context?: CodeSnippet;
}

export interface OrderingChallenge extends BaseChallenge {
  type: 'ordering';
  items: {
    id: string;
    text: string;
    correctOrder: number;
  }[];
}

export interface MatchingChallenge extends BaseChallenge {
  type: 'matching';
  pairs: {
    leftId: string;
    leftText: string;
    rightId: string;
    rightText: string;
  }[];
}

export interface ArrangeCodeChallenge extends BaseChallenge {
  type: 'arrange-code';
  lines: {
    id: string;
    code: string;
    correctOrder: number;
    indentLevel?: number;
  }[];
}

export interface CodeRepairChallenge extends BaseChallenge {
  type: 'code-repair';
  brokenCode: CodeSnippet;
  errors: {
    line: number;
    description: string;
    fix: string;
  }[];
}

export interface PredictOutputChallenge extends BaseChallenge {
  type: 'predict-output';
  code: CodeSnippet;
  options: ChallengeOption[];
}

export interface DragDropChallenge extends BaseChallenge {
  type: 'drag-drop';
  dropZones: {
    id: string;
    label: string;
    acceptedItems: string[];
  }[];
  draggableItems: {
    id: string;
    label: string;
    content: string;
  }[];
}

export interface InteractiveSimulationChallenge extends BaseChallenge {
  type: 'interactive-simulation';
  simulationConfig: Record<string, any>;
  targetState: Record<string, any>;
}

export interface CodePlaygroundChallenge extends BaseChallenge {
  type: 'code-playground';
  starterCode: CodeSnippet;
  tests: {
    id: string;
    description: string;
    testCode?: string;
    expectedOutput?: string;
  }[];
  constraints?: {
    maxLines?: number;
    forbiddenKeywords?: string[];
    requiredKeywords?: string[];
  };
}

export interface ArrangeStepsChallenge extends BaseChallenge {
  type: 'arrange-steps';
  steps: {
    id: string;
    text: string;
    correctOrder: number;
  }[];
}

export interface DebugCodeChallenge extends BaseChallenge {
  type: 'debug-code';
  code: CodeSnippet;
  bugs: {
    id: string;
    line: number;
    description: string;
    severity: 'error' | 'warning' | 'logic';
  }[];
}

export interface TrueFalseChallenge extends BaseChallenge {
  type: 'true-false';
  statement: string;
  correctAnswer: boolean;
  explanation: string;
}

export interface CodeCompletionChallenge extends BaseChallenge {
  type: 'code-completion';
  codeTemplate: CodeSnippet;
  completions: {
    id: string;
    line: number;
    column: number;
    acceptedAnswers: string[];
  }[];
}

export type Challenge =
  | MultipleChoiceChallenge
  | FillBlankChallenge
  | OrderingChallenge
  | MatchingChallenge
  | ArrangeCodeChallenge
  | CodeRepairChallenge
  | PredictOutputChallenge
  | DragDropChallenge
  | InteractiveSimulationChallenge
  | CodePlaygroundChallenge
  | ArrangeStepsChallenge
  | DebugCodeChallenge
  | TrueFalseChallenge
  | CodeCompletionChallenge;

// -----------------------------------------------------------------------------
// Lesson Sections
// -----------------------------------------------------------------------------

export type SectionType =
  | 'reading'
  | 'interactive-explanation'
  | 'multiple-choice'
  | 'fill-blank'
  | 'ordering'
  | 'matching'
  | 'arrange-code'
  | 'code-repair'
  | 'predict-output'
  | 'drag-drop'
  | 'interactive-demo'
  | 'live-playground'
  | 'reflection'
  | 'mini-project'
  | 'boss-battle';

export interface ReadingContent {
  markdown: string;
  codeExamples?: CodeSnippet[];
  images?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
}

export interface InteractiveExplanation {
  steps: {
    id: string;
    title: string;
    content: string;
    codeExample?: CodeSnippet;
    interaction?: {
      type: 'click' | 'hover' | 'input';
      target: string;
      response: string;
    };
  }[];
}

export interface ReflectionQuestion {
  prompt: string;
  guidance?: string;
  exampleAnswer?: string;
  minLength?: number;
}

export interface BaseSection {
  id: string;
  type: SectionType;
  title: string;
  order: number;
  isRequired: boolean;
  estimatedTimeMinutes?: number;
}

export interface ReadingSection extends BaseSection {
  type: 'reading';
  content: ReadingContent;
}

export interface InteractiveExplanationSection extends BaseSection {
  type: 'interactive-explanation';
  content: InteractiveExplanation;
}

export interface ChallengeSection extends BaseSection {
  type: SectionType; // Any challenge type
  challenge: Challenge;
}

export interface PlaygroundSection extends BaseSection {
  type: 'live-playground';
  challenge: CodePlaygroundChallenge;
  instructions: string;
}

export interface ReflectionSection extends BaseSection {
  type: 'reflection';
  question: ReflectionQuestion;
  isSkippable?: boolean;
}

export interface MiniProjectSection extends BaseSection {
  type: 'mini-project';
  description: string;
  requirements: string[];
  starterCode?: CodeSnippet;
  deliverables: string[];
  rubric: {
    criteria: string;
    points: number;
  }[];
}

export interface BossBattleSection extends BaseSection {
  type: 'boss-battle';
  bossName: string;
  narrative: string;
  challenges: Challenge[];
  completionRequirement: 'all' | 'any' | 'sequential';
  reward: Reward;
}

export type Section =
  | ReadingSection
  | InteractiveExplanationSection
  | ChallengeSection
  | PlaygroundSection
  | ReflectionSection
  | MiniProjectSection
  | BossBattleSection;

// -----------------------------------------------------------------------------
// Lesson
// -----------------------------------------------------------------------------

export interface LearningObjective {
  id: string;
  description: string;
  bloomLevel?: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';
}

export interface Prerequisite {
  type: 'lesson' | 'chapter' | 'world' | 'xp' | 'boss' | 'streak';
  id?: string;
  xpThreshold?: number;
  streakDays?: number;
}

export interface CompletionCondition {
  type: 'all_sections' | 'challenges' | 'reflection' | 'playground' | 'boss';
  minAccuracy?: number;
  requiredSections?: string[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: SectionType;
  difficulty: Difficulty;
  estimatedTimeMinutes: number;
  learningObjectives: LearningObjective[];
  prerequisites?: Prerequisite[];
  sections: Section[];
  xpReward: number;
  coinReward: number;
  achievementHooks?: string[];
  missionNarrative?: string;
  completionConditions?: CompletionCondition;
  nextLessonId?: string;
  prevLessonId?: string;
  metadata: ContentMetadata;
  tags: string[];
  keywords: string[];
}

// -----------------------------------------------------------------------------
// Chapter
// -----------------------------------------------------------------------------

export interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: string[]; // Lesson IDs
  xpReward: number;
  coinReward: number;
  bossBattleId?: string;
  quizId?: string;
  metadata: ContentMetadata;
}

// -----------------------------------------------------------------------------
// World
// -----------------------------------------------------------------------------

export interface World {
  id: string;
  title: string;
  description: string;
  theme: string;
  chapters: string[]; // Chapter IDs
  xpReward: number;
  coinReward: number;
  bossBattleId?: string;
  metadata: ContentMetadata;
}

// -----------------------------------------------------------------------------
// Course
// -----------------------------------------------------------------------------

export interface Course {
  id: string;
  title: string;
  description: string;
  technology: string;
  worlds: string[]; // World IDs
  totalXP: number;
  estimatedHours: number;
  difficulty: Difficulty;
  metadata: ContentMetadata;
}

// -----------------------------------------------------------------------------
// Quiz
// -----------------------------------------------------------------------------

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Challenge[];
  passingScore: number; // Percentage
  xpReward: number;
  coinReward: number;
  timeLimitMinutes?: number;
  metadata: ContentMetadata;
}

// -----------------------------------------------------------------------------
// Boss Battle
// -----------------------------------------------------------------------------

export interface BossBattle {
  id: string;
  title: string;
  bossName: string;
  narrative: string;
  description: string;
  challenges: Challenge[];
  completionRequirement: 'all' | 'any' | 'sequential';
  xpReward: number;
  coinReward: number;
  achievementIds: string[];
  metadata: ContentMetadata;
}

// -----------------------------------------------------------------------------
// Achievements & Badges
// -----------------------------------------------------------------------------

export type AchievementCategory =
  | 'progress'
  | 'mastery'
  | 'streak'
  | 'speed'
  | 'perfection'
  | 'exploration'
  | 'social'
  | 'seasonal';

export type AchievementRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  trigger: {
    type: string;
    condition: Record<string, any>;
  };
  xpReward: number;
  isHidden: boolean;
  metadata: ContentMetadata;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirement: {
    type: string;
    condition: Record<string, any>;
  };
  isAnimated?: boolean;
  metadata: ContentMetadata;
}

// -----------------------------------------------------------------------------
// Progress Tracking
// -----------------------------------------------------------------------------

export interface UserProgress {
  userId: string;
  completedLessons: string[];
  completedChapters: string[];
  completedWorlds: string[];
  totalXP: number;
  totalCoins: number;
  currentStreak: number;
  longestStreak: number;
  achievements: string[];
  badges: string[];
  lessonHistory: {
    lessonId: string;
    completedAt: string;
    xpEarned: number;
    accuracy: number;
  }[];
}

// -----------------------------------------------------------------------------
// Unlock Rules
// -----------------------------------------------------------------------------

export interface UnlockRule {
  type: 'lesson_complete' | 'xp_threshold' | 'boss_complete' | 'chapter_complete' | 'streak';
  targetId?: string;
  threshold?: number;
}

export interface UnlockableContent {
  id: string;
  unlockRules: UnlockRule[];
  isLocked: boolean;
}
