@@ .. @@
 import React from 'react';
+import { motion } from 'framer-motion';
 import { IconProps } from '../../types';
 import { classNames } from '../../utils/classNames';

@@ .. @@
 }

 export const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon: Icon, children }) => (
-  <button
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
+  <motion.button
+    whileHover={{ scale: 1.02 }}
+    whileTap={{ scale: 0.98 }}
     onClick={onClick}
     className={classNames(
-      "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition",
+      "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200",
       active ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
     )}
+    aria-current={active ? 'page' : undefined}
   >
     {Icon && <Icon className="opacity-80" />}
     <span>{children}</span>
-  </button>
+  </motion.button>
 );