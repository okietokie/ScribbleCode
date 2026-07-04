import { motion } from 'framer-motion';
import type { RoadConnection, NodeState } from './world-schemas';

interface RoadNetworkProps {
  roads: RoadConnection[];
  nodeStates: Map<string, NodeState>;
  colorPalette: {
    primary: string;
    locked: string;
    completed: string;
    current: string;
    accent?: string;
  };
}

/**
 * Renders the road network connecting lesson nodes
 */
export function RoadNetwork({ roads, nodeStates, colorPalette }: RoadNetworkProps) {
  return (
    <g className="road-network">
      {roads.map((road, index) => (
        <RoadSegment
          key={`${road.from}-${road.to}-${index}`}
          road={road}
          nodeStates={nodeStates}
          colorPalette={colorPalette}
        />
      ))}
    </g>
  );
}

interface RoadSegmentProps {
  road: RoadConnection;
  nodeStates: Map<string, NodeState>;
  colorPalette: {
    primary: string;
    locked: string;
    completed: string;
    current: string;
    accent?: string;
  };
}

/**
 * Individual road segment between two nodes
 */
function RoadSegment({ road, nodeStates, colorPalette }: RoadSegmentProps) {
  // Determine road state based on connected nodes
  const fromState = nodeStates.get(road.from);
  const toState = nodeStates.get(road.to);
  
  const isUnlocked = fromState === 'completed' || fromState === 'perfect' || 
                     toState === 'completed' || toState === 'perfect';
  const isCompleted = fromState === 'completed' || fromState === 'perfect';
  const isCurrent = fromState === 'current' || toState === 'current';
  
  // Calculate path based on style
  const pathData = calculateRoadPath(road);
  
  // Color based on state
  const strokeColor = isCompleted ? colorPalette.completed :
                      isCurrent ? colorPalette.current :
                      isUnlocked ? colorPalette.primary :
                      colorPalette.locked;
  
  const strokeWidth = isCompleted ? 4 : isUnlocked ? 3 : 2;
  const opacity = isUnlocked ? 1 : 0.4;
  
  return (
    <g>
      {/* Road base (dashed for locked) */}
      <motion.path
        d={pathData}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={isUnlocked ? 'none' : '5,5'}
        opacity={opacity}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isUnlocked ? 1 : 0.3 }}
        transition={{ duration: 1, delay: 0.1 }}
      />
      
      {/* Animated progress indicator for current/active roads */}
      {isCurrent && (
        <motion.circle
          r={6}
          fill={colorPalette.accent || '#FFB74D'}
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{
            offsetPath: `path("${pathData}")`,
          }}
        />
      )}
      
      {/* Road decorations based on style */}
      {road.style === 'bridge' && (
        <BridgeDecoration path={pathData} color={strokeColor} />
      )}
      
      {road.style === 'stairs' && (
        <StairsDecoration path={pathData} color={strokeColor} />
      )}
    </g>
  );
}

/**
 * Calculate SVG path data based on road style and endpoints
 */
function calculateRoadPath(road: RoadConnection): string {
  if (road.customPath) {
    return road.customPath;
  }
  
  // For now, use simple straight lines
  // In a real implementation, this would generate curved paths
  // based on actual node positions (which would be passed in)
  
  // Placeholder - actual positions would come from nodes map
  const fromX = 0, fromY = 0;
  const toX = 100, toY = 100;
  
  switch (road.style) {
    case 'bridge':
      // Curved arc for bridges
      const midX = (fromX + toX) / 2;
      const midY = (fromY + toY) / 2 - 20;
      return `M ${fromX} ${fromY} Q ${midX} ${midY} ${toX} ${toY}`;
    
    case 'stairs':
      // Zigzag pattern for stairs
      const steps = 5;
      const dx = (toX - fromX) / steps;
      const dy = (toY - fromY) / steps;
      let path = `M ${fromX} ${fromY}`;
      for (let i = 1; i <= steps; i++) {
        path += ` L ${fromX + dx * i - dx/2} ${fromY + dy * (i - 1)}`;
        path += ` L ${fromX + dx * i} ${fromY + dy * i}`;
      }
      return path;
    
    case 'river': {
      // Wavy line for rivers
      let riverPath = `M ${fromX} ${fromY}`;
      const riverSteps = 10;
      const rDx = (toX - fromX) / riverSteps;
      const rDy = (toY - fromY) / riverSteps;
      for (let i = 1; i <= riverSteps; i++) {
        const offsetX = Math.sin(i * 0.5) * 10;
        riverPath += ` Q ${fromX + rDx * i + offsetX} ${fromY + rDy * i} ${fromX + rDx * i} ${fromY + rDy * i}`;
      }
      return riverPath;
    }
    
    default:
      // Straight or slightly curved path
      return `M ${fromX} ${fromY} L ${toX} ${toY}`;
  }
}

/**
 * Bridge decoration element
 */
function BridgeDecoration({ path, color }: { path: string; color: string }) {
  return (
    <g>
      {/* Bridge railings */}
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={1}
        strokeDasharray="2,8"
        opacity={0.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
    </g>
  );
}

/**
 * Stairs decoration element
 */
function StairsDecoration({ path, color }: { path: string; color: string }) {
  return (
    <g>
      {/* Step markers */}
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={1}
        strokeDasharray="3,3"
        opacity={0.6}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
    </g>
  );
}
