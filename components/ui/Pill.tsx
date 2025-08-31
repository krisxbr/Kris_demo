import React from 'react';
import { classNames } from '../../utils/classNames';

interface PillProps extends React.PropsWithChildren {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Pill: React.FC<PillProps> = ({ children, onClick }) => {
    const baseClassName = "inline-flex items-center rounded-md bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800";
    
    if (onClick) {
        return (
            <button
                onClick={onClick}
                className={classNames(
                    baseClassName,
                    "transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
                )}
            >
                {children}
            </button>
        );
    }

    return (
      <span className={baseClassName}>{children}</span>
    );
};
