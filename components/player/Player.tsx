import React, { useState } from 'react';
import { Lesson } from '../../types';
import { Pill } from '../ui/Pill';
import { BookmarkIcon, ChevronDownIcon, ChevronUpIcon, CloseIcon, GalleryIcon, HelpIcon, LinkIcon, ParagraphIcon, PenIcon, TextIcon, TrashIcon } from '../icons';

// Mock data for scenes in the bottom gallery
const MOCK_SCENES = [
    {
      id: 's1',
      title: 'AUTOFILL SPREADSHEET DATA TO GOOGLE DOCS',
      thumb: 'https://images.unsplash.com/photo-1587614382346-4ec580376def?q=80&w=300',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      completed: 0,
      total: 8,
      isSpecial: true,
    },
    {
      id: 's2',
      title: 'Lorem ipsum dolor',
      thumb: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=300',
      description: 'This lively image captures the unique entrance to the artistic village of Bussana Vecchia, Italy...',
      completed: 0,
      total: 4,
    },
    {
      id: 's3',
      title: 'consectetur adipiscing',
      thumb: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=300',
      description: 'The narrow hillside road winds past parked cars, colorful murals, and quirky installations.',
      completed: 2,
      total: 5,
    },
];


interface PlayerProps {
  lesson: Lesson;
  onBack: () => void;
}

// Sub-component for sidebar sections
const SidebarSection: React.FC<{ icon: React.FC<{ className?: string }>, title: string } & React.PropsWithChildren> = ({ icon: Icon, title, children }) => (
  <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-200">
    <div className="flex items-center gap-2 mb-3 text-gray-500">
      <Icon className="h-4 w-4" />
      <h3 className="text-sm font-medium">{title}</h3>
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

// Sub-component for the scene gallery card
const SceneCard: React.FC<{ scene: typeof MOCK_SCENES[0] }> = ({ scene }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const progress = scene.total > 0 ? (scene.completed / scene.total) * 100 : 0;

    return (
        <div className="relative flex-shrink-0 w-64 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20">
            {scene.isSpecial && <div className="absolute top-2 left-2 text-[10px] bg-yellow-300 text-black font-bold px-1.5 py-0.5 rounded-sm">AUTOFILL SPREADSHEET</div>}
            <img src={scene.thumb} alt={scene.title} className="w-full object-cover aspect-[3/2]" />
            <div className="p-3">
                <div className="flex justify-between items-start">
                    <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">{scene.title}</h4>
                    <button onClick={() => setIsExpanded(!isExpanded)} className