import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '../../utils/classNames';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showLabel?: boolean;
  color?: 'blue' | 'emerald' | 'amber' | 'red';
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  className,
  showLabel = false,
  color = 'blue',
  size = 'md'
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    blue: 'bg-blue-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500'
  };

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className={classNames("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-slate-600 mb-1">
          <span>Progress</span>
          <span>{value}/{max}</span>
        </div>
      )}
      <div className={classNames(
        "w-full bg-slate-200 rounded-full overflow-hidden",
        sizeClasses[size]
      )}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={classNames(
            "h-full rounded-full transition-colors",
            colorClasses[color]
          )}
        />
      </div>
    </div>
  );
};