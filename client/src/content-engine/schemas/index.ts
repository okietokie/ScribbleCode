/**
 * ScribbleCode Content Engine - Core Schemas
 * 
 * This module defines all TypeScript interfaces for the learning content system.
 * Every world, chapter, lesson, challenge, quiz, and boss battle is represented
 * as structured data following these schemas.
 * 
 * Architecture Principle: Adding a new lesson only requires creating a new content file.
 * No React components need to be written for new lessons.
 */

// ============================================================================
// PRIMITIVE TYPES & ENUMS
// ============================================================================

/**
 * Supported programming languages/technologies for courses
 */
export type Technology = 
  | 'javascript'
  | 'typescript'
  | 'react'
  | 'node'
  | 'python'
  | 'java'
  | 'go'
  | 'rust'
  | 'sql'
  | 'mongodb'
  | 'docker'
  | 'git'
  | 'html'
  | 'css';

/**
 * Difficulty levels for lessons and challenges
 */
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

/**
 * Lesson types supported by the engine
 * Each type may render differently but follows the same schema
 */
export type LessonType =
  | 'reading'
  | 'interactive-explanation'
  | 'multiple-choice'
  | 'fill-blank'
  | 'drag-drop'
  | 'arrange-code'
  | 'code-repair'
  | 'predict-output'
  | 'live-playground'
  | 'reflection'
  | 'mini-project'
  | 'boss-battle'
  | 'quiz'
  | 'code-challenge'
  | 'video'
  | 'animated-tutorial';

/**
 * Challenge types for interactive exercises
 */
export type ChallengeType =
  | 'multiple-choice'
  | 'fill-blank'
  | 'ordering'
  | 'matching'
  | 'code-completion'
  | 'code-repair'
  | 'true-false'
  | 'interactive-simulation'
  | 'code-playground'
  | 'drag-drop'
  | 'arrange-steps'
  | 'debug-code';

/**
 * Content block types within lessons
 */
export type ContentType =
  | 'text'
  | 'markdown'
  | 'code'
  | 'image'
  | 'video'
  | 'interactive'
  | 'callout'
  | 'warning'
  | 'tip'
  | 'example'
  | 'definition';

/**
 * Achievement categories for organization
 */
export type AchievementCategory =
  | 'progress'
  | 'mastery'
  | 'streak'
  | 'challenge'
  | 'social'
  | 'exploration'
  | 'speed'
  | 'perfectionist'
  | 'seasonal';

/**
 * Achievement rarity levels
 */
export type AchievementRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

/**
 * Unlock condition types
 */
export type UnlockConditionType =
  | 'complete-lesson'
  | 'complete-chapter'
  | 'complete-world'
  | 'reach-xp-threshold'
  | 'complete-boss-battle'
  | 'earn-achievement'
  | 'reach-level'
  | 'consecutive-days'
  | 'custom';

// ============================================================================
// BASE INTERFACES
// ============================================================================

/**
 * Base interface for all content entities with common metadata
 */
export interface BaseEntity {
  /** Unique identifier across the entire content system */
  id: string;
  
  /** Human-readable title */
  title: string;
  
  /** Short description for previews and cards */
  description: string;
  
  /** Optional longer description for detail views */
  longDescription?: string;
  
  /** Tags for search and filtering */
  tags?: string[];
  
  /** Keywords for search optimization */
  keywords?: string[];
  
  /** Category classification */
  category?: string;
  
  /** ISO 8601 timestamp for content creation */
  createdAt?: string;
  
  /** ISO 8601 timestamp for last update */
  updatedAt?: string;
  
  /** Content version for migration purposes */
  version?: string;
  
  /** Author(s) of the content */
  authors?: string[];
  
  /** Reviewer(s) who validated the content */
  reviewers?: string[];
}

/**
 * Localization support for multi-language content
 */
export interface LocalizedString {
  en: string;
  es?: string;
  fr?: string;
  de?: string;
  ja?: string;
  zh?: string;
  [key: string]: string | undefined;
}

// ============================================================================
// REWARD SYSTEM
// ============================================================================

/**
 * XP (Experience Points) reward configuration
 */
export interface XPReward {
  /** Base XP awarded for completion */
  base: number;
  
  /** Bonus XP for perfect completion (optional) */
  perfectBonus?: number;
  
  /** Bonus XP for first attempt success (optional) */
  firstAttemptBonus?: number;
  
  /** Streak multiplier applied to base XP (optional) */
  streakMultiplier?: number;
  
  /** Minimum XP that can be earned */
  minimum?: number;
  
  /** Maximum XP cap */
  maximum?: number;
}

/**
 * Coin reward configuration
 */
export interface CoinReward {
  /** Base coins awarded */
  base: number;
  
