@@ .. @@
 import React, { useState } from 'react';
+import { motion } from 'framer-motion';
 import { HowItWorksDemo } from './HowItWorks';
 import { classNames } from '../../utils/classNames';

@@ .. @@
             {/* Main Hero Content */}
             <div className={classNames(
                 "relative z-10 w-full max-w-5xl transition-all duration-300 ease-in-out",
                 isDemoVisible ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
             )}>
-                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur animate-slide-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
+                <motion.div 
+                    initial={{ opacity: 0, y: 20 }}
+                    animate={{ opacity: 1, y: 0 }}
+                    transition={{ delay: 0.1 }}
+                    className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur"
+                >
                     <span className="h-2 w-2 rounded-full bg-emerald-400" /> Live • Erasmus+ supported
-                </div>
-                <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-7xl animate-slide-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
+                </motion.div>
+                <motion.h1 
+                    initial={{ opacity: 0, y: 30 }}
+                    animate={{ opacity: 1, y: 0 }}
+                    transition={{ delay: 0.2, duration: 0.6 }}
+                    className="text-4xl font-extrabold leading-tight tracking-tight md:text-7xl"
+                >
                     Build Immersive Lessons.
                     <br />
                     Inspire a World of Learners.
-                </h1>
-                <p className="mt-6 max-w-2xl text-base text-white/90 md:text-lg animate-slide-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
+                </motion.h1>
+                <motion.p 
+                    initial={{ opacity: 0, y: 20 }}
+                    animate={{ opacity: 1, y: 0 }}
+                    transition={{ delay: 0.3 }}
+                    className="mt-6 max-w-2xl text-base text-white/90 md:text-lg"
+                >
                     Study360 streamlines immersive lesson creation: curate media in the Map, assemble scenes in the Builder, and deliver a focused experience in the Player.
-                </p>
-                <div className="mt-10 flex flex-wrap gap-4 animate-slide-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
-                    <button onClick={onExplore} className="rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition transform hover:scale-105 hover:bg-blue-500 hover:shadow-xl">🌍 Explore Map</button>
-                    <button onClick={onCreate} className="rounded-xl bg-white/20 px-6 py-3 text-base font-semibold text-white shadow-lg backdrop-blur transition transform hover:scale-105 hover:bg-white/30 hover:shadow-xl">➕ Create a Lesson</button>
-                    <button onClick={() => setIsDemoVisible(true)} className="rounded-xl bg-transparent px-6 py-3 text-base font-semibold text-white shadow-lg ring-1 ring-inset ring-white/50 transition transform hover:scale-105 hover:bg-white/10 hover:shadow-xl">🎬 How it Works</button>
-                </div>
+                </motion.p>
+                <motion.div 
+                    initial={{ opacity: 0, y: 20 }}
+                    animate={{ opacity: 1, y: 0 }}
+                    transition={{ delay: 0.4 }}
+                    className="mt-10 flex flex-wrap gap-4"
+                >
+                    <motion.button 
+                        whileHover={{ scale: 1.05, y: -2 }}
+                        whileTap={{ scale: 0.95 }}
+                        onClick={onExplore} 
+                        className="rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-blue-500 hover:shadow-xl"
+                    >
+                        🌍 Explore Map
+                    </motion.button>
+                    <motion.button 
+                        whileHover={{ scale: 1.05, y: -2 }}
+                        whileTap={{ scale: 0.95 }}
+                        onClick={onCreate} 
+                        className="rounded-xl bg-white/20 px-6 py-3 text-base font-semibold text-white shadow-lg backdrop-blur transition-all hover:bg-white/30 hover:shadow-xl"
+                    >
+                        ➕ Create a Lesson
+                    </motion.button>
+                    <motion.button 
+                        whileHover={{ scale: 1.05, y: -2 }}
+                        whileTap={{ scale: 0.95 }}
+                        onClick={() => setIsDemoVisible(true)} 
+                        className="rounded-xl bg-transparent px-6 py-3 text-base font-semibold text-white shadow-lg ring-1 ring-inset ring-white/50 transition-all hover:bg-white/10 hover:shadow-xl"
+                    >
+                        🎬 How it Works
+                    </motion.button>
+                </motion.div>
             </div>
             
             {/* Interactive Demo Overlay */}
@@ .. @@