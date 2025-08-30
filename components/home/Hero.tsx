import React, { useState } from 'react';
import { HowItWorksDemo } from './HowItWorks';
import { classNames } from '../../utils/classNames';

interface HeroProps {
  onExplore: () => void;
  onCreate: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onCreate }) => {
    const [isDemoVisible, setIsDemoVisible] = useState(false);

    return (
        <section className="relative flex min-h-[500px] items-center overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-2xl md:min-h-[600px] md:p-16">
            {/* Decorative background */}
            <div 
                className="animate-drift absolute inset-0 bg-gradient-to-br from-sky-600 via-indigo-600 to-fuchsia-600 opacity-90" 
                style={{ backgroundSize: '200% 200%' }}
            ></div>
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 25px 25px, #ffffff 2%, transparent 0%),
                        radial-gradient(circle at 75px 75px, #ffffff 2%, transparent 0%)`,
                    backgroundSize: '150px 150px',
                }}
            ></div>
            
            {/* Main Hero Content */}
            <div className={classNames(
                "relative z-10 w-full max-w-5xl transition-all duration-300 ease-in-out",
                isDemoVisible ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
            )}>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur animate-slide-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
                    <span className="h-2 w-2 rounded-full bg-emerald-400" /> Live • Erasmus+ supported
                </div>
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-7xl animate-slide-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
                    Build Immersive Lessons.
                    <br />
                    Inspire a World of Learners.
                </h1>
                <p className="mt-6 max-w-2xl text-base text-white/90 md:text-lg animate-slide-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
                    Study360 streamlines immersive lesson creation: curate media in the Map, assemble scenes in the Builder, and deliver a focused experience in the Player.
                </p>
                <div className="mt-10 flex flex-wrap gap-4 animate-slide-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
                    <button onClick={onExplore} className="rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition transform hover:scale-105 hover:bg-blue-500 hover:shadow-xl">🌍 Explore Map</button>
                    <button onClick={onCreate} className="rounded-xl bg-white/20 px-6 py-3 text-base font-semibold text-white shadow-lg backdrop-blur transition transform hover:scale-105 hover:bg-white/30 hover:shadow-xl">➕ Create a Lesson</button>
                    <button onClick={() => setIsDemoVisible(true)} className="rounded-xl bg-transparent px-6 py-3 text-base font-semibold text-white shadow-lg ring-1 ring-inset ring-white/50 transition transform hover:scale-105 hover:bg-white/10 hover:shadow-xl">🎬 How it Works</button>
                </div>
            </div>
            
            {/* Interactive Demo Overlay */}
            {isDemoVisible && (
                <HowItWorksDemo 
                    onClose={() => setIsDemoVisible(false)}
                    onStartCreate={onCreate}
                    onExploreMap={onExplore}
                />
            )}
        </section>
    );
};