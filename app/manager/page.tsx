'use client';

import { useState, useEffect } from 'react';
// import Header from '@/components/layout/header';
import LoadingSpinner from '@/components/ui/loader';
import { useAuthStore } from '@/store/auth-store';
import { useStationStore } from '@/store/station-store';
import Link from 'next/link';
import Button from '@/components/ui/button';

interface StationStats {
  totalStations: number;
  activeStations: number;
  todayBookings: number;
  monthlyRevenue: number;
}

export default function ManagerDashboard() {
  const { user } = useAuthStore();
  const { stations, fetchManagerStations } = useStationStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<StationStats>({
    totalStations: 0,
    activeStations: 0,
    todayBookings: 0,
    monthlyRevenue: 0
  });
  const [activeTab, setActiveTab] = useState<'stations' | 'analytics' | 'settings'>('stations');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        if (user?.id) {
          await fetchManagerStations(user.id);
          setStats({
            totalStations: stations.length,
            activeStations: stations.filter(s => s.status === 'available').length,
            todayBookings: 45, 
            monthlyRevenue: 12500 
          });
        }
      } catch (err) {
        console.error('Failed to load manager dashboard:', err);
        setError('Failed to load your stations. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [user, fetchManagerStations, stations]);

  if (loading) {
    return (
      <div className="min-h-screen relative bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative bg-gray-50">
        <div className="container py-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 border border-gray-100">
            <i className="ri-error-warning-line text-red-500 text-6xl mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <Button onClick={() => window.location.reload()}>
              <i className="ri-refresh-line mr-2"></i>
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gray-50">
      
      {/* Welcome Section with matching theme */}
      <section className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-900"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-8">
              <span className="text-purple-400 text-sm font-medium">
                <i className="ri-dashboard-line mr-2"></i>
                Station Manager
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Welcome,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                {user?.name || 'Manager'}!
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
              Monitor your charging stations, track performance metrics, and manage bookings
            </p>
          </div>
        </div>
      </section>
      
      {/* Stats Grid - Enhanced Styling */}
      <section className="relative z-10 -mt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsWidgetEnhanced
              title="Total Stations"
              value={stats.totalStations}
              icon="ri-charging-pile-2-line"
              color="purple"
              trend="+2"
            />
            <StatsWidgetEnhanced
              title="Active Stations"
              value={stats.activeStations}
              icon="ri-checkbox-circle-line"
              color="green"
              trend={`${stats.totalStations ? Math.round((stats.activeStations / stats.totalStations) * 100) : 0}%`}
            />
            <StatsWidgetEnhanced
              title="Today's Bookings"
              value={stats.todayBookings}
              icon="ri-calendar-check-line"
              color="blue"
              trend="+18%"
            />
            <StatsWidgetEnhanced
              title="Monthly Revenue"
              value={`$${stats.monthlyRevenue.toLocaleString()}`}
              icon="ri-money-dollar-circle-line"
              color="emerald"
              trend="+25%"
            />
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-t-2xl shadow-lg border border-gray-100 p-3">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('stations')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center ${
                  activeTab === 'stations'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <i className="ri-charging-pile-2-line mr-2"></i>
                My Stations
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center ${
                  activeTab === 'analytics'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <i className="ri-bar-chart-grouped-line mr-2"></i>
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center ${
                  activeTab === 'settings'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <i className="ri-settings-3-line mr-2"></i>
                Settings
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #8b5cf6 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-b-2xl shadow-xl border-x border-b border-gray-100 p-8">
            {activeTab === 'stations' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stations Overview */}
                <div className="lg:col-span-2">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                      <i className="ri-charging-pile-2-line text-purple-600 mr-3"></i>
                      Your Stations
                    </h3>
                    
                    <div className="flex space-x-2">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search stations..."
                          className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        />
                        <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="border-purple-200 text-purple-600 hover:bg-purple-50"
                        size="sm"
                      >
                        <i className="ri-filter-3-line mr-1"></i>
                        Filter
                      </Button>
                    </div>
                  </div>
                  
                  {stations.length === 0 ? (
                    <div className="bg-gray-50 rounded-xl p-12 text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="ri-charging-pile-2-line text-gray-500 text-2xl"></i>
                      </div>
                      <h4 className="text-lg font-medium text-gray-700 mb-2">No stations yet</h4>
                      <p className="text-gray-500 mb-6">Add your first charging station to get started</p>
                      <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                        <i className="ri-add-line mr-2"></i>
                        Add New Station
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                      {stations.map((station) => (
                        <div 
                          key={station.id} 
                          className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-300 group"
                        >
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                              station.status === 'available' 
                                ? 'bg-green-100 text-green-600' 
                                : station.status === 'occupied' 
                                ? 'bg-yellow-100 text-yellow-600' 
                                : 'bg-red-100 text-red-600'
                            }`}>
                              <i className={
                                station.status === 'available' 
                                  ? 'ri-checkbox-circle-line' 
                                  : station.status === 'occupied' 
                                  ? 'ri-time-line' 
                                  : 'ri-error-warning-line'
                              }></i>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">{station.name}</h4>
                              <p className="text-sm text-gray-500">{station.address || 'No address provided'}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <div className="text-right mr-4">
                              <p className="font-medium text-gray-900">{station.bookingsToday || 0} bookings</p>
                              <p className="text-xs text-gray-500">today</p>
                            </div>
                            
                            <Link href={`/manager/stations/${station.id}`}>
                              <Button 
                                variant="outline" 
                                className="border-gray-200 text-gray-600 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200"
                                size="sm"
                              >
                                Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {stations.length > 0 && (
                    <div className="mt-6 flex justify-center">
                      <Button 
                        variant="outline" 
                        className="border-purple-200 text-purple-600 hover:bg-purple-50"
                      >
                        View All Stations
                        <i className="ri-arrow-right-line ml-2"></i>
                      </Button>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Quick Actions */}
                  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <i className="ri-flashlight-line text-purple-600 mr-3"></i>
                      Quick Actions
                    </h3>
                                        <div className="space-y-3">
                      <Link href="/manager/stations/new">
                        <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 border border-gray-100 group">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm group-hover:scale-110 transition-transform">
                              <i className="ri-add-circle-line text-purple-600 text-xl"></i>
                            </div>
                            <span className="font-medium text-gray-800">Add New Station</span>
                          </div>
                          <i className="ri-arrow-right-line text-gray-400 group-hover:translate-x-1 transition-transform"></i>
                        </button>
                      </Link>
                      <Link href="/manager/bookings">
                        <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 border border-gray-100 group">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm group-hover:scale-110 transition-transform">
                              <i className="ri-calendar-check-line text-blue-600 text-xl"></i>
                            </div>
                            <span className="font-medium text-gray-800">View Bookings</span>
                          </div>
                          <i className="ri-arrow-right-line text-gray-400 group-hover:translate-x-1 transition-transform"></i>
                        </button>
                      </Link>
                      <Link href="/manager/users">
                        <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl hover:from-green-100 hover:to-teal-100 transition-all duration-300 border border-gray-100 group">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm group-hover:scale-110 transition-transform">
                              <i className="ri-user-3-line text-green-600 text-xl"></i>
                            </div>
                            <span className="font-medium text-gray-800">Manage Users</span>
                          </div>
                          <i className="ri-arrow-right-line text-gray-400 group-hover:translate-x-1 transition-transform"></i>
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Alerts */}
                  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 overflow-hidden relative">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-red-100 rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
                    
                    <div className="relative">
                      <div className="flex items-center mb-5">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                          <i className="ri-alert-line text-red-600 text-xl"></i>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Alerts</h3>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-center text-red-700">
                          <i className="ri-error-warning-line mr-2"></i>
                          <span className="text-sm">Station #3 is offline</span>
                          <Button 
                            variant="outline" 
                            className="ml-auto border-red-200 text-red-600 hover:bg-red-100 text-xs py-1 px-2"
                            size="sm"
                          >
                            View
                          </Button>
                        </div>
                        <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-lg flex items-center text-yellow-700">
                          <i className="ri-alarm-warning-line mr-2"></i>
                          <span className="text-sm">Low availability at Station #7</span>
                          <Button 
                            variant="outline" 
                            className="ml-auto border-yellow-200 text-yellow-600 hover:bg-yellow-100 text-xs py-1 px-2"
                            size="sm"
                          >
                            View
                          </Button>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-4 border-gray-200 text-gray-700 hover:bg-gray-50"
                        size="sm"
                      >
                        View All Alerts
                      </Button>
                    </div>
                  </div>
                  
                  {/* Revenue Preview */}
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
                    <h3 className="text-xl font-bold mb-4">Revenue Overview</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Today</span>
                        <span className="font-bold">$420</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>This Week</span>
                        <span className="font-bold">$2,840</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>This Month</span>
                        <span className="font-bold">$12,500</span>
                      </div>
                      
                      <div className="h-1 bg-white/20 rounded-full mt-2"></div>
                      
                      <Link href="/manager/analytics">
                        <Button className="w-full bg-white text-purple-600 hover:bg-purple-50">
                          View Detailed Analytics
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Analytics Tab Content - Placeholder */}
            {activeTab === 'analytics' && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-bar-chart-grouped-line text-gray-400 text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Analytics Dashboard</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  Comprehensive analytics and reporting tools for your charging stations are coming soon.
                </p>
                <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                  Explore Basic Reports
                </Button>
              </div>
            )}
            
            {/* Settings Tab Content - Placeholder */}
            {activeTab === 'settings' && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-settings-3-line text-gray-400 text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Station Settings</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  Configure your station settings, pricing, and access controls from this dashboard.
                </p>
                <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                  Go to Settings
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// Enhanced Stats Widget Component
function StatsWidgetEnhanced({ 
  title, 
  value, 
  icon, 
  color, 
  trend 
}: { 
  title: string;
  value: string | number;
  icon: string;
  color: 'purple' | 'green' | 'blue' | 'emerald' | 'yellow' | 'red';
  trend?: string;
}) {
  const colorClasses: Record<typeof color, {
    bg: string;
    light: string;
    text: string;
    trend: string;
  }> = {
    purple: {
      bg: 'from-purple-400 to-purple-500',
      light: 'bg-purple-100 text-purple-600',
      text: 'text-purple-600',
      trend: 'text-purple-600 bg-purple-100',
    },
    green: {
      bg: 'from-green-400 to-green-500',
      light: 'bg-green-100 text-green-600',
      text: 'text-green-600',
      trend: 'text-green-600 bg-green-100',
    },
    blue: {
      bg: 'from-blue-400 to-blue-500',
      light: 'bg-blue-100 text-blue-600',
      text: 'text-blue-600',
      trend: 'text-blue-600 bg-blue-100',
    },
    emerald: {
      bg: 'from-emerald-400 to-emerald-500',
      light: 'bg-emerald-100 text-emerald-600',
      text: 'text-emerald-600',
      trend: 'text-emerald-600 bg-emerald-100',
    },
    yellow: {
      bg: 'from-yellow-400 to-yellow-500',
      light: 'bg-yellow-100 text-yellow-600',
      text: 'text-yellow-600',
      trend: 'text-yellow-600 bg-yellow-100',
    },
    red: {
      bg: 'from-red-400 to-red-500',
      light: 'bg-red-100 text-red-600',
      text: 'text-red-600',
      trend: 'text-red-600 bg-red-100',
    }
  };

  const classes = colorClasses[color];

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-80"></div>
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${classes.bg}`}></div>
      
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          
          {trend && (
            <div className="mt-2">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${classes.trend}`}>
                <i className="ri-arrow-up-line mr-1"></i>
                {trend}
              </span>
            </div>
          )}
        </div>
        
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${classes.light} group-hover:scale-110 transition-transform duration-300`}>
          <i className={`${icon} text-xl`}></i>
        </div>
      </div>
    </div>
  );
}