  /** Bonus coins for special achievements */
  bonus?: number;
}

/**
 * Combined reward package
 */
export interface Reward {
  /** XP reward details */
  xp: XPReward;
  
  /** Coin reward details */
  coins?: CoinReward;
  
  /** Achievement IDs unlocked upon completion */
  achievements?: string[];
  
  /** Badge IDs awarded */
  badges?: string[];
  
  /** Custom rewards (e.g., unlockables) */
  custom?: Record<string, unknown>;
}

// ============================================================================
// HINT SYSTEM
// ============================================================================

/**
 * Progressive hint structure
 */
export interface Hint {
  /** Unique hint identifier */
  id: string;
  
  /** Hint text shown to learner */
  text: string;
  
  /** Optional markdown-formatted explanation */
  explanation?: string;
  
  /** Cost in coins to reveal this hint (optional) */
  coinCost?: number;
  
  /** Whether this hint reveals part of the answer */
  revealsAnswer?: boolean;
  
  /** Order in hint sequence (lower = shown first) */
  order: number;
}

/**
 * Hint bundle for challenges
 */
export interface HintBundle {
  /** Ordered list of progressive hints */
  hints: Hint[];
  
  /** Whether hints are enabled for this content */
  enabled: boolean;
  
  /** Maximum hints that can be viewed */
  maxHints?: number;
  
  /** Whether final explanation can be revealed */
  allowRevealExplanation?: boolean;
  
  /** Final explanation shown after all hints or failure */
  finalExplanation?: string;
}

// ============================================================================
// CHALLENGE SCHEMAS
// ============================================================================

/**
 * Base challenge interface
 */
export interface BaseChallenge extends BaseEntity {
  /** Type of challenge */
  challengeType: ChallengeType;
  
  /** Question or prompt shown to learner */
  question: string;
  
  /** Detailed instructions for completing the challenge */
  instructions: string;
  
  /** Difficulty level */
  difficulty: DifficultyLevel;
  
  /** Estimated time to complete in minutes */
  estimatedTimeMinutes: number;
  
  /** XP awarded for completion */
  xpReward: number;
  
  /** Whether this challenge is required for lesson completion */
  required: boolean;
  
  /** Optional hints for this challenge */
  hints?: HintBundle;
  
  /** Feedback shown on correct answer */
  successFeedback?: string;
  
  /** Feedback shown on incorrect answer */
  failureFeedback?: string;
  
  /** Learning objectives this challenge addresses */
  learningObjectives?: string[];
}

/**
 * Multiple choice challenge
 */
export interface MultipleChoiceChallenge extends BaseChallenge {
  challengeType: 'multiple-choice';
  
  /** Available options */
  options: {
    /** Option identifier */
    id: string;
    
    /** Option text */
    text: string;
    
    /** Whether this is the correct answer */
    isCorrect: boolean;
    
    /** Optional explanation for this option */
    explanation?: string;
  }[];
  
  /** Whether multiple answers can be correct */
  allowMultiple: boolean;
  
  /** Shuffle options on display */
  shuffleOptions?: boolean;
}

/**
 * Fill in the blank challenge
 */
export interface FillBlankChallenge extends BaseChallenge {
  challengeType: 'fill-blank';
  
  /** Text with blanks marked by {{placeholder}} */
  content: string;
  
  /** Acceptable answers for each blank */
  answers: {
    /** Placeholder name from content */
    placeholder: string;
    
    /** Acceptable answer variations */
    acceptableAnswers: string[];
    
    /** Whether answer is case-sensitive */
    caseSensitive?: boolean;
    
    /** Whether whitespace should be trimmed */
    trimWhitespace?: boolean;
  }[];
}

/**
 * Code completion challenge
 */
export interface CodeCompletionChallenge extends BaseChallenge {
  challengeType: 'code-completion';
  
  /** Programming language */
  language: Technology;
  
  /** Code template with blanks marked by {{placeholder}} */
  codeTemplate: string;
  
  /** Expected solution for validation */
  expectedSolution: string;
  
  /** Test cases for validation */
  testCases?: TestCase[];
  
  /** Allowed code modifications */
  allowedModifications?: ('add' | 'delete' | 'modify')[];
  
  /** Starter code shown to learner */
  starterCode?: string;
}

/**
 * Code repair challenge
 */
export interface CodeRepairChallenge extends BaseChallenge {
  challengeType: 'code-repair';
  
  /** Programming language */
  language: Technology;
  
  /** Buggy code that needs fixing */
  buggyCode: string;
  
  /** Description of what the code should do */
  expectedBehavior: string;
  
  /** Number of bugs to fix */
  bugCount: number;
  
