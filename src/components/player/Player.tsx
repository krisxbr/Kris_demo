@@ .. @@
 import React, { useState } from 'react';
+import { motion, AnimatePresence } from 'framer-motion';
 import { Lesson } from '../../types';
 import { Pill } from '../ui/Pill';
+import { ProgressBar } from '../ui/ProgressBar';
+import { LazyImage } from '../ui/LazyImage';
 import { BookmarkIcon, ChevronDownIcon, ChevronUpIcon, CloseIcon, GalleryIcon, HelpIcon, LinkIcon, ParagraphIcon, PenIcon, TextIcon, TrashIcon } from '../icons';

@@ .. @@
 export const Player: React.FC<PlayerProps> = ({ lesson, onBack }) => {
     const [isGalleryOpen, setIsGalleryOpen] = useState(true);
+    const [isBookmarked, setIsBookmarked] = useState(false);

+    const handleBookmark = () => {
+        setIsBookmarked(!isBookmarked);
+        // Here you would typically save to localStorage or send to backend
+    };
+
+    const handleCopyLink = async () => {
+        try {
+            await navigator.clipboard.writeText(window.location.href);
+            // You could show a toast notification here
+        } catch (err) {
+            console.error('Failed to copy link:', err);
+        }
+    };

     return (
-        <div className="h-full w-full flex flex-col md:flex-row gap-4 rounded-2xl bg-gray-100 border border-gray-200 shadow-lg p-4">
+        <motion.div 
+            initial={{ opacity: 0 }}
+            animate={{ opacity: 1 }}
+            className="h-full w-full flex flex-col md:flex-row gap-4 rounded-2xl bg-gray-100 border border-gray-200 shadow-lg p-4"
+        >
             {/* Main content view */}
             <div className="relative flex-grow rounded-2xl bg-gray-800 overflow-hidden">
-                <img src={lesson.thumb} alt={lesson.title} className="h-full w-full object-cover" />
-                <div className="absolute top-3 left-3 bg-black/50 text-white text-sm px-3 py-1.5 rounded-lg backdrop-blur-sm">
+                <LazyImage 
+                    src={lesson.thumb} 
+                    alt={lesson.title} 
+                    className="h-full w-full"
+                    aspectRatio=""
+                    animate={{ opacity: 1, x: 0 }}
                     {lesson.title}
-                </div>
                <div className="mt-2">
                    <ProgressBar 
                        value={scene.completed} 
                        max={scene.total} 
                        size="sm"
                        color="blue"
                        showLabel={true}
                    />
                </div>
-                <button
+                </motion.div>
+                <motion.button
+                    initial={{ opacity: 0, x: 20 }}
+                    animate={{ opacity: 1, x: 0 }}
+                    whileHover={{ scale: 1.1 }}
+                    whileTap={{ scale: 0.9 }}
                     onClick={onBack}
                     aria-label="Close lesson player"
                     className="absolute top-3 right-3 h-9 w-9 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70"
                 >
                     <CloseIcon className="h-5 w-5" />
-                </button>
+                </motion.button>
             </div>

             {/* Right sidebar */}
-            <div className="flex-shrink-0 w-full md:w-80 flex flex-col gap-4">
+            <motion.div 
+                initial={{ opacity: 0, x: 20 }}
+                animate={{ opacity: 1, x: 0 }}
+                transition={{ delay: 0.2 }}
+                className="flex-shrink-0 w-full md:w-80 flex flex-col gap-4"
+            >
                 <SidebarSection icon={TextIcon} title="Lesson Info">
                     <h2 className="font-semibold text-gray-900">{lesson.title}</h2>
                     <p className="text-xs text-gray-600">by {lesson.author}</p>
@@ .. @@
                     <p className="text-sm text-gray-700">Explore the majestic ruins of the Roman Forum, the heart of ancient Rome. This lesson will guide you through key temples and monuments.</p>
                 </SidebarSection>
                 <SidebarSection icon={HelpIcon} title="Lesson Actions">
-                    <button className="w-full text-left flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700"><BookmarkIcon className="h-4 w-4 text-gray-500" /> Save to My Lessons</button>
-                    <button className="w-full text-left flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700"><LinkIcon className="h-4 w-4 text-gray-500" /> Copy Link</button>
+                    <motion.button 
+                        whileHover={{ scale: 1.02 }}
+                        whileTap={{ scale: 0.98 }}
+                        onClick={handleBookmark}
+                        className={classNames(
+                            "w-full text-left flex items-center gap-2 p-2 rounded-lg text-sm transition-colors",
+                            isBookmarked ? "bg-amber-50 text-amber-700" : "hover:bg-gray-100 text-gray-700"
+                        )}
+                    >
+                        <BookmarkIcon className={classNames("h-4 w-4", isBookmarked ? "text-amber-500" : "text-gray-500")} />
+                        {isBookmarked ? 'Saved to My Lessons' : 'Save to My Lessons'}
+                    </motion.button>
+                    <motion.button 
+                        whileHover={{ scale: 1.02 }}
+                        whileTap={{ scale: 0.98 }}
+                        onClick={handleCopyLink}
+                        className="w-full text-left flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700"
+                    >
+                        <LinkIcon className="h-4 w-4 text-gray-500" /> Copy Link
+                    </motion.button>
                 </SidebarSection>
-            </div>
+            </motion.div>
             
             {/* Bottom scene gallery */}
             <div className="absolute bottom-4 left-4 right-4 z-10">
@@ .. @@
                         {isGalleryOpen ? 'Hide Scenes' : 'Show Scenes'}
                         {isGalleryOpen ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronUpIcon className="h-4 w-4" />}
                     </button>
                 </div>
-                {isGalleryOpen && (
-                    <div className="flex gap-4 overflow-x-auto pb-2">
-                        {MOCK_SCENES.map(scene => (
-                    </div>
                    <ProgressBar 
                        value={scene.completed} 
                        max={scene.total} 
                    />
-                )}
                <AnimatePresence>
                    {isGalleryOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex gap-4 overflow-x-auto pb-2"
                        >
                            {MOCK_SCENES.map((scene, index) => (
                                <motion.div
                                    key={scene.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <SceneCard scene={scene} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
+                <AnimatePresence>
+                    {isGalleryOpen && (
+                        <motion.div
+                            initial={{ opacity: 0, height: 0 }}
+                            animate={{ opacity: 1, height: 'auto' }}
+                            exit={{ opacity: 0, height: 0 }}
+                            className="flex gap-4 overflow-x-auto pb-2"
+                        >
+                            {MOCK_SCENES.map((scene, index) => (
+                                <motion.div
+                                    key={scene.id}
+                                    initial={{ opacity: 0, x: 20 }}
+                                    animate={{ opacity: 1, x: 0 }}
+                                    transition={{ delay: index * 0.1 }}
+                                >
+                                    <SceneCard scene={scene} />
+                                </motion.div>
+                            ))}
+                        </motion.div>
+                    )}
+                </AnimatePresence>
             </div>
-        </div>
+        </motion.div>
     );
 };
            <LazyImage src={scene.thumb} alt={scene.title} className="w-full" aspectRatio="aspect-[3/2]" />