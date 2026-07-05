/**
 * World Manager - Manages world loading, selection, and progression
 * 
 * This is the central service for handling all world-related operations
 * in ScribbleCode's multi-world architecture.
 */

import { WorldDefinition, WorldMapData, WorldMapProgress } from './world-types';
import { worldRegistry, WorldRegistryEntry } from './WorldRegistry';

export interface WorldLoadResult {
  success: boolean;
  world?: WorldDefinition;
  map?: WorldMapData;
  error?: string;
}

export class WorldManager {
  private static instance: WorldManager;
  private activeWorldId: string | null = null;
  private loadedWorlds: Map<string, WorldDefinition> = new Map();
  private loadedMaps: Map<string, WorldMapData> = new Map();
  
  private constructor() {}
  
  static getInstance(): WorldManager {
    if (!WorldManager.instance) {
      WorldManager.instance = new WorldManager();
    }
    return WorldManager.instance;
  }
  
  /**
   * Initialize the world system by loading all available worlds
   */
  async initialize(): Promise<void> {
    // Load world definitions from content directory
    const worldFiles = await this.discoverWorldFiles();
    
    for (const worldFile of worldFiles) {
      try {
        const response = await fetch(worldFile);
        if (response.ok) {
          const worldDef: WorldDefinition = await response.json();
          this.registerWorld(worldDef);
        }
      } catch (error) {
        console.warn(`Failed to load world from ${worldFile}:`, error);
      }
    }
    
    // Restore active world from localStorage
    const savedWorldId = localStorage.getItem('scribblecode_active_world');
    if (savedWorldId && this.loadedWorlds.has(savedWorldId)) {
      this.activeWorldId = savedWorldId;
    } else if (this.loadedWorlds.size > 0) {
      // Default to first available world
      const firstWorld = Array.from(this.loadedWorlds.values())[0];
      this.activeWorldId = firstWorld.id;
    }
  }
  
  /**
   * Discover world definition files
   */
  private async discoverWorldFiles(): Promise<string[]> {
    // In a real implementation, this would scan the content directory
    // For now, we'll use known paths
    return [
      '/src/content/javascript/world.json',
      '/src/content/react/worlds/react-world-1-fundamentals.json'
    ];
  }
  
  /**
   * Register a world definition
   */
  registerWorld(worldDef: WorldDefinition): void {
    this.loadedWorlds.set(worldDef.id, worldDef);
    
    // Determine unlock condition based on prerequisites
    let unlockCondition: string | undefined;
    if (worldDef.prerequisites && worldDef.prerequisites.length > 0) {
      unlockCondition = `complete:${worldDef.prerequisites[0]}`;
    }
    
    worldRegistry.register(worldDef, unlockCondition);
  }
  
  /**
   * Load a world map
   */
  async loadWorldMap(worldId: string): Promise<WorldMapData | null> {
    if (this.loadedMaps.has(worldId)) {
      return this.loadedMaps.get(worldId)!;
    }
    
    try {
      // Try React worlds first, then JavaScript worlds
      let mapPath = `/src/content/react/maps/${worldId}-map.json`;
      let response = await fetch(mapPath);
      
      if (!response.ok) {
        mapPath = `/src/content/javascript/maps/${worldId}-map.json`;
        response = await fetch(mapPath);
      }
      
      if (!response.ok) {
        throw new Error(`Map not found for world ${worldId}`);
      }
      
      const mapData: WorldMapData = await response.json();
      this.loadedMaps.set(worldId, mapData);
      return mapData;
    } catch (error) {
      console.error(`Failed to load world map for ${worldId}:`, error);
      return null;
    }
  }
  
  /**
   * Set the active world
   */
  setActiveWorld(worldId: string): boolean {
    if (!this.loadedWorlds.has(worldId)) {
      console.warn(`Cannot set active world: ${worldId} not loaded`);
      return false;
    }
    
    this.activeWorldId = worldId;
    localStorage.setItem('scribblecode_active_world', worldId);
    return true;
  }
  
  /**
   * Get the active world
   */
  getActiveWorld(): WorldDefinition | null {
    if (!this.activeWorldId) {
      return null;
    }
    return this.loadedWorlds.get(this.activeWorldId) || null;
  }
  
  /**
   * Get active world ID
   */
  getActiveWorldId(): string | null {
    return this.activeWorldId;
  }
  
  /**
   * Get all loaded worlds
   */
  getAllWorlds(): WorldDefinition[] {
    return Array.from(this.loadedWorlds.values());
  }
  
  /**
   * Get world by ID
   */
  getWorld(worldId: string): WorldDefinition | undefined {
    return this.loadedWorlds.get(worldId);
  }
  
  /**
   * Check if a world is unlocked
   */
  isWorldUnlocked(worldId: string): boolean {
    const entry = worldRegistry.getWorld(worldId);
    return entry?.isUnlocked ?? false;
  }
  
  /**
   * Get world progression
   */
  getWorldProgress(worldId: string): WorldMapProgress | null {
    const progressKey = `scribblecode_progress_${worldId}`;
    const saved = localStorage.getItem(progressKey);
    return saved ? JSON.parse(saved) : null;
  }
  
  /**
   * Save world progression
   */
  saveWorldProgress(worldId: string, progress: WorldMapProgress): void {
    const progressKey = `scribblecode_progress_${worldId}`;
    localStorage.setItem(progressKey, JSON.stringify(progress));
  }
  
  /**
   * Mark a world as completed
   */
  completeWorld(worldId: string): void {
    const completedKey = 'scribblecode_completed_worlds';
    const completed = JSON.parse(localStorage.getItem(completedKey) || '[]');
    if (!completed.includes(worldId)) {
      completed.push(worldId);
      localStorage.setItem(completedKey, JSON.stringify(completed));
      
      // Update unlock status for dependent worlds
      this.updateDependentWorlds(worldId);
    }
  }
  
  /**
   * Update unlock status for worlds that depend on the completed world
   */
  private updateDependentWorlds(completedWorldId: string): void {
    const allWorlds = this.getAllWorlds();
    for (const world of allWorlds) {
      if (world.prerequisites?.includes(completedWorldId)) {
        worldRegistry.updateUnlockStatus(world.id, true);
      }
    }
  }
  
  /**
   * Get worlds by technology
   */
  getWorldsByTechnology(technology: string): WorldDefinition[] {
    return this.getAllWorlds().filter(w => w.technology === technology);
  }
  
  /**
   * Clear cached data (useful for testing)
   */
  clearCache(): void {
    this.loadedWorlds.clear();
    this.loadedMaps.clear();
    this.activeWorldId = null;
  }
}

// Singleton instance
export const worldManager = WorldManager.getInstance();
