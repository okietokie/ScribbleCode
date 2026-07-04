import React from 'react';
import { motion } from 'framer-motion';
import { CardProps } from '@/types';

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  return (
    <motion.div
      className={`card-hand ${onClick || hoverable ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      whileHover={hoverable || onClick ? { y: -4, boxShadow: '4px 4px 0px rgba(43, 43, 43, 0.15)' } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
    >
      {children}
    </motion.div>
  );
};
