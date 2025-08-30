import React from 'react';
import { FAQ } from '../components/shared/FAQ';

export const AboutPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-700 shadow-sm">
                <h2 className="mb-2 text-2xl font-bold text-gray-900">About Study360</h2>
                <p>Study360 is a free educational platform by Interactive Bulgaria Foundation. Teachers and learners can upload 360° media and build interactive lessons with hotspots, quizzes, and rich text. Content can be public (for reuse) or private.</p>
                <ul className="mt-3 list-disc pl-5 space-y-1">
                    <li>Sign in via Google or create an account with email/password.</li>
                    <li>Profile supports avatar, name, email, About, Facebook/LinkedIn links.</li>
                    <li>Assets are for education only. Copyright remains with the authors.</li>
                </ul>
            </section>
            <FAQ />
        </div>
    );
};