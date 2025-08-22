'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import LoadingSpinner from '@/components/ui/loader';
import { useBookingStore } from '@/store/booking-store';
import { useAuthStore } from '@/store/auth-store';
import Link from 'next/link';
import Button from '@/components/ui/button';

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const { bookings, loading, fetchUserBookings } = useBookingStore();
  const { user } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        if (user?.id) {
          await fetchUserBookings(user.id);
        }
      } catch (err) {
        console.error('Failed to load bookings:', err);
        setError('Failed to load your bookings. Please try again.');
      }
    };

    loadBookings();
  }, [user, fetchUserBookings]);

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'upcoming') return booking.status === 'confirmed' || booking.status === 'upcoming';
    if (activeTab === 'completed') return booking.status === 'completed';
    if (activeTab === 'cancelled') return booking.status === 'cancelled';
    return true;
  });

  const bookingCounts = {
    upcoming: bookings.filter(b => b.status === 'confirmed' || b.status === 'upcoming').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Header />
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
            <i className="ri-error-warning-line text-red-500 text-5xl mb-4"></i>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Simple Header Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">My Bookings</h1>
              <p className="text-gray-600">Manage your charging sessions</p>
            </div>
            <Link href="/bookings/create">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <i className="ri-add-line mr-2"></i>
                New Booking
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Tabs */}
      <section className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'upcoming', label: 'Upcoming', count: bookingCounts.upcoming },
              { id: 'completed', label: 'Completed', count: bookingCounts.completed },
              { id: 'cancelled', label: 'Cancelled', count: bookingCounts.cancelled }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bookings List */}
      <section className="container mx-auto px-4 py-8">
        {filteredBookings.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-calendar-line text-gray-400 text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No {activeTab} bookings
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'upcoming' && 'Schedule a charging session to get started.'}
              {activeTab === 'completed' && 'Your completed sessions will appear here.'}
              {activeTab === 'cancelled' && 'Cancelled bookings will be shown here.'}
            </p>
            <Link href="/stations">
              <Button variant="outline">
                Browse Stations
              </Button>
            </Link>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

interface Booking {
  id: string;
  stationName: string;
  address?: string;
  status: 'confirmed' | 'upcoming' | 'completed' | 'cancelled';
  date: string;
  time?: string;
  duration?: string;
  chargerType?: string;
  kwh?: number;
  price?: number;
}

function BookingCard({ booking }: { booking: Booking }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      confirmed: 'bg-blue-100 text-blue-700',
      upcoming: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      cancelled: 'bg-gray-100 text-gray-700'
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        {/* Left Section - Main Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{booking.stationName}</h3>
            <div className="sm:hidden">
              {getStatusBadge(booking.status)}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{booking.address}</p>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center text-gray-600">
              <i className="ri-calendar-line mr-1"></i>
              {formatDate(booking.date)}
            </div>
            <div className="flex items-center text-gray-600">
              <i className="ri-time-line mr-1"></i>
              {booking.time || 'Time TBD'}
            </div>
            <div className="flex items-center text-gray-600">
              <i className="ri-charging-pile-line mr-1"></i>
              {booking.chargerType || 'Type 2'}
            </div>
            {booking.price && (
              <div className="flex items-center font-medium text-gray-900">
                ${booking.price.toFixed(2)}
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Status & Actions */}
        <div className="flex flex-col items-end gap-3">
          <div className="hidden sm:block">
            {getStatusBadge(booking.status)}
          </div>
          
          <div className="flex gap-2">
            <Link href={`/bookings/${booking.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
            
            {(booking.status === 'confirmed' || booking.status === 'upcoming') && (
              <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                Cancel
              </Button>
            )}
            
            {booking.status === 'completed' && (
              <Button variant="outline" size="sm">
                <i className="ri-download-line mr-1"></i>
                Receipt
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}