import React from 'react';
import { Hero } from '../components/home/Hero';
import { HighlightCard } from '../components/home/HighlightCard';
import { Stats } from '../components/home/Stats';
import { MapScreenshot } from '../components/home/MapScreenshot';
import { ThematicBanner } from '../components/home/ThematicBanner';
import { LessonCard } from '../components/shared/LessonCard';
import { FAQ } from '../components/shared/FAQ';
import { MOCK_LESSONS } from '../constants';
import { Lesson, Page } from '../types';
import { BookIcon, CreateIcon, MapIcon } from '../components/icons';

interface HomePageProps {
    onNavigate: (page: Page, params?: { tag?: string }) => void;
    onOpenLesson: (lesson: Lesson) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenLesson }) => {
    return (
        <>
            <Hero onExplore={() => onNavigate('Map')} onCreate={() => onNavigate('Create')} />
            <section className="grid gap-4 md:grid-cols-3">
                <HighlightCard icon={MapIcon} title="Interactive Map" text="Discover global panoramic images and geotagged lessons." />
                <HighlightCard icon={BookIcon} title="Free Lessons" text="Use community-made lessons or build your own." />
                <HighlightCard icon={CreateIcon} title="Lesson Builder" text="Add infospots, text, and quizzes with ease." />
            </section>
            <Stats />
            <MapScreenshot onOpen={() => onNavigate('Map')} />
            <ThematicBanner>
                <button 
                    onClick={() => onNavigate('Lessons')}
                    className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-rose-900 shadow-md transition-transform group-hover:scale-105 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-900">
                    View Collection
                </button>
            </ThematicBanner>
            <section>
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Featured Lessons</h2>
                    <button onClick={() => onNavigate('Lessons')} className="text-sm font-medium text-blue-600 hover:underline">View all</button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {MOCK_LESSONS.map((l) => <LessonCard key={l.id} lesson={l} onOpen={onOpenLesson} onNavigateToTag={(tag) => onNavigate('Lessons', { tag })} />)}
                </div>
            </section>
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">About Study360</h2>
                <p className="text-sm text-gray-700">Study360 is a free educational platform by Interactive Bulgaria Foundation. Teachers and learners can upload 360° media and build interactive lessons with hotspots, quizzes, and rich text. Content can be public (for reuse) or private.</p>
            </section>
            <FAQ />
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-xs text-gray-500">Supported by</div>
                <h3 className="mt-1 text-sm font-semibold text-gray-800">Erasmus+ • S.P.Q.R – Schools and People of Europe</h3>
                <p className="mt-2 text-sm text-gray-600">All assets on the platform are free for educational use only. Copyright remains with the authors. Obscene or low-quality content may be removed.</p>
            </section>
        </>
    );
};