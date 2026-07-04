import { motion } from 'framer-motion';

interface DecorationsProps {
  type: 'paperclip' | 'sticky-note' | 'coffee-stain' | 'tape' | 'doodle';
  position?: { x: number; y: number };
  rotation?: number;
  scale?: number;
}

/**
 * Decorative notebook elements scattered around the world map
 */
export function Decorations({ 
  type, 
  position = { x: 0, y: 0 }, 
  rotation = 0, 
  scale = 1 
}: DecorationsProps) {
  switch (type) {
    case 'paperclip':
      return (
        <motion.g
          transform={`translate(${position.x}, ${position.y}) rotate(${rotation}) scale(${scale})`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {/* Paperclip */}
          <path
            d="M 0 0 A 8 8 0 0 1 0 16 L 0 32 A 12 12 0 0 0 0 8 L 0 24 A 4 4 0 0 1 0 32"
            fill="none"
            stroke="#9E9E9E"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </motion.g>
      );
    
    case 'sticky-note':
      return (
        <motion.g
          transform={`translate(${position.x}, ${position.y}) rotate(${rotation}) scale(${scale})`}
          initial={{ opacity: 0, scale: 0, rotate: rotation - 15 }}
          animate={{ opacity: 1, scale, rotate: rotation }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          {/* Sticky note paper */}
          <rect
            x={-25}
            y={-30}
            width={50}
            height={55}
            fill="#FFEB3B"
            opacity={0.9}
          />
          {/* Folded corner */}
          <path
            d="M 25 -30 L 25 -10 L 5 -30 Z"
            fill="#FDD835"
          />
          {/* Shadow */}
          <rect
            x={-23}
            y={-28}
            width={46}
            height={51}
            fill="none"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth={1}
          />
        </motion.g>
      );
    
    case 'coffee-stain':
      return (
        <motion.g
          transform={`translate(${position.x}, ${position.y}) rotate(${rotation}) scale(${scale})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {/* Coffee ring */}
          <circle
            cx={0}
            cy={0}
            r={30}
            fill="none"
            stroke="#8D6E63"
            strokeWidth={3}
            opacity={0.5}
          />
          {/* Inner stain */}
          <circle
            cx={5}
            cy={-5}
            r={20}
            fill="#8D6E63"
            opacity={0.2}
          />
          {/* Outer splatter */}
          <circle
            cx={-15}
            cy={10}
            r={8}
            fill="#8D6E63"
            opacity={0.15}
          />
          <circle
            cx={20}
            cy={15}
            r={5}
            fill="#8D6E63"
            opacity={0.1}
          />
        </motion.g>
      );
    
    case 'tape':
      return (
        <motion.g
          transform={`translate(${position.x}, ${position.y}) rotate(${rotation}) scale(${scale})`}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 0.7, scaleY: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Tape strip */}
          <rect
            x={-40}
            y={-8}
            width={80}
            height={16}
            fill="rgba(255, 255, 255, 0.6)"
            stroke="rgba(200, 200, 200, 0.3)"
            strokeWidth={1}
          />
          {/* Tape shine */}
          <rect
            x={-35}
            y={-5}
            width={70}
            height={4}
            fill="rgba(255, 255, 255, 0.4)"
          />
        </motion.g>
      );
    
    case 'doodle':
      return (
        <motion.g
          transform={`translate(${position.x}, ${position.y}) rotate(${rotation}) scale(${scale})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Random doodle star */}
          <path
            d="M 0 -15 L 3 -5 L 13 -5 L 5 3 L 8 13 L 0 7 L -8 13 L -5 3 L -13 -5 L -3 -5 Z"
            fill="none"
            stroke="#5D4037"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </motion.g>
      );
    
    default:
      return null;
  }
}

/**
 * Collection of random decorations for the world map
 */
export function WorldDecorations() {
  const decorations = [
    { type: 'paperclip' as const, x: 50, y: 50, rotation: 15 },
    { type: 'sticky-note' as const, x: 100, y: 100, rotation: -5 },
    { type: 'coffee-stain' as const, x: 200, y: 150, rotation: 0 },
    { type: 'tape' as const, x: 300, y: 80, rotation: 45 },
    { type: 'doodle' as const, x: 150, y: 200, rotation: 30 },
  ];

  return (
    <g className="world-decorations">
      {decorations.map((dec, index) => (
        <Decorations
          key={index}
          type={dec.type}
          position={{ x: dec.x, y: dec.y }}
          rotation={dec.rotation}
          scale={0.8 + Math.random() * 0.4}
        />
      ))}
    </g>
  );
}
