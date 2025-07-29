'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import StatsWidget from '@/components/dashboard/stats-widget';
import RecentBookingsWidget from '@/components/dashboard/recent-bookings-widget';
import LoadingSpinner from '@/components/ui/loader';
import { useAuthStore } from '@/store/auth-store';
import { useBookingStore } from '@/store/booking-store';
import Link from 'next/link'; 

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { bookings, fetchUserBookings } = useBookingStore();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedSessions: 0,
    totalKwh: 0,
    savedCO2: 0
  });

  useEffect(() => {
    if (user?.id) {
      fetchUserBookings(user.id).then(() => {
        // Calculate stats
        const completed = bookings.filter(b => b.status === 'completed');
        setStats({
          totalBookings: bookings.length,
          completedSessions: completed.length,
          totalKwh: completed.reduce((sum, b) => sum + (b.kwh || 0), 0),
          savedCO2: completed.reduce((sum, b) => sum + (b.kwh || 0) * 0.4, 0) 
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
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-xl opacity-90">
            Track your charging activity and environmental impact
          </p>
                  </div>
      </section>

      {/* Stats Grid */}
      <section className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsWidget
            title="Total Bookings"
            value={stats.totalBookings}
            icon="ri-calendar-check-line"
            color="blue"
            trend="+12%"
          />
          <StatsWidget
            title="Completed Sessions"
            value={stats.completedSessions}
            icon="ri-charging-pile-2-line"
            color="green"
            trend="+8%"
          />
          <StatsWidget
            title="Energy Used"
            value={`${stats.totalKwh.toFixed(1)} kWh`}
            icon="ri-flashlight-line"
            color="yellow"
            trend="+15%"
          />
          <StatsWidget
            title="CO2 Saved"
            value={`${stats.savedCO2.toFixed(1)} kg`}
            icon="ri-leaf-line"
            color="emerald"
            trend="+20%"
          />
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <RecentBookingsWidget bookings={bookings.slice(0, 5)} />
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/stations" className="block">
                  <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <i className="ri-map-pin-line text-primary-600 text-xl mr-3"></i>
                      <span className="font-medium">Find Stations</span>
                    </div>
                    <i className="ri-arrow-right-line text-gray-400"></i>
                  </button>
                </Link>
                <Link href="/bookings/create" className="block">
                  <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <i className="ri-calendar-line text-secondary-600 text-xl mr-3"></i>
                      <span className="font-medium">Book Session</span>
                    </div>
                    <i className="ri-arrow-right-line text-gray-400"></i>
                  </button>
                </Link>
                <Link href="/chat" className="block">
                  <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <i className="ri-customer-service-2-line text-purple-600 text-xl mr-3"></i>
                      <span className="font-medium">Get Support</span>
                    </div>
                    <i className="ri-arrow-right-line text-gray-400"></i>
                  </button>
                </Link>
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <i className="ri-leaf-line text-green-600 text-2xl mr-3"></i>
                <h3 className="text-lg font-semibold text-gray-900">Environmental Impact</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Trees Planted Equivalent</p>
                  <p className="text-2xl font-bold text-green-600">{Math.floor(stats.savedCO2 / 20)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Miles of Clean Driving</p>
                  <p className="text-2xl font-bold text-green-600">{Math.floor(stats.totalKwh * 3.5)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
        