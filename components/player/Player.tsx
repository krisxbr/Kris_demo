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
            <img src={scene.thumb} alt={scene.title} className="h-24 w-full object-cover" />
            <div className="p-3">
                <div className="flex justify-between items-start">
                    <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">{scene.title}</h4>
                    <button onClick={() => setIsExpanded(!isExpanded)} className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
                        {isExpanded ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                    </button>
                </div>
                {isExpanded && <p className="text-xs text-gray-600 mt-2">{scene.description}</p>}

                <div className="mt-2">
                    <div className="text-xs text-gray-500 mb-1">Infospot Progress</div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{scene.completed} completed</span>
                        <span>{scene.total - scene.completed} remaining</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Player: React.FC<PlayerProps> = ({ lesson, onBack }) => {
  const [showGallery, setShowGallery] = useState(true);
  const [activeInfospot, setActiveInfospot] = useState<string | null>('spot1');

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-6">
      {/* Left Column: Viewer */}
      <div className="relative min-h-[600px] w-full rounded-2xl overflow-hidden bg-gray-800 shadow-lg border border-gray-200 flex flex-col justify-between">
        {/* Background Image */}
        <img src={lesson.thumb} alt="360 Scene" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Top bar */}
        <div className="relative flex justify-between items-start p-4">
            <button onClick={onBack} className="rounded-lg bg-black/50 px-3 py-1.5 text-xs font-medium text-white shadow backdrop-blur hover:bg-black/80">← Back</button>

            <div className="flex items-center gap-2 rounded-lg bg-white/90 shadow p-1.5 backdrop-blur-sm">
                <button className="text-xs px-2 py-1 rounded-md hover:bg-gray-200">Set North</button>
                <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-200 text-gray-600"><GalleryIcon /></button>
                <button className="h-8 w-8 flex items-center justify-center rounded-md bg-blue-500 text-white shadow"><PenIcon /></button>
                <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-200 text-gray-600"><HelpIcon /></button>
            </div>
        </div>
        
        {/* Infospots */}
        <div className="relative flex-grow">
            {/* Active Infospot Editor */}
            {activeInfospot === 'spot1' && (
                <div 
                    className="absolute bg-white rounded-xl shadow-2xl p-4 w-64 space-y-3"
                    style={{ left: '25%', top: '30%' }}
                >
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800">Infospot Title</h3>
                        <div className="flex items-center gap-2">
                           <button className="text-gray-500 hover:text-gray-800"><TrashIcon className="h-4 w-4" /></button>
                           <button onClick={() => setActiveInfospot(null)} className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center"><CloseIcon className="h-3 w-3" /></button>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500">Last Edit</div>
                    <textarea placeholder="Add Your Text Here" className="w-full text-sm p-2 border rounded-md h-20 bg-gray-50 focus:ring-1 focus:ring-blue-500 outline-none" />
                    <div className="flex justify-between items-center">
                        <button className="h-8 w-8 rounded-full border flex items-center justify-center text-gray-600 hover:bg-gray-100"><LinkIcon className="h-4 w-4" /></button>
                        <button className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-blue-500">Upload</button>
                    </div>
                </div>
            )}

             {/* Other Infospots */}
             <button style={{ left: '65%', top: '50%' }} className="absolute flex items-center gap-1.5 p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-xs text-gray-800">
                Roman Empire
                <span className="h-5 w-5 bg-gray-300 rounded-full flex items-center justify-center font-bold text-xs">W</span>
             </button>
             <button style={{ left: '70%', top: '60%' }} className="absolute h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center">
                <BookmarkIcon className="text-gray-800" />
             </button>
        </div>


        {/* Bottom Gallery */}
        <div className="relative p-4">
             <button 
                onClick={() => setShowGallery(!showGallery)}
                className="absolute right-4 -top-8 text-xs bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-t-lg shadow-lg"
             >
                {showGallery ? 'Hide Gallery' : 'Show Gallery'}
             </button>
            {showGallery && (
                <div className="flex gap-4 overflow-x-auto pb-2 -mb-2">
                    {MOCK_SCENES.map(scene => <SceneCard key={scene.id} scene={scene} />)}
                </div>
            )}
        </div>
      </div>

      {/* Right Column: Sidebar */}
      <aside className="space-y-4">
        <SidebarSection icon={TextIcon} title="Lesson Details">
            <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
            <p className="text-sm text-gray-600">Created by {lesson.author}</p>
            <div className="flex flex-wrap gap-2">
                {lesson.tags.map(tag => <Pill key={tag}>{tag}</Pill>)}
            </div>
        </SidebarSection>
        
        <SidebarSection icon={LinkIcon} title="Lesson Progress">
            <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-gray-800">0%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
                <span>0 completed</span>
                <span>8 remaining</span>
            </div>
        </SidebarSection>

        <SidebarSection icon={ParagraphIcon} title="Lesson Content">
            <div className="prose prose-sm text-gray-600 max-h-96 overflow-y-auto pr-2">
                <p>What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
        </SidebarSection>

      </aside>
    </div>
  );
};