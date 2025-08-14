'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loader';
import { useStationStore } from '@/store/station-store';
import { useAuthStore } from '@/store/auth-store';

export default function StationsPage() {
  const { user } = useAuthStore();
  const { stations, fetchManagerStations } = useStationStore();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'occupied' | 'maintenance'>('all');

  useEffect(() => {
    const loadStations = async () => {
      try {
        if (user?.id) {
          await fetchManagerStations(user.id);
        }
      } catch (error) {
        console.error('Failed to load stations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStations();
  }, [user, fetchManagerStations]);

  const filteredStations = stations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (station.address?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesStatus = statusFilter === 'all' || station.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Charging Stations</h1>
          <p className="text-gray-600">Manage all your charging stations in one place</p>
        </div>
        <Link href="/manager/stations/new">
          <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
            <i className="ri-add-line mr-2"></i>
            Add New Station
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Stations</p>
              <p className="text-2xl font-bold text-gray-900">{stations.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-charging-pile-2-line text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-900">
                {stations.filter(s => s.status === 'available').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-checkbox-circle-line text-green-600 text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Occupied</p>
              <p className="text-2xl font-bold text-gray-900">
                {stations.filter(s => s.status === 'occupied').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-yellow-600 text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Maintenance</p>
              <p className="text-2xl font-bold text-gray-900">
                {stations.filter(s => s.status === 'maintenance').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-tools-line text-red-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                statusFilter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('available')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                statusFilter === 'available'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Available
            </button>
            <button
              onClick={() => setStatusFilter('occupied')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                statusFilter === 'occupied'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Occupied
            </button>
            <button
              onClick={() => setStatusFilter('maintenance')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                statusFilter === 'maintenance'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Maintenance
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search stations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </div>

      {/* Stations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStations.map((station) => (
          <div key={station.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{station.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{station.address || 'No address provided'}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  station.status === 'available' 
                    ? 'bg-green-100 text-green-700' 
                    : station.status === 'occupied' 
                    ? 'bg-yellow-100 text-yellow-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  <i className={`mr-1 ${
                    station.status === 'available' 
                      ? 'ri-checkbox-circle-line' 
                      : station.status === 'occupied' 
                      ? 'ri-time-line' 
                      : 'ri-tools-line'
                  }`}></i>
                  {station.status.charAt(0).toUpperCase() + station.status.slice(1)}
                </span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm">
                  <i className="ri-plug-line text-gray-400 mr-2"></i>
                  <span className="text-gray-600">Type: {station.chargerType || 'Standard'}</span>
                </div>
                <div className="flex items-center text-sm">
                  <i className="ri-flashlight-line text-gray-400 mr-2"></i>
                  <span className="text-gray-600">Power: {station.power || '50'} kW</span>
                </div>
                <div className="flex items-center text-sm">
                  <i className="ri-money-dollar-circle-line text-gray-400 mr-2"></i>
                  <span className="text-gray-600">Rate: ${station.pricePerHour || '10'}/hour</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Link href={`/manager/stations/${station.id}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-gray-200 text-gray-600 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200"
                  >
                    <i className="ri-eye-line mr-2"></i>
                    View Details
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  <i className="ri-settings-3-line"></i>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredStations.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-100">
          <i className="ri-charging-pile-2-line text-gray-400 text-4xl mb-4"></i>
          <p className="text-gray-500 mb-4">No stations found</p>
          <Link href="/manager/stations/new">
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
              <i className="ri-add-line mr-2"></i>
              Add Your First Station
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}