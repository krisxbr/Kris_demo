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
                    <button onClick={() => setIsExpanded(!isExpanded)} className="p-1 text-gray-500 hover:bg-gray-100 rounded-full">
                        {isExpanded ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                    </button>
                </div>
                {isExpanded && (
                    <p className="text-xs text-gray-600 mt-2">{scene.description}</p>
                )}
                 <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{scene.completed}/{scene.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Player: React.FC<PlayerProps> = ({ lesson, onBack }) => {
    const [isGalleryOpen, setIsGalleryOpen] = useState(true);

    return (
        <div className="h-full w-full flex flex-col md:flex-row gap-4 rounded-2xl bg-gray-100 border border-gray-200 shadow-lg p-4">
            {/* Main content view */}
            <div className="relative flex-grow rounded-2xl bg-gray-800 overflow-hidden">
                <img src={lesson.thumb} alt={lesson.title} className="h-full w-full object-cover" />
                <div className="absolute top-3 left-3 bg-black/50 text-white text-sm px-3 py-1.5 rounded-lg backdrop-blur-sm">
                    {lesson.title}
                </div>
                <button
                    onClick={onBack}
                    aria-label="Close lesson player"
                    className="absolute top-3 right-3 h-9 w-9 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70"
                >
                    <CloseIcon className="h-5 w-5" />
                </button>
            </div>

            {/* Right sidebar */}
            <div className="flex-shrink-0 w-full md:w-80 flex flex-col gap-4">
                <SidebarSection icon={TextIcon} title="Lesson Info">
                    <h2 className="font-semibold text-gray-900">{lesson.title}</h2>
                    <p className="text-xs text-gray-600">by {lesson.author}</p>
                    <div className="flex flex-wrap gap-1.5">
                        {lesson.tags.map(tag => <Pill key={tag}>{tag}</Pill>)}
                    </div>
                </SidebarSection>
                <SidebarSection icon={ParagraphIcon} title="Description">
                    <p className="text-sm text-gray-700">Explore the majestic ruins of the Roman Forum, the heart of ancient Rome. This lesson will guide you through key temples and monuments.</p>
                </SidebarSection>
                <SidebarSection icon={HelpIcon} title="Lesson Actions">
                    <button className="w-full text-left flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700"><BookmarkIcon className="h-4 w-4 text-gray-500" /> Save to My Lessons</button>
                    <button className="w-full text-left flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700"><LinkIcon className="h-4 w-4 text-gray-500" /> Copy Link</button>
                </SidebarSection>
            </div>
            
            {/* Bottom scene gallery */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="flex justify-end mb-2">
                    <button 
                        onClick={() => setIsGalleryOpen(!isGalleryOpen)} 
                        aria-expanded={isGalleryOpen}
                        className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 text-white text-sm backdrop-blur-sm hover:bg-black/70"
                    >
                        <GalleryIcon className="h-4 w-4" />
                        <span>{isGalleryOpen ? 'Hide Scenes' : 'Show Scenes'}</span>
                        {isGalleryOpen ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronUpIcon className="h-4 w-4" />}
                    </button>
                </div>
                {isGalleryOpen && (
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {MOCK_SCENES.map(scene => (
                            <SceneCard key={scene.id} scene={scene} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