  /** Optional hints about bug locations */
  bugHints?: string[];
  
  /** Test cases for validation */
  testCases?: TestCase[];
}

/**
 * Ordering/sequencing challenge
 */
export interface OrderingChallenge extends BaseChallenge {
  challengeType: 'ordering';
  
  /** Items to be ordered */
  items: {
    /** Item identifier */
    id: string;
    
    /** Item text/content */
    content: string;
    
    /** Correct position (0-indexed) */
    correctPosition: number;
  }[];
  
  /** Context explaining what should be ordered */
  orderingContext: string;
}

/**
 * Matching challenge
 */
export interface MatchingChallenge extends BaseChallenge {
  challengeType: 'matching';
  
  /** Left column items */
  leftItems: {
    id: string;
    content: string;
  }[];
  
  /** Right column items */
  rightItems: {
    id: string;
    content: string;
  }[];
  
  /** Correct pairs */
  correctPairs: {
    leftId: string;
    rightId: string;
  }[];
}

/**
 * True/False challenge
 */
export interface TrueFalseChallenge extends BaseChallenge {
  challengeType: 'true-false';
  
  /** Statement to evaluate */
  statement: string;
  
  /** Correct answer */
  correctAnswer: boolean;
  
  /** Explanation of why the answer is correct */
  explanation: string;
}

/**
 * Interactive simulation challenge
 */
export interface InteractiveSimulationChallenge extends BaseChallenge {
  challengeType: 'interactive-simulation';
  
  /** Simulation configuration */
  simulationConfig: Record<string, unknown>;
  
  /** Initial state of simulation */
  initialState: Record<string, unknown>;
  
  /** Goal state to achieve */
  goalState: Record<string, unknown>;
  
  /** Allowed actions */
  allowedActions: string[];
  
  /** Maximum attempts allowed */
  maxAttempts?: number;
}

/**
 * Code playground challenge
 */
export interface CodePlaygroundChallenge extends BaseChallenge {
  challengeType: 'code-playground';
  
  /** Programming language */
  language: Technology;
  
  /** Task description */
  taskDescription: string;
  
  /** Starter code (optional) */
  starterCode?: string;
  
  /** Expected output or behavior */
  expectedOutput?: string;
  
  /** Test cases for automated validation */
  testCases?: TestCase[];
  
  /** Constraints for the solution */
  constraints?: string[];
  
  /** Example solution (hidden from learner) */
  exampleSolution?: string;
}

/**
 * Drag and drop challenge
 */
export interface DragDropChallenge extends BaseChallenge {
  challengeType: 'drag-drop';
  
  /** Draggable items */
  draggableItems: {
    id: string;
    content: string;
    category: string;
  }[];
  
  /** Drop zones */
  dropZones: {
    id: string;
    label: string;
    acceptedCategories: string[];
  }[];
  
  /** Correct placements */
  correctPlacements: {
    itemId: string;
    zoneId: string;
  }[];
}

/**
 * Arrange steps challenge
 */
export interface ArrangeStepsChallenge extends BaseChallenge {
  challengeType: 'arrange-steps';
  
  /** Steps to arrange */
  steps: {
    id: string;
    content: string;
    correctPosition: number;
  }[];
  
  /** Context for the procedure */
  procedureContext: string;
}

/**
 * Debug code challenge
 */
export interface DebugCodeChallenge extends BaseChallenge {
  challengeType: 'debug-code';
  
  /** Programming language */
  language: Technology;
  
  /** Code with bugs */
  codeWithBugs: string;
  
  /** Error messages or symptoms */
  errorSymptoms: string[];
  
  /** Number of issues to find */
  issueCount: number;
  
  /** Issues to identify */
  issues: {
    id: string;
    description: string;
    lineNumbers?: number[];
    severity: 'error' | 'warning' | 'suggestion';
  }[];
}

/**
 * Union type for all challenge types
 */
export type Challenge =
  | MultipleChoiceChallenge
  | FillBlankChallenge
  | CodeCompletionChallenge
  | CodeRepairChallenge
  | OrderingChallenge
  | MatchingChallenge
  | TrueFalseChallenge
  | InteractiveSimulationChallenge
  | CodePlaygroundChallenge
  | DragDropChallenge
  | ArrangeStepsChallenge
  | DebugCodeChallenge;

// ============================================================================
// TEST CASES
// ============================================================================

/**
 * Test case for code validation
 */
export interface TestCase {
  /** Test case identifier */
  id: string;
  
  /** Test description */
  description: string;
  
  /** Input to provide */
  input: string;
  
  /** Expected output */
  expectedOutput: string;
  
  /** Whether this is a hidden test case */
  isHidden?: boolean;
  
  /** Test case weight for scoring */
  weight?: number;
  
