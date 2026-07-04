import React from 'react';
import { motion } from 'framer-motion';
import { ChipProps } from '@/types';
import { X } from 'lucide-react';

export const Chip: React.FC<ChipProps> = ({
  children,
  selected = false,
  onClick,
  onClose,
}) => {
  return (
    <motion.button
      type="button"
      className={`
        inline-flex items-center gap-2 px-4 py-2 font-caption rounded-full 
        border-2 border-ink text-sm transition-all duration-normal
        ${selected 
          ? 'bg-notebook-yellow text-ink shadow-paper' 
          : 'bg-paper text-ink hover:bg-notebook-yellow/30'
        }
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
      {onClose && (
        <motion.span
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <X className="h-3 w-3" />
        </motion.span>
      )}
    </motion.button>
  );
};

/**
 * Tag Component - alias for Chip
 */
export const Tag: React.FC<ChipProps> = Chip;

/**
 * Pill Component - similar to Chip but with different styling
 */
export const Pill: React.FC<{ 
  children: React.ReactNode; 
  color?: string;
  className?: string 
}> = ({ children, color = 'notebook-yellow', className = '' }) => {
  return (
    <span className={`inline-flex items-center px-3 py-1 font-caption rounded-full bg-${color} border-2 border-ink text-sm ${className}`}>
      {children}
    </span>
  );
};
