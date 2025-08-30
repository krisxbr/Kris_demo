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

  useEffect(() => {
    // This effect can be used for things like analytics or sanity checks on page change.
    console.log(`Navigated to: ${selectedLesson ? `Player (Lesson: ${selectedLesson.title})` : page}`);
  }, [page, selectedLesson]);
  
  // Lightweight runtime sanity checks from original code
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
    setPage("Lessons"); // Default back to lessons page
  };
  
  const handleNavigate = (newPage: Page) => {
    setSelectedLesson(null); // Ensure player is closed when navigating
    setPage(newPage);
    window.scrollTo(0, 0);
  }

  const renderPage = () => {
    switch (page) {
      case "Home": return <HomePage onNavigate={handleNavigate} onOpenLesson={handleOpenLesson} />;
      case "Map": return <MapPage onNavigate={handleNavigate} />;
      case "Lessons": return <LessonsPage onOpenLesson={handleOpenLesson} />;
      case "Create": return <CreatePage />;
      case "About": return <AboutPage />;
      default: return <HomePage onNavigate={handleNavigate} onOpenLesson={handleOpenLesson} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-6xl p-4 md:p-6">
        <Header activePage={page} onNavigate={handleNavigate} />
        <main className="mt-6 space-y-6">
          {selectedLesson ? (
            <Player lesson={selectedLesson} onBack={handleBackFromPlayer} />
          ) : (
            renderPage()
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}
