import { useEffect, useState, useCallback } from 'react';
import { WorldMap as WorldMapComponent } from './WorldMap';
import { WorldMap as WorldMapData, WorldMapProgress } from './world-schemas';

interface WorldMapCanvasProps {
  worldId: string;
  progress?: WorldMapProgress | null;
  onNodeSelect?: (lessonId: string) => void;
  className?: string;
}

/**
 * World Map Canvas - High-level wrapper for the Adventure World Engine
 * 
 * Handles loading world data and managing progress state.
 * This is the main entry point for using the World Engine.
 */
export function WorldMapCanvas({ 
  worldId, 
  progress = null, 
  onNodeSelect,
  className = '' 
}: WorldMapCanvasProps) {
  const [worldMap, setWorldMap] = useState<WorldMapData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load world map data
  useEffect(() => {
    async function loadWorldMap() {
      try {
        setIsLoading(true);
        setError(null);
        
        // Try to load from content directory
        const response = await fetch(`/src/content/javascript/maps/${worldId}-map.json`);
        
        if (!response.ok) {
          throw new Error(`Failed to load world map: ${response.statusText}`);
        }
        
        const data = await response.json();
        setWorldMap(data);
      } catch (err) {
        console.error('Error loading world map:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        
        // For demo purposes, create a minimal fallback world
        setWorldMap(createFallbackWorld(worldId));
      } finally {
        setIsLoading(false);
      }
    }

    loadWorldMap();
  }, [worldId]);

  // Handle node click
  const handleNodeClick = useCallback((node: any) => {
    if (node.lessonId) {
      onNodeSelect?.(node.lessonId);
    }
  }, [onNodeSelect]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center w-full h-full ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading world...</p>
        </div>
      </div>
    );
  }

  if (error && !worldMap) {
    return (
      <div className={`flex items-center justify-center w-full h-full ${className}`}>
        <div className="text-center bg-red-50 p-6 rounded-lg">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-red-700 mb-2">Failed to load world</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!worldMap) {
    return null;
  }

  return (
    <WorldMapComponent
      worldMap={worldMap}
      progress={progress}
      onNodeClick={handleNodeClick}
      className={className}
    />
  );
}

/**
 * Creates a fallback world for demo/testing purposes
 */
function createFallbackWorld(worldId: string): WorldMapData {
  return {
    id: `${worldId}-fallback`,
    worldId,
    mapTitle: 'Adventure World',
    mapDescription: 'A learning adventure awaits!',
    backgroundStyle: 'paper',
    colorPalette: {
      primary: '#4A90D9',
      secondary: '#7CB342',
      accent: '#FFB74D',
      locked: '#BDBDBD',
      completed: '#81C784',
      current: '#64B5F6'
    },
    camera: {
      initialZoom: 1,
      minZoom: 0.5,
      maxZoom: 2.5,
      initialCenter: { x: 400, y: 300 },
      focusOnCurrent: true
    },
    regions: [
      {
        id: 'region-1',
        title: 'Starting Region',
        description: 'Begin your journey here',
        order: 1,
        theme: 'meadow',
        backgroundColor: '#E8F5E9',
        bounds: { minX: 50, minY: 50, maxX: 350, maxY: 300 },
        nodeIds: ['node-1', 'node-2'],
        roads: [{ from: 'node-1', to: 'node-2', style: 'path' }],
        decorations: [],
        ambientEffects: []
      }
    ],
    nodes: [
      {
        id: 'node-1',
        title: 'First Lesson',
        description: 'Start your adventure',
        lessonId: 'lesson-1',
        position: { x: 100, y: 150 },
        buildingType: 'cabin',
        xpReward: 50,
        estimatedTimeMinutes: 10,
        difficulty: 'beginner'
      },
      {
        id: 'node-2',
        title: 'Second Lesson',
        description: 'Continue learning',
        lessonId: 'lesson-2',
        position: { x: 250, y: 180 },
        buildingType: 'hut',
        xpReward: 60,
        estimatedTimeMinutes: 12,
        difficulty: 'beginner'
      }
    ],
    gates: [],
    bossAreas: [],
    globalRoads: []
  };
}
