import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui';
import { ErrorStateProps } from '@/types';

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <AlertTriangle className="w-20 h-20 mb-6 text-notebook-red" />
      <h3 className="text-heading font-primary mb-2">{title}</h3>
      <p className="text-body text-ink/70 mb-6 max-w-sm">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          Try Again
        </Button>
      )}
    </div>
  );
};
