import React, { useState } from 'react';
import { Lesson } from '../../types';
import { GlobeIcon, PlayIcon, StarIcon } from '../icons';
import { Pill } from '../ui/Pill';

interface LessonCardProps {
    lesson: Lesson;
    onOpen: (lesson: Lesson) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onOpen }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg">
      <div className="relative">
        <img src={lesson.thumb} alt={lesson.title} className="h-44 w-full object-cover" />
        <button
          onClick={() => onOpen(lesson)}
          className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-800 shadow backdrop-blur transition-all group-hover:bg-white group-hover:scale-105"
        >
          <PlayIcon /> Preview
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-base font-semibold text-gray-900">{lesson.title}</h3>
          <button onClick={() => setIsFavorited(!isFavorited)} className="text-amber-500 hover:text-amber-400" aria-label="Toggle Favorite">
            <StarIcon filled={isFavorited} />
          </button>
        </div>
        <div className="text-xs text-gray-600">by {lesson.author}</div>
        <div className="flex flex-wrap gap-1.5">
          {lesson.tags.map((tag) => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-3 text-sm text-gray-700">
          <span className="inline-flex items-center gap-1.5"><GlobeIcon className="h-4 w-4" /> {lesson.language} • {lesson.level}</span>
          <span className="flex items-center gap-2">
            <span className="flex items-center">⭐<span className="ml-1">{lesson.rating}</span></span>
            <span className="flex items-center">❤<span className="ml-1">{lesson.favorites}</span></span>
          </span>
        </div>
      </div>
    </div>
  );
};