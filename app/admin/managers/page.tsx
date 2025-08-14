'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/admin-sidebar';
import LoadingSpinner from '@/components/ui/loader';
import Link from 'next/link';

interface Manager {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Station Manager' | 'Regional Manager' | 'Operations Manager';
  assignedStations: number;
  status: 'active' | 'inactive';
  joinDate: string;
  performance: number;
}

export default function AdminManagersPage() {
  const [loading, setLoading] = useState(true);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    setTimeout(() => {
          const mockManagers: Manager[] = Array.from({ length: 20 }, (_, i) => ({
        id: `MGR${1000 + i}`,
        name: `Manager ${i + 1}`,
        email: `manager${i + 1}@evcharge.com`,
        phone: `+1 555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        role: ['Station Manager', 'Regional Manager', 'Operations Manager'][Math.floor(Math.random() * 3)] as Manager['role'],
        assignedStations: Math.floor(Math.random() * 10) + 1,
        status: Math.random() > 0.2 ? 'active' : 'inactive' as Manager['status'],
        joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        performance: Math.floor(Math.random() * 40) + 60
      }));
      setManagers(mockManagers);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredManagers = managers.filter(manager => {
    const matchesSearch = manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || manager.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getPerformanceBadge = (performance: number) => {
    if (performance >= 90) return { color: 'text-green-600 bg-green-100', label: 'Excellent' };
    if (performance >= 75) return { color: 'text-blue-600 bg-blue-100', label: 'Good' };
    if (performance >= 60) return { color: 'text-yellow-600 bg-yellow-100', label: 'Average' };
    return { color: 'text-red-600 bg-red-100', label: 'Needs Improvement' };
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
              <h1 className="text-3xl font-bold text-gray-900">Managers</h1>
              <p className="text-gray-600 mt-2">Manage station and regional managers</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
            >
              <i className="ri-user-add-line mr-2"></i>
              Add Manager
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Managers</p>
                  <p className="text-2xl font-bold text-gray-900">{managers.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="ri-user-settings-line text-purple-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Active Managers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {managers.filter(m => m.status === 'active').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-user-follow-line text-green-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Avg Performance</p>
                  <p className="text-2xl font-bold text-gray-900">82%</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-bar-chart-line text-blue-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Stations</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {managers.reduce((sum, m) => sum + m.assignedStations, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="ri-charging-pile-2-line text-orange-600 text-xl"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Search managers..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="Station Manager">Station Manager</option>
                <option value="Regional Manager">Regional Manager</option>
                <option value="Operations Manager">Operations Manager</option>
              </select>
            </div>
          </div>

          {/* Managers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredManagers.map((manager) => {
              const performanceData = getPerformanceBadge(manager.performance);
              return (
                <div key={manager.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <i className="ri-user-line text-gray-600 text-xl"></i>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-gray-900">{manager.name}</h3>
                        <p className="text-sm text-gray-500">{manager.role}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      manager.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {manager.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <i className="ri-mail-line text-gray-400 mr-2"></i>
                      <span className="text-gray-600">{manager.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <i className="ri-phone-line text-gray-400 mr-2"></i>
                      <span className="text-gray-600">{manager.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <i className="ri-charging-pile-2-line text-gray-400 mr-2"></i>
                      <span className="text-gray-600">{manager.assignedStations} stations</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Performance</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${performanceData.color}`}>
                        {performanceData.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          manager.performance >= 90 ? 'bg-green-500' :
                          manager.performance >= 75 ? 'bg-blue-500' :
                          manager.performance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${manager.performance}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{manager.performance}% overall rating</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      href={`/dashboard/admin/managers/${manager.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      View Details
                    </Link>
                    <button className="text-gray-400 hover:text-gray-600">
                      <i className="ri-more-2-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}