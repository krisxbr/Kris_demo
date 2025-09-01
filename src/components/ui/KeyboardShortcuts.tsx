import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpIcon, CloseIcon } from '../icons';

interface Shortcut {
  keys: string[];
  description: string;
  category: string;
}

const SHORTCUTS: Shortcut[] = [
  { keys: ['Ctrl', 'K'], description: 'Open search', category: 'Navigation' },
  { keys: ['1'], description: 'Go to Home', category: 'Navigation' },
  { keys: ['2'], description: 'Go to Map', category: 'Navigation' },
  { keys: ['3'], description: 'Go to Lessons', category: 'Navigation' },
  { keys: ['4'], description: 'Go to Create', category: 'Navigation' },
  { keys: ['5'], description: 'Go to About', category: 'Navigation' },
  { keys: ['Esc'], description: 'Close modal/blur focus', category: 'General' },
  { keys: ['Enter'], description: 'Open lesson/confirm action', category: 'General' },
  { keys: ['Space'], description: 'Open lesson', category: 'General' },
];

export const KeyboardShortcuts: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [...new Set(SHORTCUTS.map(s => s.category))];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-slate-800 text-white shadow-lg hover:bg-slate-700 transition-colors z-40"
        aria-label="Show keyboard shortcuts"
      >
        <HelpIcon className="h-5 w-5 mx-auto" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Keyboard Shortcuts</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100"
                  aria-label="Close shortcuts"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-6 overflow-y-auto">
                {categories.map(category => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-slate-700 mb-3">{category}</h3>
                    <div className="space-y-2">
                      {SHORTCUTS.filter(s => s.category === category).map((shortcut, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">{shortcut.description}</span>
                          <div className="flex gap-1">
                            {shortcut.keys.map((key, keyIndex) => (
                              <kbd
                                key={keyIndex}
                                className="px-2 py-1 text-xs font-mono bg-slate-100 border border-slate-300 rounded"
                              >
                                {key}
                              </kbd>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};