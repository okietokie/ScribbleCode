/**
 * World Registry - Centralized registry for all learning worlds
 * 
 * This module provides a centralized location for registering and accessing
 * all learning worlds in ScribbleCode. Worlds can be added by configuration
 * without code changes.
 */

import { WorldDefinition } from './world-types';

export interface WorldRegistryEntry {
  id: string;
  definition: WorldDefinition;
  isUnlocked: boolean;
  unlockCondition?: string;
}

export class WorldRegistry {
  private static instance: WorldRegistry;
  private worlds: Map<string, WorldRegistryEntry> = new Map();
  
  private constructor() {}
  
  static getInstance(): WorldRegistry {
    if (!WorldRegistry.instance) {
      WorldRegistry.instance = new WorldRegistry();
    }
    return WorldRegistry.instance;
  }
  
  /**
   * Register a world definition
   */
  register(worldDef: WorldDefinition, unlockCondition?: string): void {
    const isUnlocked = this.evaluateUnlockCondition(unlockCondition);
    
    this.worlds.set(worldDef.id, {
      id: worldDef.id,
      definition: worldDef,
      isUnlocked,
      unlockCondition
    });
  }
  
  /**
   * Register multiple worlds at once
   */
  registerAll(worldDefs: WorldDefinition[]): void {
    worldDefs.forEach(world => this.register(world));
  }
  
  /**
   * Get a world by ID
   */
  getWorld(worldId: string): WorldRegistryEntry | undefined {
    return this.worlds.get(worldId);
  }
  
  /**
   * Get all registered worlds
   */
  getAllWorlds(): WorldRegistryEntry[] {
    return Array.from(this.worlds.values());
  }
  
  /**
   * Get only unlocked worlds
   */
  getUnlockedWorlds(): WorldRegistryEntry[] {
    return this.getAllWorlds().filter(w => w.isUnlocked);
  }
  
  /**
   * Check if a world exists
   */
  hasWorld(worldId: string): boolean {
    return this.worlds.has(worldId);
  }
  
  /**
   * Update unlock status for a world
   */
  updateUnlockStatus(worldId: string, isUnlocked: boolean): void {
    const entry = this.worlds.get(worldId);
    if (entry) {
      entry.isUnlocked = isUnlocked;
    }
  }
  
  /**
   * Evaluate unlock condition based on progression
   */
  private evaluateUnlockCondition(condition?: string): boolean {
    if (!condition) {
      return true; // No condition means always unlocked
    }
    
    // Simple condition evaluation - can be extended
    // Examples: "complete:js-world-1-basics", "xp:500"
    if (condition.startsWith('complete:')) {
      const requiredWorldId = condition.split(':')[1];
      const completedWorlds = localStorage.getItem('scribblecode_completed_worlds');
      const completed = completedWorlds ? JSON.parse(completedWorlds) : [];
      return completed.includes(requiredWorldId);
    }
    
    if (condition.startsWith('xp:')) {
      const requiredXP = parseInt(condition.split(':')[1], 10);
      const currentXP = parseInt(localStorage.getItem('scribblecode_total_xp') || '0', 10);
      return currentXP >= requiredXP;
    }
    
    return true;
  }
  
  /**
   * Clear all registered worlds (useful for testing)
   */
  clear(): void {
    this.worlds.clear();
  }
}

// Singleton instance
export const worldRegistry = WorldRegistry.getInstance();
