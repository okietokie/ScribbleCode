import { motion } from 'framer-motion';
import type { Region, RegionDecoration } from './world-schemas';

interface RegionLayerProps {
  region: Region;
  isUnlocked: boolean;
  completionPercentage: number;
}

/**
 * Renders a region layer with background and decorations
 */
export function RegionLayer({ region, isUnlocked, completionPercentage }: RegionLayerProps) {
  const { bounds, backgroundColor, decorations } = region;
  
  // Calculate opacity based on unlock state and completion
  const baseOpacity = isUnlocked ? 1 : 0.3;
  const completionOpacity = isUnlocked ? 0.3 + (completionPercentage / 100) * 0.7 : baseOpacity;

  return (
    <g className={`region-layer ${region.id}`}>
      {/* Region background */}
      <motion.rect
        x={bounds.minX}
        y={bounds.minY}
        width={bounds.maxX - bounds.minX}
        height={bounds.maxY - bounds.minY}
        fill={backgroundColor || '#f5f5f5'}
        opacity={completionOpacity}
        rx={20}
        ry={20}
        initial={{ opacity: 0 }}
        animate={{ opacity: completionOpacity }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Region border - hand-drawn style */}
      <motion.path
        d={`M ${bounds.minX + 20} ${bounds.minY} 
           L ${bounds.maxX - 20} ${bounds.minY} 
           Q ${bounds.maxX} ${bounds.minY} ${bounds.maxX} ${bounds.minY + 20}
           L ${bounds.maxX} ${bounds.maxY - 20}
           Q ${bounds.maxX} ${bounds.maxY} ${bounds.maxX - 20} ${bounds.maxY}
           L ${bounds.minX + 20} ${bounds.maxY}
           Q ${bounds.minX} ${bounds.maxY} ${bounds.minX} ${bounds.maxY - 20}
           L ${bounds.minX} ${bounds.minY + 20}
           Q ${bounds.minX} ${bounds.minY} ${bounds.minX + 20} ${bounds.minY} Z`}
        fill="none"
        stroke={isUnlocked ? '#8D6E63' : '#BDBDBD'}
        strokeWidth={2}
        strokeDasharray={isUnlocked ? 'none' : '5,5'}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isUnlocked ? 1 : 0.3 }}
        transition={{ duration: 1 }}
      />
      
      {/* Region title */}
      {isUnlocked && (
        <motion.text
          x={bounds.minX + 20}
          y={bounds.minY + 30}
          className="text-sm font-bold fill-gray-700"
          style={{ fontFamily: 'Georgia, serif' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {region.title}
        </motion.text>
      )}
      
      {/* Decorative elements */}
      {isUnlocked && decorations?.map((decoration, index) => (
        <RegionDecorationElement
          key={`${decoration.type}-${index}`}
          decoration={decoration}
        />
      ))}
      
      {/* Landmark */}
      {isUnlocked && region.landmark && (
        <RegionLandmark landmark={region.landmark} />
      )}
      
      {/* Ambient effects overlay */}
      {isUnlocked && region.ambientEffects && (
        <AmbientEffects effects={region.ambientEffects} bounds={bounds} />
      )}
    </g>
  );
}

interface RegionDecorationElementProps {
  decoration: RegionDecoration;
}

/**
 * Renders individual decorative elements
 */
