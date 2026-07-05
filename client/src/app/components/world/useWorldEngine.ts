import { useState, useEffect, useCallback, useMemo } from 'react';
import { WorldMap, LessonNode, NodeState, Region, WorldMapProgress } from './world-schemas';

/**
 * Hook to compute node states based on progress
 */
export function useNodeStates(
  nodes: LessonNode[],
  progress: WorldMapProgress | null
): Map<string, NodeState> {
  return useMemo(() => {
    const stateMap = new Map<string, NodeState>();
    
    if (!progress) {
      // No progress - all nodes locked except first
      nodes.forEach((node, index) => {
        stateMap.set(node.id, index === 0 ? 'available' : 'locked');
      });
      return stateMap;
    }
    
    // Build completed nodes set
    const completedNodeIds = new Set<string>();
    progress.regionsProgress.forEach(region => {
      region.nodesProgress.forEach(nodeProgress => {
        if (nodeProgress.completed) {
          completedNodeIds.add(nodeProgress.nodeId);
        }
      });
    });
    
    // Find current lesson (first available after completed)
    let foundCurrent = false;
    nodes.forEach(node => {
      if (completedNodeIds.has(node.id)) {
        // Check for perfect completion
        const nodeProgress = progress.regionsProgress
          .flatMap(r => r.nodesProgress)
          .find(np => np.nodeId === node.id);
        
        if (nodeProgress?.perfectCompletion) {
          stateMap.set(node.id, 'perfect');
        } else {
          stateMap.set(node.id, 'completed');
        }
      } else if (!foundCurrent && canAccessNode(node, completedNodeIds, nodes)) {
        stateMap.set(node.id, 'current');
        foundCurrent = true;
      } else if (canAccessNode(node, completedNodeIds, nodes)) {
        stateMap.set(node.id, 'available');
      } else {
        stateMap.set(node.id, 'locked');
      }
    });
    
    return stateMap;
  }, [nodes, progress]);
}

/**
 * Check if a node can be accessed based on prerequisites
 */
function canAccessNode(
  node: LessonNode,
  completedNodeIds: Set<string>,
  allNodes: LessonNode[]
): boolean {
  if (!node.prerequisites || node.prerequisites.length === 0) {
    // Check if it's the first node
    const isFirstNode = !allNodes.some(n => 
      n.prerequisites?.includes(node.id) && !completedNodeIds.has(n.id)
    );
    return isFirstNode;
  }
  
  // All prerequisites must be completed
  return node.prerequisites.every(prereqId => completedNodeIds.has(prereqId));
}

/**
 * Hook to compute region unlock states
 */
export function useRegionStates(
  regions: Region[],
  nodes: LessonNode[],
  progress: WorldMapProgress | null
): Map<string, boolean> {
  return useMemo(() => {
    const unlockMap = new Map<string, boolean>();
    
    if (!progress) {
      // Only first region unlocked
      regions.forEach((region, index) => {
        unlockMap.set(region.id, index === 0);
      });
      return unlockMap;
    }
    
    const completedNodeIds = new Set<string>(
      progress.regionsProgress.flatMap(r => 
        r.nodesProgress.filter(np => np.completed).map(np => np.nodeId)
      )
    );
    
    regions.forEach((region, index) => {
      if (index === 0) {
        unlockMap.set(region.id, true);
        return;
      }
      
      // Check if previous region is complete
      const prevRegion = regions[index - 1];
      if (prevRegion) {
        const prevRegionProgress = progress.regionsProgress.find(
          rp => rp.regionId === prevRegion.id
        );
        if (prevRegionProgress?.isCompleted) {
          unlockMap.set(region.id, true);
        } else {
          unlockMap.set(region.id, false);
        }
      }
    });
    
    return unlockMap;
  }, [regions, progress]);
}

/**
 * Hook to handle world camera controls
 */
export function useWorldCamera(
  initialZoom: number = 1,
  minZoom: number = 0.5,
  maxZoom: number = 2.5
) {
  const [zoom, setZoom] = useState(initialZoom);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const handleZoomIn = useCallback(() => {
    setZoom(z => Math.min(z + 0.25, maxZoom));
  }, [maxZoom]);
  
  const handleZoomOut = useCallback(() => {
    setZoom(z => Math.max(z - 0.25, minZoom));
  }, [minZoom]);
  
  const handleZoomReset = useCallback(() => {
    setZoom(initialZoom);
    setPosition({ x: 0, y: 0 });
  }, [initialZoom]);
  
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX - position.x, y: clientY - position.y });
  }, [position]);
  
  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setPosition({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y
    });
  }, [isDragging, dragStart]);
  
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const centerOnPosition = useCallback((x: number, y: number) => {
    setPosition({ x: -x, y: -y });
  }, []);
  
  return {
    zoom,
    position,
    isDragging,
    handleZoomIn,
    handleZoomOut,
    handleZoomReset,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    centerOnPosition,
    setZoom,
    setPosition
  };
}

/**
 * Main hook for the World Engine
 */
export function useWorldEngine(worldMap: WorldMap, progress: WorldMapProgress | null) {
  const nodeStates = useNodeStates(worldMap.nodes, progress);
  
  const camera = useWorldCamera(
    worldMap.camera.initialZoom,
    worldMap.camera.minZoom,
    worldMap.camera.maxZoom
  );
  
  // Find current lesson node
  const currentNodeId = useMemo(() => {
    for (const [nodeId, state] of nodeStates.entries()) {
      if (state === 'current') {
        return nodeId;
      }
    }
    return null;
  }, [nodeStates]);
  
  const currentNode = useMemo(() => {
    if (!currentNodeId) return null;
    return worldMap.nodes.find(n => n.id === currentNodeId) || null;
  }, [worldMap.nodes, currentNodeId]);
  
  // Calculate overall progress
  const overallProgress = useMemo(() => {
    if (!progress) return 0;
    return progress.overallCompletion;
  }, [progress]);
  
  // Helper functions for region states (computed inline)
  const isRegionUnlocked = useCallback((regionId: string): boolean => {
    if (!progress) {
      const firstRegion = worldMap.regions[0];
      return firstRegion?.id === regionId;
    }
    
    const regionIndex = worldMap.regions.findIndex(r => r.id === regionId);
    if (regionIndex === 0) return true;
    
    const prevRegion = worldMap.regions[regionIndex - 1];
    if (!prevRegion) return false;
    
    const prevRegionProgress = progress.regionsProgress.find(
      rp => rp.regionId === prevRegion.id
    );
    return prevRegionProgress?.isCompleted ?? false;
  }, [worldMap.regions, progress]);
  
  return {
    worldMap,
    nodeStates,
    camera,
    currentNode,
    currentNodeId,
    overallProgress,
    getNodeState: (nodeId: string) => nodeStates.get(nodeId) || 'locked',
    isRegionUnlocked,
  };
}
