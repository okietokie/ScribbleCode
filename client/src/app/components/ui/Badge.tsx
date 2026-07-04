import React from 'react';
import { motion, TargetAndTransition } from 'framer-motion';
import { BadgeProps } from '@/types';
import { useAnimation } from '@/hooks';

export const Badge: React.FC<BadgeProps> = ({
  children,
  color = 'yellow',
  size = 'md',
  className = '',
}) => {
  const animations = useAnimation();
  const stickerPop = animations.stickerPop() as TargetAndTransition;

  const baseStyles = 'inline-flex items-center justify-center font-caption rounded-hand border-2 border-ink';
  
  const colorStyles = {
    paper: 'bg-paper text-ink',
    ink: 'bg-ink text-paper',
    yellow: 'bg-notebook-yellow text-ink',
    blue: 'bg-notebook-blue text-ink',
    green: 'bg-notebook-green text-ink',
    purple: 'bg-notebook-purple text-ink',
    red: 'bg-notebook-red text-white',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <motion.span
      className={`${baseStyles} ${colorStyles[color]} ${sizeStyles[size]} ${className}`}
      initial={stickerPop.initial}
      animate={stickerPop.animate}
      transition={stickerPop.transition}
    >
      {children}
    </motion.span>
  );
};

/**
 * XP Badge - displays experience points
 */
export const XPBadge: React.FC<{ xp: number; className?: string }> = ({ xp, className = '' }) => {
  return (
    <Badge color="purple" size="sm" className={className}>
      ⭐ {xp} XP
    </Badge>
  );
};

/**
 * Level Badge - displays user level
 */
export const LevelBadge: React.FC<{ level: number; size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  level, 
  size = 'md',
  className = '' 
}) => {
  return (
    <Badge color="blue" size={size} className={className}>
      Lv.{level}
    </Badge>
  );
};

/**
 * Achievement Badge - for earned achievements
 */
export const AchievementBadge: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  isEarned: boolean;
  className?: string 
}> = ({ icon, title, isEarned, className = '' }) => {
  return (
    <div className={`inline-flex flex-col items-center ${!isEarned ? 'opacity-50 grayscale' : ''} ${className}`}>
      <Badge color="yellow" size="lg" className="w-16 h-16 rounded-full flex items-center justify-center">
        {icon}
      </Badge>
      <span className="font-caption text-xs mt-1 text-center">{title}</span>
    </div>
  );
};

/**
 * Completed Badge - indicates completion
 */
export const CompletedBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <Badge color="green" size="sm" className={className}>
      ✓ Completed
    </Badge>
  );
};

/**
 * Locked Badge - indicates locked content
 */
export const LockedBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <Badge color="ink" size="sm" className={className}>
      🔒 Locked
    </Badge>
  );
};

/**
 * New Badge - indicates new content
 */
export const NewBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <Badge color="red" size="sm" className={className}>
      ✨ NEW
    </Badge>
  );
};
