import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MOCK_MAP_ASSETS, MOCK_USER_ID } from '../constants';
import { MapAsset, Page } from '../types';
import { ShareIcon, FullScreenIcon, CloseIcon, SearchIcon, FilterIcon } from '../components/icons';
import { classNames } from '../utils/classNames';
import { SafeImage } from '../components/shared/SafeImage';
import { Pill } from '../components/ui/Pill';

const PINS = [ // Static positions for mock assets
    { assetId: "ma1", x: 54, y: 52 },
    { assetId: "ma2", x: 30, y: 40 },
    { assetId: "ma3", x: 28, y: 60 },
    { assetId: "ma4", x: 42, y: 35 },
    { assetId: "ma5", x: 58, y: 45 },
];

const AssetPreviewCard: React.FC<{
    asset: MapAsset;
    onClose: () => void;
    onNavigate: (page: Page) => void;
    onFullscreen: () => void;
}> = ({ asset, onClose, onNavigate, onFullscreen }) => (
    <div className="relative w-[840px] max-w-[90vw] max-h-[90vh] rounded-2xl bg-white shadow-2xl overflow-hidden grid md:grid-cols-3">
        {/* Left: Image */}
        <div className="relative h-64 md:h-full md:col-span-2">
            <SafeImage src={asset.thumb} alt={asset.title} className="h-full w-full object-cover" />
        </div>

        {/* Right: Content */}
        <div className="relative flex flex-col p-4 overflow-y-auto">
            <button onClick={onClose} className="absolute top-2 right-2 h-8 w-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 z-10">
                <CloseIcon className="h-4 w-4" />
            </button>
            <div className="flex-grow">
                <h3 className="font-semibold text-slate-900 text-lg mb-1 pr-8">{asset.title}</h3>
                <p className="text-xs text-slate-600 mb-2">by {asset.author}</p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                    {asset.tags.map((tag) => <Pill key={tag}>{tag}</Pill>)}
                </div>

                <p className="text-sm text-slate-700 mb-3">{asset.description}</p>
            </div>

            <div className="space-y-3 mt-auto pt-3">
                <p className="text-xs text-slate-500 font-medium p-2 rounded-md bg-slate-100">
                    {asset.visibility === 'Private'
                        ? "This is a private asset. Only you can use it in lessons."
                        : "This is a public asset, free for educational use."}
                </p>
                <div className="grid grid-cols-2 gap-2">
                    <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">
                        <ShareIcon className="h-4 w-4" /> Share
                    </button>
                    <button onClick={onFullscreen} className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">
                        <FullScreenIcon className="h-4 w-4" /> Fullscreen
                    </button>
                </div>

                <button
                    onClick={() => onNavigate('Create')}
                    className="w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                >
                    Use in a Lesson
                </button>
            </div>
        </div>
    </div>
);


interface MapPageProps {
    onNavigate: (page: Page) => void;
}

