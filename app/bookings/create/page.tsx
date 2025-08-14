'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import BookingForm from '@/components/forms/booking-form';
import LoadingSpinner from '@/components/ui/loader';
import { useStationStore } from '@/store/station-store';
import { useBookingStore } from '@/store/booking-store';
import { useAuthStore } from '@/store/auth-store';
// import AnimatedBackground from '@/components/AnimatedBackground';
import Button from '@/components/ui/button';
import Link from 'next/link';


interface BookingFormData {
  stationId: string;
  date: Date;
  startTime: string;
  duration: number;
}

export default function CreateBookingPage() {
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('09:00');
  const [duration, setDuration] = useState<number>(60);
  const [loading, setLoading] = useState<boolean>(true);
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  
  const { user } = useAuthStore();
  const { stations, fetchStations } = useStationStore();
  const { createBooking } = useBookingStore();

  useEffect(() => {
    const loadStations = async () => {
      try {
        await fetchStations();
      } catch (err) {
        console.error('Failed to fetch stations:', err);
        setError('Unable to load charging stations. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadStations();
  }, [fetchStations]);

  const handleSubmit = async (formData: BookingFormData) => {
    setFormSubmitting(true);
    setError(null);
    
    try {
      if (!user?.id) {
        throw new Error('You must be logged in to create a booking');
      }
      
      await createBooking({
        userId: user.id,
        stationId: formData.stationId,
        date: formData.date,
        startTime: formData.startTime,
        durationMinutes: formData.duration,
      });
      
      router.push('/bookings?success=true');
    } catch (error) {
      console.error('Failed to create booking:', error);
      setError(error instanceof Error ? error.message : 'Failed to create booking. Please try again.');
      setFormSubmitting(false);
    }
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

  return (
    <div className="min-h-screen relative bg-gray-50">
      {/* <AnimatedBackground /> */}
      <Header />
      
      {/* Hero Section with matching theme */}
      <section className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-8">
              <span className="text-green-400 text-sm font-medium">
                <i className="ri-calendar-check-line mr-2"></i>
                Schedule Session
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Book Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Charging Slot
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
              Reserve your charging session in advance to ensure availability when you need it
            </p>
          </div>
        </div>
      </section>
      
      {/* Booking Form Section */}
      <section className="relative z-10 -mt-10 px-4 sm:px-6 lg:px-8 pb-16">
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
        
        <div className="relative max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-start">
                <i className="ri-error-warning-line text-2xl mr-3 mt-0.5"></i>
                <div>
                  <h3 className="font-semibold mb-1">Error</h3>
                  <p>{error}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center mr-5 shadow-md">
                <i className="ri-calendar-check-line text-2xl text-white"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">New Booking</h2>
                <p className="text-gray-600">Fill in the details to secure your charging slot</p>
              </div>
            </div>
            
            {/* Progress Steps */}
            <div className="mb-8 relative">
              <div className="h-1 bg-gray-200 rounded-full absolute top-4 left-0 right-0 z-0"></div>
              <div className="h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full absolute top-4 left-0 z-10" style={{ width: '33.3%' }}></div>
              <div className="flex justify-between relative z-20">
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                    <i className="ri-map-pin-line"></i>
                  </div>
                  <p className="text-sm text-green-600 font-medium">Select Station</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <i className="ri-time-line"></i>
                  </div>
                  <p className="text-sm text-gray-500">Choose Time</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <i className="ri-check-line"></i>
                  </div>
                  <p className="text-sm text-gray-500">Confirm</p>
                </div>
              </div>
            </div>
            

            <BookingForm
              stations={stations}
              onSubmit={handleSubmit}
              initialValues={{
                stationId: selectedStation,
                date: selectedDate,
                startTime: selectedTime,
                duration: duration
              }}
            />
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <Link href="/stations">
                  <Button 
                    variant="outline" 
                    className="border-gray-200 text-gray-700 hover:bg-gray-50"
                  >
                    <i className="ri-arrow-left-line mr-2"></i>
                    Back to Stations
                  </Button>
                </Link>
                <div className="text-sm text-gray-500 italic">
                  <i className="ri-information-line mr-1"></i>
                  You can cancel bookings up to 1 hour before
                </div>
              </div>
            </div>
          </div>
          
          {/* Help Card */}
          <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-xl text-white p-6 flex items-start">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
              <i className="ri-customer-service-2-line text-2xl"></i>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Need help with your booking?</h3>
              <p className="text-blue-100 mb-4">Our support team is available 24/7 to assist you with any questions.</p>
              <Link href="/chat">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  <i className="ri-chat-1-line mr-2"></i>
                  Chat with Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}