@@ .. @@
 import React from 'react';
+import { motion } from 'framer-motion';
 import { Page } from '../../types';
 import { NavButton } from '../ui/NavButton';
 import { BookIcon, CreateIcon, GlobeIcon, MapIcon, UserIcon } from '../icons';
+import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

 interface HeaderProps {
     activePage: Page;
     onNavigate: (page: Page, params?: { tag?: string }) => void;
 }

 export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
+    useKeyboardShortcuts({
+        onNavigate,
+        onSearch: () => {
+            // Focus search input if on lessons page
+            const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
+            searchInput?.focus();
+        },
+        onEscape: () => {
+            // Blur any focused element
+            (document.activeElement as HTMLElement)?.blur();
+        }
+    });
+
     return (
-        <header className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white/80 p-3 shadow-sm backdrop-blur-sm sticky top-4 z-50">
        <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white/90 p-3 shadow-sm backdrop-blur-md sticky top-4 z-50"
        >
+        <motion.header 
+            initial={{ opacity: 0, y: -20 }}
+            animate={{ opacity: 1, y: 0 }}
+            className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white/90 p-3 shadow-sm backdrop-blur-md sticky top-4 z-50"
+        >
             <div className="flex items-center gap-3">
-                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold">S360</div>
+                <motion.div 
+                    whileHover={{ scale: 1.05 }}
+                    whileTap={{ scale: 0.95 }}
+                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold shadow-lg cursor-pointer"
+                    onClick={() => onNavigate("Home")}
                    role="button"
                    tabIndex={0}
                    aria-label="Go to home page"
                >
                    S360
                </motion.div>
+                >
+                    S360
+                </motion.div>
                 <div className="text-sm font-bold text-gray-900">study360.eu</div>
             </div>
-            <nav className="flex flex-wrap items-center gap-1">
+            <nav className="flex flex-wrap items-center gap-1" role="navigation" aria-label="Main navigation">
                 <NavButton active={activePage === "Home"} onClick={() => onNavigate("Home")} icon={MapIcon}>Home</NavButton>
                 <NavButton active={activePage === "Map"} onClick={() => onNavigate("Map")} icon={MapIcon}>Map</NavButton>
                 <NavButton active={activePage === "Lessons"} onClick={() => onNavigate("Lessons")} icon={BookIcon}>Lessons</NavButton>
@@ .. @@
             </nav>
             <div className="flex items-center gap-2">
-                <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"><GlobeIcon /> EN</button>
-                <button className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">Login / Signup</button>
+                <motion.button 
+                    whileHover={{ scale: 1.02 }}
+                    whileTap={{ scale: 0.98 }}
+                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
+                    aria-label="Change language"
+                >
+                    <GlobeIcon /> EN
+                </motion.button>
+                <motion.button 
+                    whileHover={{ scale: 1.02 }}
+                    whileTap={{ scale: 0.98 }}
+                    className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md transition-all"
+                >
+                    Login / Signup
+                </motion.button>
             </div>
-        </header>
+            
+            {/* Keyboard shortcuts hint */}
+            <div className="hidden lg:block absolute -bottom-8 right-0 text-xs text-slate-500">
+                Press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border">Ctrl+K</kbd> to search
+            </div>
+        </motion.header>
     );
 };