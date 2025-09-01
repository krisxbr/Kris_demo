@@ .. @@
 import React, { useState, useMemo, useEffect } from 'react';
+import { motion } from 'framer-motion';
+import Fuse from 'fuse.js';
 import { FilterBar } from '../components/lessons/FilterBar';
 import { LessonCard } from '../components/shared/LessonCard';
+import { FacetedFilter } from '../components/ui/FacetedFilter';
+import { SkeletonLoader } from '../components/ui/SkeletonLoader';
 import { MOCK_LESSONS } from '../constants';
 import { Lesson } from '../types';
 import { classNames } from '../utils/classNames';
 import { ThematicBanner } from '../components/home/ThematicBanner';
+import { createLessonSearchEngine } from '../utils/search';

 interface LessonsPageProps {
     onOpenLesson: (lesson: Lesson) => void;
     initialQuery?: string;
 }

 export const LessonsPage: React.FC<LessonsPageProps> = ({ onOpenLesson, initialQuery }) => {
     const [query, setQuery] = useState(initialQuery || "");
     const [showRomanEmpire, setShowRomanEmpire] = useState(false);
+    const [isLoading, setIsLoading] = useState(false);
+    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
+    const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'favorites' | 'title'>('relevance');

+    const searchEngine = useMemo(() => createLessonSearchEngine(MOCK_LESSONS), []);

     useEffect(() => {
         setQuery(initialQuery || "");
         if (initialQuery) {
             setShowRomanEmpire(false);
         }
     }, [initialQuery]);

+    useEffect(() => {
+        if (query || Object.keys(selectedFilters).length > 0) {
+            setIsLoading(true);
+            const timer = setTimeout(() => setIsLoading(false), 300);
+            return () => clearTimeout(timer);
+        }
+    }, [query, selectedFilters]);

     const handleToggleRomanEmpire = () => {
@@ .. @@
         }
     };

            setSelectedFilters({});
+    const filterGroups = useMemo(() => {
+        const levels = [...new Set(MOCK_LESSONS.map(l => l.level))];
+        const languages = [...new Set(MOCK_LESSONS.map(l => l.language))];
+        const authors = [...new Set(MOCK_LESSONS.map(l => l.author))];
+        
+        return [
+            {
+                key: 'level',
+                label: 'Difficulty Level',
+                options: levels.map(level => ({
+                    value: level,
+                    label: level,
+                    count: MOCK_LESSONS.filter(l => l.level === level).length
+                }))
+            },
+            {
+                key: 'language',
+                label: 'Language',
+                options: languages.map(lang => ({
+                    value: lang,
+                    label: lang,
+                    count: MOCK_LESSONS.filter(l => l.language === lang).length
+                }))
+            },
+            {
+                key: 'author',
+                label: 'Author',
+                options: authors.map(author => ({
+                    value: author,
+                    label: author,
+                    count: MOCK_LESSONS.filter(l => l.author === author).length
+                }))
+            }
+        ];
+    }, []);

     const filteredLessons = useMemo(() => {
         if (showRomanEmpire) {
-            return MOCK_LESSONS.filter(lesson =>
+            let lessons = MOCK_LESSONS.filter(lesson =>
                 lesson.tags.some(tag => tag.toLowerCase().includes('rome'))
             );
+            
+            // Apply additional filters
+            Object.entries(selectedFilters).forEach(([key, values]) => {
+                if (values.length > 0) {
+                    lessons = lessons.filter(lesson => {
+                        if (key === 'level') return values.includes(lesson.level);
+                        if (key === 'language') return values.includes(lesson.language);
+                        if (key === 'author') return values.includes(lesson.author);
+                        return true;
+                    });
+                }
+            });
+            
+            return lessons;
         }

-        return MOCK_LESSONS.filter((lesson) =>
    const filterGroups = useMemo(() => {
        const levels = [...new Set(MOCK_LESSONS.map(l => l.level))];
        const languages = [...new Set(MOCK_LESSONS.map(l => l.language))];
        const authors = [...new Set(MOCK_LESSONS.map(l => l.author))];
        
        return [
            {
                key: 'level',
                label: 'Difficulty Level',
                options: levels.map(level => ({
                    value: level,
                    label: level,
                    count: MOCK_LESSONS.filter(l => l.level === level).length
                }))
            },
            {
                key: 'language',
                label: 'Language',
                options: languages.map(lang => ({
                    value: lang,
                    label: lang,
                    count: MOCK_LESSONS.filter(l => l.language === lang).length
                }))
            },
            {
                key: 'author',
                label: 'Author',
                options: authors.map(author => ({
                    value: author,
                    label: author,
            let lessons = MOCK_LESSONS.filter(lesson =>
                    count: MOCK_LESSONS.filter(l => l.author === author).length
                }))
            
            // Apply additional filters
            Object.entries(selectedFilters).forEach(([key, values]) => {
                if (values.length > 0) {
                    lessons = lessons.filter(lesson => {
                        if (key === 'level') return values.includes(lesson.level);
                        if (key === 'language') return values.includes(lesson.language);
                        if (key === 'author') return values.includes(lesson.author);
                        return true;
                    });
                }
            });
            
            return lessons;
            }
        ];
    }, []);
-            (query ? (lesson.title + " " + lesson.author + " " + lesson.tags.join(" ")).toLowerCase().includes(query.toLowerCase()) : true)
-        );
-    }, [query, showRomanEmpire]);
+        let lessons = MOCK_LESSONS;
+        
+        // Apply search
+        if (query.trim()) {
+            const results = searchEngine.search(query);
+            lessons = results.map(result => result.item);
+        }
+        
+        // Apply filters
+        Object.entries(selectedFilters).forEach(([key, values]) => {
+            if (values.length > 0) {
+                lessons = lessons.filter(lesson => {
+                    if (key === 'level') return values.includes(lesson.level);
+                    if (key === 'language') return values.includes(lesson.language);
+                    if (key === 'author') return values.includes(lesson.author);
+                    return true;
+                });
+            }
+        });
+        
+        // Apply sorting
+        if (sortBy === 'rating') {
+            lessons.sort((a, b) => b.rating - a.rating);
+        } else if (sortBy === 'favorites') {
+            lessons.sort((a, b) => b.favorites - a.favorites);
+        } else if (sortBy === 'title') {
+            lessons.sort((a, b) => a.title.localeCompare(b.title));
+        }
+        
+        return lessons;
+    }, [query, showRomanEmpire, selectedFilters, sortBy, searchEngine]);

