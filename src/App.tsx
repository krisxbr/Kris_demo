@@ .. @@
 import React, { useState, useEffect } from 'react';
+import { motion, AnimatePresence } from 'framer-motion';
 import { Header } from './components/layout/Header';
 import { Footer } from './components/layout/Footer';
+import { ErrorBoundary } from './components/ui/ErrorBoundary';
+import { ToastContainer } from './components/ui/Toast';
 import { HomePage } from './pages/HomePage';
 import { MapPage } from './pages/MapPage';
 import { LessonsPage } from './pages/LessonsPage';
 import { CreatePage } from './pages/CreatePage';
 import { AboutPage } from './pages/AboutPage';
 import { Player } from './components/player/Player';
+import { useToast } from './hooks/useToast';
 import { Lesson, Page } from './types';
 import { MOCK_LESSONS } from './constants';

 export default function App() {
   const [page, setPage] = useState<Page>("Home");
   const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
   const [lessonsPageInitialQuery, setLessonsPageInitialQuery] = useState("");
+  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
+  const { toasts, dismissToast, success, error } = useToast();

   useEffect(() => {
@@ .. @@
   }, []);

   const handleOpenLesson = (lesson: Lesson) => {
+    setIsPageTransitioning(true);
     setSelectedLesson(lesson);
     window.scrollTo(0, 0);
+    setTimeout(() => setIsPageTransitioning(false), 300);
+    success('Lesson opened', `Now viewing: ${lesson.title}`);
   };

   const handleBackFromPlayer = () => {
+    setIsPageTransitioning(true);
     setSelectedLesson(null);
     setPage("Lessons");
+    setTimeout(() => setIsPageTransitioning(false), 300);
   };
   
   const handleNavigate = (newPage: Page, params?: { tag?: string }) => {
+    setIsPageTransitioning(true);
     setSelectedLesson(null);

@@ .. @@
     }
     setPage(newPage);
     window.scrollTo(0, 0);
+    setTimeout(() => setIsPageTransitioning(false), 300);
   }

   const renderPage = () => {
@@ .. @@
   const useFullScreenLayout = isMapPage || isPlayerPage;

   const mainContent = useFullScreenLayout ? (
-    <div className="h-screen w-screen bg-slate-50 text-slate-800 flex flex-col p-4 md:p-6 gap-6">
-      <Header activePage={isPlayerPage ? "Lessons" : page} onNavigate={handleNavigate} />
-      <main className="flex-grow min-h-0">
-        {isPlayerPage ? (
-          <Player lesson={selectedLesson!} onBack={handleBackFromPlayer} />
-        ) : (
-          <MapPage onNavigate={handleNavigate} />
-        )}
-      </main>
-    </div>
+    <motion.div 
+      initial={{ opacity: 0 }}
+      animate={{ opacity: 1 }}
+      className="h-screen w-screen bg-slate-50 text-slate-800 flex flex-col p-4 md:p-6 gap-6"
+    >
+      <ErrorBoundary>
+        <Header activePage={isPlayerPage ? "Lessons" : page} onNavigate={handleNavigate} />
+        <main className="flex-grow min-h-0">
+          <AnimatePresence mode="wait">
+            {isPlayerPage ? (
+              <motion.div
+                key="player"
+                initial={{ opacity: 0, scale: 0.95 }}
+                animate={{ opacity: 1, scale: 1 }}
+                exit={{ opacity: 0, scale: 0.95 }}
+                transition={{ duration: 0.3 }}
+              >
+                <Player lesson={selectedLesson!} onBack={handleBackFromPlayer} />
+              </motion.div>
+            ) : (
+              <motion.div
+                key="map"
+                initial={{ opacity: 0, scale: 0.95 }}
+                animate={{ opacity: 1, scale: 1 }}
+                exit={{ opacity: 0, scale: 0.95 }}
+                transition={{ duration: 0.3 }}
+              >
+                <MapPage onNavigate={handleNavigate} />
+              </motion.div>
+            )}
+          </AnimatePresence>
+        </main>
+      </ErrorBoundary>
+    </motion.div>
   ) : (
-    <div className="min-h-screen bg-slate-50 text-slate-800">
+    <motion.div 
+      initial={{ opacity: 0 }}
+      animate={{ opacity: 1 }}
+      className="min-h-screen bg-slate-50 text-slate-800"
+    >
       <div className='mx-auto max-w-6xl p-4 md:p-6'>
-        <Header activePage={page} onNavigate={handleNavigate} />
-        <main className="mt-6 space-y-6">
-          {renderPage()}
-        </main>
-        <Footer />
+        <ErrorBoundary>
+          <Header activePage={page} onNavigate={handleNavigate} />
+          <main className="mt-6 space-y-6">
+            <AnimatePresence mode="wait">
+              <motion.div
+                key={page}
+                initial={{ opacity: 0, y: 20 }}
+                animate={{ opacity: 1, y: 0 }}
+                exit={{ opacity: 0, y: -20 }}
+                transition={{ duration: 0.3 }}
+              >
+                {renderPage()}
+              </motion.div>
+            </AnimatePresence>
+          </main>
+          <Footer />
+        </ErrorBoundary>
       </div>
-    </div>
+    </motion.div>
   );
   
   return (
     <>
       {mainContent}
+      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
     </>
   );
 }