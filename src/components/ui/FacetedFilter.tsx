import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, FilterIcon, CloseIcon } from '../icons';
import { classNames } from '../../utils/classNames';

interface FilterOption {
  value: string;
  label: string;
  count: number;
}

interface FilterGroup {
  key: string;
  label: string;
  options: FilterOption[];
}

interface FacetedFilterProps {
  filterGroups: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupKey: string, values: string[]) => void;
  onClearAll: () => void;
}

export const FacetedFilter: React.FC<FacetedFilterProps> = ({
  filterGroups,
  selectedFilters,
  onFilterChange,
  onClearAll
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['level', 'language']));

  const totalSelectedCount = Object.values(selectedFilters).flat().length;

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupKey)) {
        newSet.delete(groupKey);
      } else {
        newSet.add(groupKey);
      }
      return newSet;
    });
  };

  const handleOptionToggle = (groupKey: string, value: string) => {
    const currentValues = selectedFilters[groupKey] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange(groupKey, newValues);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          "flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors",
          isOpen || totalSelectedCount > 0
            ? "border-blue-500 bg-blue-50 text-blue-700"
            : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FilterIcon className="h-4 w-4" />
        <span>Filters</span>
        {totalSelectedCount > 0 && (
          <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
            {totalSelectedCount}
          </span>
        )}
        <ChevronDownIcon className={classNames(
          "h-4 w-4 transition-transform",
          isOpen ? "rotate-180" : ""
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-lg z-50"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800">Filter Options</h3>
                {totalSelectedCount > 0 && (
                  <button
                    onClick={onClearAll}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-4 max-h-80 overflow-y-auto">
                {filterGroups.map(group => (
                  <div key={group.key}>
                    <button
                      onClick={() => toggleGroup(group.key)}
                      className="flex w-full items-center justify-between py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
                      aria-expanded={expandedGroups.has(group.key)}
                    >
                      <span>{group.label}</span>
                      <ChevronDownIcon className={classNames(
                        "h-4 w-4 transition-transform",
                        expandedGroups.has(group.key) ? "rotate-180" : ""
                      )} />
                    </button>
                    
                    <AnimatePresence>
                      {expandedGroups.has(group.key) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 pl-2">
                            {group.options.map(option => {
                              const isSelected = (selectedFilters[group.key] || []).includes(option.value);
                              return (
                                <label
                                  key={option.value}
                                  className="flex items-center gap-2 cursor-pointer py-1"
                                >
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => handleOptionToggle(group.key, option.value)}
                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-slate-600 flex-grow">
                                    {option.label}
                                  </span>
                                  <span className="text-xs text-slate-400">
                                    {option.count}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};