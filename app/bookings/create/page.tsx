'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import BookingForm from '@/components/forms/booking-form';
import LoadingSpinner from '@/components/ui/loader';
import { useStationStore } from '@/store/station-store';
import { useBookingStore } from '@/store/booking-store';
import { useAuthStore } from '@/store/auth-store';

export default function CreateBookingPage() {
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [duration, setDuration] = useState(60);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const { user } = useAuthStore();
  const { stations, fetchStations } = useStationStore();
  const { createBooking } = useBookingStore();

  useEffect(() => {
    fetchStations().then(() => {
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (formData:any) => {
    setLoading(true);
    try {
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
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Charging Session</h1>
          <p className="text-xl opacity-90">Schedule your next charging appointment in just a few steps</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <i className="ri-calendar-check-line text-2xl text-primary-600"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">New Booking</h2>
                <p className="text-gray-600">Fill in the details to secure your charging slot</p>
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
          </div>
        </div>
      </section>
    </div>
  );
}