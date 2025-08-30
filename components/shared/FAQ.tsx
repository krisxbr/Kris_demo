import React, { useState } from 'react';
import { QA } from '../../constants';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-lg font-semibold text-gray-900">Frequently Asked Questions</h2>
      <div className="divide-y divide-gray-200">
        {QA.map((item, idx) => (
          <div key={item.q} className="py-4">
            <button
              onClick={() => toggleItem(idx)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="text-sm font-medium text-gray-900">{item.q}</span>
              <span className="text-xl font-light text-gray-500">{openIndex === idx ? "−" : "+"}</span>
            </button>
            {openIndex === idx && <p className="mt-3 text-sm text-gray-600">{item.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};