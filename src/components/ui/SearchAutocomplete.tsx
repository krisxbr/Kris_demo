import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon, CloseIcon } from '../icons';
import { classNames } from '../../utils/classNames';
import { useDebounce } from '../../hooks/useDebounce';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface SearchSuggestion {
  type: 'recent' | 'tag' | 'author' | 'location';
  value: string;
  label: string;
  count?: number;
}

interface SearchAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  suggestions?: SearchSuggestion[];
  className?: string;
  showRecentSearches?: boolean;
}

export const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder = "Search...",
  suggestions = [],
  className,
  showRecentSearches = true
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('study360-recent-searches', []);
  const debouncedValue = useDebounce(value, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        onBlur?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onBlur]);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleSelectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    setIsFocused(false);
    
    if (showRecentSearches && suggestion.trim()) {
      const newRecent = [suggestion, ...recentSearches.filter(s => s !== suggestion)].slice(0, 5);
      setRecentSearches(newRecent);
    }
  };

  const handleClearRecent = (searchTerm: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches(recentSearches.filter(s => s !== searchTerm));
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const filteredSuggestions = suggestions.filter(s => 
    s.value.toLowerCase().includes(debouncedValue.toLowerCase())
  ).slice(0, 8);

  const showDropdown = isFocused && (
    debouncedValue.length > 0 ? filteredSuggestions.length > 0 : recentSearches.length > 0
  );

  return (
    <div ref={containerRef} className={classNames("relative", className)}>
      <div className={classNames(
        "relative rounded-xl border bg-white shadow-sm transition-all duration-200",
        isFocused ? "border-blue-500 ring-2 ring-blue-500/20" : "border-slate-300"
      )}>
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="w-full rounded-xl bg-transparent py-3 pl-10 pr-10 text-sm outline-none"
          aria-label="Search"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 hover:text-slate-600"
            aria-label="Clear search"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border border-slate-200 bg-white shadow-lg"
          >
            <div className="max-h-64 overflow-y-auto p-2">
              {debouncedValue.length === 0 && recentSearches.length > 0 && (
                <>
                  <div className="px-3 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Recent Searches
                  </div>
                  {recentSearches.map((search, index) => (
                    <button
                      key={`recent-${index}`}
                      onClick={() => handleSelectSuggestion(search)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100"
                    >
                      <span className="text-slate-700">{search}</span>
                      <button
                        onClick={(e) => handleClearRecent(search, e)}
                        className="h-4 w-4 text-slate-400 hover:text-slate-600"
                        aria-label={`Remove ${search} from recent searches`}
                      >
                        <CloseIcon />
                      </button>
                    </button>
                  ))}
                </>
              )}

              {debouncedValue.length > 0 && filteredSuggestions.length > 0 && (
                <>
                  <div className="px-3 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Suggestions
                  </div>
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={`suggestion-${index}`}
                      onClick={() => handleSelectSuggestion(suggestion.value)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100"
                    >
                      <div className="flex items-center gap-2">
                        <span className={classNames(
                          "text-xs px-1.5 py-0.5 rounded font-medium",
                          suggestion.type === 'tag' ? "bg-teal-100 text-teal-700" :
                          suggestion.type === 'author' ? "bg-purple-100 text-purple-700" :
                          suggestion.type === 'location' ? "bg-orange-100 text-orange-700" :
                          "bg-slate-100 text-slate-700"
                        )}>
                          {suggestion.type}
                        </span>
                        <span className="text-slate-700">{suggestion.label}</span>
                      </div>
                      {suggestion.count && (
                        <span className="text-xs text-slate-500">{suggestion.count}</span>
                      )}
                    </button>
                  ))}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};