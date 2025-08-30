import React from 'react';
import { RomanHelmetIcon } from '../icons';

interface ThematicBannerProps extends React.PropsWithChildren {
    title?: string;
    description?: string;
}

export const ThematicBanner: React.FC<ThematicBannerProps> = ({ 
    children,
    title = "Thematic Collection: The Roman Empire",
    description = "Explore a curated set of lessons covering the history, architecture, and culture of Ancient Rome." 
}) => (
    <section 
        className="group relative flex flex-col md:flex-row items-start md:items-center gap-6 overflow-hidden rounded-3xl p-6 shadow-lg text-white transition-transform duration-300 ease-in-out hover:scale-[1.02]"
        style={{
            backgroundImage: `
                linear-gradient(135deg, hsl(356, 82%, 23%), hsl(357, 65%, 38%)),
                url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='20' viewBox='0 0 100 20'%3E%3Cpath d='M0 10h10v10h10V0h10v10h10v10h10V0h10v10h10v10h10V0h10v10h10' fill='none' stroke='rgba(255,255,255,0.05)' stroke-width='2'/%3E%3C/svg%3E")
            `
        }}
    >
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-inner">
            <RomanHelmetIcon className="h-8 w-8 text-rose-100" />
        </div>
        <div className="flex-grow">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="text-sm text-rose-100/90 mt-1 max-w-xl">{description}</p>
        </div>
        <div className="mt-4 md:mt-0 ml-auto flex-shrink-0">
          {children}
        </div>
    </section>
);