  /** Timeout in milliseconds */
  timeout?: number;
}

// ============================================================================
// CONTENT SECTIONS
// ============================================================================

/**
 * Base content section
 */
export interface ContentSection {
  /** Section type */
  type: ContentType;
  
  /** Section identifier */
  id: string;
  
  /** Section title (optional) */
  title?: string;
  
  /** Section content */
  content: string;
  
  /** Optional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Code section with syntax highlighting info
 */
export interface CodeSection extends ContentSection {
  type: 'code';
  
  /** Programming language */
  language: Technology;
  
  /** Whether to show line numbers */
  showLineNumbers?: boolean;
  
  /** Lines to highlight */
  highlightedLines?: number[];
  
  /** Whether code is editable */
  editable?: boolean;
  
  /** Code execution settings */
  executable?: boolean;
}

/**
 * Callout section for tips, warnings, etc.
 */
export interface CalloutSection extends ContentSection {
  type: 'callout' | 'warning' | 'tip' | 'example' | 'definition';
  
  /** Callout variant */
  variant: 'info' | 'success' | 'warning' | 'error' | 'tip';
  
  /** Optional icon */
  icon?: string;
}

/**
 * Interactive section
 */
export interface InteractiveSection extends ContentSection {
  type: 'interactive';
  
  /** Interactive component type */
  componentType: string;
  
  /** Component properties */
  props: Record<string, unknown>;
}

// ============================================================================
// LESSON SCHEMAS
// ============================================================================

/**
 * Mission narrative within a lesson
 */
export interface MissionNarrative {
  /** Mission title */
  title: string;
  
  /** Story/description */
  story: string;
  
  /** Character speaking (optional) */
  character?: string;
  
  /** Character avatar (optional) */
  characterAvatar?: string;
}

/**
 * Learning objective
 */
export interface LearningObjective {
  /** Objective identifier */
  id: string;
  
  /** Objective statement */
  statement: string;
  
  /** Bloom's taxonomy level */
  bloomLevel?: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';
  
  /** Whether this objective is assessed in the lesson */
  assessed: boolean;
}

/**
 * Prerequisite for lesson enrollment
 */
export interface Prerequisite {
  /** Type of prerequisite */
  type: UnlockConditionType;
  
  /** Target ID (lesson, chapter, etc.) */
  targetId: string;
  
  /** Minimum completion percentage required */
  minCompletion?: number;
  
  /** Minimum score required */
  minScore?: number;
  
  /** Custom condition expression */
  customCondition?: string;
}

/**
 * Reflection question for lesson closure
 */
export interface ReflectionQuestion {
  /** Question text */
  question: string;
  
  /** Question type */
  type: 'open-ended' | 'multiple-choice' | 'rating' | 'self-assessment';
  
  /** Options for non-open-ended types */
  options?: string[];
  
  /** Sample/guideline answer */
  sampleAnswer?: string;
  
  /** Whether reflection is required */
  required: boolean;
}

/**
 * Completion conditions for a lesson
 */
export interface CompletionConditions {
  /** Must complete all sections */
  completeAllSections?: boolean;
  
  /** Must complete all challenges */
  completeAllChallenges?: boolean;
  
  /** Minimum challenge accuracy required */
  minAccuracy?: number;
  
  /** Must complete reflection */
  completeReflection?: boolean;
  
  /** Minimum time spent in seconds */
  minTimeSpent?: number;
  
  /** Custom completion criteria */
  customCriteria?: string[];
}

/**
 * Base lesson interface
 */
export interface BaseLesson extends BaseEntity {
  /** Lesson type */
  lessonType: LessonType;
  
  /** Difficulty level */
  difficulty: DifficultyLevel;
  
  /** Estimated completion time in minutes */
  estimatedTimeMinutes: number;
  
  /** Learning objectives */
  learningObjectives: LearningObjective[];
  
  /** Prerequisites to unlock this lesson */
  prerequisites?: Prerequisite[];
  
  /** Rewards for completion */
  rewards: Reward;
  
  /** Mission narrative */
  missionNarrative?: MissionNarrative;
  
  /** Content sections */
  sections: ContentSection[];
  
  /** Challenges within the lesson */
  challenges: Challenge[];
  
  /** Hints bundle */
  hints?: HintBundle;
  
  /** Reflection question */
  reflectionQuestion?: ReflectionQuestion;
  
  /** Completion conditions */
  completionConditions: CompletionConditions;
  
  /** Next lesson ID (for linear progression) */
  nextLessonId?: string;
  
  /** Previous lesson ID */
  previousLessonId?: string;
  
  /** Related lesson IDs */
  relatedLessons?: string[];
  
