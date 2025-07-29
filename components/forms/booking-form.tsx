'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';

interface BookingFormProps {
  stations: any[];
  onSubmit: (data: any) => void;
  initialValues?: {
    stationId: string | null;
    date: Date;
    startTime: string;
    duration: number;
  };
}

export default function BookingForm({ stations, onSubmit, initialValues }: BookingFormProps) {
  const [stationId, setStationId] = useState(initialValues?.stationId || '');
  const [date, setDate] = useState(initialValues?.date || new Date());
  const [startTime, setStartTime] = useState(initialValues?.startTime || '09:00');
  const [duration, setDuration] = useState(initialValues?.duration || 60);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedStation, setSelectedStation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();

  // Format date for input
  const formattedDate = date.toISOString().split('T')[0];

  useEffect(() => {
    if (stationId) {
      const station = stations.find(s => s.id === stationId);
      setSelectedStation(station);
    } else {
      setSelectedStation(null);
    }
  }, [stationId, stations]);

  const timeSlots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      timeSlots.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  const durationOptions = [
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' },
    { value: 180, label: '3 hours' },
    { value: 240, label: '4 hours' }
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!stationId) {
      newErrors.stationId = 'Please select a charging station';
    }
    
    if (!date) {
      newErrors.date = 'Please select a date';
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Please select a date in the future';
      }
    }
    
    if (!startTime) {
      newErrors.startTime = 'Please select a start time';
    }
    
    if (!duration) {
      newErrors.duration = 'Please select a duration';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    // Calculate the end time based on start time and duration
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date(date);
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + duration);
    
    onSubmit({
      stationId,
      date: formattedDate,
      startTime,
      duration,
      userId: user?.id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    });
  };

  // Calculate estimated price
  const calculatePrice = () => {
    if (!selectedStation || !duration) return null;
    
    const pricePerHour = parseFloat(selectedStation.price.replace(/[^0-9.]/g, ''));
    return ((pricePerHour * duration) / 60).toFixed(2);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <label htmlFor="stationId" className="block text-sm font-medium text-gray-700 mb-1">
            Charging Station
          </label>
          <select
            id="stationId"
            value={stationId}
            onChange={(e) => {
              setStationId(e.target.value);
              if (errors.stationId) {
                setErrors(prev => ({ ...prev, stationId: '' }));
              }
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.stationId ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select a station</option>
            {stations
              .filter(station => station.status === 'available')
              .map(station => (
                <option key={station.id} value={station.id}>
                  {station.name} - {station.address}
                </option>
              ))
            }
          </select>
          {errors.stationId && (
            <p className="mt-1 text-red-500 text-sm">{errors.stationId}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              id="date"
              type="date"
              value={formattedDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                setDate(new Date(e.target.value));
                if (errors.date) {
                  setErrors(prev => ({ ...prev, date: '' }));
                }
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-red-500 text-sm">{errors.date}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <select
              id="startTime"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                if (errors.startTime) {
                  setErrors(prev => ({ ...prev, startTime: '' }));
                }
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.startTime ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {timeSlots.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.startTime && (
              <p className="mt-1 text-red-500 text-sm">{errors.startTime}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            Duration
          </label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => {
              setDuration(Number(e.target.value));
              if (errors.duration) {
                setErrors(prev => ({ ...prev, duration: '' }));
              }
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.duration ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            {durationOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.duration && (
            <p className="mt-1 text-red-500 text-sm">{errors.duration}</p>
          )}
        </div>
        
        {selectedStation && (
          <div className="bg-gray-50 p-6 rounded-lg mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Station</span>
                <span className="font-medium">{selectedStation.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-medium">{formattedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time</span>
                <span className="font-medium">{startTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{duration} minutes</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
                <span className="text-gray-800 font-medium">Estimated Price</span>
                <span className="font-bold text-primary-600">${calculatePrice()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
          <i className="ri-calendar-check-line mr-2"></i>
          Confirm Booking
        </Button>
      </div>
    </form>
  );
}