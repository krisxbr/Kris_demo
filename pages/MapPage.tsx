import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MOCK_MAP_ASSETS, MOCK_USER_ID, FALLBACK_SVG } from '../constants';
import { MapAsset, Page } from '../types';
import { ShareIcon, CloseIcon, SearchIcon, FilterIcon, CheckIcon, RomanHelmetIcon, CrosshairIcon, ExitFullScreenIcon, ZoomOutIcon, CreateIcon, FullScreenIcon } from '../components/icons';
import { classNames } from '../utils/classNames';
import { SafeImage } from '../components/shared/SafeImage';
import { Pill } from '../components/ui/Pill';
import { CreateLessonModal } from '../components/create/CreateLessonModal';

// Fix: Add declaration for the Google Maps API on the window object.
declare global {
    interface Window {
        google: any;
        markerClusterer: any; // The clusterer library is namespaced
        AdvancedMarkerElement: any;
    }
}

const PIN_LOCATIONS = [
    { assetId: "ma1", lat: 42.639, lng: 24.359 }, // Koprivshtitsa, BG
    { assetId: "ma2", lat: 41.890, lng: 12.485 }, // Rome, IT
    { assetId: "ma3", lat: 38.830, lng: 20.711 }, // Lefkada, GR
    { assetId: "ma4", lat: 48.208, lng: 16.373 }, // Vienna, AT
    { assetId: "ma5", lat: 42.697, lng: 23.321 }, // "Secret Garden" near Sofia, BG
    // Paris Cluster
    { assetId: "ma6", lat: 48.8584, lng: 2.2945 }, // Eiffel Tower
    { assetId: "ma7", lat: 48.8606, lng: 2.3376 }, // Louvre
    { assetId: "ma8", lat: 48.8530, lng: 2.3499 }, // Notre-Dame
    { assetId: "ma9", lat: 48.8867, lng: 2.3431 }, // Montmartre
    // London Cluster
    { assetId: "ma10", lat: 51.5055, lng: -0.0754 }, // Tower Bridge
    { assetId: "ma11", lat: 51.5014, lng: -0.1419 }, // Buckingham Palace
    { assetId: "ma12", lat: 51.5194, lng: -0.1270 }, // British Museum
    // Berlin Cluster
    { assetId: "ma13", lat: 52.5163, lng: 13.3777 }, // Brandenburg Gate
    { assetId: "ma14", lat: 52.5186, lng: 13.3762 }, // Reichstag
    { assetId: "ma15", lat: 52.5351, lng: 13.3899 }, // Berlin Wall Memorial
    // Madrid Cluster
    { assetId: "ma16", lat: 40.4179, lng: -3.7141 }, // Royal Palace
    { assetId: "ma17", lat: 40.4138, lng: -3.6921 }, // Prado Museum
    { assetId: "ma18", lat: 40.4150, lng: -3.6844 }, // Retiro Park
    // Amsterdam Cluster
    { assetId: "ma19", lat: 52.3600, lng: 4.8852 }, // Rijksmuseum
    { assetId: "ma20", lat: 52.3731, lng: 4.8924 }, // Canals
    // Athens Cluster
    { assetId: "ma21", lat: 37.9715, lng: 23.7257 }, // Acropolis
    { assetId: "ma22", lat: 37.9818, lng: 23.7432 }, // Lycabettus Hill
    // Overlapping Marker Test Case (12 total at this location)
    { assetId: "ma23", lat: 48.8584, lng: 2.2945 },
    { assetId: "ma24", lat: 48.8584, lng: 2.2945 },
    { assetId: "ma25", lat: 48.8584, lng: 2.2945 },
    { assetId: "ma26", lat: 48.8584, lng: 2.2945 },
    { assetId: "ma27", lat: 48.8584, lng: 2.2945 },
    { assetId: "ma28", lat: 48.8584, lng: 2.2945 },
    { assetId: "ma29", lat: 48.8584, lng: 2.2945 },
    { assetId: "ma30", lat: 48.8584, lng: 2.2945 },
    { assetId: "ma31", lat: 48.8584, lng: 2.2945 },
    { assetId: "ma32", lat: 48.8584, lng: 2.2945 },
    { assetId: "ma33", lat: 48.8584, lng: 2.2945 },
];

const isRomanEmpireAsset = (asset: MapAsset) => 
    asset.tags.some(tag => tag.toLowerCase().includes('rome'));