function RegionDecorationElement({ decoration }: RegionDecorationElementProps) {
  const { type, position, scale = 1, rotation = 0, animation = 'none', opacity = 1 } = decoration;
  
  const getAnimationProps = () => {
    switch (animation) {
      case 'sway':
        return {
          animate: { rotate: [-2, 2, -2] as const },
          transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const }
        };
      case 'float':
        return {
          animate: { y: [-3, 3, -3] as const },
          transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const }
        };
      case 'drift':
        return {
          animate: { x: [-5, 5, -5] as const },
          transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const }
        };
      case 'pulse':
        return {
          animate: { scale: [scale, scale * 1.1, scale] as const },
          transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const }
        };
      default:
        return {};
    }
  };

  const renderDecoration = () => {
    switch (type) {
      case 'tree':
        return (
          <g transform={`translate(${position.x}, ${position.y}) scale(${scale}) rotate(${rotation})`}>
            {/* Trunk */}
            <rect x={-4} y={0} width={8} height={20} fill="#5D4037" />
            {/* Foliage */}
            <circle cx={0} cy={-10} r={15} fill="#4CAF50" />
            <circle cx={-8} cy={-5} r={10} fill="#388E3C" />
            <circle cx={8} cy={-5} r={10} fill="#388E3C" />
            <circle cx={0} cy={-15} r={12} fill="#66BB6A" />
          </g>
        );
      
      case 'flower':
        return (
          <g transform={`translate(${position.x}, ${position.y}) scale(${scale}) rotate(${rotation})`}>
            {/* Stem */}
            <line x1={0} y1={0} x2={0} y2={-10} stroke="#4CAF50" strokeWidth={2} />
            {/* Petals */}
            <circle cx={0} cy={-12} r={4} fill="#FF69B4" />
            <circle cx={-3} cy={-10} r={3} fill="#FF69B4" />
            <circle cx={3} cy={-10} r={3} fill="#FF69B4" />
            <circle cx={-2} cy={-14} r={3} fill="#FF69B4" />
            <circle cx={2} cy={-14} r={3} fill="#FF69B4" />
            {/* Center */}
            <circle cx={0} cy={-12} r={2} fill="#FFD700" />
          </g>
        );
      
      case 'cloud':
        return (
          <g transform={`translate(${position.x}, ${position.y}) scale(${scale}) rotate(${rotation})`} {...getAnimationProps()}>
            <ellipse cx={0} cy={0} rx={20} ry={12} fill="#FFF" opacity={0.8} />
            <ellipse cx={-15} cy={3} rx={12} ry={8} fill="#FFF" opacity={0.8} />
            <ellipse cx={15} cy={3} rx={12} ry={8} fill="#FFF" opacity={0.8} />
            <ellipse cx={0} cy={-5} rx={15} ry={10} fill="#FFF" opacity={0.8} />
          </g>
        );
      
      case 'bird':
        return (
          <g transform={`translate(${position.x}, ${position.y}) scale(${scale}) rotate(${rotation})`} {...getAnimationProps()}>
            <path d="M -10 -5 Q 0 -10 10 -5 Q 0 0 -10 -5" fill="none" stroke="#5D4037" strokeWidth={2} />
          </g>
        );
      
      case 'rock':
        return (
          <g transform={`translate(${position.x}, ${position.y}) scale(${scale}) rotate(${rotation})`}>
            <ellipse cx={0} cy={0} rx={12} ry={8} fill="#9E9E9E" />
            <ellipse cx={-5} cy={-3} rx={6} ry={4} fill="#BDBDBD" />
          </g>
        );
      
      case 'bush':
        return (
          <g transform={`translate(${position.x}, ${position.y}) scale(${scale}) rotate(${rotation})`}>
            <circle cx={0} cy={0} r={10} fill="#4CAF50" />
            <circle cx={-7} cy={2} r={7} fill="#388E3C" />
            <circle cx={7} cy={2} r={7} fill="#388E3C" />
            <circle cx={0} cy={-5} r={8} fill="#66BB6A" />
          </g>
        );
      
      default:
        // Generic decoration placeholder
        return (
          <circle
            cx={position.x}
            cy={position.y}
            r={8 * scale}
            fill="#BDBDBD"
            opacity={opacity}
          />
        );
    }
  };

  if (animation === 'none') {
    return renderDecoration();
  }

  return (
    <motion.g {...getAnimationProps()}>
      {renderDecoration()}
    </motion.g>
  );
}

interface RegionLandmarkProps {
  landmark: {
    type: string;
    position: { x: number; y: number };
    scale: number;
  };
}

/**
 * Renders region landmark building
 */
function RegionLandmark({ landmark }: RegionLandmarkProps) {
  const { position, scale } = landmark;
  
  return (
    <g transform={`translate(${position.x}, ${position.y}) scale(${scale})`}>
      {/* Simplified landmark representation */}
      <rect x={-25} y={-30} width={50} height={40} fill="#FFD54F" stroke="#FFA000" strokeWidth={2} />
      <polygon points="-30,-30 0,-55 30,-30" fill="#FFA000" />
      <rect x={-10} y={-5} width={20} height={15} fill="#5D4037" />
      <circle cx={0} cy={-15} r={8} fill="#FFEB3B" />
    </g>
  );
}

interface AmbientEffectsProps {
  effects: string[];
  bounds: { minX: number; minY: number; maxX: number; maxY: number };
}

/**
 * Renders ambient animated effects for regions
 */
function AmbientEffects({ effects, bounds }: AmbientEffectsProps) {
  const centerX = (bounds.minX + bounds.maxX) / 2;
  
  return (
    <g className="ambient-effects">
      {effects.includes('falling-leaves') && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.circle
              key={`leaf-${i}`}
              r={3}
              fill="#FF9800"
              initial={{ 
                x: centerX + (i - 2) * 40, 
                y: bounds.minY - 20,
                opacity: 0 
              }}
              animate={{ 
                y: bounds.maxY + 20,
                x: centerX + (i - 2) * 40 + Math.sin(i) * 30,
                opacity: [0, 1, 1, 0] as const
              }}
              transition={{ 
                duration: 4 + i, 
                repeat: Infinity, 
                delay: i * 0.8,
                ease: 'linear' as const
              }}
            />
          ))}
        </>
      )}
      
      {effects.includes('fireflies') && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.circle
              key={`firefly-${i}`}
              r={2}
              fill="#FFEB3B"
              initial={{ 
                x: bounds.minX + Math.random() * (bounds.maxX - bounds.minX),
                y: bounds.minY + Math.random() * (bounds.maxY - bounds.minY),
              }}
              animate={{ 
                x: bounds.minX + Math.random() * (bounds.maxX - bounds.minX),
                y: bounds.minY + Math.random() * (bounds.maxY - bounds.minY),
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                repeatType: 'reverse' as const,
                delay: i * 0.3
              }}
            />
          ))}
        </>
      )}
      
      {effects.includes('moving-clouds') && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.ellipse
              key={`cloud-${i}`}
              cx={bounds.minX - 50 + i * 100}
              cy={bounds.minY + 30}
              rx={30}
              ry={15}
              fill="#FFF"
              opacity={0.6}
              initial={{ x: 0 }}
              animate={{ x: (bounds.maxX - bounds.minX) + 100 }}
              transition={{ 
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: 'linear' as const
              }}
            />
          ))}
        </>
      )}
    </g>
  );
}
