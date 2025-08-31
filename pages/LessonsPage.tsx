import React, { useState, useMemo, useEffect } from 'react';
import { FilterBar } from '../components/lessons/FilterBar';
import { LessonCard } from '../components/shared/LessonCard';
import { MOCK_LESSONS } from '../constants';
import { Lesson } from '../types';
import { classNames } from '../utils/classNames';
import { ThematicBanner } from '../components/home/ThematicBanner';

interface LessonsPageProps {
    onOpenLesson: (lesson: Lesson) => void;
    initialQuery?: string;
}

export const LessonsPage: React.FC<LessonsPageProps> = ({ onOpenLesson, initialQuery }) => {
    const [query, setQuery] = useState(initialQuery || "");
    const [showRomanEmpire, setShowRomanEmpire] = useState(false);

    useEffect(() => {
        setQuery(initialQuery || "");
        if (initialQuery) {
            setShowRomanEmpire(false);
        }
    }, [initialQuery]);

    const handleToggleRomanEmpire = () => {
        const newToggleState = !showRomanEmpire;
        setShowRomanEmpire(newToggleState);
        if (newToggleState) {
            setQuery("");
        } else {
            setQuery(initialQuery || "");
        }
    };

    const filteredLessons = useMemo(() => {
        if (showRomanEmpire) {
            return MOCK_LESSONS.filter(lesson =>
                lesson.tags.some(tag => tag.toLowerCase().includes('rome'))
            );
        }

        return MOCK_LESSONS.filter((lesson) =>
            (query ? (lesson.title + " " + lesson.author + " " + lesson.tags.join(" ")).toLowerCase().includes(query.toLowerCase()) : true)
        );
    }, [query, showRomanEmpire]);

    return (
        <div
            className={classNames(
                "rounded-2xl transition-all duration-300",
                showRomanEmpire ? "bg-amber-50 p-4" : "p-0"
            )}
        >
            <div className="space-y-6">
                <ThematicBanner description="Show only lessons related to Ancient Rome.">
                    <button
                        onClick={handleToggleRomanEmpire}
                        role="switch"
                        aria-checked={showRomanEmpire}
                        className={classNames(
                            'relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-900',
                            showRomanEmpire ? 'bg-amber-500' : 'bg-white/30'
                        )}
                    >
                        <span
                            aria-hidden="true"
                            className={classNames(
                                'pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                showRomanEmpire ? 'translate-x-5' : 'translate-x-0'
                            )}
                        />
                    </button>
                </ThematicBanner>

                {!showRomanEmpire && (
                    <FilterBar
                        query={query} setQuery={setQuery}
                    />
                )}

                {filteredLessons.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {filteredLessons.map((l) => <LessonCard key={l.id} lesson={l} onOpen={onOpenLesson} onNavigateToTag={setQuery} />)}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-600">
                        No lessons match your filters.
                    </div>
                )}
            </div>
        </div>
    );
};
