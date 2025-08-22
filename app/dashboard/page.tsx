'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import LoadingSpinner from '@/components/ui/loader';
import { useAuthStore } from '@/store/auth-store';
import Link from 'next/link';
import Button from '@/components/ui/button';
import { dashboardApi } from '@/lib/api/dashboard.api';

// Define a type for the color options
type WidgetColor = 'blue' | 'green' | 'yellow' | 'emerald' | 'purple';

// Types for our data
interface DashboardStats {
  totalBookings: number;
  completedSessions: number;
  totalKwh: number;
  savedCO2: number;
  totalBookingsTrend?: string;
  completedSessionsTrend?: string;
  energyUsedTrend?: string;
  co2SavedTrend?: string;
}

interface Booking {
  id: number;
  stationName: string;
  date: string;
  time?: string;
  status: string;
  kwh?: number;
}

interface EnvironmentalImpact {
  treesEquivalent: number;
  cleanDrivingMiles: number;
  carbonOffset: number;
  treesProgress: number;
  milesProgress: number;
  carbonProgress: number;
}

interface UsageSummary {
  monthlyAverage: number;
  completionRate: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for dashboard data
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    completedSessions: 0,
    totalKwh: 0,
    savedCO2: 0,
  });
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [environmentalImpact, setEnvironmentalImpact] = useState<EnvironmentalImpact>({
    treesEquivalent: 0,
    cleanDrivingMiles: 0,
    carbonOffset: 0,
    treesProgress: 0,
    milesProgress: 0,
    carbonProgress: 0
  });
  
  const [usageSummary, setUsageSummary] = useState<UsageSummary>({
    monthlyAverage: 0,
    completionRate: 0
  });

  // Check authentication on page load
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const isAuth = await checkAuth();
        if (!isAuth) {
          // Not authenticated, redirect to home
          router.push('/');
          return;
        }
        
        // Now load dashboard data since user is authenticated
        await loadDashboard();
      } catch (err) {
        console.error('Auth check failed:', err);
        setError('Authentication failed. Please login again.');
      } finally {
        setLoading(false);
      }
    };
    
    verifyAuth();
  }, []);

  // Load dashboard data
  const loadDashboard = async () => {
    try {
      // Fetch user dashboard data from the API
      const dashboardData = await dashboardApi.getUserDashboard();
      
      // Update state with API data
      if (dashboardData) {
        // Set stats
        setStats({
          totalBookings: dashboardData.stats?.totalBookings || 0,
          completedSessions: dashboardData.stats?.completedSessions || 0,
          totalKwh: dashboardData.stats?.totalKwh || 0,
          savedCO2: dashboardData.stats?.savedCO2 || 0,
          totalBookingsTrend: dashboardData.stats?.totalBookingsTrend,
          completedSessionsTrend: dashboardData.stats?.completedSessionsTrend,
          energyUsedTrend: dashboardData.stats?.energyUsedTrend,
          co2SavedTrend: dashboardData.stats?.co2SavedTrend
        });
        
        // Set bookings
        setBookings(dashboardData.recentBookings || []);
        
        // Set environmental impact
        setEnvironmentalImpact(dashboardData.environmentalImpact || {
          treesEquivalent: 0,
          cleanDrivingMiles: 0,
          carbonOffset: 0,
          treesProgress: 0,
          milesProgress: 0,
          carbonProgress: 0
        });
        
        // Set usage summary
        setUsageSummary(dashboardData.usageSummary || {
          monthlyAverage: 0,
          completionRate: 0
        });
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError('Failed to load your dashboard. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen relative bg-gray-50 flex items-center justify-center">
        <Header />
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative bg-gray-50">
        <Header />
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
      <Header />
      
      {/* Welcome Section with matching theme */}
      <section className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-8">
              <span className="text-green-400 text-sm font-medium">
                <i className="ri-dashboard-line mr-2"></i>
                Dashboard
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Welcome back,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                {user?.name || 'User'}!
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
              Track your charging activity and environmental impact
            </p>
          </div>
        </div>
      </section>
      
      {/* Stats Grid - Enhanced Styling */}
      <section className="relative z-10 -mt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsWidgetEnhanced
              title="Total Bookings"
              value={stats.totalBookings}
              icon="ri-calendar-check-line"
              color="blue"
              trend={stats.totalBookingsTrend || "+12%"}
            />
            <StatsWidgetEnhanced
              title="Completed Sessions"
              value={stats.completedSessions}
              icon="ri-charging-pile-2-line"
              color="green"
              trend={stats.completedSessionsTrend || "+8%"}
            />
            <StatsWidgetEnhanced
              title="Energy Used"
              value={`${stats.totalKwh.toFixed(1)} kWh`}
              icon="ri-flashlight-line"
              color="yellow"
              trend={stats.energyUsedTrend || "+15%"}
            />
            <StatsWidgetEnhanced
              title="CO2 Saved"
              value={`${stats.savedCO2.toFixed(1)} kg`}
              icon="ri-leaf-line"
              color="emerald"
              trend={stats.co2SavedTrend || "+20%"}
            />
          </div>
        </div>
      </section>

      {/* Main Content Grid - Enhanced Styling */}
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <i className="ri-history-line text-green-600 mr-2"></i>
                  Recent Booking Activity
                </h3>
                
                {bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <i className="ri-calendar-line text-gray-400 text-2xl"></i>
                    </div>
                    <h4 className="text-lg font-medium text-gray-700 mb-2">No bookings yet</h4>
                    <p className="text-gray-500 mb-6">Start by booking your first charging session</p>
                    <Link href="/stations">
                      <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                        <i className="ri-add-line mr-2"></i>
                        Book a Session
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.slice(0, 5).map((booking) => (
                      <div 
                        key={booking.id} 
                        className="p-4 border border-gray-100 rounded-xl hover:border-green-200 transition-all duration-300 hover:shadow-md bg-white"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                              booking.status.toLowerCase() === 'completed' 
                                ? 'bg-green-100 text-green-600' 
                                : booking.status.toLowerCase() === 'upcoming' 
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              <i className={
                                booking.status.toLowerCase() === 'completed' 
                                  ? 'ri-checkbox-circle-line' 
                                  : booking.status.toLowerCase() === 'upcoming' 
                                  ? 'ri-time-line'
                                  : 'ri-calendar-line'
                              }></i>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{booking.stationName}</h4>
                              <div className="text-sm text-gray-500">
                                {booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}
                                {booking.time ? ` • ${booking.time}` : ''}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                              booking.status.toLowerCase() === 'completed' 
                                ? 'bg-green-100 text-green-700' 
                                : booking.status.toLowerCase() === 'upcoming' 
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {booking.status 
                                ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1).toLowerCase()
                                : 'Unknown'
                              }
                            </div>
                            {booking.kwh && (
                              <div className="text-sm text-gray-600 mt-1">
                                {booking.kwh} kWh
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="text-center pt-4">
                      <Link href="/bookings">
                        <Button variant="outline" className="text-green-600 hover:text-white hover:bg-green-600 border-green-200">
                          View All Bookings
                          <i className="ri-arrow-right-line ml-2"></i>
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Quick Actions Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <i className="ri-speed-up-line text-blue-600 mr-2"></i>
                  Quick Actions
                </h3>
                <div className="space-y-4">
                  <Link href="/stations" className="block">
                    <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl hover:from-green-100 hover:to-blue-100 transition-all duration-300 border border-gray-100 group">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm group-hover:scale-110 transition-transform">
                          <i className="ri-map-pin-line text-green-600 text-xl"></i>
                        </div>
                        <span className="font-medium text-gray-800">Find Stations</span>
                      </div>
                      <i className="ri-arrow-right-line text-gray-400 group-hover:translate-x-1 transition-transform"></i>
                    </button>
                  </Link>
                  <Link href="/bookings/create" className="block">
                    <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all duration-300 border border-gray-100 group">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm group-hover:scale-110 transition-transform">
                          <i className="ri-calendar-line text-blue-600 text-xl"></i>
                        </div>
                        <span className="font-medium text-gray-800">Book Session</span>
                      </div>
                      <i className="ri-arrow-right-line text-gray-400 group-hover:translate-x-1 transition-transform"></i>
                    </button>
                  </Link>
                  <Link href="/chat" className="block">
                    <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-300 border border-gray-100 group">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm group-hover:scale-110 transition-transform">
                          <i className="ri-customer-service-2-line text-purple-600 text-xl"></i>
                        </div>
                        <span className="font-medium text-gray-800">Get Support</span>
                      </div>
                      <i className="ri-arrow-right-line text-gray-400 group-hover:translate-x-1 transition-transform"></i>
                    </button>
                  </Link>
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-50"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-100 rounded-full opacity-70"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                      <i className="ri-leaf-line text-white text-xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Environmental Impact</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-green-100">
                      <p className="text-sm text-gray-600 mb-1">Trees Equivalent</p>
                      <div className="flex items-end">
                        <p className="text-2xl font-bold text-green-600 mr-2">{environmentalImpact.treesEquivalent || 0}</p>
                        <p className="text-xs text-gray-500 mb-1">trees planted</p>
                      </div>
                      <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                          style={{ width: `${environmentalImpact.treesProgress || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-green-100">
                      <p className="text-sm text-gray-600 mb-1">Clean Driving</p>
                      <div className="flex items-end">
                        <p className="text-2xl font-bold text-green-600 mr-2">{environmentalImpact.cleanDrivingMiles || 0}</p>
                        <p className="text-xs text-gray-500 mb-1">miles</p>
                      </div>
                      <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 to-green-400 rounded-full"
                          style={{ width: `${environmentalImpact.milesProgress || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-green-100">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">Carbon Offset</p>
                      <p className="text-sm font-medium text-green-600">{environmentalImpact.carbonOffset?.toFixed(1) || 0} kg CO₂</p>
                    </div>
                    <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 rounded-full"
                        style={{ width: `${environmentalImpact.carbonProgress || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Usage Summary */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <i className="ri-line-chart-line text-blue-600 mr-2"></i>
                  Usage Summary
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-gray-600">Monthly Average</p>
                      <p className="text-sm font-medium text-gray-900">{usageSummary.monthlyAverage?.toFixed(1) || 0} kWh</p>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                        style={{ width: '65%' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-gray-600">Completion Rate</p>
                      <p className="text-sm font-medium text-gray-900">
                        {usageSummary.completionRate || 0}%
                      </p>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                        style={{ width: `${usageSummary.completionRate || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Link href="/analytics">
                      <Button variant="outline" className="w-full text-blue-600 hover:text-white hover:bg-blue-600 border-blue-200">
                        <i className="ri-bar-chart-2-line mr-2"></i>
                        View Detailed Analytics
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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
  color: WidgetColor;
  trend?: string;
}) {
  // Define color classes based on the color prop
  const colorClasses: Record<WidgetColor, {
    bg: string;
    light: string;
    text: string;
    trend: string;
  }> = {
    blue: {
      bg: 'from-blue-400 to-blue-500',
      light: 'bg-blue-100 text-blue-600',
      text: 'text-blue-600',
      trend: 'text-blue-600 bg-blue-100',
    },
    green: {
      bg: 'from-green-400 to-green-500',
      light: 'bg-green-100 text-green-600',
      text: 'text-green-600',
      trend: 'text-green-600 bg-green-100',
    },
    yellow: {
      bg: 'from-yellow-400 to-yellow-500',
      light: 'bg-yellow-100 text-yellow-600',
      text: 'text-yellow-600',
      trend: 'text-yellow-600 bg-yellow-100',
    },
    emerald: {
      bg: 'from-emerald-400 to-emerald-500',
      light: 'bg-emerald-100 text-emerald-600',
      text: 'text-emerald-600',
      trend: 'text-emerald-600 bg-emerald-100',
    },
    purple: {
      bg: 'from-purple-400 to-purple-500',
      light: 'bg-purple-100 text-purple-600',
      text: 'text-purple-600',
      trend: 'text-purple-600 bg-purple-100',
    },
  };

  // Get color classes for the selected color
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