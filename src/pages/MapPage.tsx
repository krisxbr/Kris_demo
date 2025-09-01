import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_MAP_ASSETS, MOCK_USER_ID, FALLBACK_SVG } from '../constants';
import { MapAsset, Page } from '../types';
import { ShareIcon, CloseIcon, SearchIcon, FilterIcon, CheckIcon, RomanHelmetIcon, CrosshairIcon, ExitFullScreenIcon, ZoomOutIcon, CreateIcon, FullScreenIcon } from '../components/icons';
import { classNames } from '../utils/classNames';
import { LazyImage } from '../components/ui/LazyImage';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { SearchAutocomplete } from '../components/ui/SearchAutocomplete';
import { Pill } from '../components/ui/Pill';
import { CreateLessonModal } from '../components/create/CreateLessonModal';
import { generateSearchSuggestions } from '../utils/search';
import { MOCK_LESSONS } from '../constants';

// Fix: Add declaration for the Google Maps API on the window object.
declare global {
    interface Window {
        google: any;
    }
}

interface MapPageProps {
    onNavigate: (page: Page) => void;
}

export const MapPage: React.FC<MapPageProps> = ({ onNavigate }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
    const [modalAsset, setModalAsset] = useState<MapAsset | null>(null);
    const [stackedModalAssets, setStackedModalAssets] = useState<MapAsset[] | null>(null);
    const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);
    const [showRomanEmpire, setShowRomanEmpire] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isMapReady, setIsMapReady] = useState(false);
    const [isMapLoading, setIsMapLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const searchContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const assetPinMap = useRef<Map<string, any>>(new Map());

    const filteredAssets = useMemo(() => {
        let assets = MOCK_MAP_ASSETS;
        
        if (showRomanEmpire) {
            assets = assets.filter(asset => 
                asset.tags.some(tag => tag.toLowerCase().includes('roman'))
            );
        }
        
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            assets = assets.filter(asset => 
                asset.title.toLowerCase().includes(query) ||
                asset.description.toLowerCase().includes(query) ||
                asset.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }
        
        return assets;
    }, [searchQuery, showRomanEmpire]);

    const selectedAssets = useMemo(() => 
        MOCK_MAP_ASSETS.filter(asset => selectedAssetIds.includes(asset.id)),
        [selectedAssetIds]
    );

    const handleFocusSearch = () => {
        setIsSearchFocused(true);
    };

    const handleToggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const handleToggleSelectionInModal = (assetId: string) => {
        setSelectedAssetIds(prev => 
            prev.includes(assetId) 
                ? prev.filter(id => id !== assetId)
                : [...prev, assetId]
        );
    };

    const handlePreviewAsset = (asset: MapAsset) => {
        setModalAsset(asset);
        setStackedModalAssets(null);
    };

    const handleCloseAssetPreview = () => {
        setModalAsset(null);
        setIsPreviewFullscreen(false);
    };

    const handleTogglePreviewFullscreen = () => {
        setIsPreviewFullscreen(!isPreviewFullscreen);
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleCloseAssetPreview();
            setStackedModalAssets(null);
        }
    };

    const handleZoomOut = () => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.setZoom(2);
            mapInstanceRef.current.setCenter({ lat: 20, lng: 0 });
        }
    };

    const handleLocateAsset = (asset: MapAsset) => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.setCenter({ lat: asset.lat, lng: asset.lng });
            mapInstanceRef.current.setZoom(8);
            
            const pin = assetPinMap.current.get(asset.id);
            if (pin) {
                // Animate the pin
                pin.setAnimation(window.google.maps.Animation.BOUNCE);
                setTimeout(() => pin.setAnimation(null), 2000);
            }
        }
    };

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setIsSearchFocused(false);
                setIsFilterOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const initMap = async () => {
            try {
                const { Map } = await window.google.maps.importLibrary("maps") as google.maps.MapsLibrary;
                const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

                const map = new Map(mapRef.current!, {
                    zoom: 2,
                    center: { lat: 20, lng: 0 },
                    mapId: "DEMO_MAP_ID",
                    disableDefaultUI: true,
                    backgroundColor: '#f1f5f9',
                    styles: [
                        {
                            featureType: "water",
                            elementType: "geometry",
                            stylers: [{ color: "#a2d2ff" }]
                        },
                        {
                            featureType: "landscape",
                            elementType: "geometry",
                            stylers: [{ color: "#f8fafc" }]
                        }
                    ]
                });
                mapInstanceRef.current = map;
                setIsMapReady(true);
                setIsMapLoading(false);
            } catch (error) {
                console.error("Error loading Google Maps libraries:", error);
                setIsMapLoading(false);
            }
        };
        initMap();
    }, []);

    useEffect(() => {
        if (!isMapReady || !mapInstanceRef.current) return;

        // Clear existing pins
        assetPinMap.current.forEach(pin => pin.setMap(null));
        assetPinMap.current.clear();

        // Group assets by location
        const locationGroups = new Map<string, MapAsset[]>();
        filteredAssets.forEach(asset => {
            const key = `${asset.lat},${asset.lng}`;
            if (!locationGroups.has(key)) {
                locationGroups.set(key, []);
            }
            locationGroups.get(key)!.push(asset);
        });

        // Create pins for each location group
        locationGroups.forEach((assets, locationKey) => {
            const [lat, lng] = locationKey.split(',').map(Number);
            const isStacked = assets.length > 1;
            const isSelected = assets.some(asset => selectedAssetIds.includes(asset.id));

            const pinElement = document.createElement('div');
            pinElement.className = `
                relative w-12 h-12 rounded-full border-2 cursor-pointer transition-all duration-200 transform hover:scale-110
                ${isSelected ? 'border-blue-500 bg-blue-100' : 'border-white bg-white'}
                shadow-lg hover:shadow-xl
            `;

            if (isStacked) {
                pinElement.innerHTML = `
                    <div class="absolute inset-0 rounded-full bg-white border-2 border-gray-300 transform translate-x-1 translate-y-1"></div>
                    <div class="relative w-full h-full rounded-full overflow-hidden">
                        <img src="${assets[0].thumb}" alt="${assets[0].title}" class="w-full h-full object-cover" />
                        <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <span class="text-white text-xs font-bold">+${assets.length}</span>
                        </div>
                    </div>
                `;
            } else {
                pinElement.innerHTML = `
                    <img src="${assets[0].thumb}" alt="${assets[0].title}" class="w-full h-full object-cover rounded-full" />
                `;
            }

            const pin = new window.google.maps.marker.AdvancedMarkerElement({
                map: mapInstanceRef.current,
                position: { lat, lng },
                content: pinElement,
            });

            pin.addListener('click', () => {
                if (isStacked) {
                    setStackedModalAssets(assets);
                    setModalAsset(null);
                } else {
                    setModalAsset(assets[0]);
                    setStackedModalAssets(null);
                }
            });

            // Store pin reference for each asset in the group
            assets.forEach(asset => {
                assetPinMap.current.set(asset.id, pin);
            });
        });
    }, [filteredAssets, assetPinMap, selectedAssetIds, isMapReady]);

    const searchSuggestions = useMemo(() => 
        generateSearchSuggestions(MOCK_LESSONS, MOCK_MAP_ASSETS, searchQuery),
        [searchQuery]
    );

    return (
        <div className="flex flex-row w-full h-full overflow-hidden bg-slate-100 rounded-2xl shadow-lg border border-slate-200">
            <div className="relative flex-grow">
                <div ref={mapRef} className="h-full w-full">
                    {isMapLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                            <div className="text-center">
                                <LoadingSpinner size="lg" className="text-blue-600 mb-4" />
                                <p className="text-slate-600">Loading interactive map...</p>
                            </div>
                        </div>
                    )}
                </div>
                
                <div ref={searchContainerRef} className="absolute top-4 left-4 z-10 w-[450px] max-w-[calc(100%-5.5rem)]">
                    <div className="relative">
                        <SearchAutocomplete
                            value={searchQuery}
                            onChange={setSearchQuery}
                            onFocus={handleFocusSearch}
                            placeholder="Search by title, tag, or description..."
                            suggestions={searchSuggestions}
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <button onClick={handleToggleFilter} className={classNames("h-8 w-8 rounded-lg flex items-center justify-center transition", isFilterOpen ? "bg-blue-100 text-blue-600" : "hover:bg-slate-100 text-slate-500")}>
                                <FilterIcon className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {isFilterOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 right-0 mt-2 p-3 bg-white rounded-xl shadow-lg border border-slate-200 space-y-3"
                            >
                                 <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-500">FILTER ASSETS</span>
                                    <button onClick={() => setShowRomanEmpire(false)} className="text-xs text-blue-600 hover:text-blue-800">Clear all</button>
                                </div>
                                 <button onClick={() => setShowRomanEmpire(!showRomanEmpire)} className={classNames("w-full flex items-center justify-center gap-2 px-2 py-1.5 rounded-lg text-sm font-medium transition", showRomanEmpire ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700 hover:bg-slate-200")}>
                                    <RomanHelmetIcon className="h-4 w-4" /> Thematic: Roman Empire
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleZoomOut}
                        className="h-12 w-12 rounded-2xl bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition transform hover:scale-110 active:scale-95 active:duration-75"
                        aria-label="Zoom out map to overview"
                    >
                        <ZoomOutIcon />
                    </motion.button>
                </div>
                
                <AnimatePresence>
                    {(modalAsset || stackedModalAssets || isCreateModalOpen) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={classNames(
                                "absolute inset-0 bg-black/60 z-30 flex justify-center backdrop-blur-sm",
                                stackedModalAssets ? "items-end" : "items-center",
                                isPreviewFullscreen ? "p-0" : ""
                            )}
                            onClick={handleOverlayClick}
                        >
                            {modalAsset && <AssetPreviewCard 
                                asset={modalAsset} 
                                onClose={handleCloseAssetPreview} 
                                onNavigate={onNavigate} 
                                onToggleFullscreen={handleTogglePreviewFullscreen} 
                                isFullscreen={isPreviewFullscreen}
                                isSelected={selectedAssetIds.includes(modalAsset.id)}
                                onToggleSelect={handleToggleSelectionInModal}
                            />}
                            
                            {stackedModalAssets && (
                                <StackedAssetsTray
                                    assets={stackedModalAssets}
                                    selectedAssetIds={selectedAssetIds}
                                    onClose={() => setStackedModalAssets(null)}
                                    onToggleSelect={handleToggleSelectionInModal}
                                    onPreview={handlePreviewAsset}
                                    onSelectAll={() => {
                                        const assetIds = stackedModalAssets.map(a => a.id);
                                        setSelectedAssetIds(prev => [...new Set([...prev, ...assetIds])]);
                                    }}
                                    onDeselectAll={() => {
                                        const assetIds = new Set(stackedModalAssets.map(a => a.id));
                                        setSelectedAssetIds(prev => prev.filter(id => !assetIds.has(id)));
                                    }}
                                />
                            )}
                            
                            <CreateLessonModal
                              isOpen={isCreateModalOpen}
                              onClose={() => setIsCreateModalOpen(false)}
                              onCreate={(details) => {
                                  console.log("Creating lesson with details:", details);
                                  setIsCreateModalOpen(false);
                                  onNavigate("Create");
                              }}
                              initialAssetCount={selectedAssets.length}
                          />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {selectedAssets.length > 0 && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className={classNames(
                            "flex-shrink-0"
                        )}
                    >
                        <SelectionTray
                            selectedAssets={selectedAssets}
                            onDeselect={(id) => setSelectedAssetIds(prev => prev.filter(assetId => assetId !== id))}
                            onClear={() => setSelectedAssetIds([])}
                            onPreview={handlePreviewAsset}
                            onUse={handleOpenCreateModal}
                            onLocate={handleLocateAsset}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const AssetPreviewCard: React.FC<{
    asset: MapAsset;
    onClose: () => void;
    onNavigate: (page: Page) => void;
    onToggleFullscreen: () => void;
    isFullscreen: boolean;
    isSelected: boolean;
    onToggleSelect: (assetId: string) => void;
}> = ({ asset, onClose, onNavigate, onToggleFullscreen, isFullscreen, isSelected, onToggleSelect }) => {
    return (
        <div className={classNames(
            "bg-white rounded-2xl shadow-2xl flex overflow-hidden",
            isFullscreen ? "w-full h-full" : "max-w-4xl max-h-[90vh] w-full mx-4"
        )} onClick={(e) => e.stopPropagation()}>
            {/* Image container */}
            <div className={classNames(
                "relative flex-shrink-0 flex items-center justify-center",
                 isFullscreen ? "w-full h-full" : "md:w-2/3 bg-slate-900"
            )}>
                <LazyImage 
                    src={asset.thumb} 
                    alt={asset.title} 
                    className={classNames(
                        "object-contain max-w-full max-h-full",
                        isFullscreen ? "w-full h-full object-cover" : ""
                    )}
                />
                
                {/* Top controls */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={onToggleFullscreen} className="h-10 w-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition">
                        {isFullscreen ? <ExitFullScreenIcon className="h-5 w-5" /> : <FullScreenIcon className="h-5 w-5" />}
                    </button>
                    <button onClick={onClose} className="h-10 w-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition">
                        <CloseIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Content panel - hidden in fullscreen */}
            {!isFullscreen && (
                <div className="flex-1 p-6 flex flex-col">
                    <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                            <h2 className="text-2xl font-bold text-slate-900 leading-tight">{asset.title}</h2>
                            <button 
                                onClick={() => onToggleSelect(asset.id)}
                                className={classNames(
                                    "h-10 w-10 rounded-full flex items-center justify-center transition",
                                    isSelected ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                )}
                            >
                                <CheckIcon className="h-5 w-5" />
                            </button>
                        </div>
                        
                        <p className="text-slate-600 mb-6 leading-relaxed">{asset.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                            {asset.tags.map(tag => (
                                <Pill key={tag} variant="secondary">{tag}</Pill>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4 border-t border-slate-200">
                        <button 
                            onClick={() => onNavigate("Create")}
                            className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
                        >
                            <CreateIcon className="h-4 w-4" />
                            Use in Lesson
                        </button>
                        <button className="px-4 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition flex items-center justify-center">
                            <ShareIcon className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const StackedAssetsTray: React.FC<{
    assets: MapAsset[];
    selectedAssetIds: string[];
    onClose: () => void;
    onToggleSelect: (assetId: string) => void;
    onPreview: (asset: MapAsset) => void;
    onSelectAll: () => void;
    onDeselectAll: () => void;
}> = ({ assets, selectedAssetIds, onClose, onToggleSelect, onPreview, onSelectAll, onDeselectAll }) => {
    const selectedCount = assets.filter(asset => selectedAssetIds.includes(asset.id)).length;
    const allSelected = selectedCount === assets.length;

    return (
        <div className="bg-white rounded-t-2xl shadow-2xl w-full max-w-6xl mx-4 max-h-[70vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-slate-900">{assets.length} Assets at this Location</h3>
                    {selectedCount > 0 && (
                        <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                            {selectedCount} selected
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={allSelected ? onDeselectAll : onSelectAll}
                        className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 rounded-lg hover:bg-blue-50 transition"
                    >
                        {allSelected ? 'Deselect All' : 'Select All'}
                    </button>
                    <button onClick={onClose} className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition">
                        <CloseIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {assets.map(asset => {
                        const isSelected = selectedAssetIds.includes(asset.id);
                        return (
                            <div key={asset.id} className="w-52 flex-shrink-0 rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col">
                                <LazyImage 
                                    src={asset.thumb} 
                                    alt={asset.title} 
                                    className="w-full aspect-[4/3] object-cover rounded-t-xl cursor-pointer"
                                    onClick={() => onPreview(asset)}
                                />
                                <div className="p-3 flex-1 flex flex-col">
                                    <h4 className="font-medium text-slate-900 text-sm mb-1 line-clamp-2">{asset.title}</h4>
                                    <p className="text-xs text-slate-600 mb-3 line-clamp-2 flex-1">{asset.description}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-wrap gap-1">
                                            {asset.tags.slice(0, 2).map(tag => (
                                                <Pill key={tag} variant="secondary" size="xs">{tag}</Pill>
                                            ))}
                                            {asset.tags.length > 2 && (
                                                <span className="text-xs text-slate-500">+{asset.tags.length - 2}</span>
                                            )}
                                        </div>
                                        <button 
                                            onClick={() => onToggleSelect(asset.id)}
                                            className={classNames(
                                                "h-7 w-7 rounded-full flex items-center justify-center transition",
                                                isSelected ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                                            )}
                                        >
                                            <CheckIcon className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const SelectionTray: React.FC<{
    selectedAssets: MapAsset[];
    onDeselect: (id: string) => void;
    onClear: () => void;
    onPreview: (asset: MapAsset) => void;
    onUse: () => void;
    onLocate: (asset: MapAsset) => void;
}> = ({ selectedAssets, onDeselect, onClear, onPreview, onUse, onLocate }) => {
    return (
        <div className="w-80 bg-white border-l border-slate-200 flex flex-col h-full">
            <div className="p-4 border-b border-slate-200">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-slate-900">Selected Assets</h3>
                    <button onClick={onClear} className="text-sm text-slate-500 hover:text-slate-700">Clear all</button>
                </div>
                <div className="text-sm text-slate-600 mb-3">{selectedAssets.length} asset{selectedAssets.length !== 1 ? 's' : ''} selected</div>
                <button 
                    onClick={onUse}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                    <CreateIcon className="h-4 w-4" />
                    Create Lesson
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {selectedAssets.map(asset => (
                     <div key={asset.id} className="p-2 rounded-xl border border-gray-200 bg-white shadow-sm flex gap-3 group">
                        <LazyImage 
                            src={asset.thumb} 
                            alt={asset.title} 
                            className="w-20 h-20 rounded-lg flex-shrink-0 cursor-pointer" 
                            aspectRatio="aspect-square"
                            onClick={() => onPreview(asset)}
                        />
                        <div className="flex-grow flex flex-col justify-between min-w-0">
                            <div>
                                <h4 className="font-medium text-slate-900 text-sm mb-1 line-clamp-2">{asset.title}</h4>
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {asset.tags.slice(0, 2).map(tag => (
                                        <Pill key={tag} variant="secondary" size="xs">{tag}</Pill>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <button 
                                    onClick={() => onLocate(asset)}
                                    className="h-6 w-6 rounded-md bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition"
                                    title="Locate on map"
                                >
                                    <CrosshairIcon className="h-3 w-3" />
                                </button>
                                <button 
                                    onClick={() => onDeselect(asset.id)}
                                    className="h-6 w-6 rounded-md bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition"
                                    title="Remove from selection"
                                >
                                    <CloseIcon className="h-3 w-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};