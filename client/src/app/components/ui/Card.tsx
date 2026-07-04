import React from 'react';
import { motion, TargetAndTransition } from 'framer-motion';
import { CardProps } from '@/types';
import { useAnimation } from '@/hooks';

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  const animations = useAnimation();
  const hoverLift = animations.hoverLift() as TargetAndTransition;

  const baseStyles = 'bg-paper-page rounded-hand-lg border-hand border-ink shadow-paper p-6 transition-all duration-normal';
  const hoverStyles = hoverable ? 'cursor-pointer hover:shadow-paper-hover' : '';

  if (onClick || hoverable) {
    return (
      <motion.div
        className={`${baseStyles} ${hoverStyles} ${className}`}
        whileHover={hoverable || onClick ? hoverLift : undefined}
        whileTap={hoverable || onClick ? { scale: 0.98 } : undefined}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

/**
 * Paper Card Component - resembles a piece of paper on a notebook
 * 
 * Props:
 * - children: React.ReactNode
 * - className: string
 * - onClick: () => void
 * - hoverable: boolean - Enables hover lift animation
 */
export const PaperCard: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <Card className={`relative ${className}`} {...props}>
      {/* Paper texture effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 pointer-events-none rounded-hand-lg" />
      <div className="relative">{children}</div>
    </Card>
  );
};

/**
 * Notebook Card Component - with notebook line styling
 */
export const NotebookCard: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <Card className={`relative overflow-hidden ${className}`} {...props}>
      {/* Notebook lines */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-notebook-blue/30" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(111, 177, 252, 0.15) 32px)',
        backgroundSize: '100% 32px'
      }} />
      <div className="relative">{children}</div>
    </Card>
  );
};

/**
 * Achievement Card - for displaying achievements
 */
export const AchievementCard: React.FC<CardProps & { isEarned?: boolean }> = ({ 
  children, 
  className = '', 
  isEarned = false,
  ...props 
}) => {
  return (
    <Card 
      className={`${className} ${!isEarned ? 'opacity-60 grayscale' : ''}`} 
      {...props}
    >
      {children}
    </Card>
  );
};

/**
 * Lesson Card - for displaying lessons
 */
export const LessonCard: React.FC<CardProps & { progress?: number; isLocked?: boolean }> = ({ 
  children, 
  className = '', 
  progress = 0,
  isLocked = false,
  ...props 
}) => {
  return (
    <Card className={`${className} ${isLocked ? 'opacity-50' : ''}`} {...props}>
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-paper/80 rounded-hand-lg z-10">
          <span className="font-heading text-2xl">🔒</span>
        </div>
      )}
      {children}
      {progress > 0 && (
        <div className="mt-4 h-2 bg-paper rounded-full overflow-hidden">
          <div 
            className="h-full bg-notebook-green rounded-full transition-all duration-normal"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </Card>
  );
};

/**
 * Mission Card - for displaying missions/banners
 */
export const MissionCard: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <Card className={`${className} bg-notebook-yellow/20 border-dashed`} {...props}>
      {children}
    </Card>
  );
};

/**
 * World Card - for displaying world/level cards
 */
export const WorldCard: React.FC<CardProps & { color?: string }> = ({ 
  children, 
  className = '', 
  color = 'notebook-blue',
  ...props 
}) => {
  const colorMap: Record<string, string> = {
    'notebook-blue': 'bg-notebook-blue',
    'notebook-yellow': 'bg-notebook-yellow',
    'notebook-green': 'bg-notebook-green',
    'notebook-purple': 'bg-notebook-purple',
    'notebook-red': 'bg-notebook-red',
  };
  
  return (
    <Card className={`${className} ${colorMap[color] || colorMap['notebook-blue']}`} {...props}>
      {children}
    </Card>
  );
};
