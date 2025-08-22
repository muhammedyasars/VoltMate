'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import LoadingSpinner from '@/components/ui/loader';
import { useStationStore } from '@/store/station-store';

const CHARGER_TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'Type 2', label: 'Type 2' },
  { value: 'CCS', label: 'CCS' },
  { value: 'CHAdeMO', label: 'CHAdeMO' },
];

const SORT_OPTIONS = [
  { value: 'distance', label: 'Nearest' },
  { value: 'price', label: 'Price' },
  { value: 'rating', label: 'Rating' },
  { value: 'availability', label: 'Available' },
];

export default function StationsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  
  const { stations, loading, fetchStations } = useStationStore();

  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  const filteredStations = useMemo(() => {
    let filtered = stations.filter(station => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        station.name.toLowerCase().includes(searchLower) ||
        station.address.toLowerCase().includes(searchLower);
      const matchesType = filterType === 'all' || station.chargerType === filterType;
      return matchesSearch && matchesType;
    });

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
      
      {/* Simple Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Charging Stations</h1>
          <p className="text-gray-600">Find available charging stations near you</p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search stations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {CHARGER_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredStations.length} stations found
            {searchTerm && ` for "${searchTerm}"`}
          </div>
        </div>
      </section>

      {/* Stations List */}
      <section className="container mx-auto px-4 py-8">
        {filteredStations.length === 0 ? (
          <div className="text-center py-12">
            <i className="ri-charging-pile-2-line text-5xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No stations found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStations.map((station) => (
              <StationCard key={station.id} station={station} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// Simple Station Card Component
function StationCard({ station }: { station: any }) {
  const router = useRouter();
  
  return (
    <div 
      onClick={() => router.push(`/stations/${station.id}`)}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{station.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{station.address}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          station.available 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {station.available ? 'Available' : 'Busy'}
        </span>
      </div>
      
      {/* Details */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Type:</span>
          <span className="font-medium">{station.chargerType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Price:</span>
          <span className="font-medium">${station.price}/kWh</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Distance:</span>
          <span className="font-medium">{station.distance || '0'} km</span>
        </div>
        {station.rating && (
          <div className="flex justify-between">
            <span className="text-gray-600">Rating:</span>
            <span className="font-medium flex items-center">
              <i className="ri-star-fill text-yellow-500 mr-1"></i>
              {station.rating}
            </span>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="mt-4 pt-4 border-t flex justify-between items-center">
        <span className="text-sm text-gray-600">
          <i className="ri-charging-pile-line mr-1"></i>
          {station.totalSlots || 4} slots
        </span>
        <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
          View Details
          <i className="ri-arrow-right-line ml-1"></i>
        </button>
      </div>
    </div>
  );
}