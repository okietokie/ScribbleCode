import React from 'react';
import { X } from 'lucide-react';
import { ChipProps } from '@/types';

export const Chip: React.FC<ChipProps> = ({
  children,
  selected = false,
  onClick,
  onClose,
}) => {
  return (
    <span
      className={`chip-hand ${selected ? 'bg-notebook-yellow/30' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
      {onClose && (
        <button
          type="button"
          className="ml-2 hover:bg-ink/10 rounded-full p-0.5 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Remove chip"
        >
          <X size={14} />
        </button>
      )}
    </span>
  );
};
