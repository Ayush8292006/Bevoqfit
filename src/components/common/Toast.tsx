import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Info } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useUI();

  return (
    <div className="fixed bottom-6 right-6 z-[9990] flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-auto flex items-center justify-between gap-3 bg-[#111111] border border-white/20 text-white px-4 py-3.5 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                {toast.type === 'error' ? (
                  <X className="w-3.5 h-3.5" />
                ) : toast.type === 'info' ? (
                  <Info className="w-3.5 h-3.5" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
              </div>
              <p className="text-xs uppercase tracking-widest font-medium text-neutral-200">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-neutral-500 hover:text-white transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

