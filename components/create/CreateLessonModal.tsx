import React, { useState, useMemo, useEffect } from 'react';
import { CreateIcon, CloseIcon, RomanHelmetIcon, CheckIcon } from '../icons';
import { classNames } from '../../utils/classNames';

interface CreateLessonModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (details: { title: string; tags: string[]; isThematic: boolean }) => void;
    initialAssetCount?: number;
}

const ALL_TAGS = ["History", "Ancient Rome", "VR Ready", "Architecture", "Italy", "Educational", "360 Tour", "Culture", "Bulgaria", "Historic", "Revival", "Biology", "Environment", "Quiz", "Nature", "Greece", "Coastal", "Art", "Baroque", "Symbols", "Vienna", "Austria", "Palace"];

const ValidationItem: React.FC<{ isComplete: boolean; text: string; children?: React.ReactNode }> = ({ isComplete, text, children }) => (
    <div className={classNames("flex items-center gap-2 transition-colors", isComplete ? 'text-emerald-600' : 'text-slate-500')}>
        <div className="h-5 w-5 flex items-center justify-center rounded-full border-2 bg-white" style={{ borderColor: isComplete ? '#10b981' : '#e2e8f0' }}>
            {isComplete && <CheckIcon className="h-3 w-3 text-emerald-600" />}
        </div>
        <span className="text-sm font-medium">{text}</span>
        {children}
    </div>
);


export const CreateLessonModal: React.FC<CreateLessonModalProps> = ({ isOpen, onClose, onCreate, initialAssetCount = 0 }) => {
    const [title, setTitle] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [tagList, setTagList] = useState<string[]>([]);
    const [isThematic, setIsThematic] = useState(false);

    const titleIsValid = useMemo(() => title.trim() !== '', [title]);
    const tagsAreValid = useMemo(() => tagList.length >= 5, [tagList]);
    const isFormValid = useMemo(() => titleIsValid && tagsAreValid, [titleIsValid, tagsAreValid]);

    const suggestedTags = useMemo(() => {
        if (!tagInput.trim()) return [];
        const lowercasedInput = tagInput.toLowerCase();
        return ALL_TAGS.filter(tag => 
            !tagList.includes(tag) && tag.toLowerCase().includes(lowercasedInput)
        ).slice(0, 5);
    }, [tagInput, tagList]);

    const addTag = (tag: string) => {
        const newTag = tag.trim();
        if (newTag && !tagList.includes(newTag)) {
            setTagList([...tagList, newTag]);
        }
        setTagInput('');
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(tagInput);
        }
    };
    
    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.includes(',')) {
            const newTags = e.target.value.split(',')
                .map(t => t.trim())
                .filter(t => t && !tagList.includes(t));
            if (newTags.length > 0) {
                setTagList([...tagList, ...new Set(newTags)]);
            }
            setTagInput('');
        } else {
            setTagInput(e.target.value);
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTagList(tagList.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = () => {
        if (isFormValid) {
            onCreate({ title, tags: tagList, isThematic });
        }
    };
    
    useEffect(() => {
        if (!isOpen) {
             // Reset form when modal closes
            setTitle('');
            setTagInput('');
            setTagList([]);
            setIsThematic(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 flex flex-col m-4 animate-fade-in"
            onClick={e => e.stopPropagation()}
        >
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <CreateIcon />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Create a New Lesson</h2>
                        <p className="text-sm text-gray-500">
                            {initialAssetCount > 0
                                ? `Using ${initialAssetCount} selected asset${initialAssetCount > 1 ? 's' : ''}`
                                : 'Start from scratch'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="h-9 w-9 rounded-lg flex items-center justify-center text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
                    aria-label="Close"
                >
                    <CloseIcon className="h-5 w-5" />
                </button>
            </div>

            {/* Form */}
            <div className="space-y-4 pt-4 flex-grow">
                <div>
                    <label htmlFor="lesson-title" className="block text-sm font-medium text-gray-700 mb-1">Lesson Title</label>
                    <input
                        id="lesson-title"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="e.g., A Journey Through Ancient Rome"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="lesson-tags" className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-sm shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
                        {tagList.map(tag => (
                            <span key={tag} className="inline-flex items-center gap-1.5 rounded-md bg-blue-100 pl-2 pr-1 py-1 text-xs font-medium text-blue-800">
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="flex-shrink-0 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-200 p-0.5"
                                    aria-label={`Remove tag ${tag}`}
                                >
                                    <CloseIcon className="h-3 w-3" />
                                </button>
                            </span>
                        ))}
                        <input
                            id="lesson-tags"
                            type="text"
                            value={tagInput}
                            onChange={handleTagInputChange}
                            onKeyDown={handleTagKeyDown}
                            placeholder={tagList.length === 0 ? "Type and press Enter..." : ""}
                            className="flex-grow bg-transparent outline-none min-w-[120px] h-6"
                        />
                    </div>
                     {suggestedTags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                            <span className="text-xs text-slate-500 self-center">Suggestions:</span>
                            {suggestedTags.map(tag => (
                                <button key={tag} onClick={() => addTag(tag)} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200">
                                    + {tag}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                 <div className="pt-2">
                     <div
                        onClick={() => setIsThematic(!isThematic)}
                        className="flex items-center justify-between cursor-pointer rounded-lg p-3 text-white transition-shadow hover:shadow-lg"
                        style={{
                            backgroundImage: `linear-gradient(135deg, hsl(356, 82%, 23%), hsl(357, 65%, 38%))`
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/10 border border-white/20">
                                <RomanHelmetIcon className="h-5 w-5 text-rose-100" />
                            </div>
                            <div className="pr-2">
                                <span className="text-sm font-semibold text-white">Thematic Collection</span>
                                <span className="block text-xs text-rose-100/90">Add this lesson to the Roman Empire collection.</span>
                            </div>
                        </div>
                        <button
                            role="switch"
                            aria-checked={isThematic}
                            className={classNames(
                                'relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-900',
                                isThematic ? 'bg-amber-500' : 'bg-white/30'
                            )}
                        >
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    'pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                    isThematic ? 'translate-x-5' : 'translate-x-0'
                                )}
                            />
                        </button>
                    </div>
                 </div>
            </div>

            {/* Footer with validation */}
            <div className="space-y-4 pt-4 mt-auto border-t border-slate-200">
                <div className="space-y-2 p-3 rounded-lg bg-slate-50">
                    <ValidationItem isComplete={titleIsValid} text="Provide a lesson title" />
                    <ValidationItem isComplete={tagsAreValid} text="Add at least 5 tags">
                       {tagsAreValid ? null : (
                           <div className="flex items-center gap-2 ml-auto">
                               <span className="text-xs text-slate-500 font-mono">({tagList.length}/5)</span>
                               <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                   <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${(tagList.length / 5) * 100}%` }} />
                               </div>
                           </div>
                       )}
                    </ValidationItem>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className="w-full rounded-lg border border-transparent bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                    Create Lesson
                </button>
            </div>
        </div>
    );
};
