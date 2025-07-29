'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import AdminSidebar from '@/components/layout/admin-sidebar';
import Button from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loader';
import { useStationStore } from '@/store/station-store';
import { useToast } from '@/hooks/use-toast';
import { ToastContainer } from '@/components/ui/Toast';
import Link from 'next/link';

export default function AdminStationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [stationToDelete, setStationToDelete] = useState<string | null>(null);
  
  const { stations, loading, fetchStations, deleteStation } = useStationStore();
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    fetchStations();
  }, []);

  const handleSort = (field: string) => {
    if (field === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const filteredStations = stations.filter(station => {
    const matchesSearch = 
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || station.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const sortedStations = [...filteredStations].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleDeleteConfirmation = (id: string) => {
    setStationToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteStation = async () => {
    if (!stationToDelete) return;
    
    try {
      await deleteStation(stationToDelete);
      addToast('Station deleted successfully', 'success');
      setShowDeleteModal(false);
      setStationToDelete(null);
    } catch (error) {
      addToast('Failed to delete station', 'error');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'occupied':
        return 'bg-yellow-500';
      case 'maintenance':
        return 'bg-orange-500';
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const renderSortIcon = (field: string) => {
    if (field !== sortBy) return <i className="ri-arrow-up-down-line ml-1 text-gray-400"></i>;
    return sortDirection === 'asc' 
      ? <i className="ri-arrow-up-line ml-1 text-primary-500"></i>
      : <i className="ri-arrow-down-line ml-1 text-primary-500"></i>;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div className="flex-1">
        <Header />
        
        <div className="container py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Station Management</h1>
            <Button onClick={() => setShowCreateModal(true)}>
              <i className="ri-add-line mr-2"></i>
              Add New Station
            </Button>
          </div>
          
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="relative">
                  <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Search stations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Statuses</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
                <option value="offline">Offline</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="name">Sort by Name</option>
                <option value="address">Sort by Location</option>
                <option value="powerOutput">Sort by Power Output</option>
                <option value="status">Sort by Status</option>
              </select>
            </div>
          </div>
          
          {/* Stations Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-16 flex justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th 
                        className="px-6 py-3 border-b border-gray-200 cursor-pointer"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center">
                          Name
                          {renderSortIcon('name')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 border-b border-gray-200 cursor-pointer"
                        onClick={() => handleSort('address')}
                      >
                        <div className="flex items-center">
                          Location
                          {renderSortIcon('address')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 border-b border-gray-200 cursor-pointer"
                        onClick={() => handleSort('powerOutput')}
                      >
                        <div className="flex items-center">
                          Power Output
                          {renderSortIcon('powerOutput')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 border-b border-gray-200 cursor-pointer"
                        onClick={() => handleSort('chargerType')}
                      >
                        <div className="flex items-center">
                          Type
                          {renderSortIcon('chargerType')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 border-b border-gray-200 cursor-pointer"
                        onClick={() => handleSort('status')}
                      >
                        <div className="flex items-center">
                          Status
                          {renderSortIcon('status')}
                        </div>
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedStations.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                          No stations found
                        </td>
                      </tr>
                    ) : (
                      sortedStations.map(station => (
                        <tr key={station.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                  <i className="ri-charging-pile-2-line text-primary-600"></i>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{station.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{station.address}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{station.powerOutput}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{station.chargerType}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="flex items-center">
                              <span className={`h-2 w-2 rounded-full mr-2 ${getStatusColor(station.status)}`}></span>
                              <span className="text-sm">{
                                station.status.charAt(0).toUpperCase() + station.status.slice(1)
                              }</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              <Link href={`/dashboard/admin/stations/edit/${station.id}`}>
                                <button className="text-primary-600 hover:text-primary-900">
                                  <i className="ri-edit-line"></i>
                                </button>
                              </Link>
                              <Link href={`/stations/${station.id}`}>
                                <button className="text-blue-600 hover:text-blue-900">
                                  <i className="ri-eye-line"></i>
                                </button>
                              </Link>
                              <button
                                onClick={() => handleDeleteConfirmation(station.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <i className="ri-delete-bin-line"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDeleteModal(false)}></div>
          <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 mx-4">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-delete-bin-line text-3xl text-red-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Delete Station</h3>
              <p className="text-gray-600 mt-1">
                Are you sure you want to delete this station? This action cannot be undone.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={() => setShowDeleteModal(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteStation}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Delete Station
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Create Station Modal would go here */}
    </div>
  );
}