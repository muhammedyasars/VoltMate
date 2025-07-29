// components/cards/booking-card.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { useBookingStore } from '@/store/booking-store';
import { toast } from 'react-hot-toast';

interface BookingCardProps {
  booking: {
    id: string;
    stationId: string;
    stationName: string;
    stationAddress: string;
    chargerType: string;
    date: string;
    startTime: string;
    endTime: string;
    duration: number;
    totalCost: number;
    status: 'confirmed' | 'completed' | 'cancelled' | 'ongoing';
    createdAt: string;
  };
}

export default function BookingCard({ booking }: BookingCardProps) {
  const [loading, setLoading] = useState(false);
  const { cancelBooking } = useBookingStore();

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    
    setLoading(true);
    try {
      await cancelBooking(booking.id);
      toast.success('Booking cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel booking');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'ongoing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isUpcoming = booking.status === 'confirmed' && new Date(booking.date) > new Date();
  const isPast = new Date(booking.date) < new Date();

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{booking.stationName}</h3>
          <p className="text-sm text-gray-500 mt-1">{booking.stationAddress}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>

      {/* Booking Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm">
          <i className="ri-calendar-line text-gray-400 mr-2"></i>
          <span className="text-gray-600">{format(new Date(booking.date), 'EEEE, MMMM d, yyyy')}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <i className="ri-time-line text-gray-400 mr-2"></i>
          <span className="text-gray-600">{booking.startTime} - {booking.endTime} ({booking.duration} hours)</span>
        </div>
        
        <div className="flex items-center text-sm">
          <i className="ri-charging-pile-line text-gray-400 mr-2"></i>
          <span className="text-gray-600">{booking.chargerType}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <i className="ri-money-dollar-circle-line text-gray-400 mr-2"></i>
          <span className="text-gray-900 font-semibold">${booking.totalCost.toFixed(2)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t">
        <Link href={`/bookings/${booking.id}`} className="flex-1">
          <button className="w-full px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
            View Details
          </button>
        </Link>
        
        {isUpcoming && (
          <>
            <Link href={`/bookings/${booking.id}/edit`} className="flex-1">
              <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Edit
              </button>
            </Link>
            
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
            >
              {loading ? 'Cancelling...' : 'Cancel'}
            </button>
          </>
        )}
        
        {booking.status === 'completed' && !isPast && (
          <Link href={`/stations/${booking.stationId}/book`} className="flex-1">
            <button className="w-full px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
              Book Again
            </button>
          </Link>
        )}
      </div>

      {/* Booking ID for reference */}
      <div className="mt-4 pt-4 border-t">
        <p className="text-xs text-gray-400">Booking ID: {booking.id}</p>
      </div>
    </div>
  );
}