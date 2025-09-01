import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '../../utils/classNames';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string;
  height?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  className, 
  variant = 'rectangular',
  width,
  height 
}) => {
  const baseClasses = 'bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200';
  
  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full'
  };

  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <motion.div 
      animate={{ 
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity, 
        ease: 'linear' 
      }}
      className={classNames(baseClasses, variantClasses[variant], className)}
      style={{ 
        ...style, 
        backgroundSize: '200% 100%'
      }}
    />
  );
};