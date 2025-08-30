import React from 'react';
import { Page } from '../../types';
import { NavButton } from '../ui/NavButton';
import { BookIcon, CreateIcon, GlobeIcon, MapIcon, UserIcon } from '../icons';

interface HeaderProps {
    activePage: Page;
    onNavigate: (page: Page) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
    return (
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white/80 p-3 shadow-sm backdrop-blur-sm sticky top-4 z-50">
            <div className="flex items-center gap-3">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold">S360</div>
                <div className="text-sm font-bold text-gray-900">study360.eu</div>
            </div>
            <nav className="flex flex-wrap items-center gap-1">
                <NavButton active={activePage === "Home"} onClick={() => onNavigate("Home")} icon={MapIcon}>Home</NavButton>
                <NavButton active={activePage === "Map"} onClick={() => onNavigate("Map")} icon={MapIcon}>Map</NavButton>
                <NavButton active={activePage === "Lessons"} onClick={() => onNavigate("Lessons")} icon={BookIcon}>Lessons</NavButton>
                <NavButton active={activePage === "Create"} onClick={() => onNavigate("Create")} icon={CreateIcon}>Create</NavButton>
                <NavButton active={activePage === "About"} onClick={() => onNavigate("About")} icon={UserIcon}>About</NavButton>
            </nav>
            <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"><GlobeIcon /> EN</button>
                <button className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">Login / Signup</button>
            </div>
        </header>
    );
};