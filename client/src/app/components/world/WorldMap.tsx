import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WorldMap as WorldMapData, LessonNode, NodeTooltipData, WorldMapProgress } from './world-schemas';
import { useWorldEngine } from './useWorldEngine';
import { LessonNode as LessonNodeComponent } from './LessonNode';
import { RoadNetwork } from './RoadNetwork';
import { RegionLayer } from './RegionLayer';
import { NodeTooltip } from './NodeTooltip';
import { WorldControls } from './WorldControls';

interface WorldMapProps {
  worldMap: WorldMapData;
  progress: WorldMapProgress | null;
  onNodeClick?: (node: LessonNode) => void;
  className?: string;
}

/**
 * Main World Map Component - The Adventure World Engine
 * 
 * Renders an interactive, animated learning map from structured data.
 * Supports zoom, pan, node interactions, and progress visualization.
 */
export function WorldMap({ worldMap, progress, onNodeClick, className = '' }: WorldMapProps) {
  const engine = useWorldEngine(worldMap, progress);
  const { nodeStates, regionStates, camera, currentNodeId } = engine;
  
  const [tooltipData, setTooltipData] = useState<NodeTooltipData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });
  
  // Handle container resize
  useEffect(() => {
    const updateSize = () => {
      const container = document.getElementById('world-map-container');
      if (container) {
        setContainerSize({
          width: container.clientWidth,
          height: container.clientHeight
        });
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  // Focus on current lesson on mount
  useEffect(() => {
    if (worldMap.camera.focusOnCurrent && currentNodeId) {
      const currentNode = worldMap.nodes.find(n => n.id === currentNodeId);
      if (currentNode) {
        camera.centerOnPosition(currentNode.position.x, currentNode.position.y);
      }
    }
  }, [currentNodeId, worldMap.camera.focusOnCurrent]);
  
  // Collect all roads from regions and global roads
  const allRoads = [
    ...worldMap.regions.flatMap(r => r.roads),
    ...(worldMap.globalRoads || [])
  ];
  
  // Handle node click
  const handleNodeClick = useCallback((node: LessonNode) => {
    const state = nodeStates.get(node.id);
    if (state === 'locked') return;
    
    onNodeClick?.(node);
  }, [nodeStates, onNodeClick]);
  
  // Handle node hover
  const handleNodeHover = useCallback((data: NodeTooltipData | null, position?: { x: number; y: number }) => {
    setTooltipData(data);
    if (position) {
      setTooltipPosition(position);
    }
  }, []);
  
  // Calculate region progress
  const getRegionProgress = useCallback((regionId: string): number => {
    if (!progress) return 0;
    const regionProgress = progress.regionsProgress.find(rp => rp.regionId === regionId);
    return regionProgress?.completionPercentage || 0;
  }, [progress]);

  return (
    <div 
      id="world-map-container"
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        background: getBackgroundStyle(worldMap.backgroundStyle),
      }}
    >
      {/* World Controls */}
      <WorldControls
        zoom={camera.zoom}
        onZoomIn={camera.handleZoomIn}
        onZoomOut={camera.handleZoomOut}
        onZoomReset={camera.handleZoomReset}
        onCenterCurrent={() => {
          if (currentNodeId) {
            const currentNode = worldMap.nodes.find(n => n.id === currentNodeId);
            if (currentNode) {
              camera.centerOnPosition(currentNode.position.x, currentNode.position.y);
            }
          }
        }}
      />
      
      {/* Progress indicator */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur rounded-lg px-4 py-2 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-700">World Progress</span>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${engine.overallProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-sm font-bold text-green-600">{Math.round(engine.overallProgress)}%</span>
        </div>
      </div>
      
      {/* SVG World Map */}
      <svg
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={camera.handleDragStart}
        onTouchStart={camera.handleDragStart}
        onMouseMove={(e) => {
          camera.handleDragMove(e as any);
          // Update tooltip position during pan
          if (tooltipData) {
            const rect = e.currentTarget.getBoundingClientRect();
            setTooltipPosition({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top
            });
          }
        }}
        onMouseUp={camera.handleDragEnd}
        onMouseLeave={camera.handleDragEnd}
        onTouchEnd={camera.handleDragEnd}
        onWheel={(e) => {
          e.preventDefault();
          if (e.deltaY < 0) {
            camera.handleZoomIn();
          } else {
            camera.handleZoomOut();
          }
        }}
      >
        {/* Transform group for pan and zoom */}
        <motion.g
          style={{
            transform: `translate(${camera.position.x}px, ${camera.position.y}px) scale(${camera.zoom})`,
            transformOrigin: 'center center',
          }}
        >
          {/* Render regions (background layer) */}
          {worldMap.regions.map(region => (
            <RegionLayer
              key={region.id}
              region={region}
              isUnlocked={engine.isRegionUnlocked(region.id)}
              completionPercentage={getRegionProgress(region.id)}
            />
          ))}
          
          {/* Render roads */}
          <RoadNetwork
            roads={allRoads}
            nodeStates={nodeStates}
            colorPalette={worldMap.colorPalette}
          />
          
          {/* Render gates */}
          {worldMap.gates?.map(gate => (
            <GateMarker key={gate.id} gate={gate} />
          ))}
          
          {/* Render boss areas */}
          {worldMap.bossAreas?.map(boss => (
            <BossAreaMarker key={boss.id} boss={boss} />
          ))}
          
          {/* Render lesson nodes */}
          {worldMap.nodes.map(node => (
            <LessonNodeComponent
              key={node.id}
              node={node}
              state={nodeStates.get(node.id) || 'locked'}
              onClick={handleNodeClick}
              onHover={(data) => {
                if (data) {
                  const nodeCenter = {
                    x: node.position.x + camera.position.x,
                    y: node.position.y + camera.position.y
                  };
                  handleNodeHover(data, nodeCenter);
                } else {
                  handleNodeHover(null);
                }
              }}
            />
          ))}
        </motion.g>
      </svg>
      
      {/* Tooltip overlay */}
      <AnimatePresence>
        {tooltipData && (
          <NodeTooltip data={tooltipData} position={tooltipPosition} />
        )}
      </AnimatePresence>
      
      {/* Compass overlay */}
      {worldMap.overlay?.compass?.enabled && (
        <CompassOverlay position={worldMap.overlay.compass.position} />
      )}
    </div>
  );
}

/**
 * Gate marker component
 */
function GateMarker({ gate }: { gate: any }) {
  return (
    <g transform={`translate(${gate.position.x}, ${gate.position.y})`}>
      {/* Gate arch */}
      <path
        d="M -15 0 L -15 -25 Q -15 -35 0 -35 Q 15 -35 15 -25 L 15 0"
        fill="none"
        stroke="#8D6E63"
        strokeWidth={4}
      />
      {/* Gate name */}
      <text
        y={15}
        textAnchor="middle"
        className="text-xs fill-gray-600"
        style={{ fontSize: '10px' }}
      >
        {gate.name}
      </text>
    </g>
  );
}

/**
 * Boss area marker component
 */
function BossAreaMarker({ boss }: { boss: any }) {
  return (
    <g transform={`translate(${boss.position.x}, ${boss.position.y}) scale(${boss.scale})`}>
      {/* Glow effect */}
      <motion.circle
        r={50}
        fill="url(#boss-glow)"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Castle silhouette */}
      <rect x={-30} y={-40} width={60} height={50} fill="#5D4037" />
      <polygon points="-35,-40 0,-70 35,-40" fill="#3E2723" />
      
      {/* Boss label */}
      <text
        y={20}
        textAnchor="middle"
        className="text-sm font-bold fill-red-600"
        style={{ fontSize: '12px' }}
      >
        ⚔️ {boss.title}
      </text>
      
      {/* SVG filter for glow */}
      <defs>
        <radialGradient id="boss-glow">
          <stop offset="0%" stopColor="#FF5722" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#FF5722" stopOpacity={0} />
        </radialGradient>
      </defs>
    </g>
  );
}

/**
 * Compass overlay component
 */
function CompassOverlay({ position }: { position: string }) {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  return (
    <div className={`absolute z-10 ${positionClasses[position]}`}>
      <motion.div
        className="w-16 h-16 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center border-2 border-amber-600"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <div className="relative w-12 h-12">
          {/* North arrow */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500" />
          </div>
          {/* South arrow */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-gray-400" />
          </div>
          {/* Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-amber-600 rounded-full" />
          </div>
          {/* Cardinal directions */}
          <span className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-red-600">N</span>
          <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">S</span>
          <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">W</span>
          <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">E</span>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Get CSS background based on world style
 */
function getBackgroundStyle(style: string): string {
  switch (style) {
    case 'paper':
      return 'linear-gradient(to bottom right, #FFFEF7, #FFF8E1)';
    case 'parchment':
      return 'linear-gradient(to bottom right, #F5E6D3, #E8D5B7)';
    case 'grid':
      return `
        linear-gradient(
          to right,
          rgba(0, 0, 0, 0.05) 1px,
          transparent 1px
        ),
        linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.05) 1px,
          transparent 1px
        ),
        #FFFEF7
      `;
    case 'sketch':
      return 'radial-gradient(#FFF 60%, #F5F5F5 100%)';
    default:
      return '#FFFEF7';
  }
}
