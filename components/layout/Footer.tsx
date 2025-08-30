import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="mt-8 flex flex-col items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4 text-xs text-gray-600 shadow-sm md:flex-row">
            <div>© {new Date().getFullYear()} Interactive Bulgaria Foundation • study360.eu</div>
            <div className="flex items-center gap-4">
                <a className="hover:underline" href="#">Terms</a>
                <a className="hover:underline" href="#">Privacy</a>
                <a className="hover:underline" href="#">Contact</a>
            </div>
        </footer>
    );
};