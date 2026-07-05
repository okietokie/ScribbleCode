import { motion } from 'framer-motion';
import { WorldDefinition } from '../../services/world/world-types';

interface WorldCardProps {
  world: WorldDefinition;
  isUnlocked: boolean;
  isActive: boolean;
  progress?: number;
  onSelect: (worldId: string) => void;
}

/**
 * World Card Component - Displays a single world in the selection grid
 */
export function WorldCard({ 
  world, 
  isUnlocked, 
  isActive, 
  progress = 0,
  onSelect 
}: WorldCardProps) {
  const handleClick = () => {
    if (isUnlocked) {
      onSelect(world.id);
    }
  };
  
  return (
    <motion.div
      className={`
        relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer
        border-2 transition-all duration-300
        ${isActive ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}
        ${!isUnlocked ? 'opacity-60 grayscale' : 'hover:shadow-xl hover:-translate-y-1'}
      `}
      onClick={handleClick}
      whileHover={isUnlocked ? { scale: 1.02 } : {}}
      whileTap={isUnlocked ? { scale: 0.98 } : {}}
    >
      {/* Cover Image */}
      <div className="relative h-40 bg-gradient-to-br from-blue-400 to-purple-500">
        {world.coverImage ? (
          <img 
            src={world.coverImage} 
            alt={world.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <span className="text-6xl">{getWorldIcon(world.technology)}</span>
          </div>
        )}
        
        {/* Lock Overlay */}
        {!isUnlocked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-white text-center">
              <span className="text-4xl">🔒</span>
              <p className="text-sm mt-2 font-semibold">Complete prerequisites to unlock</p>
            </div>
          </div>
        )}
        
        {/* Active Badge */}
        {isActive && isUnlocked && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            Active
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{world.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{world.description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {world.tags.slice(0, 3).map(tag => (
            <span 
              key={tag}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Progress Bar */}
        {isUnlocked && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}
        
        {/* Meta Info */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
          <span className="capitalize">{world.difficulty || 'Beginner'}</span>
          <span>{world.estimatedDurationMinutes || Math.round(world.totalXPAvailable / 50)} min</span>
          <span className="font-semibold text-blue-600">{world.totalXPAvailable} XP</span>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Get icon emoji based on technology
 */
function getWorldIcon(technology: string): string {
  const icons: Record<string, string> = {
    javascript: '📜',
    react: '⚛️',
    typescript: '📘',
    nodejs: '🟢',
    python: '🐍',
    html: '🌐',
    css: '🎨'
  };
  return icons[technology.toLowerCase()] || '🌍';
}
