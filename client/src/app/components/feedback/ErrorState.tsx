import React from 'react';
import { motion } from 'framer-motion';
import { ErrorStateProps } from '@/types';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../ui';

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  onRetry,
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8 text-center bg-paper-page rounded-hand-xl border-hand border-notebook-red shadow-paper"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <motion.div
        className="text-5xl mb-4 text-notebook-red"
        animate={{ rotate: [-10, 10, -10] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
      >
        <AlertTriangle className="w-16 h-16" />
      </motion.div>
      <h3 className="font-heading text-xl text-ink mb-2">{title}</h3>
      <p className="font-body text-ink/70 mb-6 max-w-sm">{message}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry} leftIcon={<RefreshCw className="w-4 h-4" />}>
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

/**
 * Alert Component - for displaying alerts
 */
export const Alert: React.FC<{
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}> = ({ variant = 'info', title, children, onDismiss, className = '' }) => {
  const variants = {
    info: { bg: 'bg-notebook-blue/20', border: 'border-notebook-blue', icon: 'ℹ️' },
    success: { bg: 'bg-notebook-green/20', border: 'border-notebook-green', icon: '✓' },
    warning: { bg: 'bg-notebook-yellow/50', border: 'border-notebook-yellow', icon: '⚠️' },
    error: { bg: 'bg-notebook-red/20', border: 'border-notebook-red', icon: '✕' },
  };

  const config = variants[variant];

  return (
    <motion.div
      className={`${config.bg} ${config.border} border-2 rounded-hand-lg p-4 ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl">{config.icon}</span>
        <div className="flex-1">
          {title && <h4 className="font-heading text-sm text-ink mb-1">{title}</h4>}
          <div className="font-body text-sm text-ink/80">{children}</div>
        </div>
        {onDismiss && (
          <button onClick={onDismiss} className="text-ink/60 hover:text-ink">
            ✕
          </button>
        )}
      </div>
    </motion.div>
  );
};
