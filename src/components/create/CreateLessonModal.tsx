@@ .. @@
 import React, { useState, useMemo, useEffect } from 'react';
+import { motion, AnimatePresence } from 'framer-motion';
 import { CreateIcon, CloseIcon, RomanHelmetIcon, CheckIcon } from '../icons';
+import { ProgressBar } from '../ui/ProgressBar';
 import { classNames } from '../../utils/classNames';

@@ .. @@
     if (!isOpen) return null;

     return (
-        <div
+        <motion.div
+            initial={{ opacity: 0, scale: 0.95, y: 20 }}
+            animate={{ opacity: 1, scale: 1, y: 0 }}
+            exit={{ opacity: 0, scale: 0.95, y: 20 }}
+            transition={{ type: "spring", duration: 0.3 }}
             className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 flex flex-col m-4 animate-fade-in"
             onClick={e => e.stopPropagation()}
         >
@@ .. @@
                 <div className="space-y-2 p-3 rounded-lg bg-slate-50">
                     <ValidationItem isComplete={titleIsValid} text="Provide a lesson title" />
                     <ValidationItem isComplete={tagsAreValid} text="Add at least 5 tags">
-                       {tagsAreValid ? null : (
-                           <div className="flex items-center gap-2 ml-auto">
-                               <span className="text-xs text-slate-500 font-mono">({tagList.length}/5)</span>
-                               <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
-                                   <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${(tagList.length / 5) * 100}%` }} />
-                               </div>
-                           </div>
-                       )}
+                        {!tagsAreValid && (
+                            <div className="flex items-center gap-2 ml-auto">
+                                <span className="text-xs text-slate-500 font-mono">({tagList.length}/5)</span>
+                                <ProgressBar 
+                                    value={tagList.length} 
+                                    max={5} 
+                                    size="sm" 
+                                    color="emerald"
+                                    className="w-20"
+                                />
+                            </div>
+                        )}
                     </ValidationItem>
                 </div>

-                <button
+                <motion.button
+                    whileHover={{ scale: isFormValid ? 1.02 : 1 }}
+                    whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                     onClick={handleSubmit}
                     disabled={!isFormValid}
                     className="w-full rounded-lg border border-transparent bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                 >
                     Create Lesson
-                </button>
+                </motion.button>
             </div>
-        </div>
+        </motion.div>
     );
 };