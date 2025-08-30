import React from 'react';
import { SearchIcon } from '../icons';

interface FilterBarProps {
  query: string;
  setQuery: (value: string) => void;
  level: string;
  setLevel: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ query, setQuery, level, setLevel, language, setLanguage }) => {
    const handleReset = () => {
        setQuery("");
        setLevel("");
        setLanguage("");
    };
    
    return (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
            <div className="relative min-w-[220px] flex-1">
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search lessons, tags, authors..."
                    className="w-full rounded-xl border border-gray-300 bg-white px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded-xl border border-gray-300 px-3 py-2 text-sm bg-white">
                <option value="">All Levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
            </select>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="rounded-xl border border-gray-300 px-3 py-2 text-sm bg-white">
                <option value="">All Languages</option>
                <option>EN</option>
                <option>BG</option>
                <option>IT</option>
                <option>RO</option>
            </select>
            <button
                onClick={handleReset}
                className="rounded-xl border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 bg-white"
            >
                Reset
            </button>
        </div>
    );
};