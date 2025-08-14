'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/admin-sidebar';
import LoadingSpinner from '@/components/ui/loader';
import Link from 'next/link';

interface Station {
  id: string;
  name: string;
  location: string;
  address: string;
  status: 'online' | 'offline' | 'maintenance';
  totalChargers: number;
  availableChargers: number;
  manager: string;
  revenue: number;
  utilization: number;
  rating: number;
}

export default function AdminStationsPage() {
  const [loading, setLoading] = useState(true);
  const [stations, setStations] = useState<Station[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    setTimeout(() => {
      const mockStations: Station[] = Array.from({ length: 48 }, (_, i) => ({
        id: `STN${1000 + i}`,
        name: `Charging Station ${i + 1}`,
        location: ['Downtown', 'Airport', 'Mall', 'Highway', 'Residential'][Math.floor(Math.random() * 5)],
        address: `${Math.floor(Math.random() * 9999) + 1} Main St, City, State`,
        status: ['online', 'offline', 'maintenance'][Math.floor(Math.random() * 3)] as Station['status'],
        totalChargers: Math.floor(Math.random() * 8) + 2,
        availableChargers: Math.floor(Math.random() * 5),
        manager: `Manager ${Math.floor(Math.random() * 20) + 1}`,
        revenue: Math.floor(Math.random() * 50000) + 10000,
        utilization: Math.floor(Math.random() * 100),
        rating: Math.random() * 2 + 3
      }));
      setStations(mockStations);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredStations = stations
    .filter(station => {
      const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           station.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || station.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'revenue': return b.revenue - a.revenue;
        case 'utilization': return b.utilization - a.utilization;
        case 'rating': return b.rating - a.rating;
        default: return 0;
      }
    });

  const getStatusIcon = (status: Station['status']) => {
    const icons = {
      online: 'ri-wifi-line text-green-600',
      offline: 'ri-wifi-off-line text-red-600',
      maintenance: 'ri-tools-line text-yellow-600'
    };
    return icons[status];
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1">
        <div className="container py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Charging Stations</h1>
              <p className="text-gray-600 mt-2">Monitor and manage all charging stations</p>
            </div>
            <div className="flex items-center space-x-4">
                           <button className="bg-white px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center">
                <i className="ri-map-pin-line mr-2"></i>
                View Map
              </button>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center">
                <i className="ri-add-line mr-2"></i>
                Add Station
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Stations</p>
                  <p className="text-2xl font-bold text-gray-900">{stations.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-charging-pile-2-line text-blue-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Online</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stations.filter(s => s.status === 'online').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-wifi-line text-green-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Offline</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stations.filter(s => s.status === 'offline').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-wifi-off-line text-red-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Maintenance</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stations.filter(s => s.status === 'maintenance').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <i className="ri-tools-line text-yellow-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Avg Utilization</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(stations.reduce((sum, s) => sum + s.utilization, 0) / stations.length)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="ri-percent-line text-purple-600 text-xl"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Search stations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="maintenance">Maintenance</option>
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="revenue">Sort by Revenue</option>
                <option value="utilization">Sort by Utilization</option>
                <option value="rating">Sort by Rating</option>
              </select>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                >
                  <i className="ri-grid-fill"></i>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                >
                  <i className="ri-list-unordered"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Stations Display */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStations.map((station) => (
                <div key={station.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{station.name}</h3>
                        <p className="text-sm text-gray-500">{station.location}</p>
                      </div>
                      <i className={`text-2xl ${getStatusIcon(station.status)}`}></i>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Chargers</span>
                        <span className="font-medium">
                          {station.availableChargers}/{station.totalChargers} available
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Utilization</span>
                        <span className="font-medium">{station.utilization}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Monthly Revenue</span>
                        <span className="font-medium">${station.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Rating</span>
                        <div className="flex items-center">
                          <i className="ri-star-fill text-yellow-400 mr-1"></i>
                          <span className="font-medium">{station.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <p className="text-gray-500">Managed by</p>
                          <p className="font-medium text-gray-900">{station.manager}</p>
                        </div>
                        <Link
                          href={`/dashboard/admin/stations/${station.id}`}
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Station
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chargers
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Utilization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStations.map((station) => (
                    <tr key={station.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{station.name}</div>
                          <div className="text-sm text-gray-500">{station.location}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <i className={`mr-2 ${getStatusIcon(station.status)}`}></i>
                          <span className="text-sm capitalize">{station.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {station.availableChargers}/{station.totalChargers}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-primary-600 h-2 rounded-full"
                              style={{ width: `${station.utilization}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{station.utilization}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        ${station.revenue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link
                          href={`/dashboard/admin/stations/${station.id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}