+    const handleFilterChange = (groupKey: string, values: string[]) => {
+        setSelectedFilters(prev => ({
+            ...prev,
+            [groupKey]: values
+        }));
+    };
+
+    const handleClearAllFilters = () => {
+        setSelectedFilters({});
+    };

     return (
@@ .. @@
                 </ThematicBanner>

                 {!showRomanEmpire && (
-                    <FilterBar
-                        query={query} setQuery={setQuery}
-                    />
+                    <div className="space-y-4">
+                        <FilterBar query={query} setQuery={setQuery} />
+                        
+                        <div className="flex flex-wrap items-center justify-between gap-4">
+                            <FacetedFilter
+                                filterGroups={filterGroups}
+                                selectedFilters={selectedFilters}
+                                onFilterChange={handleFilterChange}
+                                onClearAll={handleClearAllFilters}
+                            />
+                            
+                            <div className="flex items-center gap-2">
+                                <span className="text-sm text-slate-600">Sort by:</span>
+                                <select
+                                    value={sortBy}
+                                    onChange={(e) => setSortBy(e.target.value as any)}
+                                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
+                                >
+                                    <option value="relevance">Relevance</option>
+                                    <option value="rating">Rating</option>
+                                    <option value="favorites">Popularity</option>
+                                    <option value="title">Title A-Z</option>
+                                </select>
+                            </div>
+                        </div>
+                    </div>
                 )}

-                {filteredLessons.length > 0 ? (
-                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
-                        {filteredLessons.map((l) => <LessonCard key={l.id} lesson={l} onOpen={onOpenLesson} onNavigateToTag={setQuery} />)}
-                    </div>
+                {isLoading ? (
+                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
+                        {Array.from({ length: 8 }).map((_, i) => (
+                            <div key={i} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
+                                <SkeletonLoader className="w-full aspect-[3/2] mb-4" />
+                                <SkeletonLoader className="h-4 w-3/4 mb-2" />
+                                <SkeletonLoader className="h-3 w-1/2 mb-3" />
+                                <div className="flex gap-2">
+                                    <SkeletonLoader className="h-6 w-16" />
+                                    <SkeletonLoader className="h-6 w-20" />
+                                </div>
+                            </div>
+                        ))}
+                    </div>
+                ) : filteredLessons.length > 0 ? (
+                    <motion.div 
+                        layout
+                        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
+                    >
+                        {filteredLessons.map((l, index) => (
+                            <LessonCard 
+                                key={l.id} 
+                                lesson={l} 
+                                onOpen={onOpenLesson} 
+                                onNavigateToTag={setQuery}
+                                index={index}
+                            />
+                        ))}
+                    </motion.div>
                 ) : (
-                    <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-600">
-                        No lessons match your filters.
+                    <motion.div 
+                        initial={{ opacity: 0 }}
+                        animate={{ opacity: 1 }}
+                        className="rounded-2xl border border-gray-200 bg-white p-12 text-center"
+                    >
+                        <div className="text-4xl mb-4">🔍</div>
+                        <h3 className="text-lg font-semibold text-slate-800 mb-2">No lessons found</h3>
+                        <p className="text-sm text-slate-600 mb-4">
+                            Try adjusting your search terms or filters to find more lessons.
+                        </p>
+                        <button
+                            onClick={() => {
+                                setQuery('');
+                                setSelectedFilters({});
+                                setShowRomanEmpire(false);
+                            }}
+                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
+                        >
+                            Clear all filters
+                        </button>
                     </div>
                 )}
             </div>
@@ .. @@