  /** Resources for further learning */
  resources?: ResourceLink[];
  
  /** Whether lesson has video content */
  hasVideo?: boolean;
  
  /** Video URL if applicable */
  videoUrl?: string;
  
  /** Transcript for video */
  transcript?: string;
}

/**
 * Resource link for further learning
 */
export interface ResourceLink {
  /** Resource title */
  title: string;
  
  /** Resource URL */
  url: string;
  
  /** Resource type */
  type: 'article' | 'video' | 'documentation' | 'book' | 'course' | 'practice';
  
  /** Source/publisher */
  source?: string;
  
  /** Estimated time to consume */
  estimatedTimeMinutes?: number;
}

// ============================================================================
// QUIZ SCHEMAS
// ============================================================================

/**
 * Quiz question
 */
export interface QuizQuestion extends BaseEntity {
  /** Question text */
  question: string;
  
  /** Question type */
  questionType: ChallengeType;
  
  /** Points for this question */
  points: number;
  
  /** The actual challenge data */
  challenge: Challenge;
  
  /** Whether this question is required */
  required: boolean;
  
  /** Order in quiz */
  order: number;
}

/**
 * Quiz configuration
 */
export interface Quiz extends BaseEntity {
  /** Quiz title */
  title: string;
  
  /** Quiz description */
  description: string;
  
  /** Questions in the quiz */
  questions: QuizQuestion[];
  
  /** Passing score percentage */
  passingScore: number;
  
  /** Time limit in minutes (optional) */
  timeLimitMinutes?: number;
  
  /** Number of attempts allowed */
  maxAttempts?: number;
  
  /** Whether questions should be shuffled */
  shuffleQuestions?: boolean;
  
  /** Whether answers should be shuffled */
  shuffleAnswers?: boolean;
  
  /** Show results immediately after each question */
  showImmediateResults?: boolean;
  
  /** Show explanation after each question */
  showExplanation?: boolean;
  
  /** Rewards for completion */
  rewards: Reward;
  
  /** Certificate eligibility */
  certificateEligible?: boolean;
}

// ============================================================================
// BOSS BATTLE SCHEMAS
// ============================================================================

/**
 * Boss battle phase
 */
export interface BossPhase {
  /** Phase identifier */
  id: string;
  
  /** Phase name */
  name: string;
  
  /** Phase description */
  description: string;
  
  /** Challenges in this phase */
  challenges: Challenge[];
  
  /** Minimum score to advance */
  minScoreToAdvance: number;
  
  /** Time limit for phase (optional) */
  timeLimitSeconds?: number;
  
  /** Boss dialogue at phase start */
  introDialogue?: string;
  
  /** Boss dialogue at phase completion */
  completionDialogue?: string;
}

/**
 * Boss battle configuration
 */
export interface BossBattle extends BaseEntity {
  /** Boss name */
  bossName: string;
  
  /** Boss description/lore */
  bossLore: string;
  
  /** Boss avatar/image */
  bossAvatar?: string;
  
  /** Boss difficulty */
  difficulty: DifficultyLevel;
  
  /** Total XP reward */
  totalXPReward: number;
  
  /** Phases of the battle */
  phases: BossPhase[];
  
  /** Final reward upon defeating boss */
  finalReward: Reward;
  
  /** Introduction cutscene/narrative */
  introduction: string;
  
  /** Victory message */
  victoryMessage: string;
  
  /** Defeat message */
  defeatMessage?: string;
  
  /** Tips for beating the boss */
  tips?: string[];
  
  /** Whether boss can be retry indefinitely */
  unlimitedRetries?: boolean;
  
  /** Cooldown between retries (seconds) */
  retryCooldownSeconds?: number;
}

// ============================================================================
// ACHIEVEMENT SCHEMAS
// ============================================================================

/**
 * Achievement trigger condition
 */
export interface AchievementTrigger {
  /** Trigger type */
  type: 'lesson-complete' | 'chapter-complete' | 'world-complete' | 'xp-threshold' 
      | 'streak-days' | 'challenge-perfect' | 'speed-run' | 'no-hints' 
      | 'first-try' | 'total-lessons' | 'custom';
  
  /** Target value/threshold */
  threshold: number;
  
  /** Target ID if applicable */
  targetId?: string;
  
  /** Custom condition expression */
  customCondition?: string;
}

/**
 * Achievement definition
 */
export interface Achievement extends BaseEntity {
  /** Achievement name */
  name: string;
  
  /** Achievement description */
  description: string;
  
  /** Icon identifier/name */
  icon: string;
  
  /** Trigger conditions */
  triggers: AchievementTrigger[];
  
  /** Whether all triggers must be met */
  requireAllTriggers: boolean;
  
  /** XP reward */
  xpReward: number;
  
