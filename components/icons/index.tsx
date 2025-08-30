import React from 'react';
import { classNames } from '../../utils/classNames';
import { IconProps } from '../../types';

export const MapIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={classNames("h-5 w-5", className)}>
    <path d="M9 18l-5 2V6l5-2 6 2 5-2v14l-5 2-6-2z"/>
    <path d="M9 4v14"/>
    <path d="M15 6v14"/>
  </svg>
);

export const BookIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={classNames("h-5 w-5", className)}>
    <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20"/>
    <path d="M4 3h16v16H6.5A2.5 2.5 0 0 1 4 16.5V3z"/>
  </svg>
);

export const CreateIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={classNames("h-5 w-5", className)}>
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={classNames("h-5 w-5", className)}>
    <circle cx="12" cy="7" r="4"/>
    <path d="M5.5 21a8.38 8.38 0 0 1 13 0"/>
  </svg>
);

export const StarIcon: React.FC<{ filled?: boolean; className?: string }> = ({ filled, className }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className={classNames("h-4 w-4", className)}>
    <path d="M12 17.3l-6.16 3.24 1.18-6.88L2 8.76l6.92-1L12 1.5l3.08 6.26 6.92 1-5.02 4.9 1.18 6.88z"/>
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={classNames("h-5 w-5", className)}>
    <circle cx="11" cy="11" r="7"/>
    <path d="M20 20l-4.5-4.5"/>
  </svg>
);

export const GlobeIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={classNames("h-5 w-5", className)}>
    <circle cx="12" cy="12" r="9"/>
    <path d="M3 12h18M12 3a15.3 15.3 0 0 1 0 18M12 3a15.3 15.3 0 0 0 0 18"/>
  </svg>
);

export const PinIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={classNames("h-4 w-4", className)}>
    <path d="M12 22s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11z"/>
    <circle cx="12" cy="11" r="2.5"/>
  </svg>
);

export const PlayIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={classNames("h-4 w-4", className)} fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={classNames("h-5 w-5", className)}>
        <path d="M3 6h18m-2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={classNames("h-5 w-5", className)}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

export const LinkIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={classNames("h-5 w-5", className)}>
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.72" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.72-1.72" />
    </svg>
);

export const PenIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={classNames("h-5 w-5", className)}>
        <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
);

export const HelpIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={classNames("h-5 w-5", className)}>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

export const GalleryIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={classNames("h-5 w-5", className)}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
);

export const BookmarkIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={classNames("h-5 w-5", className)}>
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
    </svg>
);

export const TextIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={classNames("h-5 w-5", className)}>
        <path d="M4 7V5h16v2M12 5v14m-3-14h6" />
        <path d="M8 19h8" />
    </svg>
);

export const ParagraphIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={classNames("h-5 w-5", className)}>
        <path d="M13 4H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-1" />
        <path d="M13 4V2" />
        <path d="M13 4a4 4 0 100 8h-2" />
    </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={classNames("h-5 w-5", className)}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={classNames("h-5 w-5", className)}>
    <path d="M18 15l-6-6-6 6" />
  </svg>
);

export const ShareIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={classNames("h-5 w-5", className)}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

export const FullScreenIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={classNames("h-5 w-5", className)}>
    <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
  </svg>
);

export const FilterIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={classNames("h-5 w-5", className)}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export const RomanHelmetIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={classNames("h-5 w-5", className)}>
        <path d="M5 14.5A7.5 7.5 0 0119.24 11" />
        <path d="M4.76 11A7.5 7.5 0 0112 7" />
        <path d="M12 7V2.5" />
        <path d="M12 7c2.21 0 4-1.5 4-1.5" />
        <path d="M12 7c-2.21 0-4-1.5-4-1.5" />
        <path d="M12 14.5v7" />
        <path d="M6.5 19H17.5" />
        <path d="M4.76 11a2 2 0 00-1.76 3v1.5" />
        <path d="M19.24 11a2 2 0 011.76 3v1.5" />
    </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={classNames("h-5 w-5", className)}>
        <path d="M20 6L9 17l-5-5" />
    </svg>
);

export const CrosshairIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={classNames("h-5 w-5", className)}>
        <circle cx="12" cy="12" r="10" />
        <path d="M22 12h-4" />
        <path d="M6 12H2" />
        <path d="M12 6V2" />
        <path d="M12 22v-4" />
    </svg>
);