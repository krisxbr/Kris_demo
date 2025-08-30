import React, { useState, useMemo } from 'react';
import { FilterBar } from '../components/lessons/FilterBar';
import { LessonCard } from '../components/shared/LessonCard';
import { MOCK_LESSONS } from '../constants';
import { Lesson } from '../types';

interface LessonsPageProps {
    onOpenLesson: (lesson: Lesson) => void;
}

export const LessonsPage: React.FC<LessonsPageProps> = ({ onOpenLesson }) => {
    const [query, setQuery] = useState("");
    const [level, setLevel] = useState("");
    const [language, setLanguage] = useState("");

    const filteredLessons = useMemo(() =>
        MOCK_LESSONS.filter((lesson) =>
            (query ? (lesson.title + " " + lesson.author + " " + lesson.tags.join(" ")).toLowerCase().includes(query.toLowerCase()) : true) &&
            (level ? lesson.level === level : true) &&
            (language ? lesson.language === language : true)
        ),
        [query, level, language]
    );

    return (
        <>
            <FilterBar 
                query={query} setQuery={setQuery}
                level={level} setLevel={setLevel}
                language={language} setLanguage={setLanguage}
            />
            {filteredLessons.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {filteredLessons.map((l) => <LessonCard key={l.id} lesson={l} onOpen={onOpenLesson} />)}
                </div>
            ) : (
                <div className="col-span-full rounded-2xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-600">
                    No lessons match your filters. Try adjusting your search.
                </div>
            )}
        </>
    );
};