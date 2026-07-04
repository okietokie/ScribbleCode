/**
 * Adventure World Engine - World Map Schemas
 * 
 * Extends the base content schemas with world map specific structures.
 * These schemas define the visual representation of learning journeys
 * as illustrated adventure maps.
 */

import { DifficultyLevel } from '../../content-engine/schemas';

// Re-export types that extend BaseEntity pattern
export interface BaseWorldEntity {
  /** Unique identifier */
  id: string;
  /** Human-readable title */
  title: string;
  /** Short description */
  description: string;
}

/**
 * Visual building types for lesson nodes
 */
export type BuildingType =
  | 'cabin'
  | 'treehouse'
  | 'tent'
  | 'library'
  | 'workshop'
  | 'bridge'
  | 'windmill'
  | 'tower'
  | 'castle'
  | 'temple'
  | 'cave'
  | 'hut'
  | 'mansion'
  | 'gate'
  | 'portal'
  | 'monument'
  | 'landmark'
  | 'arch';

/**
 * Node state determining visual appearance and interactivity
 */
export type NodeState =
  | 'locked'      // Cannot access, pencil sketch appearance
  | 'available'   // Can start, highlighted
  | 'current'     // In progress, pulsing
  | 'completed'   // Finished, colored
  | 'perfect'     // Perfect completion, glowing
  | 'boss'        // Boss battle location
  | 'challenge'   // Special challenge node
  | 'hidden';     // Secret/discoverable node

/**
 * Region theme types
 */
export type RegionTheme =
  | 'meadow'
  | 'forest'
  | 'river'
  | 'village'
  | 'mountains'
  | 'library'
  | 'desert'
  | 'ocean'
  | 'sky'
  | 'cave'
  | 'garden'
  | 'volcano'
  | 'ice'
  | 'custom';

// ============================================================================
// POSITIONING & LAYOUT
// ============================================================================

/**
 * 2D position in world coordinates
 */
export interface WorldPosition {
  x: number;
  y: number;
}

/**
 * Road connection between nodes
 */
export interface RoadConnection {
  /** Starting node ID */
  from: string;
  /** Ending node ID */
  to: string;
  /** Road style */
  style?: 'path' | 'road' | 'bridge' | 'river' | 'stairs' | 'ladder' | 'portal';
  /** Whether road is animated when unlocked */
  animated?: boolean;
  /** Custom SVG path (optional) */
  customPath?: string;
}

// ============================================================================
// LESSON NODE
// ============================================================================

/**
 * Lesson node on the world map
 */
export interface LessonNode extends BaseWorldEntity {
  /** Reference to lesson ID from content engine */
  lessonId: string;
  
  /** Position in world coordinates */
  position: WorldPosition;
  
  /** Visual building type */
  buildingType: BuildingType;
  
  /** Current state (determined at runtime based on progress) */
  defaultState?: NodeState;
  
  /** Building scale (0.5 - 2.0) */
  scale?: number;
  
  /** Rotation in degrees (-180 to 180) */
  rotation?: number;
  
  /** XP reward for completion */
  xpReward: number;
  
  /** Estimated time in minutes */
  estimatedTimeMinutes: number;
  
  /** Difficulty level */
  difficulty: DifficultyLevel;
  
  /** Short description for tooltip */
  tooltipDescription?: string;
  
  /** Prerequisites (node IDs that must be completed first) */
  prerequisites?: string[];
  
  /** Whether this is a boss node */
  isBoss?: boolean;
  
  /** Whether this is a special challenge */
  isChallenge?: boolean;
  
  /** Unlock conditions */
  unlockConditions?: string[];
  
  /** Custom styling overrides */
  style?: {
    primaryColor?: string;
    secondaryColor?: string;
    roofColor?: string;
    wallColor?: string;
  };
}

// ============================================================================
// REGION
// ============================================================================

/**
 * Decorative element within a region
 */
