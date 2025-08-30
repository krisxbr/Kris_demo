import React from 'react';

export const Pill: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center rounded-md bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800">{children}</span>
);