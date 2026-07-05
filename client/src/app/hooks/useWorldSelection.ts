import { useState, useEffect } from 'react';
import { worldManager } from '../services/world/WorldManager';
import { WorldDefinition } from '../services/world/world-types';

/**
 * Hook for managing world selection state
 */
export function useWorldSelection() {
  const [worlds, setWorlds] = useState<WorldDefinition[]>([]);
  const [activeWorldId, setActiveWorldId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadWorlds() {
      try {
        await worldManager.initialize();
        const allWorlds = worldManager.getAllWorlds();
        setWorlds(allWorlds);
        setActiveWorldId(worldManager.getActiveWorldId());
      } catch (error) {
        console.error('Failed to initialize worlds:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadWorlds();
  }, []);
  
  const selectWorld = (worldId: string): boolean => {
    const success = worldManager.setActiveWorld(worldId);
    if (success) {
      setActiveWorldId(worldId);
    }
    return success;
  };
  
  const getActiveWorld = (): WorldDefinition | null => {
    return worldManager.getActiveWorld();
  };
  
  const isWorldUnlocked = (worldId: string): boolean => {
    return worldManager.isWorldUnlocked(worldId);
  };
  
  return {
    worlds,
    activeWorldId,
    activeWorld: getActiveWorld(),
    isLoading,
    selectWorld,
    isWorldUnlocked,
    refresh: () => {
      setWorlds(worldManager.getAllWorlds());
      setActiveWorldId(worldManager.getActiveWorldId());
    }
  };
}
