import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModalProps } from '@/types';
import { X } from 'lucide-react';
import { Button } from '../ui';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-ink/50 z-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-modal pointer-events-none">
            <motion.div
              className="bg-paper-page rounded-hand-xl border-hand border-ink shadow-paper p-6 max-w-md w-full mx-4 pointer-events-auto"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-xl text-ink">{title}</h2>
                <motion.button
                  onClick={onClose}
                  className="p-1 rounded-hand hover:bg-notebook-yellow/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
              
              {/* Content */}
              <div className="mb-6">
                {children}
              </div>
              
              {/* Footer */}
              {footer && (
                <div className="flex justify-end gap-3">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

/**
 * Dialog Component - simpler dialog without backdrop
 */
export const Dialog: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-4 right-4 bg-paper-page rounded-hand-lg border-hand border-ink shadow-paper p-4 max-w-sm z-tooltip"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-heading text-base text-ink mb-2">{title}</h3>
              <div className="font-body text-sm text-ink/80">{children}</div>
            </div>
            <button onClick={onClose} className="text-ink/60 hover:text-ink">
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Confirmation Dialog - for confirmations
 */
export const ConfirmationDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'success' | 'primary';
}> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary',
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant={variant} size="sm" onClick={onConfirm}>
            {confirmText}
          </Button>
        </>
      }
    >
      <p className="font-body text-ink/80">{message}</p>
    </Modal>
  );
};