export interface RegionDecoration {
  /** Decoration type */
  type: 'tree' | 'rock' | 'flower' | 'bush' | 'cloud' | 'bird' | 'butterfly' 
      | 'sign' | 'fence' | 'path' | 'water' | 'grass' | 'star' | 'sparkle'
      | 'paperclip' | 'sticky-note' | 'coffee-stain' | 'arrow' | 'doodle'
      | 'mushroom' | 'fish' | 'book' | 'scroll' | 'candle';
  
  /** Position */
  position: WorldPosition;
  
  /** Scale */
  scale?: number;
  
  /** Rotation */
  rotation?: number;
  
  /** Animation type */
  animation?: 'sway' | 'float' | 'drift' | 'pulse' | 'none';
  
  /** Opacity (0-1) */
  opacity?: number;
}

/**
 * Region definition - a themed area containing lesson nodes
 */
export interface Region extends BaseWorldEntity {
  /** Region order within world */
  order: number;
  
  /** Theme type */
  theme: RegionTheme;
  
  /** Background color/gradient */
  backgroundColor?: string;
  
  /** Region bounds (for camera framing) */
  bounds: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  };
  
  /** Lesson nodes in this region */
  nodeIds: string[];
  
  /** Road connections within region */
  roads: RoadConnection[];
  
  /** Decorative elements */
  decorations?: RegionDecoration[];
  
  /** Region-specific ambient animations */
  ambientEffects?: ('falling-leaves' | 'flowing-water' | 'moving-clouds' | 'fireflies')[];
  
  /** Completion celebration type */
  celebrationType?: 'confetti' | 'fireworks' | 'stamp' | 'sticker' | 'page-color';
  
  /** Region icon/landmark */
  landmark?: {
    type: BuildingType;
    position: WorldPosition;
    scale: number;
  };
}

// ============================================================================
// CHAPTER GATE
// ============================================================================

/**
 * Gate between chapters/regions
 */
export interface ChapterGate extends BaseWorldEntity {
  /** Position */
  position: WorldPosition;
  
  /** Connected chapter/region IDs */
  connectsTo: string[];
  
  /** Unlock requirements */
  requirements: {
    /** Minimum completed nodes */
    completedNodes?: number;
    /** Specific nodes that must be completed */
    requiredNodes?: string[];
    /** Minimum XP required */
    minXP?: number;
  };
  
  /** Gate appearance */
  appearance: {
    type: 'arch' | 'door' | 'bridge' | 'portal' | 'checkpoint';
    style?: string;
  };
}

// ============================================================================
// BOSS AREA
// ============================================================================

/**
 * Boss battle area configuration
 */
export interface BossArea extends BaseWorldEntity {
  /** Reference to boss lesson ID */
  bossLessonId: string;
  
  /** Position */
  position: WorldPosition;
  
  /** Visual scale (bosses are typically larger) */
  scale: number;
  
  /** Required completions to unlock */
  requirements: {
    /** Regions that must be completed */
    completedRegions?: string[];
    /** Nodes that must be completed */
    completedNodes?: string[];
    /** Minimum total XP */
    minTotalXP?: number;
  };
  
  /** Boss appearance */
  appearance: {
    buildingType: BuildingType;
    theme: string;
    effects: ('glow' | 'particles' | 'lightning' | 'fog')[];
  };
  
  /** Rewards for defeating boss */
  rewards: {
    xp: { base: number; perfectBonus?: number; firstAttemptBonus?: number };
    coins: { base: number };
    achievements?: string[];
  };
}

// ============================================================================
// WORLD MAP
// ============================================================================

/**
 * Camera configuration for world
 */
export interface WorldCameraConfig {
  /** Initial zoom level */
  initialZoom: number;
  /** Minimum zoom */
  minZoom: number;
  /** Maximum zoom */
  maxZoom: number;
  /** Initial center position */
  initialCenter: WorldPosition;
  /** Focus on current lesson on load */
  focusOnCurrent?: boolean;
}

