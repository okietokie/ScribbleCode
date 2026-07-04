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
      className="flex flex-col items-center justify-center p-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-20 h-20 mb-6 text-ink/40">{icon}</div>
      <h3 className="text-heading font-primary mb-2">{title}</h3>
      <p className="text-body text-ink/70 mb-6 max-w-sm">{description}</p>
      {action && <div>{action}</div>}
    </motion.div>
  );
};
