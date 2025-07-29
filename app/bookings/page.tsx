'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import BookingCard from '@/components/cards/booking-card'; 
import LoadingSpinner from '@/components/ui/loader';
import { useBookingStore } from '@/store/booking-store';
import { useAuthStore } from '@/store/auth-store';
import Link from 'next/link';

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const { bookings, loading, fetchUserBookings } = useBookingStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.id) {
      fetchUserBookings(user.id);
    }
  }, [user]);

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'upcoming') return booking.status === 'confirmed';
    if (activeTab === 'completed') return booking.status === 'completed';
    if (activeTab === 'cancelled') return booking.status === 'cancelled';
    return true;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="container">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">My Bookings</h1>
              <p className="text-xl opacity-90">Manage your charging sessions</p>
            </div>
            <Link href="/bookings/create">
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                <i className="ri-add-line mr-2"></i>
                New Booking
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="container py-8">
        <div className="bg-white rounded-xl shadow-sm p-2">
          <div className="flex space-x-2">
            {['upcoming', 'completed', 'cancelled', 'all'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bookings List */}
      <section className="container pb-16">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-16 text-center">
            <i className="ri-calendar-line text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-500 mb-6">You haven't made any bookings yet</p>
            <Link href="/stations">
              <button className="btn-primary">
                <i className="ri-search-line mr-2"></i>
                Find Stations
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}