const AssetPreviewCard: React.FC<{
    asset: MapAsset;
    onClose: () => void;
    onNavigate: (page: Page, params?: { tag: string }) => void;
    onToggleFullscreen: () => void;
    isFullscreen: boolean;
    isSelected: boolean;
    onToggleSelect: (assetId: string) => void;
}> = ({ asset, onClose, onNavigate, onToggleFullscreen, isFullscreen, isSelected, onToggleSelect }) => {
    const isRoman = isRomanEmpireAsset(asset);
    
    const previewControls = (
        <div className="flex items-center gap-2">
            <button
                onClick={onToggleFullscreen}
                className="h-9 w-9 rounded-lg flex items-center justify-center text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
                {isFullscreen ? <ExitFullScreenIcon className="h-5 w-5" /> : <FullScreenIcon className="h-5 w-5" />}
            </button>
            <button
                onClick={onClose}
                className="h-9 w-9 rounded-lg flex items-center justify-center text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
                aria-label="Close preview"
            >
                <CloseIcon className="h-5 w-5" />
            </button>
        </div>
    );

    return (
        <div 
            className={classNames(
                "relative overflow-hidden flex flex-col md:flex-row transition-all duration-300 ease-in-out",
                isFullscreen 
                    ? "w-full h-full rounded-none bg-slate-900"
                    : "w-[840px] max-w-[90vw] max-h-[90vh] rounded-2xl animate-fade-in shadow-2xl bg-white"
            )} 
            onClick={e => e.stopPropagation()}
        >
            {/* Image container */}
            <div className={classNames(
                "relative flex-shrink-0 flex items-center justify-center",
                 isFullscreen ? "w-full h-full" : "md:w-2/3 bg-slate-900"
            )}>
                <SafeImage 
                    src={asset.thumb} 
                    alt={asset.title} 
                    className={classNames(
                        "w-full",
                        isFullscreen ? "max-w-full max-h-full object-contain" : "aspect-[3/2] object-cover"
                    )}
                />
            </div>

            {/* Overlay Controls in fullscreen */}
            {isFullscreen && (
                <div className="absolute top-4 right-4 z-20">
                    {previewControls}
                </div>
            )}
            
             {/* Details Panel - Conditionally Rendered */}
             {!isFullscreen && (
                <div className="relative flex flex-col p-4 md:w-1/3 flex-grow">
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4 flex-shrink-0">
                        <div className="flex-grow">
                             <h3 className="font-semibold text-slate-900 text-lg mb-1 break-words">{asset.title}</h3>
                             <p className="text-xs text-slate-600">by {asset.author}</p>
                        </div>
                        <div className="flex-shrink-0">
                            {previewControls}
                        </div>
                    </div>
                    
                    {/* Scrollable Content */}
                    <div className="flex-grow overflow-y-auto min-h-0 my-3">
                        {isRoman && (
                            <div className="flex items-center gap-2 rounded-lg bg-amber-100 p-2 text-sm text-amber-900 border border-amber-200 mb-3">
                                <RomanHelmetIcon className="h-5 w-5 flex-shrink-0" />
                                <div className="text-xs">
                                    <span className="font-semibold">Thematic Collection:</span> This asset is part of the Roman Empire collection.
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {asset.tags.map((tag) => <Pill key={tag} onClick={() => onNavigate('Lessons', { tag })}>{tag}</Pill>)}
                        </div>
                        <p className="text-sm text-slate-700 mb-3">{asset.description}</p>
                    </div>
                    
                    {/* Footer */}
                    <div className="space-y-3 pt-3 flex-shrink-0 border-t border-slate-200">
                        <p className="text-xs text-slate-500 font-medium p-2 rounded-lg bg-slate-100">
                            {asset.visibility === 'Private'
                                ? "This is a private asset. Only you can use it in lessons."
                                : "This is a public asset, free for educational use."}
                        </p>
                        <div className="grid grid-cols-1 gap-2">
                            <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">
                                <ShareIcon className="h-4 w-4" /> Share
                            </button>
                        </div>
                        <button
                            onClick={() => onToggleSelect(asset.id)}
                            className={classNames(
                                "w-full inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-semibold shadow-sm transition-colors",
                                isSelected
                                    ? "border-blue-700 bg-blue-600 text-white hover:bg-blue-700"
                                    : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
                            )}
                        >
                            {isSelected ? <CheckIcon className="h-4 w-4" /> : <span className="text-lg font-bold leading-none">+</span>}
                            {isSelected ? 'Selected' : 'Select Asset'}
                        </button>
                    </div>
                </div>
             )}
        </div>
    );
};

interface SelectionTrayProps {
    selectedAssets: MapAsset[];
    onDeselect: (assetId: string) => void;
    onClear: () => void;
    onPreview: (asset: MapAsset) => void;
    onUse: () => void;
    onLocate: (asset: MapAsset) => void;
}

const SelectionTray: React.FC<SelectionTrayProps> = ({ selectedAssets, onDeselect, onClear, onPreview, onUse, onLocate }) => {
    return (
        <div className="w-96 flex-shrink-0 bg-white shadow-lg border-l border-slate-200 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-3 border-b border-slate-200 bg-slate-50/50 flex-shrink-0">
                <div>
                    <h3 className="font-semibold text-slate-800">Selected Assets</h3>
                    <p className="text-xs text-slate-500">{selectedAssets.length} item{selectedAssets.length !== 1 ? 's' : ''} in your collection</p>
                </div>
                <button onClick={onClear} className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200 bg-slate-100 border border-slate-200">Deselect All</button>
            </div>

            {/* Asset Cards */}
            <div className="flex-grow overflow-y-auto p-3 space-y-3">
                {selectedAssets.map(asset => (
                     <div key={asset.id} className="p-2 rounded-xl border border-gray-200 bg-white shadow-sm flex gap-3 group">
                        <SafeImage 
                            src={asset.thumb} 
                            alt={asset.title} 
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0 cursor-pointer" 
                            onClick={() => onPreview(asset)}
                        />
                        <div className="flex-grow flex flex-col justify-between min-w-0">
                           <div>
                                <p className="text-sm font-semibold text-gray-800 truncate cursor-pointer hover:underline" onClick={() => onPreview(asset)}>{asset.title}</p>
                                <p className="text-xs text-gray-500 truncate">by {asset.author}</p>
                            </div>
                           <div className="flex items-center gap-2 pt-1">
                                <button
                                    onClick={() => onLocate(asset)}
                                    className="flex items-center justify-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex-grow"
                                >
                                    <CrosshairIcon className="h-3 w-3" /> Locate
                                </button>
                                <button
                                    onClick={() => onDeselect(asset.id)}
                                    className="flex items-center justify-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex-grow"
                                >
                                    <CloseIcon className="h-3 w-3" /> Deselect
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Footer */}
            <div className="p-3 border-t border-slate-200 flex-shrink-0">
                 <button 
                    onClick={onUse} 
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-base font-bold text-white shadow-lg hover:bg-blue-500 transition-transform transform hover:scale-105"
                >
                    <CreateIcon className="h-5 w-5" />
                    Create Lesson ({selectedAssets.length})
                </button>
            </div>
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
    return (
        <div className="bg-white shadow-[0_-1px_4px_rgba(0,0,0,0.05)] border-t border-slate-200 animate-slide-in-up w-full" style={{ animationDuration: '0.3s' }} onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex justify-between items-center p-3 border-b border-slate-200 bg-slate-50/50">
                <div>
                    <h3 className="font-semibold text-slate-800">{assets.length} Assets at this Location</h3>
                    <p className="text-xs text-slate-500">Scroll horizontally to see all assets</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={onDeselectAll} className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200 bg-slate-100 border border-slate-200">Deselect All</button>
                    <button onClick={onSelectAll} className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-500">Select All</button>
                    <button onClick={onClose} className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                        <CloseIcon className="h-4 w-4 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Asset Cards */}
            <div className="flex gap-4 overflow-x-auto p-4">
                {assets.map(asset => {
                    const isSelected = selectedAssetIds.includes(asset.id);
                    return (
                        <div key={asset.id} className="w-52 flex-shrink-0 rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col">
                            <SafeImage 
                                src={asset.thumb} 
                                alt={asset.title} 
                                className="w-full aspect-[4/3] object-cover rounded-t-xl cursor-pointer"
                                onClick={() => onPreview(asset)}
                            />
                            <div className="p-3 flex-grow space-y-1">
                                <p className="text-sm font-semibold text-gray-800 line-clamp-2">{asset.title}</p>
                                <p className="text-xs text-gray-500 line-clamp-1">by {asset.author}</p>
                            </div>
                            <div className="p-2 border-t border-gray-200">
                                <button
                                    onClick={() => onToggleSelect(asset.id)}
                                    className={classNames(
                                        "w-full flex items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
                                        isSelected ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    )}
                                >
                                    {isSelected ? <CheckIcon className="h-3 w-3 stroke-current" /> : '+'}
                                    {isSelected ? 'Selected' : 'Select Asset'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

interface MapPageProps {
    onNavigate: (page: Page, params?: { tag?: string }) => void;
}

export const MapPage: React.FC<MapPageProps> = ({ onNavigate }) => {
    const [filter, setFilter] = useState<'Combined' | 'Global' | 'Personal'>('Combined');
    const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
    const [modalAsset, setModalAsset] = useState<MapAsset | null>(null);
    const [stackedModalAssets, setStackedModalAssets] = useState<MapAsset[] | null>(null);
    const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showRomanEmpire, setShowRomanEmpire] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isMapReady, setIsMapReady] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const searchContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any | null>(null);
    const markerClustererRef = useRef<any | null>(null);
    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setIsSearchFocused(false);
                setIsFilterOpen(false);
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
    
    const selectedAssets = useMemo(() => 
        MOCK_MAP_ASSETS.filter(a => selectedAssetIds.includes(a.id)).sort((a, b) => selectedAssetIds.indexOf(a.id) - selectedAssetIds.indexOf(b.id)),
        [selectedAssetIds]
    );

    const assetPinMap = useMemo(() => new Map(PIN_LOCATIONS.map(p => [p.assetId, p])), []);

    const handleTogglePreviewFullscreen = () => {
        setIsPreviewFullscreen(prev => !prev);
    };

    const handleFocusSearch = () => {
        setIsSearchFocused(true);
        setIsFilterOpen(false);
    };

    const handleToggleFilter = () => {
        setIsFilterOpen(prev => {
            if (!prev) {
                setIsSearchFocused(true);
            }
            return !prev;
        });
    };
    
    const handleToggleSelectionInModal = (assetId: string) => {
        setSelectedAssetIds(prev => {
            if (prev.includes(assetId)) {
                return prev.filter(id => id !== assetId);
            } else {
                return [...prev, assetId];
            }
        });
    };
    
    const handleOpenCreateModal = () => {
        setModalAsset(null);
        setStackedModalAssets(null);
        setIsPreviewFullscreen(false);
        setIsCreateModalOpen(true);
    };

    const handleLocateAsset = (asset: MapAsset) => {
        if (!mapInstanceRef.current) return;
        setModalAsset(null);

        const pin = assetPinMap.get(asset.id);
        if (pin) {
            mapInstanceRef.current.panTo({ lat: pin.lat, lng: pin.lng });
            if (mapInstanceRef.current.getZoom() < 15) {
                mapInstanceRef.current.setZoom(15);
            }
        }
    };

    const handleZoomOut = () => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.fitBounds({
                north: 55.7,
                south: 34.5,
                west: -10.5,
                east: 31.4,
            }, 50); // 50px padding
        }
    };

    const handleCloseAssetPreview = () => {
        setModalAsset(null);
        setIsPreviewFullscreen(false);
    };
    
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target !== e.currentTarget) return;
        if (modalAsset) {
            handleCloseAssetPreview();
        } else if (stackedModalAssets) {
            setStackedModalAssets(null);
        } else if (isCreateModalOpen) {
            setIsCreateModalOpen(false);
        }
    };

    const handlePreviewAsset = (asset: MapAsset) => {
        setStackedModalAssets(null);
        setModalAsset(asset);
    };


    // Initialize map
    useEffect(() => {
        const initMap = async () => {
            if (!mapRef.current || mapInstanceRef.current) return;

            try {
                if (!window.google || !window.google.maps) {
                    console.error("Google Maps script not loaded.");
                    return;
                }
                const { Map } = await window.google.maps.importLibrary("maps");
                const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
                window.AdvancedMarkerElement = AdvancedMarkerElement; // Make it globally available for the other effect

                const map = new Map(mapRef.current as HTMLDivElement, {
                    center: { lat: 48.8566, lng: 15.3522 },
                    zoom: 5,
                    mapId: 'STUDY360_MAP_ID',
                    disableDefaultUI: true,
                    styles: [
                        { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
                        { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
                        { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
                        { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
                        { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#c9c9c9" }] },
                        { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
                        { featureType: "administrative.neighborhood", stylers: [{ visibility: "off" }] },
                        { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
                        { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
                        { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] },
                    ]
                });
                mapInstanceRef.current = map;
                setIsMapReady(true);
            } catch (error) {
                console.error("Error loading Google Maps libraries:", error);
            }
        };
        initMap();
    }, []);

    // Update markers and clusters
    useEffect(() => {
        if (!isMapReady || !mapInstanceRef.current || !window.AdvancedMarkerElement || !window.markerClusterer) return;

        const map = mapInstanceRef.current;
        const AdvancedMarkerElement = window.AdvancedMarkerElement;

        if (markerClustererRef.current) {
            markerClustererRef.current.clearMarkers();
        }

        const assetsByLocation = new Map<string, MapAsset[]>();
        filteredAssets.forEach(asset => {
            const pin = assetPinMap.get(asset.id);
            if (pin) {
                const key = `${pin.lat},${pin.lng}`;
                if (!assetsByLocation.has(key)) assetsByLocation.set(key, []);
                assetsByLocation.get(key)!.push(asset);
            }
        });
        
        const markerToAssetsMap = new Map<any, MapAsset[]>();

        const createMarkerContent = (assets: MapAsset[], count: number = 0, thumbUrl?: string) => {
            const isCluster = count > 0;
            const asset = assets[0];
            const isStacked = !isCluster && assets.length > 1;
        
            const isSingleSelected = !isCluster && !isStacked && selectedAssetIds.includes(asset.id);
            const isStackedAndSelected = isStacked && assets.some(a => selectedAssetIds.includes(a.id));
            const isSelected = isSingleSelected || isStackedAndSelected;
        
            const content = document.createElement('div');
            content.className = 'relative p-1 bg-white rounded-lg shadow-lg cursor-pointer transition-transform duration-200 ease-out';
            content.style.borderWidth = isSelected ? '4px' : '0px';
            content.style.borderColor = isSelected ? '#3b82f6' : 'transparent';
        
            const size = isCluster ? (count > 50 ? 14 : count > 10 ? 12 : 10) : 10;
            const img = document.createElement('img');
            img.src = thumbUrl || asset.thumb;
            img.alt = asset.title;
            img.className = `h-${size} w-${size} rounded-md object-cover`;
            img.loading = 'lazy';
            content.appendChild(img);
        
            if (isCluster || isStacked) {
                const badgeCount = isCluster ? count : assets.length;
                const badge = document.createElement('div');
                badge.className = 'absolute -top-3 -right-3 h-7 w-7 bg-blue-600 text-white text-sm rounded-full flex items-center justify-center border-white font-semibold';
                badge.style.borderWidth = '2px';
                badge.textContent = `${badgeCount}`;
                content.appendChild(badge);
            } else if (isSingleSelected) { 
                const badge = document.createElement('div');
                badge.className = 'absolute -top-2 -right-2 h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center border-white';
                badge.style.borderWidth = '2px';
                badge.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" class="h-3.5 w-3.5"><path d="M20 6L9 17l-5-5" /></svg>`;
                content.appendChild(badge);
            }
        
            content.addEventListener('mouseover', () => { 
                content.style.transform = 'scale(1.1)';
                content.style.zIndex = '20';
            });
            content.addEventListener('mouseout', () => {
                 content.style.transform = 'scale(1)';
                 content.style.zIndex = isSelected ? '10' : '1';
            });
            
            return content;
        };
        
        const markers = Array.from(assetsByLocation.entries()).map(([key, assets]) => {
            const [lat, lng] = key.split(',').map(Number);
            const isStacked = assets.length > 1;
            const asset = assets[0];

            const markerContent = createMarkerContent(assets);
            const marker = new AdvancedMarkerElement({ position: { lat, lng }, content: markerContent, title: asset.title });

            marker.addListener('gmp-click', (e: MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                if (isStacked) {
                    setStackedModalAssets(assets);
                } else {
                    setModalAsset(asset);
                }
            });
            
            markerToAssetsMap.set(marker, assets);
            return marker;
        });

        const renderer = {
            render: ({ count, position, markers: clusterMarkers }: { count: number; position: any; markers: any[] }) => {
                if (!clusterMarkers || clusterMarkers.length === 0) return new AdvancedMarkerElement({ position });
                
                const totalAssetsInCluster = clusterMarkers.reduce((sum, marker) => {
                    const assetsForMarker = markerToAssetsMap.get(marker);
                    return sum + (assetsForMarker ? assetsForMarker.length : 1);
                }, 0);

                const firstMarkerAssets = markerToAssetsMap.get(clusterMarkers[0]);
                if (!firstMarkerAssets) return new AdvancedMarkerElement({ position });

                const firstAssetForThumbnail = firstMarkerAssets[0];

                const content = createMarkerContent([firstAssetForThumbnail], totalAssetsInCluster, firstAssetForThumbnail.thumb);
                
                return new AdvancedMarkerElement({ position, content, zIndex: totalAssetsInCluster });
            }
        };

        markerClustererRef.current = new window.markerClusterer.MarkerClusterer({ map, markers, renderer });

    }, [filteredAssets, assetPinMap, selectedAssetIds, isMapReady]);

    return (
        <div className="flex flex-row w-full h-full overflow-hidden bg-slate-100 rounded-2xl shadow-lg border border-slate-200">
            <div className="relative flex-grow">
                <div ref={mapRef} className="h-full w-full" />
                
                <div ref={searchContainerRef} className="absolute top-4 left-4 z-10 w-[450px] max-w-[calc(100%-5.5rem)]">
                    <div className={classNames("relative rounded-2xl bg-white shadow-lg border border-slate-200 transition-all duration-300", isSearchFocused && "ring-2 ring-blue-500")}>
                        <div className="flex items-center gap-2 p-2">
                            <SearchIcon className="h-5 w-5 text-slate-400 ml-2" />
                            <input
                                type="text"
                                placeholder="Search by title, tag, or description..."
                                className="w-full bg-transparent text-sm text-slate-800 outline-none"
                                onFocus={handleFocusSearch}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button onClick={handleToggleFilter} className={classNames("h-8 w-8 rounded-lg flex items-center justify-center transition", isFilterOpen ? "bg-blue-100 text-blue-600" : "hover:bg-slate-100 text-slate-500")}>
                                <FilterIcon className="h-4 w-4" />
                            </button>
                        </div>

                        {isFilterOpen && (
                            <div className="p-3 border-t border-slate-200 space-y-3">
                                 <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-500">FILTER ASSETS</span>
                                    <button onClick={() => { setFilter('Combined'); setShowRomanEmpire(false); }} className="text-xs font-medium text-blue-600 hover:underline">Reset</button>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {(['Combined', 'Global', 'Personal'] as const).map(f => (
                                        <button key={f} onClick={() => setFilter(f)} className={classNames("px-2 py-1.5 rounded-lg text-sm font-medium transition", filter === f ? "bg-blue-600 text-white shadow" : "bg-slate-100 text-slate-700 hover:bg-slate-200")}>
                                            {f}
                                        </button>
                                    ))}
                                </div>
                                 <button onClick={() => setShowRomanEmpire(!showRomanEmpire)} className={classNames("w-full flex items-center justify-center gap-2 px-2 py-1.5 rounded-lg text-sm font-medium transition", showRomanEmpire ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700 hover:bg-slate-200")}>
                                    <RomanHelmetIcon className="h-4 w-4" /> Thematic: Roman Empire
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    <button
                        onClick={handleZoomOut}
                        className="h-12 w-12 rounded-2xl bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition transform hover:scale-110 active:scale-95 active:duration-75"
                        aria-label="Zoom out map to overview"
                    >
                        <ZoomOutIcon />
                    </button>
                </div>
                
                {(modalAsset || stackedModalAssets || isCreateModalOpen) && (
                    <div 
                        className={classNames(
                            "absolute inset-0 bg-black/60 z-30 flex justify-center",
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
                    </div>
                )}
            </div>

            {selectedAssets.length > 0 && (
                <SelectionTray
                    selectedAssets={selectedAssets}
                    onDeselect={(id) => setSelectedAssetIds(prev => prev.filter(assetId => assetId !== id))}
                    onClear={() => setSelectedAssetIds([])}
                    onPreview={handlePreviewAsset}
                    onUse={handleOpenCreateModal}
                    onLocate={handleLocateAsset}
                />
            )}
        </div>
    );
};