'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import StationCard from '@/components/cards/station-card';
import LoadingSpinner from '@/components/ui/loader';
import { useStationStore } from '@/store/station-store';
// import AnimatedBackground from '@/components/AnimatedBackground';

// Constants
const CHARGER_TYPES = [
  { value: 'all', label: 'All Types', icon: 'ri-plug-line' },
  { value: 'Type 2', label: 'Type 2', icon: 'ri-plug-2-line' },
  { value: 'CCS', label: 'CCS', icon: 'ri-flashlight-line' },
  { value: 'CHAdeMO', label: 'CHAdeMO', icon: 'ri-charging-pile-line' },
] as const;

const SORT_OPTIONS = [
  { value: 'distance', label: 'Nearest First', icon: 'ri-map-pin-line' },
  { value: 'price', label: 'Lowest Price', icon: 'ri-money-dollar-circle-line' },
  { value: 'rating', label: 'Highest Rated', icon: 'ri-star-line' },
  { value: 'availability', label: 'Available Now', icon: 'ri-checkbox-circle-line' },
] as const;

type SortOption = typeof SORT_OPTIONS[number]['value'];
type ChargerType = typeof CHARGER_TYPES[number]['value'];

// Debounce utility
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function StationsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<ChargerType>('all');
  const [sortBy, setSortBy] = useState<SortOption>('distance');
  const [isMapView, setIsMapView] = useState(false);
  
  const { stations, loading, fetchStations } = useStationStore();

  // Fetch stations on mount
  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  // Memoized filtered and sorted stations
  const processedStations = useMemo(() => {
    let filtered = stations.filter(station => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        station.name.toLowerCase().includes(searchLower) ||
        station.address.toLowerCase().includes(searchLower);
      const matchesType = filterType === 'all' || station.chargerType === filterType;
      return matchesSearch && matchesType;
    });

    // Sort stations based on selected criteria
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return (a.distance || 0) - (b.distance || 0);
        case 'price':
          return (a.price || 0) - (b.price || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'availability':
          return (b.available ? 1 : 0) - (a.available ? 1 : 0);
        default:
          return 0;
      }
    });
  }, [stations, searchTerm, filterType, sortBy]);

  // Handle station selection
  const handleStationSelect = useCallback((stationId: string) => {
    router.push(`/stations/${stationId}`);
  }, [router]);

  // Loading state
  if (loading && stations.length === 0) {
    return (
      <div className="min-h-screen relative bg-gray-50">
        {/* <AnimatedBackground /> */}
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gray-50">
      {/* <AnimatedBackground /> */}
      <Header />
      
      {/* Hero Section with matching theme */}
      <section className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-8">
              <span className="text-green-400 text-sm font-medium">
                <i className="ri-map-pin-2-line mr-2"></i>
                Real-time Station Availability
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your Nearest
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Charging Station
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Discover available charging stations with real-time updates, pricing, and route planning
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters Section with enhanced styling */}
      <section className="relative z-10 -mt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Search Input */}
              <div className="md:col-span-5">
                <div className="relative group">
                  <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors"></i>
                  <input
                    type="text"
                    placeholder="Search by station name..."
                    onChange={(e) => debouncedSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                             focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-400"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity duration-300 -z-10"></div>
                </div>
              </div>
              
              {/* Charger Type Filter */}
              <div className="md:col-span-3">
                <div className="relative">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as ChargerType)}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                             hover:bg-white transition-all duration-300 cursor-pointer appearance-none text-gray-700"
                  >
                    {CHARGER_TYPES.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <i className="ri-arrow-down-s-line absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
              </div>
              
              {/* Sort Options */}
              <div className="md:col-span-3">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                             hover:bg-white transition-all duration-300 cursor-pointer appearance-none text-gray-700"
                  >
                    {SORT_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <i className="ri-arrow-down-s-line absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
              </div>

              {/* View Toggle */}
              <div className="md:col-span-1 flex items-center justify-end">
                <button
                  onClick={() => setIsMapView(!isMapView)}
                  className="p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl 
                           hover:from-green-100 hover:to-green-200 transition-all duration-300 group"
                  aria-label={isMapView ? 'Switch to list view' : 'Switch to map view'}
                >
                  <i className={`${isMapView ? 'ri-list-unordered' : 'ri-map-2-line'} 
                    text-lg text-green-600 group-hover:scale-110 transition-transform`}></i>
                </button>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <p className="text-gray-600">
                  Found <span className="font-bold text-gray-900 text-lg">{processedStations.length}</span> stations
                  {searchTerm && <span className="text-gray-500"> matching "{searchTerm}"</span>}
                </p>
                {loading && (
                  <div className="flex items-center text-sm text-green-600">
                    <i className="ri-refresh-line animate-spin mr-2"></i>
                    <span>Updating...</span>
                  </div>
                )}
              </div>
              
              {/* Quick Stats */}
              <div className="hidden md:flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">
                    {processedStations.filter(s => s.available).length} Available
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-star-fill text-yellow-500"></i>
                  <span className="text-sm text-gray-600">
                    {processedStations.filter(s => (s.rating || 0) >= 4).length} Top Rated
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with enhanced background */}
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map View */}
            <div className={`${isMapView ? 'block' : 'hidden lg:block'} bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 h-[700px] border border-gray-100`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Station Locations</h3>
                <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                  <i className="ri-fullscreen-line mr-1"></i>
                  Fullscreen
                </button>
              </div>
              <div className="w-full h-[calc(100%-3rem)] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* Placeholder Map */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                  }}></div>
                </div>
                <div className="text-center relative z-10">
                  <i className="ri-map-pin-line text-6xl text-green-500 mb-4"></i>
                  <p className="text-gray-700 font-semibold text-lg">Interactive Map</p>
                  <p className="text-sm text-gray-500 mt-2">Map integration coming soon</p>
                </div>
              </div>
            </div>
            {/* Stations List - continued */}
            <div className={`${!isMapView ? 'block' : 'hidden lg:block'} space-y-4`}>
              {processedStations.length === 0 ? (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-16 text-center shadow-xl border border-gray-100">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl blur-3xl"></div>
                    <i className="ri-charging-pile-2-line text-6xl text-gray-300 mb-4 relative z-10"></i>
                    <h3 className="text-2xl font-bold text-gray-700 mb-2 relative z-10">
                      No Stations Found
                    </h3>
                    <p className="text-gray-500 mb-6 relative z-10">
                      Try adjusting your search criteria or filters
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setFilterType('all');
                      }}
                      className="relative z-10 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg 
                               hover:from-green-700 hover:to-green-800 transition-all duration-300 font-medium
                               transform hover:scale-105 shadow-lg"
                    >
                      <i className="ri-refresh-line mr-2"></i>
                      Clear Filters
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* List Header */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Available Stations
                      </h3>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-600">Available</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-gray-600">Occupied</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stations List with enhanced cards */}
                  <div className="max-h-[600px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                    {processedStations.map((station, index) => (
                      <div
                        key={station.id}
                        onClick={() => handleStationSelect(station.id)}
                        className="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        <div className="relative">
                          {/* Card Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 
                                        opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                          
                          {/* Enhanced Station Card */}
                          <div className="relative bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 
                                        group-hover:border-green-500/30 group-hover:shadow-2xl transition-all duration-300 p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                                  {station.name}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1 flex items-center">
                                  <i className="ri-map-pin-line mr-1"></i>
                                  {station.address}
                                </p>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                station.available 
                                  ? 'bg-green-100 text-green-700 border border-green-200' 
                                  : 'bg-red-100 text-red-700 border border-red-200'
                              }`}>
                                {station.available ? 'Available' : 'Occupied'}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div className="text-center p-3 bg-gray-50 rounded-lg group-hover:bg-green-50 transition-colors">
                                <i className="ri-flashlight-line text-green-600 text-lg mb-1"></i>
                                <p className="text-xs text-gray-600">Type</p>
                                <p className="text-sm font-semibold text-gray-900">{station.chargerType}</p>
                              </div>
                              <div className="text-center p-3 bg-gray-50 rounded-lg group-hover:bg-green-50 transition-colors">
                                <i className="ri-money-dollar-circle-line text-green-600 text-lg mb-1"></i>
                                <p className="text-xs text-gray-600">Price</p>
                                <p className="text-sm font-semibold text-gray-900">${station.price}/kWh</p>
                              </div>
                              <div className="text-center p-3 bg-gray-50 rounded-lg group-hover:bg-green-50 transition-colors">
                                <i className="ri-star-line text-yellow-500 text-lg mb-1"></i>
                                <p className="text-xs text-gray-600">Rating</p>
                                <p className="text-sm font-semibold text-gray-900">{station.rating || 'N/A'}</p>
                              </div>
                              <div className="text-center p-3 bg-gray-50 rounded-lg group-hover:bg-green-50 transition-colors">
                                <i className="ri-route-line text-green-600 text-lg mb-1"></i>
                                <p className="text-xs text-gray-600">Distance</p>
                                <p className="text-sm font-semibold text-gray-900">{station.distance || '0'} km</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span className="flex items-center">
                                  <i className="ri-charging-pile-line mr-1"></i>
                                  {station.totalSlots || 4} Slots
                                </span>
                                <span className="flex items-center">
                                  <i className="ri-time-line mr-1"></i>
                                  24/7
                                </span>
                              </div>
                              <button className="text-green-600 hover:text-green-700 font-medium text-sm 
                                               flex items-center group-hover:translate-x-1 transition-transform">
                                View Details
                                <i className="ri-arrow-right-line ml-1"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
            <span className="text-green-400 text-sm font-medium">
              <i className="ri-smartphone-line mr-2"></i>
              Mobile App Available
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Can't find a suitable station?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Download our mobile app for advanced features and notifications
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-lg 
                           hover:bg-gray-100 transition-all duration-300 font-medium shadow-lg
                           transform hover:scale-105">
              <i className="ri-apple-fill text-2xl mr-3"></i>
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </button>
            <button className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-lg 
                           hover:bg-gray-100 transition-all duration-300 font-medium shadow-lg
                           transform hover:scale-105">
              <i className="ri-google-play-fill text-2xl mr-3"></i>
              <div className="text-left">
                <div className="text-xs">Get it on</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}