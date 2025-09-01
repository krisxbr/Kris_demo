@@ .. @@
 import React from 'react';
+import { motion } from 'framer-motion';

 const STATS_DATA = [
@@ .. @@
 ];

 export const Stats: React.FC = () => (
-  <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-3">
-    {STATS_DATA.map((stat) => (
-      <div key={stat.v} className="flex items-center justify-between gap-4 rounded-2xl bg-slate-100 p-4">
+  <motion.section 
+    initial={{ opacity: 0, y: 20 }}
+    animate={{ opacity: 1, y: 0 }}
+    transition={{ duration: 0.6, delay: 0.2 }}
+    className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-3"
+  >
+    {STATS_DATA.map((stat, index) => (
+      <motion.div 
+        key={stat.v}
+        initial={{ opacity: 0, scale: 0.8 }}
+        animate={{ opacity: 1, scale: 1 }}
+        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
+        whileHover={{ scale: 1.05, y: -2 }}
+        className="flex items-center justify-between gap-4 rounded-2xl bg-slate-100 p-4 hover:bg-slate-200 transition-colors cursor-pointer"
+      >
         <div className="text-left">
-          <div className="text-4xl font-extrabold text-blue-600">{stat.k}</div>
+          <motion.div 
+            initial={{ opacity: 0 }}
+            animate={{ opacity: 1 }}
+            transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
+            className="text-4xl font-extrabold text-blue-600"
+          >
+            {stat.k}
+          </motion.div>
           <div className="text-sm text-slate-600">{stat.v}</div>
         </div>
         <div className="flex-shrink-0 text-slate-400">{stat.icon}</div>
-      </div>
+      </motion.div>
     ))}
-  </section>
+  </motion.section>
 );