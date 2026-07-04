import React from 'react';
import { motion } from 'framer-motion';
import { ProgressBarProps, ThemeColor } from '@/types';

const colorMap: Record<ThemeColor, string> = {
  paper: 'bg-paper',
  ink: 'bg-ink',
  yellow: 'bg-notebook-yellow',
  blue: 'bg-notebook-blue',
  green: 'bg-notebook-green',
  purple: 'bg-notebook-purple',
  red: 'bg-notebook-red',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = 'blue',
  size = 'md',
  showLabel = false,
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizeStyles = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      <div className={`relative w-full bg-paper rounded-hand border-2 border-ink overflow-hidden ${sizeStyles[size]}`}>
        <motion.div
          className={`h-full ${colorMap[color]} rounded-hand`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      {showLabel && (
        <span className="block mt-1 text-xs font-caption text-ink/70">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
};
