import React, { useState } from 'react';
import { classNames } from '../../utils/classNames';

const Step: React.FC<{ n: number; title: string; desc: string; isActive: boolean }> = ({ n, title, desc, isActive }) => (
    <div className={classNames("rounded-xl border p-3 transition", isActive ? "border-blue-300 bg-blue-50" : "opacity-70 border-gray-200")}>
      <div className="text-xs text-gray-500">Step {n}</div>
      <div className="text-sm font-semibold text-gray-900">{title}</div>
      <div className="text-xs text-gray-600">{desc}</div>
    </div>
);

export const CreateWizard: React.FC = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="grid gap-4 md:grid-cols-[280px_1fr]">
      <div className="space-y-2">
        <Step n={1} title="Upload 360° Media" desc="Images (.jpg) or videos (.mp4)" isActive={step === 1} />
        <Step n={2} title="Add Hotspots & Text" desc="Place infospots and write content" isActive={step === 2} />
        <Step n={3} title="Add Quiz / Interactions" desc="Multiple choice or short answers" isActive={step === 3} />
        <Step n={4} title="Publish" desc="Set language, tags, and visibility" isActive={step === 4} />
      </div>
      <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Upload 360° Media</h3>
            <div className="rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center text-sm text-gray-600">
              Drag & drop files here or <button className="font-medium text-blue-600 underline">browse</button>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">Next</button>
            </div>
          </div>
        )}
        {step === 4 && (
            <div className="space-y-3">
                <h3 className="text-lg font-semibold">Publish Lesson</h3>
                <div className="grid grid-cols-2 gap-3">
                    <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white"><option>EN</option><option>BG</option></select>
                    <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Tags (comma separated)" />
                    <select className="col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white"><option>Public (allow reuse)</option><option>Private</option></select>
                </div>
                <div className="flex gap-3">
                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">Publish Lesson</button>
                    <button onClick={() => setStep(3)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm bg-white hover:bg-gray-50">Back</button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};