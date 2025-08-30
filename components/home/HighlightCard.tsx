import React from 'react';
import { IconProps } from '../../types';

interface HighlightCardProps {
  icon: React.FC<IconProps>;
  title: string;
  text: string;
}

export const HighlightCard: React.FC<HighlightCardProps> = ({ icon: Icon, title, text }) => (
  <div className="relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="text-base font-semibold text-slate-900">{title}</h3>
    <p className="text-sm text-slate-600">{text}</p>
  </div>
);