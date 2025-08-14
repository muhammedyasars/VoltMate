'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/layout/admin-sidebar';
import LoadingSpinner from '@/components/ui/loader';
import Link from 'next/link';

interface ManagerDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Station Manager' | 'Regional Manager' | 'Operations Manager';
  joinDate: string;
  status: 'active' | 'inactive';
  performance: number;
  assignedStations: Array<{
    id: string;
    name: string;
    location: string;
    status: 'online' | 'offline' | 'maintenance';
    utilization: number;
  }>;
  metrics: {
    totalRevenue: number;
    avgStationRating: number;
    avgUtilization: number;
    reportedIssues: number;
    resolvedIssues: number;
  };
  recentActivity: Array<{
    id: string;
    date: string;
    action: string;
    stationId?: string;
    stationName?: string;
  }>;
}

export default function ManagerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [manager, setManager] = useState<ManagerDetail | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setTimeout(() => {
      setManager({
        id: params.id as string,
        name: 'Alex Rodriguez',
        email: 'alex.rodriguez@evcharge.com',
        phone: '+1 555-7890',
        role: 'Regional Manager',
        joinDate: '2023-06-15T00:00:00Z',
        status: 'active',
        performance: 87,
        assignedStations: Array.from({ length: 6 }, (_, i) => ({
          id: `STN${1000 + i}`,
          name: `Charging Station ${i + 1}`,
          location: ['Downtown', 'Airport', 'Mall', 'Highway', 'Residential'][Math.floor(Math.random() * 5)],
          status: ['online', 'offline', 'maintenance'][Math.floor(Math.random() * 3)] as ManagerDetail['assignedStations'][0]['status'],
          utilization: Math.floor(Math.random() * 100)
        })),
        metrics: {
          totalRevenue: 78450,
          avgStationRating: 4.6,
          avgUtilization: 72,
          reportedIssues: 24,
          resolvedIssues: 21
        },
        recentActivity: Array.from({ length: 8 }, (_, i) => {
          const actionTypes = [
            'Updated station details',
            'Resolved maintenance issue',
            'Added new charger',
            'Reviewed station performance',
            'Responded to customer complaint',
            'Scheduled maintenance'
          ];
          return {
            id: `ACT${1000 + i}`,
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            action: actionTypes[Math.floor(Math.random() * actionTypes.length)],
            stationId: `STN${1000 + Math.floor(Math.random() * 6)}`,
            stationName: `Charging Station ${Math.floor(Math.random() * 6) + 1}`
          };
        })
      });
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const getPerformanceBadge = (performance: number) => {
    if (performance >= 90) return { color: 'text-green-600 bg-green-100', label: 'Excellent' };
    if (performance >= 75) return { color: 'text-blue-600 bg-blue-100', label: 'Good' };
    if (performance >= 60) return { color: 'text-yellow-600 bg-yellow-100', label: 'Average' };
    return { color: 'text-red-600 bg-red-100', label: 'Needs Improvement' };
  };

  if (loading) return <LoadingSpinner />;
  if (!manager) return <div>Manager not found</div>;

  const performanceData = getPerformanceBadge(manager.performance);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1">
        <div className="container py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900 mb-4 flex items-center"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Back to Managers
            </button>
            
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mr-6">
                  <i className="ri-user-settings-line text-purple-600 text-3xl"></i>
                </div>
                <div>
                  <div className="flex items-center">
                    <h1 className="text-3xl font-bold text-gray-900">{manager.name}</h1>
                    <span className={`ml-4 px-3 py-1 text-sm font-medium rounded-full ${
                      manager.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {manager.status}
                    </span>
                  </div>
                  <p className="text-gray-600">{manager.role}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${performanceData.color}`}>
                      {performanceData.label} Performance
                    </span>
                    <span className="text-sm text-gray-500">
                      Since {new Date(manager.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <i className="ri-mail-line mr-2"></i>
                  Contact
                </button>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center">
                  <i className="ri-edit-line mr-2"></i>
                  Edit Profile
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <i className="ri-more-2-fill text-xl"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Stations</p>
                  <p className="text-2xl font-bold text-gray-900">{manager.assignedStations.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-charging-pile-2-line text-blue-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Avg. Utilization</p>
                  <p className="text-2xl font-bold text-gray-900">{manager.metrics.avgUtilization}%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-percent-line text-green-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${manager.metrics.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <i className="ri-money-dollar-circle-line text-emerald-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Issues Resolved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {manager.metrics.resolvedIssues}/{manager.metrics.reportedIssues}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="ri-tools-line text-purple-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Avg. Rating</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900 mr-2">{manager.metrics.avgStationRating}</p>
                    <i className="ri-star-fill text-yellow-400"></i>
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <i className="ri-star-line text-yellow-600 text-xl"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                {['overview', 'stations', 'performance', 'activity'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-medium capitalize ${
                      activeTab === tab
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <i className="ri-mail-line text-gray-400 mr-3"></i>
                        <span className="text-gray-600">{manager.email}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-phone-line text-gray-400 mr-3"></i>
                        <span className="text-gray-600">{manager.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-user-settings-line text-gray-400 mr-3"></i>
                        <span className="text-gray-600">Role: {manager.role}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Performance Overview</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Overall Performance</span>
                          <span className="text-sm font-medium">{manager.performance}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              manager.performance >= 90 ? 'bg-green-500' :
                              manager.performance >= 75 ? 'bg-blue-500' :
                              manager.performance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${manager.performance}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Issue Resolution</span>
                          <span className="text-sm font-medium">
                            {Math.round((manager.metrics.resolvedIssues / manager.metrics.reportedIssues) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-500 h-2.5 rounded-full"
                            style={{ width: `${(manager.metrics.resolvedIssues / manager.metrics.reportedIssues) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Station Utilization</span>
                          <span className="text-sm font-medium">{manager.metrics.avgUtilization}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: `${manager.metrics.avgUtilization}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Assigned Stations</h3>
                    <div className="space-y-3">
                      {manager.assignedStations.map((station) => (
                        <Link
                          href={`/dashboard/admin/stations/${station.id}`}
                          key={station.id}
                          className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium text-gray-900">{station.name}</div>
                              <div className="text-sm text-gray-500">{station.location}</div>
                            </div>
                            <div className="flex items-center">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                station.status === 'online' ? 'bg-green-100 text-green-800' :
                                station.status === 'offline' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {station.status}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="flex justify-between mb-1">
                              <span className="text-xs text-gray-500">Utilization</span>
                              <span className="text-xs text-gray-500">{station.utilization}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full ${
                                  station.utilization > 75 ? 'bg-green-500' :
                                  station.utilization > 50 ? 'bg-blue-500' :
                                  station.utilization > 25 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${station.utilization}%` }}
                              ></div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'stations' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Managed Stations</h3>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center">
                      <i className="ri-add-line mr-2"></i>
                      Assign Station
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {manager.assignedStations.map((station) => (
                      <div key={station.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className={`h-2 ${
                          station.status === 'online' ? 'bg-green-500' :
                          station.status === 'offline' ? 'bg-red-500' :
                          'bg-yellow-500'
                        }`}></div>
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-semibold text-gray-900">{station.name}</h4>
                              <p className="text-sm text-gray-500">{station.location}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              station.status === 'online' ? 'bg-green-100 text-green-800' :
                              station.status === 'offline' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {station.status}
                            </span>
                          </div>
                          
                          <div className="space-y-3 mb-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-gray-600">Utilization</span>
                                <span className="text-sm font-medium">{station.utilization}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    station.utilization > 75 ? 'bg-green-500' :
                                    station.utilization > 50 ? 'bg-blue-500' :
                                    station.utilization > 25 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${station.utilization}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <Link
                              href={`/dashboard/admin/stations/${station.id}`}
                              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                            >
                              View Details
                            </Link>
                            <button className="text-gray-400 hover:text-gray-600">
                              <i className="ri-more-2-fill"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                        <i className="ri-add-line text-gray-400 text-xl"></i>
                      </div>
                      <p className="text-gray-600 mb-2">Assign a new station</p>
                      <button className="text-primary-600 hover:text-primary-700 font-medium">
                        Add Station
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'performance' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="space-y-6">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-gray-600">Overall Performance</span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${performanceData.color}`}>
                                {performanceData.label}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className={`h-3 rounded-full ${
                                  manager.performance >= 90 ? 'bg-green-500' :
                                  manager.performance >= 75 ? 'bg-blue-500' :
                                  manager.performance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${manager.performance}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-xs text-gray-500">0%</span>
                              <span className="text-xs text-gray-500">100%</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white rounded-lg border border-gray-200">
                              <div className="text-center">
                                <p className="text-sm text-gray-500 mb-1">Issue Resolution Rate</p>
                                <p className="text-3xl font-bold text-gray-900">
                                  {Math.round((manager.metrics.resolvedIssues / manager.metrics.reportedIssues) * 100)}%
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                  +5% from last month
                                </p>
                              </div>
                            </div>
                            
                            <div className="p-4 bg-white rounded-lg border border-gray-200">
                              <div className="text-center">
                                <p className="text-sm text-gray-500 mb-1">Avg. Response Time</p>
                                <p className="text-3xl font-bold text-gray-900">
                                  4.2h
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                  -0.8h from last month
                                </p>
                              </div>
                            </div>
                            
                            <div className="p-4 bg-white rounded-lg border border-gray-200">
                              <div className="text-center">
                                <p className="text-sm text-gray-500 mb-1">Station Uptime</p>
                                <p className="text-3xl font-bold text-gray-900">
                                  98.2%
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                  +0.5% from last month
                                </p>
                              </div>
                            </div>
                            
                            <div className="p-4 bg-white rounded-lg border border-gray-200">
                              <div className="text-center">
                                <p className="text-sm text-gray-500 mb-1">Customer Satisfaction</p>
                                <p className="text-3xl font-bold text-gray-900">
                                  {manager.metrics.avgStationRating.toFixed(1)}
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                  +0.2 from last month
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
                      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                        <span className="text-gray-500">Performance chart placeholder</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Revenue Contribution</h3>
                      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                        <span className="text-gray-500">Revenue chart placeholder</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {manager.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                          <i className="ri-history-line text-blue-600"></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="text-gray-900">
                              {activity.action}
                              {activity.stationName && (
                                <Link href={`/dashboard/admin/stations/${activity.stationId}`} className="ml-1 text-primary-600 hover:text-primary-700">
                                  {activity.stationName}
                                </Link>
                              )}
                            </p>
                            <span className="text-sm text-gray-500">
                              {new Date(activity.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(activity.date).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}