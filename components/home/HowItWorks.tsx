import React, { useState } from 'react';
import { classNames } from '../../utils/classNames';
import { CreateIcon, LinkIcon, MapIcon, CloseIcon } from '../icons';

interface HowItWorksDemoProps {
    onClose: () => void;
    onStartCreate?: () => void;
    onExploreMap?: () => void;
}

type StepAction = 'create' | 'explore';

const STEPS: Array<{
    n: number;
    icon: React.FC<{className?: string}>;
    t: string;
    d: string;
    img: string;
    cta?: string;
    ctaAction?: StepAction;
    secondaryCta?: string;
    secondaryCtaAction?: StepAction;
}> = [
    {
      n: 1,
      icon: MapIcon,
      t: "Curate Media in the Map",
      d: "Upload your 360° images and videos to your Personal library, or discover thousands of free panoramic assets in the Global collection. The Map is your central hub for all lesson content.",
      img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop",
      cta: 'Explore the Map',
      ctaAction: 'explore',
      secondaryCta: 'Upload Media',
      secondaryCtaAction: 'create',
    },
    {
      n: 2,
      icon: CreateIcon,
      t: "Assemble Scenes in the Builder",
      d: "Visually construct your lesson. Add scenes from the Map, place interactive Infospots with rich media, and link them together with Portals to guide the learning journey. Switch instantly between Edit and Preview modes.",
      img: "https://images.unsplash.com/photo-1556742044-538253a6c95c?q=80&w=800&auto=format&fit=crop",
      cta: 'Start Building',
      ctaAction: 'create',
    },
    {
      n: 3,
      icon: LinkIcon,
      t: "Share & Inspire in the Player",
      d: "Publish your lesson and share it via a simple link or embed it in your LMS. The Player provides a clean, immersive experience for learners on any device—including WebVR headsets—with clear progress tracking.",
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
    },
];

export const HowItWorksDemo: React.FC<HowItWorksDemoProps> = ({ onClose, onStartCreate, onExploreMap }) => {
    const [activeStep, setActiveStep] = useState(STEPS[0]);

    const getAction = (action?: StepAction) => {
        if (action === 'create') return onStartCreate;
        if (action === 'explore') return onExploreMap;
        return undefined;
    };

    return (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-4 animate-fade-in">
            <div className="relative w-full max-w-5xl h-[90%] bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 flex flex-col md:flex-row gap-6">
                <button onClick={onClose} className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-white text-slate-800 flex items-center justify-center shadow-lg hover:bg-slate-200 transition z-10" aria-label="Close demo">
                    <CloseIcon className="h-5 w-5" />
                </button>

                {/* Left Panel: Steps */}
                <div className="w-full md:w-1/3 space-y-3 overflow-y-auto pr-2">
                    <h2 className="text-2xl font-bold text-white">How it Works</h2>
                    <p className="text-sm text-white/80 pb-2">Go from a 360° image to an interactive lesson in three simple steps.</p>
                    {STEPS.map((step) => (
                        <button
                            key={step.n}
                            onClick={() => setActiveStep(step)}
                            className={classNames(
                                "w-full text-left p-3 rounded-lg transition-colors border",
                                activeStep.n === step.n 
                                    ? 'bg-white/20 border-white/30' 
                                    : 'bg-transparent border-transparent hover:bg-white/10'
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className={classNames(
                                    "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-colors",
                                    activeStep.n === step.n ? 'bg-blue-500' : 'bg-white/20'
                                )}>
                                    <step.icon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">{step.t}</h3>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Right Panel: Content */}
                <div className="w-full md:w-2/3 bg-slate-900/40 rounded-xl flex flex-col p-6 text-white overflow-hidden">
                    <div className="flex-grow space-y-3">
                        <span className="block text-sm font-semibold tracking-wider text-blue-400">STEP {activeStep.n}</span>
                        <h3 className="text-2xl font-bold">{activeStep.t}</h3>
                        <p className="text-white/80">{activeStep.d}</p>
                         <div className="flex flex-wrap gap-3 pt-2">
                            {activeStep.cta && (
                                <button 
                                    onClick={getAction(activeStep.ctaAction)} 
                                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                    {activeStep.cta}
                                </button>
                            )}
                            {activeStep.secondaryCta && (
                                <button 
                                    onClick={getAction(activeStep.secondaryCtaAction)} 
                                    className="rounded-xl bg-white/20 px-5 py-2.5 text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-white/50 transition hover:bg-white/30">
                                    {activeStep.secondaryCta}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="mt-4 flex-shrink-0 h-48 bg-cover bg-center rounded-lg overflow-hidden shadow-inner" style={{ backgroundImage: `url(${activeStep.img})` }}>
                    </div>
                </div>
            </div>
        </div>
    );
};