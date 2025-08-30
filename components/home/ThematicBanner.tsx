import React from 'react';
import { BookIcon } from '../icons';

export const ThematicBanner: React.FC = () => (
    <section className="group relative flex items-center gap-6 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-inner">
            <BookIcon className="h-8 w-8" />
        </div>
        <div>
            <h2 className="text-lg font-semibold text-slate-900">Thematic Collection: The Roman Empire</h2>
            <p className="text-sm text-slate-600">Explore a curated set of lessons covering the history, architecture, and culture of Ancient Rome.</p>
        </div>
        <button className="ml-auto flex-shrink-0 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform group-hover:scale-105 hover:bg-slate-700">View Collection</button>
    </section>
);