'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import Button from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loader';
import { useBookingStore } from '@/store/booking-store';
import { useToast } from '@/hooks/use-toast';
import { ToastContainer } from '@/components/ui/Toast';
import Link from 'next/link';

export default function BookingDetailPage() {
//   const { id } = useParams();
const id: string="5";
  const router = useRouter();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { fetchBookingById, currentBooking, cancelBooking, loading } = useBookingStore();
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    if (id) {
      fetchBookingById(id);
    }
  }, [id]);

  const handleCancelBooking = async () => {
    setIsSubmitting(true);
    
    try {
      await cancelBooking(id);
      setShowCancelModal(false);
      addToast('Booking cancelled successfully', 'success');
      
      // Reload the current booking data
      fetchBookingById(id);
    } catch (error) {
      addToast('Failed to cancel booking', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString:string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-16 flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (!currentBooking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-16">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <i className="ri-error-warning-line text-6xl text-red-500 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h2>
            <p className="text-gray-600 mb-8">The booking you're looking for doesn't exist or may have been removed.</p>
            <Link href="/bookings">
              <Button>
                <i className="ri-arrow-left-line mr-2"></i>
                Back to Bookings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Booking Details</h1>
              <p className="text-xl opacity-90">
                Booking #{currentBooking.id.substring(0, 8)}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                currentBooking.status === 'confirmed' ? 'bg-green-500 text-white' :
                currentBooking.status === 'completed' ? 'bg-blue-500 text-white' :
                currentBooking.status === 'cancelled' ? 'bg-red-500 text-white' :
                'bg-yellow-500 text-white'
              }`}>
                <span className="w-2 h-2 rounded-full bg-white mr-2"></span>
                {currentBooking.status.charAt(0).toUpperCase() + currentBooking.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Station</p>
                  <p className="font-semibold flex items-center">
                    <i className="ri-charging-pile-2-line mr-2 text-primary-600"></i>
                    {currentBooking.station?.name || 'Station Name'}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm mb-1">Location</p>
                  <p className="font-semibold flex items-center">
                    <i className="ri-map-pin-line mr-2 text-primary-600"></i>
                    {currentBooking.station?.address || 'Station Address'}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm mb-1">Date</p>
                  <p className="font-semibold flex items-center">
                    <i className="ri-calendar-line mr-2 text-primary-600"></i>
                    {formatDate(currentBooking.startTime)}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm mb-1">Time</p>
                  <p className="font-semibold flex items-center">
                    <i className="ri-time-line mr-2 text-primary-600"></i>
                    {formatTime(currentBooking.startTime)} - {formatTime(currentBooking.endTime)}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm mb-1">Duration</p>
                  <p className="font-semibold flex items-center">
                    <i className="ri-timer-line mr-2 text-primary-600"></i>
                    {currentBooking.duration} minutes
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm mb-1">Charger Type</p>
                  <p className="font-semibold flex items-center">
                    <i className="ri-plug-line mr-2 text-primary-600"></i>
                    {currentBooking.station?.chargerType || 'Type 2'}
                  </p>
                </div>
              </div>
              
              {currentBooking.status === 'completed' && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Charging Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-500 text-sm mb-1">Energy Consumed</p>
                      <p className="text-2xl font-bold text-primary-600">
                        {currentBooking.kwh || '15.2'} kWh
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-500 text-sm mb-1">CO₂ Saved</p>
                      <p className="text-2xl font-bold text-green-600">
                        {((currentBooking.kwh || 15.2) * 0.4).toFixed(1)} kg
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-500 text-sm mb-1">Range Added</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {Math.round((currentBooking.kwh || 15.2) * 3.5)} mi
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Additional Information */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-700">Charging Fee</span>
                  <span className="font-semibold">${currentBooking.totalPrice ? (currentBooking.totalPrice * 0.85).toFixed(2) : '12.75'}</span>
                </div>
                
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-700">Service Fee</span>
                  <span className="font-semibold">${currentBooking.totalPrice ? (currentBooking.totalPrice * 0.15).toFixed(2) : '2.25'}</span>
                </div>
                
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-700">Tax</span>
                  <span className="font-semibold">${currentBooking.totalPrice ? (currentBooking.totalPrice * 0.08).toFixed(2) : '1.20'}</span>
                </div>
                
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-primary-600">${currentBooking.totalPrice ? (currentBooking.totalPrice * 1.08).toFixed(2) : '16.20'}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <div className="w-10 h-6 bg-blue-100 rounded flex items-center justify-center mr-3">
                      <i className="ri-visa-line text-blue-600"></i>
                    </div>
                    <span className="text-gray-700">
                      Visa ending in 4242
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Actions Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Actions</h3>
              
              <div className="space-y-4">
                {currentBooking.status === 'confirmed' && (
                  <Button 
                    onClick={() => setShowCancelModal(true)}
                    variant="outline" 
                    className="w-full border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <i className="ri-close-circle-line mr-2"></i>
                    Cancel Booking
                  </Button>
                )}
                
                <Link href="/bookings/create">
                  <Button variant="outline" className="w-full">
                    <i className="ri-add-circle-line mr-2"></i>
                    New Booking
                  </Button>
                </Link>
                
                <Link href={`/stations/${currentBooking.station?.id}`}>
                  <Button variant="outline" className="w-full">
                    <i className="ri-information-line mr-2"></i>
                    View Station
                  </Button>
                </Link>
                
                <Button variant="outline" className="w-full">
                  <i className="ri-printer-line mr-2"></i>
                  Print Receipt
                </Button>
                
                <Button variant="outline" className="w-full">
                  <i className="ri-download-line mr-2"></i>
                  Download PDF
                </Button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Need Help?</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Have questions about this booking or need assistance?
                </p>
                <Link href="/chat">
                  <Button className="w-full">
                    <i className="ri-customer-service-2-line mr-2"></i>
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCancelModal(false)}></div>
          <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 mx-4">
            <button
              onClick={() => setShowCancelModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-close-circle-line text-3xl text-red-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Cancel Booking</h3>
              <p className="text-gray-600 mt-1">
                Are you sure you want to cancel this booking?
              </p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="cancelReason" className="block text-sm font-medium text-gray-700 mb-1">
                Reason for cancellation (optional)
              </label>
              <select
                id="cancelReason"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a reason</option>
                <option value="schedule_change">Change in schedule</option>
                <option value="found_alternative">Found alternative charging solution</option>
                <option value="vehicle_issue">Vehicle issue</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={() => setShowCancelModal(false)}
                variant="outline"
                className="flex-1"
              >
                Keep Booking
              </Button>
              <Button
                onClick={handleCancelBooking}
                className="flex-1 bg-red-600 hover:bg-red-700"
                isLoading={isSubmitting}
              >
                Cancel Booking
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}