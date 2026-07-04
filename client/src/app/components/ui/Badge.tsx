import React from 'react';
import { BadgeProps, ThemeColor } from '@/types';

const colorMap: Record<ThemeColor, string> = {
  paper: 'bg-paper',
  ink: 'bg-ink text-white',
  yellow: 'bg-notebook-yellow',
  blue: 'bg-notebook-blue',
  green: 'bg-notebook-green',
  purple: 'bg-notebook-purple',
  red: 'bg-notebook-red',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  color = 'yellow',
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span className={`badge-hand ${colorMap[color]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
};
