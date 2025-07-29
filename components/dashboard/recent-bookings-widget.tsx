// components/dashboard/recent-bookings-widget.tsx
'use client';

import Link from 'next/link';
import { format } from 'date-fns';

interface Booking {
  id: string;
  stationId: string;
  stationName: string;
  stationAddress?: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'completed' | 'cancelled' | 'ongoing';
  totalCost: number;
  kwh?: number;
  chargerType?: string;
}

interface RecentBookingsWidgetProps {
  bookings: Booking[];
}

export default function RecentBookingsWidget({ bookings }: RecentBookingsWidgetProps) {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'ri-calendar-check-line';
      case 'completed':
        return 'ri-checkbox-circle-line';
      case 'cancelled':
        return 'ri-close-circle-line';
      case 'ongoing':
        return 'ri-loader-4-line animate-spin';
      default:
        return 'ri-information-line';
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
        <div className="text-center py-12">
          <i className="ri-calendar-line text-5xl text-gray-300 mb-4"></i>
          <p className="text-gray-500 mb-4">No bookings yet</p>
          <Link href="/stations">
            <button className="btn-primary">
              Find Charging Stations
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
          <Link href="/bookings">
            <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
              View All <i className="ri-arrow-right-line ml-1"></i>
            </button>
          </Link>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {bookings.map((booking) => (
          <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <i className="ri-charging-pile-2-line text-primary-600"></i>
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">
                      {booking.stationName}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {format(new Date(booking.date), 'EEEE, MMMM d, yyyy')}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center">
                        <i className="ri-time-line mr-1"></i>
                        {booking.startTime} - {booking.endTime}
                      </span>
                      {booking.kwh && (
                        <span className="flex items-center">
                          <i className="ri-flashlight-line mr-1"></i>
                          {booking.kwh} kWh
                        </span>
                      )}
                      <span className="flex items-center font-medium text-gray-900">
                        <i className="ri-money-dollar-circle-line mr-1"></i>
                        ${booking.totalCost.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Status */}
              <div className="flex flex-col items-end gap-2 ml-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  <i className={`${getStatusIcon(booking.status)} mr-1`}></i>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
                <Link href={`/bookings/${booking.id}`}>
                  <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="p-4 bg-gray-50 rounded-b-xl">
        <Link href="/bookings" className="block">
          <button className="w-full py-2 text-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
            View All Bookings <i className="ri-arrow-right-line ml-1"></i>
          </button>
        </Link>
      </div>
    </div>
  );
}