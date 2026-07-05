/**
 * World Types - Shared type definitions for the multi-world system
 */

export interface WorldDefinition {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  order: number;
  technology: string;
  introduction: {
    welcomeMessage: string;
    lore: string;
    featuredImage?: string;
  };
  chapterIds: string[];
  totalXPAvailable: number;
  coverImage?: string;
  theme: string;
  isAvailable: boolean;
  tags: string[];
  keywords: string[];
  category: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  prerequisites?: string[];
  estimatedDurationMinutes?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface WorldMapData {
  id: string;
  worldId: string;
  mapTitle: string;
  mapDescription: string;
  backgroundStyle: string;
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    locked: string;
    completed: string;
    current: string;
  };
  camera: {
    initialZoom: number;
    minZoom: number;
    maxZoom: number;
    initialCenter: { x: number; y: number };
    focusOnCurrent: boolean;
  };
  overlay?: {
    compass?: {
      enabled: boolean;
      position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    };
    border?: {
      style: string;
      thickness: number;
    };
  };
  regions: RegionData[];
  nodes: LessonNode[];
  gates?: GateData[];
  bossAreas?: BossAreaData[];
  globalRoads?: RoadData[];
}

export interface RegionData {
  id: string;
  title: string;
  description: string;
  order: number;
  theme: string;
  backgroundColor: string;
  bounds: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  };
  nodeIds: string[];
  roads: RoadData[];
  decorations: DecorationData[];
  ambientEffects: string[];
  celebrationType?: string;
  landmark?: LandmarkData;
}

export interface LessonNode {
  id: string;
  title: string;
  description: string;
  lessonId: string;
  position: { x: number; y: number };
  buildingType: string;
  xpReward: number;
  coinReward?: number;
  estimatedTimeMinutes: number;
  difficulty: string;
  tooltipDescription?: string;
  scale?: number;
  rotation?: number;
}

export interface RoadData {
  from: string;
  to: string;
  style: string;
  controlPoints?: Array<{ x: number; y: number }>;
}

export interface DecorationData {
  type: string;
  position: { x: number; y: number };
  scale?: number;
  rotation?: number;
  animation?: string;
}

export interface LandmarkData {
  type: string;
  position: { x: number; y: number };
  scale?: number;
}

export interface GateData {
  id: string;
  name: string;
  position: { x: number; y: number };
  requiredLessonIds?: string[];
}

export interface BossAreaData {
  id: string;
  title: string;
  description: string;
  position: { x: number; y: number };
  buildingType: string;
  xpReward: number;
  coinReward: number;
  requiredLessonIds: string[];
  tooltipDescription?: string;
  scale?: number;
}

export interface WorldMapProgress {
  overallCompletion: number;
  regionsProgress: Array<{
    regionId: string;
    completionPercentage: number;
    completedNodes: string[];
  }>;
  completedLessons: string[];
  currentLessonId?: string;
  totalXP: number;
  earnedXP: number;
}

export interface NodeState {
  id: string;
  state: 'locked' | 'available' | 'completed' | 'current';
  progress?: number;
}
