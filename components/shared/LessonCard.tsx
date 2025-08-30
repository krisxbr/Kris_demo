import React, { useState } from 'react';
import { Lesson } from '../../types';
import { StarIcon } from '../icons';
import { Pill } from '../ui/Pill';

interface LessonCardProps {
    lesson: Lesson;
    onOpen: (lesson: Lesson) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onOpen }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the card's onClick from firing
    setIsFavorited(!isFavorited);
  };

  const handleCardKeyPress = (e: React.KeyboardEvent) => {
    // Let the favorite button handle its own keyboard events
    if ((e.target as HTMLElement).tagName === 'BUTTON') {
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen(lesson);
    }
  };

  return (
    <div
      onClick={() => onOpen(lesson)}
      onKeyPress={handleCardKeyPress}
      role="button"
      tabIndex={0}
      aria-label={`View lesson: ${lesson.title}`}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <div className="relative">
        <img src={lesson.thumb} alt={lesson.title} className="h-44 w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-base font-semibold text-gray-900">{lesson.title}</h3>
          <button
            onClick={handleFavoriteClick}
            aria-label="Toggle Favorite"
            className="z-10 flex-shrink-0 rounded-full p-1 text-amber-500 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            <StarIcon filled={isFavorited} />
          </button>
        </div>
        <div className="text-xs text-gray-600">by {lesson.author}</div>
        <div className="flex flex-wrap gap-1.5">
          {lesson.tags.slice(0, 5).map((tag) => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </div>
      </div>
    </div>
  );
};
