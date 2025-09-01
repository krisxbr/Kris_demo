import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '../../utils/classNames';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className,
  maxWidth = '6xl',
  padding = 'md',
  animate = true
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-2 md:p-4',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8'
  };

  const containerClasses = classNames(
    'mx-auto w-full',
    maxWidthClasses[maxWidth],
    paddingClasses[padding],
    className
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={containerClasses}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={containerClasses}>{children}</div>;
};