  /** Coin reward */
  coinReward?: number;
  
  /** Category */
  category: AchievementCategory;
  
  /** Whether achievement is hidden until earned */
  isHidden: boolean;
  
  /** Hidden achievement reveal text */
  hiddenRevealText?: string;
  
  /** Rarity level */
  rarity: AchievementRarity;
  
  /** Display order */
  sortOrder: number;
  
  /** Seasonal event tag (optional) */
  seasonalEvent?: string;
  
  /** Date range for seasonal achievements */
  dateRange?: {
    start: string;
    end: string;
  };
}

// ============================================================================
// BADGE SCHEMAS
// ============================================================================

/**
 * Badge definition
 */
export interface Badge extends BaseEntity {
  /** Badge name */
  name: string;
  
  /** Badge description */
  description: string;
  
  /** Badge icon/image URL */
  iconUrl: string;
  
  /** Badge tier */
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  
  /** Criteria for earning badge */
  criteria: string;
  
  /** XP reward */
  xpReward: number;
  
  /** Whether badge is visible on profile */
  visibleOnProfile: boolean;
  
  /** Badge category */
  category?: string;
}

// ============================================================================
// CHAPTER SCHEMAS
// ============================================================================

/**
 * Chapter summary/overview
 */
export interface ChapterSummary {
  /** Overview text */
  overview: string;
  
  /** What you'll learn */
  whatYouWillLearn: string[];
  
  /** Prerequisites */
  prerequisites?: string[];
  
  /** Estimated total time */
  estimatedTotalTimeMinutes: number;
}

/**
 * Chapter definition
 */
export interface Chapter extends BaseEntity {
  /** Chapter number/order */
  order: number;
  
  /** Chapter summary */
  summary: ChapterSummary;
  
  /** Lesson IDs in this chapter */
  lessonIds: string[];
  
  /** Quiz ID for chapter assessment (optional) */
  quizId?: string;
  
  /** Boss battle ID (optional) */
  bossBattleId?: string;
  
  /** Chapter completion rewards */
  completionReward: Reward;
  
  /** Prerequisites to unlock chapter */
  prerequisites?: Prerequisite[];
  
  /** Chapter cover image */
  coverImage?: string;
  
  /** Chapter theme/color */
  theme?: string;
}

// ============================================================================
// WORLD SCHEMAS
// ============================================================================

/**
 * World introduction
 */
export interface WorldIntroduction {
  /** Welcome message */
  welcomeMessage: string;
  
  /** World story/lore */
  lore: string;
  
  /** Introduction video URL (optional) */
  introVideoUrl?: string;
  
  /** Featured image */
  featuredImage?: string;
}

/**
 * World definition
 */
export interface World extends BaseEntity {
  /** World order/number */
  order: number;
  
  /** Technology focus */
  technology: Technology;
  
  /** World introduction */
  introduction: WorldIntroduction;
  
  /** Chapter IDs in this world */
  chapterIds: string[];
  
  /** Total XP available in world */
  totalXPAvailable: number;
  
  /** World cover image */
  coverImage?: string;
  
  /** World theme/color scheme */
  theme?: string;
  
  /** Prerequisites to unlock world */
  prerequisites?: Prerequisite[];
  
  /** Whether world is currently available */
  isAvailable: boolean;
  
  /** Release date for future worlds */
  releaseDate?: string;
}

// ============================================================================
// COURSE SCHEMAS
// ============================================================================

/**
 * Course instructor
 */
export interface Instructor {
  /** Instructor name */
  name: string;
  
  /** Title/role */
  title?: string;
  
  /** Bio */
  bio?: string;
  
  /** Avatar URL */
  avatarUrl?: string;
  
  /** Social links */
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

/**
 * Course pricing (for future premium support)
 */
export interface CoursePricing {
  /** Whether course is free */
  isFree: boolean;
  
  /** Price in cents */
  priceCents?: number;
  
  /** Currency */
  currency?: string;
  
  /** Subscription tier required */
  requiredTier?: 'free' | 'pro' | 'enterprise';
}

/**
 * Course definition
 */
export interface Course extends BaseEntity {
  /** Course slug for URLs */
  slug: string;
  
  /** Primary technology */
  technology: Technology;
  
  /** Target audience */
  targetAudience: string;
  
  /** Skill level required */
  skillLevel: DifficultyLevel;
  
  /** World IDs in this course */
  worldIds: string[];
  
  /** Estimated total duration in hours */
  estimatedDurationHours: number;
  
  /** Total XP available */
  totalXP: number;
  
  /** Certificate offered */
  certificateOffered: boolean;
  
  /** Certificate name */
  certificateName?: string;
  
