'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import BookingCard from '@/components/cards/booking-card';
import LoadingSpinner from '@/components/ui/loader';
import { useBookingStore } from '@/store/booking-store';
import { useAuthStore } from '@/store/auth-store';
import Link from 'next/link';
import Button from '@/components/ui/button';
// import AnimatedBackground from '@/components/AnimatedBackground';

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


  // Get counts for the tabs
  const bookingCounts = {
    upcoming: bookings.filter(b => b.status === 'confirmed' || b.status === 'upcoming').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    all: bookings.length
  };

  if (loading) {
    return (
      <div className="min-h-screen relative bg-gray-50 flex items-center justify-center">
        {/* <AnimatedBackground /> */}
        <Header />
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative bg-gray-50">
        {/* <AnimatedBackground /> */}
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
      {/* <AnimatedBackground /> */}
      <Header />
      
      {/* Hero Section with matching theme */}
      <section className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-8">
                <span className="text-green-400 text-sm font-medium">
                  <i className="ri-calendar-check-line mr-2"></i>
                  Manage Bookings
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                Your Charging
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                  Sessions
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-xl">
                View and manage all your EV charging appointments in one place
              </p>
            </div>
            
            <Link href="/bookings/create">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300 px-6"
              >
                <i className="ri-add-line mr-2"></i>
                New Booking
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Tabs with counts */}
      <section className="relative z-10 -mt-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: 'upcoming', label: 'Upcoming', icon: 'ri-time-line', color: 'blue' },
                { id: 'completed', label: 'Completed', icon: 'ri-check-double-line', color: 'green' },
                { id: 'cancelled', label: 'Cancelled', icon: 'ri-close-circle-line', color: 'red' },
                { id: 'all', label: 'All Bookings', icon: 'ri-calendar-line', color: 'purple' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative group rounded-xl font-medium transition-all duration-300 p-4 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r from-${tab.color === 'red' ? 'red' : tab.color}-500 to-${tab.color === 'red' ? 'red' : tab.color}-600 text-white shadow-lg`
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-center md:justify-start">
                    <i className={`${tab.icon} text-xl mr-2`}></i>
                    <span>{tab.label}</span>
                    
                    <div className={`ml-auto hidden md:flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white'
                        : `bg-${tab.color === 'red' ? 'red' : tab.color}-100 text-${tab.color === 'red' ? 'red' : tab.color}-600`
                    }`}>
                      {bookingCounts[tab.id as keyof typeof bookingCounts]}
                    </div>
                  </div>
                  
                  {/* Mobile badge */}
                  <div className="absolute top-1 right-1 md:hidden flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold bg-white/20 text-white">
                    {bookingCounts[tab.id as keyof typeof bookingCounts]}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bookings List */}
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
          {filteredBookings.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-16 text-center border border-gray-100">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className={`
                  ${activeTab === 'upcoming' ? 'ri-calendar-line' : 
                    activeTab === 'completed' ? 'ri-check-double-line' : 
                    activeTab === 'cancelled' ? 'ri-close-circle-line' : 'ri-calendar-line'
                  } text-gray-400 text-3xl
                `}></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {activeTab === 'upcoming' ? 'No upcoming bookings' : 
                 activeTab === 'completed' ? 'No completed sessions' : 
                 activeTab === 'cancelled' ? 'No cancelled bookings' : 'No bookings found'}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {activeTab === 'upcoming' ? 'Schedule a charging session to see upcoming bookings here.' : 
                 activeTab === 'completed' ? 'Completed charging sessions will appear here.' : 
                 activeTab === 'cancelled' ? 'Cancelled bookings will be shown in this section.' : 
                 'Start by scheduling your first charging session at one of our stations.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/stations">
                  <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                    <i className="ri-map-pin-line mr-2"></i>
                    Find Stations
                  </Button>
                </Link>
                <Link href="/bookings/create">
                  <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                    <i className="ri-add-line mr-2"></i>
                    Create Booking
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeTab === 'upcoming' ? 'Upcoming Sessions' : 
                   activeTab === 'completed' ? 'Completed Sessions' : 
                   activeTab === 'cancelled' ? 'Cancelled Bookings' : 'All Bookings'}
                </h2>
                <div className="text-gray-600">
                  <span className="font-medium">{filteredBookings.length}</span> {filteredBookings.length === 1 ? 'booking' : 'bookings'} found
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBookings.map((booking) => (
                  <BookingCardEnhanced key={booking.id} booking={booking} />
                ))}
              </div>
            </>
          )}
        </div>
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

function BookingCardEnhanced({ booking }: { booking: Booking }) {
  const getStatusColor = (status:any) => {
    switch(status) {
      case 'confirmed':
      case 'upcoming':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-700',
          icon: 'ri-time-line'
        };
      case 'completed':
        return {
          bg: 'bg-green-100',
          text: 'text-green-700',
          icon: 'ri-check-double-line'
        };
      case 'cancelled':
        return {
          bg: 'bg-red-100',
          text: 'text-red-700',
          icon: 'ri-close-circle-line'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          icon: 'ri-calendar-line'
        };
    }
  };

  const statusStyle = getStatusColor(booking.status);
  
  // Format date and time
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-green-200 hover:scale-[1.02]">
      {/* Status indicator bar */}
      <div className={`absolute top-0 left-0 w-1 h-full ${
        booking.status === 'confirmed' || booking.status === 'upcoming' 
          ? 'bg-blue-500' 
          : booking.status === 'completed'
          ? 'bg-green-500'
          : 'bg-red-500'
      }`}></div>
      
      <div className="p-6 pl-8">
        {/* Station and Status Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{booking.stationName}</h3>
            <p className="text-gray-600 text-sm">{booking.address}</p>
          </div>
          <div className={`px-3 py-1 rounded-full flex items-center ${statusStyle.bg} ${statusStyle.text}`}>
            <i className={`${statusStyle.icon} mr-1`}></i>
            <span className="text-sm font-medium">
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>
        </div>
        
        {/* Date and Time */}
        <div className="flex items-center mb-4 bg-gray-50 p-3 rounded-xl">
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm mr-3">
            <i className="ri-calendar-line text-gray-700"></i>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date & Time</p>
            <p className="font-medium text-gray-900">
              {formatDate(booking.date)} • {booking.time || 'N/A'}
            </p>
          </div>
        </div>
        
        {/* Booking Details */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-medium text-gray-900">{booking.duration || '1 hour'}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-sm text-gray-500">Charger Type</p>
            <p className="font-medium text-gray-900">{booking.chargerType || 'Type 2'}</p>
          </div>
          {booking.kwh && (
            <div className="bg-gray-50 p-3 rounded-xl">
              <p className="text-sm text-gray-500">Energy</p>
              <p className="font-medium text-gray-900">{booking.kwh} kWh</p>
            </div>
          )}
          {booking.price && (
            <div className="bg-gray-50 p-3 rounded-xl">
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-medium text-gray-900">${booking.price.toFixed(2)}</p>
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Link href={`/bookings/${booking.id}`} className="flex-1">
            <Button 
              variant="outline" 
              className="w-full border-gray-200 hover:border-green-200 hover:bg-green-50 text-gray-700"
            >
              <i className="ri-eye-line mr-2"></i>
              Details
            </Button>
          </Link>
          
          {(booking.status === 'confirmed' || booking.status === 'upcoming') && (
            <Link href={`/bookings/${booking.id}/edit`} className="flex-1">
              <Button 
                variant="outline" 
                className="w-full border-blue-200 hover:border-blue-300 hover:bg-blue-50 text-blue-600"
              >
                <i className="ri-edit-line mr-2"></i>
                Edit
              </Button>
            </Link>
          )}
          
          {booking.status === 'completed' && (
            <Button 
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            >
              <i className="ri-file-download-line mr-2"></i>
              Receipt
            </Button>
          )}
          
          {(booking.status === 'confirmed' || booking.status === 'upcoming') && (
            <Button 
              variant="outline" 
              className="flex-1 border-red-200 hover:border-red-300 hover:bg-red-50 text-red-600"
            >
              <i className="ri-close-circle-line mr-2"></i>
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}