/**
 * World map decorative overlay
 */
export interface WorldOverlay {
  /** Compass rose position */
  compass?: {
    enabled: boolean;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  };
  
  /** Grid pattern */
  grid?: {
    enabled: boolean;
    size: number;
    opacity: number;
  };
  
  /** Border style */
  border?: {
    style: 'notebook' | 'parchment' | 'modern' | 'none';
    thickness: number;
  };
}

/**
 * Main World Map configuration
 */
export interface WorldMap extends BaseWorldEntity {
  /** Reference to world ID from content engine */
  worldId: string;
  
  /** Map title (alias for title) */
  mapTitle: string;
  
  /** Map description (alias for description) */
  mapDescription: string;
  
  /** Regions in this world */
  regions: Region[];
  
  /** All lesson nodes across regions */
  nodes: LessonNode[];
  
  /** Chapter gates between regions */
  gates?: ChapterGate[];
  
  /** Boss areas */
  bossAreas?: BossArea[];
  
  /** Global road connections (between regions) */
  globalRoads?: RoadConnection[];
  
  /** Camera configuration */
  camera: WorldCameraConfig;
  
  /** Overlay elements */
  overlay?: WorldOverlay;
  
  /** World background style */
  backgroundStyle: 'paper' | 'parchment' | 'grid' | 'sketch' | 'custom';
  
  /** Color palette */
  colorPalette: {
    primary: string;
    secondary: string;
    accent?: string;
    locked: string;
    completed: string;
    current: string;
  };
  
  /** Ambient sounds (future feature) */
  ambientSound?: string;
}

// ============================================================================
// PROGRESS TRACKING
// ============================================================================

/**
 * Node completion status
 */
export interface NodeProgress {
  /** Node ID */
  nodeId: string;
  
  /** Whether completed */
  completed: boolean;
  
  /** Whether perfect completion */
  perfectCompletion: boolean;
  
  /** Stars earned (0-3) */
  stars: number;
  
  /** XP earned */
  xpEarned: number;
  
  /** Attempts count */
  attempts: number;
  
  /** Last completed date */
  lastCompletedAt?: string;
}

/**
 * Region progress
 */
export interface RegionProgress {
  /** Region ID */
  regionId: string;
  
  /** Nodes progress */
  nodesProgress: NodeProgress[];
  
  /** Completion percentage */
  completionPercentage: number;
  
  /** Total XP earned in region */
  totalXPEarned: number;
  
  /** Whether region is fully completed */
  isCompleted: boolean;
  
  /** Whether region is unlocked */
  isUnlocked: boolean;
}

/**
 * Complete world map progress
 */
export interface WorldMapProgress {
  /** World map ID */
  worldMapId: string;
  
  /** Regions progress */
  regionsProgress: RegionProgress[];
  
  /** Overall completion percentage */
  overallCompletion: number;
  
  /** Total XP earned */
  totalXPEarned: number;
  
  /** Unlocked nodes count */
  unlockedNodesCount: number;
  
  /** Completed nodes count */
  completedNodesCount: number;
  
  /** Last activity timestamp */
  lastActivityAt?: string;
}

// ============================================================================
// TOOLTIP DATA
// ============================================================================

/**
 * Data shown in node hover tooltip
 */
export interface NodeTooltipData {
  /** Node title */
  title: string;
  
  /** Lesson description */
  description: string;
  
  /** Difficulty badge */
  difficulty: DifficultyLevel;
  
  /** Estimated time */
  estimatedTime: number;
  
  /** XP reward */
  xpReward: number;
  
  /** Current state */
  state: NodeState;
  
  /** Completion status */
  isCompleted: boolean;
  
  /** Is current lesson */
  isCurrent: boolean;
  
  /** Prerequisites info */
  prerequisitesInfo?: {
    total: number;
    completed: number;
    remaining: string[];
  };
  
  /** Stars if completed */
  stars?: number;
}
