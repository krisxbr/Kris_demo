import { useEffect } from 'react';
import { Page } from '../types';

interface UseKeyboardShortcutsProps {
  onNavigate: (page: Page) => void;
  onSearch: () => void;
  onEscape: () => void;
}

export function useKeyboardShortcuts({ onNavigate, onSearch, onEscape }: UseKeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K for search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onSearch();
        return;
      }

      // Escape key
      if (e.key === 'Escape') {
        onEscape();
        return;
      }

      // Number keys for navigation (only if not in an input)
      if (!(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        switch (e.key) {
          case '1':
            onNavigate('Home');
            break;
          case '2':
            onNavigate('Map');
            break;
          case '3':
            onNavigate('Lessons');
            break;
          case '4':
            onNavigate('Create');
            break;
          case '5':
            onNavigate('About');
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onNavigate, onSearch, onEscape]);
}