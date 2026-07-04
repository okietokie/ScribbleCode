import React from 'react';
import { motion } from 'framer-motion';
import { EmptyStateProps } from '@/types';

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="text-6xl mb-4"
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        {icon}
      </motion.div>
      <h3 className="font-heading text-xl text-ink mb-2">{title}</h3>
      <p className="font-body text-ink/70 mb-6 max-w-sm">{description}</p>
      {action && <div>{action}</div>}
    </motion.div>
  );
};

/**
 * Loading Skeleton - placeholder during loading
 */
export const LoadingSkeleton: React.FC<{ 
  variant?: 'text' | 'card' | 'avatar' | 'list';
  lines?: number;
  className?: string;
}> = ({ variant = 'text', lines = 3, className = '' }) => {
  if (variant === 'avatar') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-10 h-10 rounded-full bg-paper animate-pulse border-2 border-ink/20" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-paper rounded w-1/3 animate-pulse" />
          <div className="h-3 bg-paper rounded w-1/4 animate-pulse" />
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`bg-paper-page rounded-hand-lg border-hand border-ink/20 shadow-paper p-6 ${className}`}>
        <div className="space-y-3">
          <div className="h-4 bg-paper rounded w-3/4 animate-pulse" />
          <div className="h-3 bg-paper rounded w-full animate-pulse" />
          <div className="h-3 bg-paper rounded w-5/6 animate-pulse" />
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-4 bg-paper rounded animate-pulse" />
        ))}
      </div>
    );
  }

  // Default text variant
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className="h-4 bg-paper rounded animate-pulse"
          style={{ width: `${100 - (i * 10)}%` }}
        />
      ))}
    </div>
  );
};

/**
 * Spinner Component - loading indicator
 */
export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md',
  className = '' 
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <motion.svg
      className={`${sizeStyles[size]} animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </motion.svg>
  );
};
