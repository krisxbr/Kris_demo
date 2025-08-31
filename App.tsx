import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { MapPage } from './pages/MapPage';
import { LessonsPage } from './pages/LessonsPage';
import { CreatePage } from './pages/CreatePage';
import { AboutPage } from './pages/AboutPage';
import { Player } from './components/player/Player';
import { Lesson, Page } from './types';
import { MOCK_LESSONS } from './constants';

export default function App() {
  const [page, setPage] = useState<Page>("Home");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [lessonsPageInitialQuery, setLessonsPageInitialQuery] = useState("");

  useEffect(() => {
    console.log(`Navigated to: ${selectedLesson ? `Player (Lesson: ${selectedLesson.title})` : page}`);
  }, [page, selectedLesson]);
  
  useEffect(() => {
    console.group("Study360 – Runtime Sanity Checks");
    console.assert(Array.isArray(MOCK_LESSONS) && MOCK_LESSONS.length >= 4, "MOCK_LESSONS should have at least 4 items");
    const keysOk = MOCK_LESSONS.every((l) => l.id && l.title && l.author && l.tags && l.language && l.level && l.thumb && l.location?.city);
    console.assert(keysOk, "Each lesson should have all required fields");
    const rome = MOCK_LESSONS.filter((l) => (l.title + " " + l.author + " " + l.tags.join(" ")).toLowerCase().includes("rome"));
    console.assert(!!rome.find((l) => l.id === "l1"), "Query 'rome' should match lesson l1");
    console.groupEnd();
  }, []);

  const handleOpenLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    window.scrollTo(0, 0);
  };

  const handleBackFromPlayer = () => {
    setSelectedLesson(null);
    setPage("Lessons");
  };
  
  const handleNavigate = (newPage: Page, params?: { tag?: string }) => {
    setSelectedLesson(null);

    if (newPage === 'Lessons' && params?.tag) {
        setLessonsPageInitialQuery(params.tag);
    } else {
        setLessonsPageInitialQuery("");
    }
    setPage(newPage);
    window.scrollTo(0, 0);
  }

  const renderPage = () => {
    switch (page) {
      case "Home": return <HomePage onNavigate={handleNavigate} onOpenLesson={handleOpenLesson} />;
      case "Map": return <MapPage onNavigate={handleNavigate} />;
      case "Lessons": return <LessonsPage onOpenLesson={handleOpenLesson} initialQuery={lessonsPageInitialQuery} />;
      case "Create": return <CreatePage />;
      case "About": return <AboutPage />;
      default: return <HomePage onNavigate={handleNavigate} onOpenLesson={handleOpenLesson} />;
    }
  };

  const isMapPage = page === 'Map' && !selectedLesson;
  const isPlayerPage = !!selectedLesson;
  const useFullScreenLayout = isMapPage || isPlayerPage;

  const mainContent = useFullScreenLayout ? (
    <div className="h-screen w-screen bg-slate-50 text-slate-800 flex flex-col p-4 md:p-6 gap-6">
      <Header activePage={isPlayerPage ? "Lessons" : page} onNavigate={handleNavigate} />
      <main className="flex-grow min-h-0">
        {isPlayerPage ? (
          <Player lesson={selectedLesson!} onBack={handleBackFromPlayer} />
        ) : (
          <MapPage onNavigate={handleNavigate} />
        )}
      </main>
    </div>
  ) : (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className='mx-auto max-w-6xl p-4 md:p-6'>
        <Header activePage={page} onNavigate={handleNavigate} />
        <main className="mt-6 space-y-6">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </div>
  );
  
  return (
    <>
      {mainContent}
    </>
  );
}