import React from 'react';
import { motion } from 'framer-motion';
import { ProgressBarProps } from '@/types';

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = 'blue',
  size = 'md',
  showLabel = false,
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const baseStyles = 'w-full rounded-full border-2 border-ink overflow-hidden';
  
  const sizeStyles = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
  };

  const colorStyles = {
    paper: 'bg-paper',
    ink: 'bg-ink',
    yellow: 'bg-notebook-yellow',
    blue: 'bg-notebook-blue',
    green: 'bg-notebook-green',
    purple: 'bg-notebook-purple',
    red: 'bg-notebook-red',
  };

  return (
    <div className={`${baseStyles} ${sizeStyles[size]} bg-paper`}>
      <motion.div
        className={`h-full ${colorStyles[color]}`}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      {showLabel && (
        <span className="sr-only">{Math.round(percentage)}%</span>
      )}
    </div>
  );
};

/**
 * XP Progress - specialized progress bar for XP display
 */
export const XPProgress: React.FC<{ current: number; max: number; level: number }> = ({ 
  current, 
  max,
  level 
}) => {
  const percentage = (current / max) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="font-caption text-sm">Level {level}</span>
        <span className="font-caption text-sm">{current}/{max} XP</span>
      </div>
      <ProgressBar value={current} max={max} color="purple" size="md" />
    </div>
  );
};

/**
 * Course Progress - for course completion
 */
export const CourseProgress: React.FC<{ completed: number; total: number }> = ({ 
  completed, 
  total 
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="font-caption text-sm">Course Progress</span>
        <span className="font-caption text-sm">{completed}/{total} Lessons</span>
      </div>
      <ProgressBar value={completed} max={total} color="green" size="md" showLabel />
    </div>
  );
};

/**
 * Chapter Progress - for chapter completion
 */
export const ChapterProgress: React.FC<{ completed: number; total: number }> = ({ 
  completed, 
  total 
}) => {
  return (
    <ProgressBar value={completed} max={total} color="blue" size="sm" />
  );
};

/**
 * Lesson Progress - for lesson completion
 */
export const LessonProgress: React.FC<{ percentage: number }> = ({ percentage }) => {
  return (
    <ProgressBar value={percentage} max={100} color="yellow" size="md" />
  );
};

/**
 * Circular Progress - circular progress indicator
 */
export const CircularProgress: React.FC<{ 
  value: number; 
  max?: number; 
  size?: number;
  strokeWidth?: number;
  color?: string;
  children?: React.ReactNode;
}> = ({ 
  value, 
  max = 100, 
  size = 80,
  strokeWidth = 8,
  color = 'notebook-blue',
  children,
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-paper stroke-ink"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`${color.replace('notebook-', 'text-notebook-')} transition-colors`}
          strokeLinecap="round"
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};