export const MapPage: React.FC<MapPageProps> = ({ onNavigate }) => {
    const [filter, setFilter] = useState<'Combined' | 'Global' | 'Personal'>('Combined');
    const [selectedAsset, setSelectedAsset] = useState<MapAsset | null>(null);
    const [modalAsset, setModalAsset] = useState<MapAsset | null>(null);
    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showRomanEmpire, setShowRomanEmpire] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const searchContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setIsSearchFocused(false);
                setIsFilterOpen(false); // Also close the filter popover
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchContainerRef]);

    const filteredAssets = useMemo(() => {
        let assets = MOCK_MAP_ASSETS;

        if (filter === 'Global') {
            assets = assets.filter(a => a.visibility === 'Public');
        } else if (filter === 'Personal') {
            assets = assets.filter(a => a.authorId === MOCK_USER_ID);
        }
        
        if (showRomanEmpire) {
            assets = assets.filter(asset => 
                asset.tags.some(tag => tag.toLowerCase().includes('rome'))
            );
        }

        if (searchQuery.trim() !== '') {
            const lowercasedQuery = searchQuery.toLowerCase();
            assets = assets.filter(asset =>
                asset.title.toLowerCase().includes(lowercasedQuery) ||
                asset.description.toLowerCase().includes(lowercasedQuery) ||
                asset.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery))
            );
        }

        return assets;
    }, [filter, searchQuery, showRomanEmpire]);

    const assetPinMap = new Map(PINS.map(p => [p.assetId, p]));

    const handleOpenFullscreen = (asset: MapAsset) => {
        setFullscreenImage(asset.thumb);
        setModalAsset(null);
    };

    const handleFocusSearch = () => {
        setIsSearchFocused(true);
        setIsFilterOpen(false);
    };

    const handleToggleFilter = () => {
        setIsFilterOpen(prev => {
            if (!prev) { // If it's about to become true
                setIsSearchFocused(false);
            }
            return !prev;
        });
    };

    const handleSelectPin = (e: React.MouseEvent, asset: MapAsset) => {
        e.stopPropagation(); // Prevent click from bubbling up to the map background
        setSelectedAsset(prev => (prev?.id === asset.id ? null : asset));
        setModalAsset(null); // Always close modal when only selecting
    };

    const handleOpenPreview = (asset: MapAsset) => {
        setSelectedAsset(asset); // Ensure pin is selected when preview opens
        setModalAsset(asset);
    };

    return (
        <>
            <div 
                className="relative h-[calc(100vh-200px)] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 bg-[url('https://picsum.photos/seed/mapbg/1600/900')] bg-cover bg-center shadow"
                onClick={(e) => {
                    // If the click is on the map background itself, deselect asset
                    if (e.target === e.currentTarget) {
                        setSelectedAsset(null);
                        setModalAsset(null);
                    }
                }}
            >
                
                {/* Top-right Action Button */}
                <button onClick={() => onNavigate('Create')} className="absolute top-4 right-4 z-20 rounded-lg bg-white/80 backdrop-blur-sm px-3 py-2 text-sm font-semibold text-slate-800 shadow-lg hover:bg-white">
                    Create a Lesson
                </button>

                {/* Centered Search & Filter Widget */}
                <div ref={searchContainerRef} className="absolute top-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4">
                    <div className="relative flex items-center w-full rounded-full bg-white/90 shadow-lg backdrop-blur-sm border border-slate-200">
                        <div className="pl-4 pr-2 flex-shrink-0">
                            <SearchIcon className="text-slate-400 h-5 w-5" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search map..."
                            value={searchQuery}
                            onFocus={handleFocusSearch}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent py-3 pr-4 text-sm outline-none placeholder:text-slate-400"
                        />
                        <div className="relative pr-2">
                            <button
                                onClick={handleToggleFilter}
                                className="h-9 w-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition"
                            >
                                <FilterIcon className="text-slate-600" />
                            </button>
                            {/* Filter Popover */}
                            {isFilterOpen && (
                                <div className="absolute top-full right-0 mt-2 w-64 rounded-xl bg-white p-4 shadow-2xl border border-slate-200 animate-fade-in">
                                    <h4 className="text-sm font-semibold text-slate-900 mb-3">Filter by</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs text-slate-500 font-medium">Visibility</label>
                                            <div className="mt-1 flex gap-1 rounded-lg bg-slate-100 p-1">
                                                {(['Combined', 'Global', 'Personal'] as const).map(f => (
                                                    <button
                                                        key={f}
                                                        onClick={() => { setFilter(f); setIsFilterOpen(false); }}
                                                        className={classNames("w-full px-2 py-1 text-xs rounded-md transition-colors", filter === f ? "bg-blue-500 text-white shadow" : "text-slate-600 hover:bg-slate-200")}
                                                    >
                                                        {f}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 font-medium">Thematic Collections</label>
                                            <div className="mt-1">
                                                <button
                                                    onClick={() => { setShowRomanEmpire(!showRomanEmpire); setIsFilterOpen(false); }}
                                                    className={classNames(
                                                        "w-full px-3 py-2 text-sm rounded-lg text-left transition-colors flex items-center justify-between",
                                                        showRomanEmpire
                                                            ? "bg-amber-100 text-amber-800"
                                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                                    )}
                                                >
                                                    <span>Roman Empire</span>
                                                    {showRomanEmpire && <span className="text-xs font-bold">ACTIVE</span>}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Search Suggestions Dropdown */}
                    {isSearchFocused && searchQuery.trim() !== '' && (
                        <div className="absolute top-full mt-2 w-full rounded-xl bg-white p-2 shadow-2xl border border-slate-200">
                            <ul className="max-h-72 overflow-y-auto">
                                {filteredAssets.length > 0 ? (
                                    filteredAssets.map(asset => (
                                        <li key={asset.id}>
                                            <button
                                                className="w-full text-left flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                                                onClick={() => {
                                                    setSelectedAsset(asset);
                                                    setModalAsset(asset);
                                                    setIsSearchFocused(false);
                                                }}
                                            >
                                                <SafeImage src={asset.thumb} alt={asset.title} className="w-10 h-10 object-cover rounded-md flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm font-medium text-slate-800 line-clamp-1">{asset.title}</p>
                                                    <p className="text-xs text-slate-500 line-clamp-1">by {asset.author}</p>
                                                </div>
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <li className="p-3 text-sm text-center text-slate-500">No assets found.</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Pins */}
                {filteredAssets.map((asset) => {
                    const pin = assetPinMap.get(asset.id);
                    if (!pin) return null;
                    const isSelected = selectedAsset?.id === asset.id;

                    return (
                        <div
                            key={asset.id}
                            title={asset.title}
                            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-110 hover:z-20"
                            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                        >
                            <div className="relative">
                                <button
                                    aria-label={`View details for ${asset.title}`}
                                    onClick={() => handleOpenPreview(asset)}
                                    className="block p-0 border-none bg-transparent cursor-pointer"
                                >
                                    <SafeImage 
                                        src={asset.thumb}
                                        alt={asset.title}
                                        className={classNames(
                                            "w-12 h-12 object-cover rounded-full border-4 shadow-lg transition-all",
                                            isSelected ? "border-blue-500" : "border-white/80"
                                        )}
                                    />
                                </button>
                                <button
                                    aria-label={`Select ${asset.title}`}
                                    onClick={(e) => handleSelectPin(e, asset)}
                                    className={classNames(
                                        "absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white bg-white flex items-center justify-center shadow transition-all",
                                        isSelected ? "bg-blue-500" : "bg-slate-100 group-hover:bg-slate-200"
                                    )}
                                >
                                    {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                </button>
                            </div>
                            <div className="invisible absolute top-full mt-2 w-max -translate-x-1/2 left-1/2 rounded-md bg-white px-2 py-1 text-xs shadow-lg group-hover:visible">
                                {asset.title}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Asset Preview Modal */}
            {modalAsset && (
                <div 
                    className="fixed inset-0 z-40 flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setModalAsset(null)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <AssetPreviewCard 
                            asset={modalAsset} 
                            onClose={() => setModalAsset(null)} 
                            onNavigate={onNavigate}
                            onFullscreen={() => handleOpenFullscreen(modalAsset)}
                        />
                    </div>
                </div>
            )}

            {/* Fullscreen Image Overlay */}
            {fullscreenImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
                    <SafeImage src={fullscreenImage} alt="Fullscreen asset preview" className="max-w-full max-h-full object-contain rounded-lg" />
                    <button 
                        onClick={() => setFullscreenImage(null)}
                        className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 text-white flex items-center justify-center text-2xl hover:bg-white/30"
                    >
                        <CloseIcon className="h-6 w-6" />
                    </button>
                </div>
            )}
        </>
    );
};