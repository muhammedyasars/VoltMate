'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import StationCard from '@/components/cards/station-card';
import LoadingSpinner from '@/components/ui/loader';
import { useStationStore } from '@/store/station-store';

// Constants
const CHARGER_TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'Type 2', label: 'Type 2' },
  { value: 'CCS', label: 'CCS' },
  { value: 'CHAdeMO', label: 'CHAdeMO' },
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
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Find EV Charging Stations
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Locate available charging stations near you with real-time availability
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="container -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-5">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search by location or station name..."
                  onChange={(e) => debouncedSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                           transition-all duration-200"
                />
              </div>
            </div>
            
            {/* Charger Type Filter */}
            <div className="md:col-span-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as ChargerType)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                         transition-all duration-200 cursor-pointer"
              >
                {CHARGER_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Sort Options */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                         transition-all duration-200 cursor-pointer"
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="md:col-span-1 flex items-center justify-end">
              <button
                onClick={() => setIsMapView(!isMapView)}
                className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 
                         transition-colors duration-200 group"
                aria-label={isMapView ? 'Switch to list view' : 'Switch to map view'}
              >
                <i className={`${isMapView ? 'ri-list-unordered' : 'ri-map-2-line'} 
                  text-lg group-hover:text-primary-600 transition-colors`}></i>
              </button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Found <span className="font-semibold">{processedStations.length}</span> stations
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
            {loading && (
              <div className="flex items-center text-sm text-gray-500">
                <i className="ri-refresh-line animate-spin mr-2"></i>
                Updating...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map View */}
          <div className={`${isMapView ? 'block' : 'hidden lg:block'} bg-white rounded-xl shadow-sm p-4 h-[600px]`}>
            <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <i className="ri-map-pin-line text-6xl text-gray-300 mb-4"></i>
                <p className="text-gray-500 font-medium">Interactive Map</p>
                <p className="text-sm text-gray-400 mt-2">Map integration coming soon</p>
              </div>
            </div>
          </div>

          {/* Stations List */}
          <div className={`${!isMapView ? 'block' : 'hidden lg:block'} space-y-4`}>
            {processedStations.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <i className="ri-charging-pile-2-line text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Stations Found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search criteria or filters
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                  }}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {processedStations.map((station) => (
                  <div
                    key={station.id}
                    onClick={() => handleStationSelect(station.id)}
                    className="cursor-pointer transform transition-transform duration-200 hover:scale-[1.02]"
                  >
                    <StationCard station={station} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}