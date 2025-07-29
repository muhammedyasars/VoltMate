'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import StatsWidget from '@/components/dashboard/stats-widget';
import LoadingSpinner from '@/components/ui/loader';
import { useAuthStore } from '@/store/auth-store';
import { useStationStore } from '@/store/station-store';
import Link from 'next/link';

export default function ManagerDashboard() {
  const { user } = useAuthStore();
  const { stations, fetchManagerStations } = useStationStore();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStations: 0,
    activeStations: 0,
    todayBookings: 0,
    monthlyRevenue: 0
  });

  useEffect(() => {
    if (user?.id) {
      fetchManagerStations(user.id).then(() => {
        setStats({
          totalStations: stations.length,
          activeStations: stations.filter(s => s.status === 'available').length,
          todayBookings: 45, // Mock data
          monthlyRevenue: 12500 // Mock data
        });
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Manager Dashboard
          </h1>
          <p className="text-xl opacity-90">
            Monitor and manage your charging stations
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsWidget
            title="Total Stations"
            value={stats.totalStations}
            icon="ri-charging-pile-2-line"
            color="purple"
            trend="+2"
          />
          <StatsWidget
            title="Active Stations"
            value={stats.activeStations}
            icon="ri-checkbox-circle-line"
            color="green"
            trend={`${Math.round((stats.activeStations / stats.totalStations) * 100)}%`}
          />
          <StatsWidget
            title="Today's Bookings"
            value={stats.todayBookings}
            icon="ri-calendar-check-line"
            color="blue"
            trend="+18%"
          />
          <StatsWidget
            title="Monthly Revenue"
            value={`$${stats.monthlyRevenue.toLocaleString()}`}
            icon="ri-money-dollar-circle-line"
            color="emerald"
            trend="+25%"
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="container pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stations Overview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Your Stations</h3>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  View All <i className="ri-arrow-right-line ml-1"></i>
                </button>
              </div>
              
              <div className="space-y-4">
                {stations.slice(0, 5).map((station) => (
                  <div key={station.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        station.status === 'available' ? 'bg-green-500' : 
                        station.status === 'occupied' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <h4 className="font-medium text-gray-900">{station.name}</h4>
                        <p className="text-sm text-gray-500">{station.address}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{station.bookingsToday || 0} bookings</p>
                      <p className="text-sm text-gray-500">today</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Alerts */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <div className="flex items-center">
                    <i className="ri-add-circle-line text-purple-600 text-xl mr-3"></i>
                    <span className="font-medium">Add New Station</span>
                  </div>
                  <i className="ri-arrow-right-line text-gray-400"></i>
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="flex items-center">
                    <i className="ri-bar-chart-line text-blue-600 text-xl mr-3"></i>
                    <span className="font-medium">View Reports</span>
                  </div>
                  <i className="ri-arrow-right-line text-gray-400"></i>
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="flex items-center">
                    <i className="ri-settings-3-line text-green-600 text-xl mr-3"></i>
                    <span className="font-medium">Station Settings</span>
                  </div>
                  <i className="ri-arrow-right-line text-gray-400"></i>
                </button>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <i className="ri-alert-line text-red-600 text-xl mr-2"></i>
                <h3 className="text-lg font-semibold text-red-900">Alerts</h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-red-700">Station #3 is offline</p>
                <p className="text-sm text-red-700">Low availability at Station #7</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}