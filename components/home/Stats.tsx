import React from 'react';

const STATS_DATA = [
  { k: "+2,000", v: "Panoramic Assets", icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="8"/><path d="M8 12h8M12 8v8"/></svg> },
  { k: "+600", v: "Interactive Lessons", icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="5" width="16" height="12" rx="2"/><path d="M8 9h8M8 13h6"/></svg> },
  { k: "+120", v: "Schools & Partners", icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 10l9-5 9 5-9 5-9-5z"/><path d="M6 12v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-6"/></svg> }
];

export const Stats: React.FC = () => (
  <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-3">
    {STATS_DATA.map((stat) => (
      <div key={stat.v} className="flex items-center justify-between gap-4 rounded-2xl bg-slate-100 p-4">
        <div className="text-left">
          <div className="text-4xl font-extrabold text-blue-600">{stat.k}</div>
          <div className="text-sm text-slate-600">{stat.v}</div>
        </div>
        <div className="flex-shrink-0 text-slate-400">{stat.icon}</div>
      </div>
    ))}
  </section>
);