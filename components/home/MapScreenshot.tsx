import React from 'react';
import { SafeImage } from '../shared/SafeImage';

interface MapScreenshotProps {
  onOpen?: () => void;
}

export const MapScreenshot: React.FC<MapScreenshotProps> = ({ onOpen }) => (
  <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 p-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Discover Lessons on the Map</h2>
        <p className="text-sm text-slate-600">Explore a world of interactive lessons created by educators.</p>
      </div>
      {onOpen && <button onClick={onOpen} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">Open Live Map</button>}
    </div>
    <SafeImage
      src="https://w.forfun.com/fetch/e0/e06d391097240f9d92b1b22e1e90b106.jpeg"
      alt="Illustration of ancient Roman ruins with an aqueduct at sunset, representing lessons on the map."
      className="h-72 w-full object-cover"
    />
    <div className="border-t border-slate-200 p-4 text-xs text-slate-600">Example locations and pins for illustration.</div>
  </section>
);