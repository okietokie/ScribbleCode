import { motion } from 'framer-motion';
import type { LessonNode as LessonNodeType, NodeState, NodeTooltipData } from './world-schemas';

interface LessonNodeProps {
  node: LessonNodeType;
  state: NodeState;
  onClick: (node: LessonNodeType) => void;
  onHover?: (data: NodeTooltipData | null) => void;
}

/**
 * Renders a lesson node as an illustrated building
 */
export function LessonNode({ node, state, onClick, onHover }: LessonNodeProps) {
  const baseClasses = "cursor-pointer transition-all duration-300";
  
  // State-based styling
  const stateStyles = {
    locked: 'opacity-50 grayscale',
    available: 'opacity-100 hover:scale-110',
    current: 'opacity-100 animate-pulse',
    completed: 'opacity-100',
    perfect: 'opacity-100 drop-shadow-lg',
    boss: 'opacity-100',
    challenge: 'opacity-100',
    hidden: 'opacity-30'
  };

  const getNodeTooltipData = (): NodeTooltipData => ({
    title: node.title,
    description: node.description,
    difficulty: node.difficulty,
    estimatedTime: node.estimatedTimeMinutes,
    xpReward: node.xpReward,
    state,
    isCompleted: state === 'completed' || state === 'perfect',
    isCurrent: state === 'current',
  });

  const handleMouseEnter = () => {
    onHover?.(getNodeTooltipData());
  };

  const handleMouseLeave = () => {
    onHover?.(null);
  };

  return (
    <motion.g
      className={`${baseClasses} ${stateStyles[state]}`}
      style={{
        transformOrigin: 'center',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: node.scale || 1, 
        opacity: state === 'locked' ? 0.5 : 1,
        rotate: node.rotation || 0
      }}
      whileHover={{ scale: (node.scale || 1) * 1.1 }}
      whileTap={{ scale: (node.scale || 1) * 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => onClick(node)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Building shadow */}
      <ellipse
        cx={(node.position.x + 20)}
        cy={(node.position.y + 45)}
        rx={25 * (node.scale || 1)}
        ry={8 * (node.scale || 1)}
        fill="rgba(0,0,0,0.2)"
      />
      
      {/* Building body - varies by type */}
      <BuildingBody 
        node={node} 
        state={state} 
      />
      
      {/* Status indicator for current/available nodes */}
      {(state === 'current' || state === 'available') && (
        <motion.circle
          cx={node.position.x}
          cy={node.position.y - 35}
          r={8}
          fill="#FFB74D"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      
      {/* Completion checkmark */}
      {state === 'completed' && (
        <motion.path
          d={`M ${node.position.x - 10} ${node.position.y - 30} L ${node.position.x - 5} ${node.position.y - 25} L ${node.position.x + 8} ${node.position.y - 38}`}
          stroke="#4CAF50"
          strokeWidth={3}
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4 }}
        />
      )}
      
      {/* Perfect completion glow */}
      {state === 'perfect' && (
        <motion.circle
          cx={node.position.x}
          cy={node.position.y}
          r={40}
          fill="none"
          stroke="#FFD700"
          strokeWidth={2}
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.g>
  );
}

interface BuildingBodyProps {
  node: LessonNode;
  state: NodeState;
}

/**
 * Renders different building types
 */
function BuildingBody({ node, state }: BuildingBodyProps) {
  const { x, y } = node.position;
  const scale = node.scale || 1;
  
  // Color based on state
  const wallColor = state === 'locked' ? '#9E9E9E' : 
                    state === 'completed' ? '#81C784' :
                    state === 'current' ? '#64B5F6' : '#FFF';
  
  const roofColor = node.style?.roofColor || 
                   (state === 'locked' ? '#757575' : '#D32F2F');

  switch (node.buildingType) {
    case 'cabin':
      return (
        <g>
          {/* Walls */}
          <rect x={x - 20 * scale} y={y - 20 * scale} width={40 * scale} height={30 * scale} fill={wallColor} stroke="#5D4037" strokeWidth={2} />
          {/* Roof */}
          <polygon points={`${x - 25 * scale},${y - 20 * scale} ${x},${y - 45 * scale} ${x + 25 * scale},${y - 20 * scale}`} fill={roofColor} stroke="#5D4037" strokeWidth={2} />
          {/* Door */}
          <rect x={x - 8 * scale} y={y - 5 * scale} width={16 * scale} height={15 * scale} fill="#5D4037" />
          {/* Window */}
          <circle cx={x} cy={y - 15 * scale} r={6 * scale} fill="#FFEB3B" stroke="#5D4037" strokeWidth={2} />
        </g>
      );
    
    case 'treehouse':
      return (
        <g>
          {/* Trunk */}
          <rect x={x - 8 * scale} y={y} width={16 * scale} height={50 * scale} fill="#5D4037" />
          {/* Platform */}
          <rect x={x - 25 * scale} y={y - 10 * scale} width={50 * scale} height={8 * scale} fill="#795548" />
          {/* House */}
          <rect x={x - 20 * scale} y={y - 35 * scale} width={40 * scale} height={25 * scale} fill={wallColor} stroke="#5D4037" strokeWidth={2} />
          {/* Roof */}
          <polygon points={`${x - 25 * scale},${y - 35 * scale} ${x},${y - 55 * scale} ${x + 25 * scale},${y - 35 * scale}`} fill={roofColor} stroke="#5D4037" strokeWidth={2} />
          {/* Window */}
          <circle cx={x} cy={y - 25 * scale} r={7 * scale} fill="#81D4FA" stroke="#5D4037" strokeWidth={2} />
        </g>
      );
    
    case 'tower':
      return (
        <g>
          {/* Tower body */}
          <rect x={x - 18 * scale} y={y - 40 * scale} width={36 * scale} height={50 * scale} fill={wallColor} stroke="#5D4037" strokeWidth={2} />
          {/* Top platform */}
          <rect x={x - 22 * scale} y={y - 45 * scale} width={44 * scale} height={10 * scale} fill="#9E9E9E" stroke="#5D4037" strokeWidth={2} />
          {/* Battlements */}
          <rect x={x - 22 * scale} y={y - 50 * scale} width={10 * scale} height={8 * scale} fill="#9E9E9E" />
          <rect x={x - 5 * scale} y={y - 50 * scale} width={10 * scale} height={8 * scale} fill="#9E9E9E" />
          <rect x={x + 12 * scale} y={y - 50 * scale} width={10 * scale} height={8 * scale} fill="#9E9E9E" />
          {/* Door */}
          <path d={`M ${x - 10 * scale} ${y - 10 * scale} L ${x - 10 * scale} ${y + 10 * scale} A ${10 * scale} ${10 * scale} 0 0 0 ${x + 10 * scale} ${y + 10 * scale} L ${x + 10 * scale} ${y - 10 * scale}`} fill="#5D4037" />
        </g>
      );
    
    case 'windmill':
      return (
        <g>
          {/* Base */}
          <rect x={x - 20 * scale} y={y - 30 * scale} width={40 * scale} height={40 * scale} fill={wallColor} stroke="#5D4037" strokeWidth={2} />
          {/* Roof */}
          <polygon points={`${x - 25 * scale},${y - 30 * scale} ${x},${y - 55 * scale} ${x + 25 * scale},${y - 30 * scale}`} fill={roofColor} stroke="#5D4037" strokeWidth={2} />
          {/* Blades */}
          <motion.line
            x1={x} y1={y - 45 * scale}
            x2={x} y2={y - 25 * scale}
            stroke="#5D4037"
            strokeWidth={3}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${x}px ${y - 35}px` }}
          />
          <motion.line
            x1={x - 15 * scale} y1={y - 35 * scale}
            x2={x + 15 * scale} y2={y - 35 * scale}
            stroke="#5D4037"
            strokeWidth={3}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${x}px ${y - 35}px` }}
          />
        </g>
      );
    
    case 'library':
      return (
        <g>
          {/* Main building */}
          <rect x={x - 30 * scale} y={y - 35 * scale} width={60 * scale} height={45 * scale} fill={wallColor} stroke="#5D4037" strokeWidth={2} />
          {/* Columns */}
          <rect x={x - 25 * scale} y={y - 35 * scale} width={8 * scale} height={45 * scale} fill="#ECEFF1" />
          <rect x={x - 5 * scale} y={y - 35 * scale} width={8 * scale} height={45 * scale} fill="#ECEFF1" />
          <rect x={x + 15 * scale} y={y - 35 * scale} width={8 * scale} height={45 * scale} fill="#ECEFF1" />
          {/* Pediment */}
          <polygon points={`${x - 35 * scale},${y - 35 * scale} ${x},${y - 55 * scale} ${x + 35 * scale},${y - 35 * scale}`} fill={roofColor} stroke="#5D4037" strokeWidth={2} />
          {/* Steps */}
          <rect x={x - 35 * scale} y={y + 10 * scale} width={70 * scale} height={5 * scale} fill="#9E9E9E" />
          <rect x={x - 30 * scale} y={y + 15 * scale} width={60 * scale} height={5 * scale} fill="#9E9E9E" />
        </g>
      );
    
    case 'temple':
      return (
        <g>
          {/* Base platform */}
          <rect x={x - 35 * scale} y={y} width={70 * scale} height={10 * scale} fill="#FFD54F" />
          {/* Main structure */}
          <rect x={x - 25 * scale} y={y - 40 * scale} width={50 * scale} height={40 * scale} fill={wallColor} stroke="#5D4037" strokeWidth={2} />
          {/* Triangular roof */}
          <polygon points={`${x - 30 * scale},${y - 40 * scale} ${x},${y - 70 * scale} ${x + 30 * scale},${y - 40 * scale}`} fill="#FFD54F" stroke="#5D4037" strokeWidth={2} />
          {/* Inner triangle */}
          <polygon points={`${x - 25 * scale},${y - 40 * scale} ${x},${y - 65 * scale} ${x + 25 * scale},${y - 40 * scale}`} fill="#FFA000" />
          {/* Entrance */}
          <rect x={x - 12 * scale} y={y - 20 * scale} width={24 * scale} height={20 * scale} fill="#5D4037" />
        </g>
      );
    
    case 'castle':
      return (
        <g>
          {/* Left tower */}
          <rect x={x - 40 * scale} y={y - 50 * scale} width={25 * scale} height={60 * scale} fill={wallColor} stroke="#5D4037" strokeWidth={2} />
          {/* Right tower */}
          <rect x={x + 15 * scale} y={y - 50 * scale} width={25 * scale} height={60 * scale} fill={wallColor} stroke="#5D4037" strokeWidth={2} />
          {/* Center keep */}
          <rect x={x - 15 * scale} y={y - 40 * scale} width={30 * scale} height={50 * scale} fill={wallColor} stroke="#5D4037" strokeWidth={2} />
          {/* Tower roofs */}
          <polygon points={`${x - 45 * scale},${y - 50 * scale} ${x - 27.5 * scale},${y - 70 * scale} ${x - 15 * scale},${y - 50 * scale}`} fill={roofColor} />
          <polygon points={`${x + 15 * scale},${y - 50 * scale} ${x + 27.5 * scale},${y - 70 * scale} ${x + 40 * scale},${y - 50 * scale}`} fill={roofColor} />
          {/* Gate */}
          <rect x={x - 10 * scale} y={y - 10 * scale} width={20 * scale} height={20 * scale} fill="#5D4037" />
          {/* Portcullis */}
          <path d={`M ${x - 8 * scale} ${y + 10 * scale} V ${y - 10 * scale} M ${x} ${y + 10 * scale} V ${y - 10 * scale} M ${x + 8 * scale} ${y + 10 * scale} V ${y - 10 * scale}`} stroke="#757575" strokeWidth={2} />
        </g>
      );
    
    default:
      // Generic building
      return (
        <g>
          <rect x={x - 20 * scale} y={y - 25 * scale} width={40 * scale} height={35 * scale} fill={wallColor} stroke="#5D4037" strokeWidth={2} />
          <polygon points={`${x - 25 * scale},${y - 25 * scale} ${x},${y - 45 * scale} ${x + 25 * scale},${y - 25 * scale}`} fill={roofColor} stroke="#5D4037" strokeWidth={2} />
          <rect x={x - 6 * scale} y={y - 5 * scale} width={12 * scale} height={15 * scale} fill="#5D4037" />
        </g>
      );
  }
}