  /** Instructors */
  instructors: Instructor[];
  
  /** Course cover image */
  coverImage: string;
  
  /** Course banner image */
  bannerImage?: string;
  
  /** Course trailer video URL */
  trailerVideoUrl?: string;
  
  /** Pricing information */
  pricing: CoursePricing;
  
  /** Course status */
  status: 'draft' | 'beta' | 'published' | 'archived';
  
  /** SEO description */
  seoDescription?: string;
  
  /** SEO keywords */
  seoKeywords?: string[];
  
  /** Last reviewed date */
  lastReviewedDate?: string;
  
  /** Next review date */
  nextReviewDate?: string;
}

// ============================================================================
// UNLOCK RULES
// ============================================================================

/**
 * Unlock rule definition
 */
export interface UnlockRule {
  /** Rule identifier */
  id: string;
  
  /** Rule type */
  type: UnlockConditionType;
  
  /** Target entity ID */
  targetId: string;
  
  /** Condition value/threshold */
  threshold?: number;
  
  /** Logical operator for multiple conditions */
  operator?: 'and' | 'or';
  
  /** Child rules for complex conditions */
  children?: UnlockRule[];
}

/**
 * Unlock requirements container
 */
export interface UnlockRequirements {
  /** Whether entity is locked */
  isLocked: boolean;
  
  /** Lock reason shown to user */
  lockReason?: string;
  
  /** Rules to unlock */
  rules: UnlockRule[];
  
  /** Preview available without unlocking */
  previewAvailable: boolean;
}

// ============================================================================
// PROGRESS TRACKING
// ============================================================================

/**
 * Progress status
 */
export type ProgressStatus = 'not-started' | 'in-progress' | 'completed' | 'mastered';

/**
 * Challenge progress
 */
export interface ChallengeProgress {
  /** Challenge ID */
  challengeId: string;
  
  /** Status */
  status: 'not-attempted' | 'attempted' | 'completed' | 'mastered';
  
  /** Best score achieved */
  bestScore?: number;
  
  /** Number of attempts */
  attemptCount: number;
  
  /** Last attempt timestamp */
  lastAttemptAt?: string;
  
  /** Completed at timestamp */
  completedAt?: string;
  
  /** Hints used */
  hintsUsed: number;
  
  /** Time spent in seconds */
  timeSpentSeconds: number;
}

/**
 * Lesson progress
 */
export interface LessonProgress {
  /** Lesson ID */
  lessonId: string;
  
  /** Status */
  status: ProgressStatus;
  
  /** Completion percentage */
  completionPercentage: number;
  
  /** Sections completed */
  sectionsCompleted: string[];
  
  /** Challenges progress */
  challengesProgress: ChallengeProgress[];
  
  /** Total time spent in seconds */
  totalTimeSpentSeconds: number;
  
  /** Started at timestamp */
  startedAt?: string;
  
  /** Completed at timestamp */
  completedAt?: string;
  
  /** XP earned */
  xpEarned: number;
  
  /** Coins earned */
  coinsEarned: number;
  
  /** Reflection completed */
  reflectionCompleted?: boolean;
}

/**
 * Chapter progress
 */
export interface ChapterProgress {
  /** Chapter ID */
  chapterId: string;
  
  /** Status */
  status: ProgressStatus;
  
  /** Lessons progress */
  lessonsProgress: LessonProgress[];
  
  /** Completion percentage */
  completionPercentage: number;
  
  /** Total XP earned */
  totalXPEarned: number;
  
  /** Quiz passed */
  quizPassed?: boolean;
  
  /** Boss defeated */
  bossDefeated?: boolean;
}

/**
 * World progress
 */
export interface WorldProgress {
  /** World ID */
  worldId: string;
  
  /** Status */
  status: ProgressStatus;
  
  /** Chapters progress */
  chaptersProgress: ChapterProgress[];
  
  /** Completion percentage */
  completionPercentage: number;
  
  /** Total XP earned */
  totalXPEarned: number;
}

// ============================================================================
// USER PROFILE & STATS
// ============================================================================

/**
 * User statistics
 */
export interface UserStats {
  /** Total XP earned */
  totalXP: number;
  
  /** Current level */
  level: number;
  
  /** XP to next level */
  xpToNextLevel: number;
  
  /** Total coins */
  totalCoins: number;
  
  /** Lessons completed */
  lessonsCompleted: number;
  
  /** Challenges completed */
  challengesCompleted: number;
  
  /** Current streak days */
  currentStreakDays: number;
  
  /** Longest streak */
  longestStreakDays: number;
  
  /** Total time spent in minutes */
  totalTimeSpentMinutes: number;
  
  /** Average accuracy percentage */
  averageAccuracy: number;
  
