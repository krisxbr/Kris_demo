import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-xs">
            <div className="flex flex-col items-center justify-between gap-4 text-gray-600 md:flex-row">
                <div>© {new Date().getFullYear()} Interactive Bulgaria Foundation • study360.eu</div>
                <div className="flex items-center gap-4">
                    <a className="hover:underline" href="#">Terms</a>
                    <a className="hover:underline" href="#">Privacy</a>
                    <a className="hover:underline" href="#">Contact</a>
                </div>
            </div>
            <hr className="my-4 border-gray-200" />
            <div className="text-center text-gray-500 md:text-left">
                <p>Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Education and Culture Executive Agency (EACEA). Neither the European Union nor EACEA can be held responsible for them.</p>
            </div>
        </footer>
    );
};