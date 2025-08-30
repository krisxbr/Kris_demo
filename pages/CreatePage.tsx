import React from 'react';
import { CreateWizard } from '../components/create/CreateWizard';

export const CreatePage: React.FC = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Create a New Lesson</h1>
            <CreateWizard />
        </div>
    );
};