  /** Achievements earned count */
  achievementsEarned: number;
  
  /** Badges earned count */
  badgesEarned: number;
}

/**
 * Daily challenge stats
 */
export interface DailyChallengeStats {
  /** Date */
  date: string;
  
  /** Completed */
  completed: boolean;
  
  /** Score */
  score?: number;
  
  /** Time spent */
  timeSpentSeconds?: number;
  
  /** XP earned */
  xpEarned?: number;
}

// ============================================================================
// CONTENT LOADER INTERFACES
// ============================================================================

/**
 * Content loading options
 */
export interface ContentLoadOptions {
  /** Include hidden content */
  includeHidden?: boolean;
  
  /** Include draft content */
  includeDraft?: boolean;
  
  /** Filter by technology */
  technology?: Technology;
  
  /** Filter by difficulty */
  difficulty?: DifficultyLevel;
  
  /** Filter by tags */
  tags?: string[];
  
  /** Limit results */
  limit?: number;
  
  /** Offset for pagination */
  offset?: number;
}

/**
 * Content query result
 */
export interface ContentQueryResult<T> {
  /** Results */
  items: T[];
  
  /** Total count */
  totalCount: number;
  
  /** Has more results */
  hasMore: boolean;
  
  /** Next offset */
  nextOffset?: number;
}

/**
 * Content loader interface
 */
export interface ContentLoader {
  /** Load a course by ID */
  loadCourse(courseId: string): Promise<Course | null>;
  
  /** Load all courses */
  loadAllCourses(options?: ContentLoadOptions): Promise<ContentQueryResult<Course>>;
  
  /** Load a world by ID */
  loadWorld(worldId: string): Promise<World | null>;
  
  /** Load worlds for a course */
  loadWorldsForCourse(courseId: string): Promise<World[]>;
  
  /** Load a chapter by ID */
  loadChapter(chapterId: string): Promise<Chapter | null>;
  
  /** Load chapters for a world */
  loadChaptersForWorld(worldId: string): Promise<Chapter[]>;
  
  /** Load a lesson by ID */
  loadLesson(lessonId: string): Promise<BaseLesson | null>;
  
  /** Load lessons for a chapter */
  loadLessonsForChapter(chapterId: string): Promise<BaseLesson[]>;
  
  /** Load a quiz by ID */
  loadQuiz(quizId: string): Promise<Quiz | null>;
  
  /** Load a boss battle by ID */
  loadBossBattle(bossBattleId: string): Promise<BossBattle | null>;
  
  /** Load an achievement by ID */
  loadAchievement(achievementId: string): Promise<Achievement | null>;
  
  /** Load all achievements */
  loadAllAchievements(): Promise<Achievement[]>;
  
  /** Load a badge by ID */
  loadBadge(badgeId: string): Promise<Badge | null>;
  
  /** Load all badges */
  loadAllBadges(): Promise<Badge[]>;
  
  /** Search content */
  searchContent(query: string, options?: ContentLoadOptions): Promise<ContentQueryResult<BaseEntity>>;
  
  /** Get lesson by path/slug */
  getLessonByPath(path: string): Promise<BaseLesson | null>;
}

// ============================================================================
// VALIDATION INTERFACES
// ============================================================================

/**
 * Validation error
 */
export interface ValidationError {
  /** Entity ID */
  entityId: string;
  
  /** Entity type */
  entityType: string;
  
  /** Field path */
  fieldPath: string;
  
  /** Error message */
  message: string;
  
  /** Error severity */
  severity: 'error' | 'warning' | 'info';
}

/**
 * Validation result
 */
export interface ValidationResult {
  /** Is valid */
  isValid: boolean;
  
  /** Errors found */
  errors: ValidationError[];
  
  /** Warnings found */
  warnings: ValidationError[];
}

/**
 * Content validator interface
 */
export interface ContentValidator {
  /** Validate a course */
  validateCourse(course: Course): ValidationResult;
  
  /** Validate a world */
  validateWorld(world: World): ValidationResult;
  
  /** Validate a chapter */
  validateChapter(chapter: Chapter): ValidationResult;
  
  /** Validate a lesson */
  validateLesson(lesson: BaseLesson): ValidationResult;
  
  /** Validate a challenge */
  validateChallenge(challenge: Challenge): ValidationResult;
  
  /** Validate a quiz */
  validateQuiz(quiz: Quiz): ValidationResult;
  
  /** Validate a boss battle */
  validateBossBattle(bossBattle: BossBattle): ValidationResult;
  
  /** Validate an achievement */
  validateAchievement(achievement: Achievement): ValidationResult;
  
  /** Validate all content in a directory */
  validateAllContent(basePath: string): Promise<ValidationResult>;
}

