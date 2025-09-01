import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '../../utils/classNames';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className,
  cols = { md: 2, lg: 3, xl: 4 },
  gap = 'md',
  animate = true
}) => {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  };

  const gridCols = [
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`
  ].filter(Boolean).join(' ');

  const gridClassName = classNames(
    'grid',
    gridCols,
    gapClasses[gap],
    className
  );

  if (animate) {
    return (
      <motion.div layout className={gridClassName}>
        {children}
      </motion.div>
    );
  }

  return <div className={gridClassName}>{children}</div>;
};