@@ .. @@
 import React, { useState } from 'react';
+import { motion } from 'framer-motion';
 import { Lesson } from '../../types';
 import { StarIcon } from '../icons';
 import { Pill } from '../ui/Pill';
+import { LazyImage } from '../ui/LazyImage';

 interface LessonCardProps {
     lesson: Lesson;
     onOpen: (lesson: Lesson) => void;
     onNavigateToTag: (tag: string) => void;
+    index?: number;
 }

-export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onOpen, onNavigateToTag }) => {
+export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onOpen, onNavigateToTag, index = 0 }) => {
   const [isFavorited, setIsFavorited] = useState(false);

@@ .. @@
   };

   return (
-    <div
+    <motion.div
+      initial={{ opacity: 0, y: 20 }}
+      animate={{ opacity: 1, y: 0 }}
+      transition={{ duration: 0.3, delay: index * 0.1 }}
       onClick={() => onOpen(lesson)}
       onKeyPress={handleCardKeyPress}
       role="button"
       tabIndex={0}
       aria-label={`View lesson: ${lesson.title}`}
-      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
+      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
     >
       <div className="relative">
-        <img src={lesson.thumb} alt={lesson.title} className="w-full object-cover aspect-[3/2]" />
+        <LazyImage 
+          src={lesson.thumb} 
+          alt={lesson.title} 
+          className="w-full"
+          aspectRatio="aspect-[3/2]"
+        />
+        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
       </div>
       <div className="flex flex-1 flex-col gap-3 p-4">
@@ .. @@
           ))}
         </div>
       </div>
-    </div>
+    </motion.div>
   );
 };