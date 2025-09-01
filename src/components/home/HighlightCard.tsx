@@ .. @@
 import React from 'react';
+import { motion } from 'framer-motion';
 import { IconProps } from '../../types';

 interface HighlightCardProps {
   icon: React.FC<IconProps>;
   title: string;
   text: string;
+  index?: number;
 }

-export const HighlightCard: React.FC<HighlightCardProps> = ({ icon: Icon, title, text }) => (
-  <div className="relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
-    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
+export const HighlightCard: React.FC<HighlightCardProps> = ({ icon: Icon, title, text, index = 0 }) => (
+  <motion.div 
+    initial={{ opacity: 0, y: 20 }}
+    animate={{ opacity: 1, y: 0 }}
+    transition={{ duration: 0.5, delay: index * 0.1 }}
+    whileHover={{ y: -4, transition: { duration: 0.2 } }}
+    className="relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow duration-200"
+  >
+    <motion.div 
+      whileHover={{ scale: 1.1, rotate: 5 }}
+      className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600"
+    >
       <Icon className="h-6 w-6" />
-    </div>
+    </motion.div>
     <h3 className="text-base font-semibold text-slate-900">{title}</h3>
     <p className="text-sm text-slate-600">{text}</p>
-  </div>
+  </motion.div>
 );