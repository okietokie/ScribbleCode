import React from 'react';
import { motion } from 'framer-motion';

interface NotebookPageProps {
  children: React.ReactNode;
  className?: string;
  pageNumber?: number;
}

export const NotebookPage: React.FC<NotebookPageProps> = ({
  children,
  className = '',
  pageNumber,
}) => {
  return (
    <motion.div
      className={`relative bg-paper-page rounded-sm border-l-4 border-notebook-blue/30 shadow-paper p-8 ${className}`}
      initial={{ opacity: 0, rotateY: -10 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(111, 177, 252, 0.15) 32px)',
          backgroundSize: '100% 32px',
        }}
      />
      <div className="absolute left-16 top-0 bottom-0 w-px bg-notebook-red/30" />
      {pageNumber && (
        <div className="absolute bottom-4 right-6 font-caption text-xs text-ink/50">
          {pageNumber}
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export const PaperContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`bg-paper-page rounded-hand-xl border-hand border-ink shadow-paper p-8 relative ${className}`}>
      {children}
    </div>
  );
};

export const StickyNote: React.FC<{
  children: React.ReactNode;
  color?: 'yellow' | 'blue' | 'green' | 'pink';
  rotation?: number;
  className?: string;
}> = ({ children, color = 'yellow', rotation = 0, className = '' }) => {
  const colors = {
    yellow: 'bg-notebook-yellow',
    blue: 'bg-notebook-blue',
    green: 'bg-notebook-green',
    pink: 'bg-notebook-red',
  };

  return (
    <motion.div
      className={`${colors[color]} ${className} p-4 rounded-sm shadow-sticker max-w-xs`}
      style={{ transform: `rotate(${rotation}deg)` }}
      whileHover={{ scale: 1.05, zIndex: 10, boxShadow: '5px 5px 0px rgba(43, 43, 43, 0.2)' }}
    >
      {children}
    </motion.div>
  );
};

export const PaperClip: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg className={`w-8 h-8 text-ink ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
};

export const MaskingTape: React.FC<{ children?: React.ReactNode; className?: string; rotation?: number }> = ({ 
  children, 
  className = '', 
  rotation = -2 
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <div 
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-notebook-yellow/70 border-2 border-ink/30"
        style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
      />
      {children}
    </div>
  );
};

export const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, icon, className = '' }) => {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center gap-3 mb-2">
        {icon && <span className="text-2xl">{icon}</span>}
        <h2 className="font-heading text-2xl text-ink">{title}</h2>
      </div>
      {subtitle && <p className="font-body text-ink/70">{subtitle}</p>}
      <div className="mt-2 h-3 border-b-4 border-ink w-full" style={{ borderRadius: '2px 2px 12px 12px' }} />
    </div>
  );
};

export const DoodleDivider: React.FC<{ variant?: 'line' | 'dots' | 'zigzag'; className?: string }> = ({ 
  variant = 'line', 
  className = '' 
}) => {
  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center gap-2 my-6 ${className}`}>
        <span className="w-2 h-2 rounded-full bg-ink" />
        <span className="w-2 h-2 rounded-full bg-ink" />
        <span className="w-2 h-2 rounded-full bg-ink" />
      </div>
    );
  }

  if (variant === 'zigzag') {
    return (
      <svg className={`w-full h-8 my-6 ${className}`} viewBox="0 0 200 20" preserveAspectRatio="none">
        <path d="M0 10 L10 0 L20 10 L30 0 L40 10 L50 0 L60 10 L70 0 L80 10 L90 0 L100 10 L110 0 L120 10 L130 0 L140 10 L150 0 L160 10 L170 0 L180 10 L190 0 L200 10" stroke="currentColor" strokeWidth="2" fill="none" className="text-ink" />
      </svg>
    );
  }

  return (
    <div className={`my-6 h-4 flex items-center ${className}`}>
      <div className="flex-1 h-1 bg-ink" style={{ borderRadius: '2px' }} />
    </div>
  );
};

export const Sticker: React.FC<{
  children: React.ReactNode;
  rotation?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ children, rotation = 0, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <motion.div
      className={`${sizes[size]} ${className} inline-flex items-center justify-center rounded-hand-lg border-hand border-ink shadow-sticker bg-notebook-yellow`}
      style={{ transform: `rotate(${rotation}deg)` }}
      whileHover={{ scale: 1.1, rotate: rotation + 5, boxShadow: '5px 5px 0px rgba(43, 43, 43, 0.2)' }}
    >
      {children}
    </motion.div>
  );
};
