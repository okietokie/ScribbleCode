import { motion } from 'framer-motion';
import type { NodeTooltipData } from './world-schemas';
import type { DifficultyLevel } from '../../content-engine/schemas';

interface NodeTooltipProps {
  data: NodeTooltipData | null;
  position?: { x: number; y: number };
}

/**
 * Sticky note style tooltip for lesson nodes
 */
export function NodeTooltip({ data, position }: NodeTooltipProps) {
  if (!data) return null;

  // Difficulty color mapping
  const difficultyColors: Record<DifficultyLevel, string> = {
    beginner: '#4CAF50',
    intermediate: '#FF9800',
    advanced: '#F44336',
    expert: '#9C27B0'
  };

  const difficultyColor = difficultyColors[data.difficulty] || '#757575';

  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      style={{
        left: position?.x ?? 0,
        top: position?.y ?? 0,
        transform: 'translate(-50%, -100%) translateY(-10px)',
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.8, rotate: 2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Sticky note container */}
      <div 
        className="relative bg-yellow-100 p-4 rounded shadow-lg border border-yellow-200"
        style={{
          maxWidth: '280px',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L100 0 L100 100 Z' fill='%23FEF3C7' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '20px 20px',
        }}
      >
        {/* Paper tape effect */}
        <div 
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-yellow-200 opacity-80"
          style={{
            transform: 'translateX(-50%) rotate(-2deg)',
          }}
        />
        
        {/* Content */}
        <div className="relative">
          {/* Title */}
          <h4 className="font-bold text-gray-800 mb-1 text-sm leading-tight">
            {data.title}
          </h4>
          
          {/* Description */}
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {data.description}
          </p>
          
          {/* Stats row */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {/* Difficulty badge */}
            <span 
              className="px-2 py-0.5 rounded-full text-white text-xs font-medium capitalize"
              style={{ backgroundColor: difficultyColor }}
            >
              {data.difficulty}
            </span>
            
            {/* Time estimate */}
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth={2} />
                <path strokeLinecap="round" strokeWidth={2} d="M12 6v6l4 2" />
              </svg>
              {data.estimatedTime}m
            </span>
            
            {/* XP reward */}
            <span className="text-xs text-amber-600 font-semibold flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {data.xpReward} XP
            </span>
          </div>
          
          {/* Status indicator */}
          <div className="flex items-center gap-2">
            {data.isCompleted && (
              <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Completed
              </span>
            )}
            
            {data.isCurrent && (
              <span className="text-xs text-blue-600 font-medium flex items-center gap-1">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ●
                </motion.span>
                Current Lesson
              </span>
            )}
            
            {data.stars !== undefined && data.stars > 0 && (
              <div className="flex gap-0.5">
                {[1, 2, 3].map(star => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${star <= data.stars! ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            )}
          </div>
          
          {/* Prerequisites info */}
          {data.prerequisitesInfo && data.prerequisitesInfo.remaining.length > 0 && (
            <div className="mt-2 pt-2 border-t border-yellow-200">
              <p className="text-xs text-gray-500">
                Requires: {data.prerequisitesInfo.completed}/{data.prerequisitesInfo.total} completed
              </p>
            </div>
          )}
        </div>
        
        {/* Shadow effect */}
        <div 
          className="absolute inset-0 rounded pointer-events-none"
          style={{
            boxShadow: '4px 4px 8px rgba(0,0,0,0.15)',
          }}
        />
      </div>
      
      {/* Pointer triangle */}
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
        style={{
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '10px solid #FEF3C7',
        }}
      />
    </motion.div>
  );
}
