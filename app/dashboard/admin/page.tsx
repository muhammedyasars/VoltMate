'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import AdminSidebar from '@/components/layout/admin-sidebar';
import StatsWidget from '@/components/dashboard/stats-widget';
import LoadingSpinner from '@/components/ui/loader';
import RevenueChart from '@/components/dashboard/revenue-chart';
import UserActivityChart from '@/components/dashboard/user-activity-chart';
import Link from 'next/link';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeStations: 0,
    totalBookings: 0,
    monthlyRevenue: 0
  });

  useEffect(() => {
   
    setTimeout(() => {
      setStats({
        totalUsers: 4230,
        activeStations: 48,
        totalBookings: 12458,
        monthlyRevenue: 84250
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1">

        
        <div className="container py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsWidget
              title="Total Users"
              value={stats.totalUsers.toLocaleString()}
              icon="ri-user-line"
              color="blue"
              trend="+8%"
            />
            <StatsWidget
              title="Active Stations"
              value={stats.activeStations}
              icon="ri-charging-pile-2-line"
              color="green"
              trend="+3"
            />
            <StatsWidget
              title="Total Bookings"
              value={stats.totalBookings.toLocaleString()}
              icon="ri-calendar-check-line"
              color="purple"
              trend="+12%"
            />
            <StatsWidget
              title="Monthly Revenue"
              value={`$${stats.monthlyRevenue.toLocaleString()}`}
              icon="ri-money-dollar-circle-line"
              color="emerald"
              trend="+15%"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
              <RevenueChart />
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Activity</h3>
              <UserActivityChart />
            </div>
          </div>

          {/* Recent Activity & Quick Access */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  View All <i className="ri-arrow-right-line ml-1"></i>
                </button>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start border-b border-gray-100 pb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <i className={`${
                        i % 3 === 0 ? 'ri-user-add-line text-blue-600' : 
                        i % 3 === 1 ? 'ri-charging-pile-2-line text-green-600' : 
                        'ri-calendar-check-line text-purple-600'
                      }`}></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">
                        {i % 3 === 0 ? 'New user registered' : 
                         i % 3 === 1 ? 'Station #12 maintenance completed' : 
                         'Booking #45872 confirmed'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {i * 12} minutes ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Access */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/dashboard/admin/users" className="block">
                    <div className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors">
                      <i className="ri-user-line text-2xl text-blue-600 mb-2"></i>
                      <p className="font-medium text-sm">Users</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/admin/managers" className="block">
                    <div className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors">
                      <i className="ri-user-settings-line text-2xl text-purple-600 mb-2"></i>
                      <p className="font-medium text-sm">Managers</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/admin/stations" className="block">
                    <div className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors">
                      <i className="ri-charging-pile-2-line text-2xl text-green-600 mb-2"></i>
                      <p className="font-medium text-sm">Stations</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/admin/reports" className="block">
                    <div className="p-4 bg-yellow-50 rounded-lg text-center hover:bg-yellow-100 transition-colors">
                      <i className="ri-file-chart-line text-2xl text-yellow-600 mb-2"></i>
                      <p className="font-medium text-sm">Reports</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* System Status */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-700">API Status</p>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-sm text-green-700">Operational</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-700">Payment Gateway</p>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-sm text-green-700">Operational</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-700">Booking System</p>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-sm text-green-700">Operational</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-700">Station Network</p>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      <p className="text-sm text-yellow-700">Partial Outage</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}