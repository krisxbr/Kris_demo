import React from 'react';
import { IconProps } from '../../types';
import { classNames } from '../../utils/classNames';

interface NavButtonProps extends React.PropsWithChildren {
    active?: boolean;
    onClick?: () => void;
    icon?: React.FC<IconProps>;
}

export const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon: Icon, children }) => (
  <button
    onClick={onClick}
    className={classNames(
      "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition",
      active ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    )}
  >
    {Icon && <Icon className="opacity-80" />}
    <span>{children}</span>
  </button>
);