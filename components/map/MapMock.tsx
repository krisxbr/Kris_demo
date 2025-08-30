import React from 'react';
import { MOCK_LESSONS } from '../../constants';
import { Lesson } from '../../types';
import { PinIcon } from '../icons';

interface MapMockProps {
    onOpenLesson: (lesson: Lesson) => void;
}

const PINS = [
    { id: "p1", x: 30, y: 40, lesson: MOCK_LESSONS[0] },
    { id: "p2", x: 54, y: 52, lesson: MOCK_LESSONS[1] },
    { id: "p3", x: 28, y: 60, lesson: MOCK_LESSONS[2] },
    { id: "p4", x: 42, y: 35, lesson: MOCK_LESSONS[3] },
];

export const MapMock: React.FC<MapMockProps> = ({ onOpenLesson }) => {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 bg-[url('https://picsum.photos/seed/mapbg/1600/900')] bg-cover bg-center shadow">
      {PINS.map((pin) => (
        <button
          key={pin.id}
          title={pin.lesson.title}
          onClick={() => onOpenLesson(pin.lesson)}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
        >
          <span className="relative inline-flex h-5 w-5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500/60"></span>
            <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-white shadow">
              <PinIcon className="text-blue-600" />
            </span>
          </span>
          <span className="invisible absolute bottom-full mb-2 w-max -translate-x-1/2 left-1/2 rounded-md bg-white px-2 py-1 text-xs shadow-lg group-hover:visible">
            {pin.lesson.location.city}
          </span>
        </button>
      ))}
    </div>
  );
};