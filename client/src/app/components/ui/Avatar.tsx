import React from 'react';
import { motion } from 'framer-motion';
import { AvatarProps } from '@/types';

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  fallback,
}) => {
  const [hasError, setHasError] = React.useState(false);
  
  const baseStyles = 'rounded-full border-2 border-ink overflow-hidden flex items-center justify-center bg-paper-page shadow-paper';
  
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-lg',
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError || !src) {
    return (
      <motion.div
        className={`${baseStyles} ${sizeStyles[size]} font-bold text-ink`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {fallback || alt.charAt(0).toUpperCase()}
      </motion.div>
    );
  }

  return (
    <motion.img
      src={src}
      alt={alt}
      className={`${baseStyles} ${sizeStyles[size]} object-cover`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      whileHover={{ scale: 1.1 }}
      onError={handleError}
    />
  );
};

/**
 * Stat Card - for displaying statistics
 */
export const StatCard: React.FC<{ 
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}> = ({ icon, label, value, trend = 'neutral', className = '' }) => {
  const trendColors = {
    up: 'text-notebook-green',
    down: 'text-notebook-red',
    neutral: 'text-ink',
  };

  const trendIcons = {
    up: '↑',
    down: '↓',
    neutral: '→',
  };

  return (
    <div className={`bg-paper-page rounded-hand-lg border-hand border-ink shadow-paper p-4 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-notebook-yellow rounded-hand border-2 border-ink">
          {icon}
        </div>
        <div>
          <p className="font-caption text-sm text-ink/70">{label}</p>
          <div className="flex items-center gap-1">
            <span className="font-heading text-xl text-ink">{value}</span>
            <span className={`font-caption text-xs ${trendColors[trend]}`}>
              {trendIcons[trend]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
