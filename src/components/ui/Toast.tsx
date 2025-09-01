import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, CloseIcon } from '../icons';
import { classNames } from '../../utils/classNames';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

export const ToastComponent: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  const typeStyles = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const typeIcons = {
    success: <CheckIcon className="h-5 w-5 text-emerald-600" />,
    error: <CloseIcon className="h-5 w-5 text-red-600" />,
    warning: <span className="text-amber-600">⚠️</span>,
    info: <span className="text-blue-600">ℹ️</span>
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      className={classNames(
        "flex items-start gap-3 rounded-xl border p-4 shadow-lg",
        typeStyles[toast.type]
      )}
    >
      <div className="flex-shrink-0">{typeIcons[toast.type]}</div>
      <div className="flex-grow">
        <h4 className="font-semibold">{toast.title}</h4>
        {toast.message && <p className="text-sm mt-1">{toast.message}</p>}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 text-slate-400 hover:text-slate-600"
        aria-label="Dismiss notification"
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {toasts.map(toast => (
          <ToastComponent key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
};