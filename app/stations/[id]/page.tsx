'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import Button from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loader';
import { useStationStore } from '@/store/station-store';
import Link from 'next/link';

export default function StationDetailPage() {
//   const { id } = useParams();
const id:any=2
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { fetchStationById, currentStation } = useStationStore();

  useEffect(() => {
    if (id) {
      fetchStationById(id).then(() => {
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <LoadingSpinner />;
  
  if (!currentStation) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-16 text-center">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <i className="ri-error-warning-line text-6xl text-red-500 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Station Not Found</h2>
            <p className="text-gray-600 mb-8">The charging station you're looking for doesn't exist or may have been removed.</p>
            <Link href="/stations">
              <Button>
                <i className="ri-arrow-left-line mr-2"></i>
                Back to Stations
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
      
      {/* Hero Section with Station Image */}
      <section className="relative h-80">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${currentStation.imageUrl || "https://images.unsplash.com/photo-1593941707882-a156679de2a9?q=80&w=1024&auto=format&fit=crop"})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
        
        <div className="container relative z-10 h-full flex items-end pb-8">
          <div className="text-white">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
              currentStation.status === 'available' ? 'bg-green-500' :
              currentStation.status === 'occupied' ? 'bg-yellow-500' : 'bg-red-500'
            } mb-4`}>
              <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
              <span>{
                currentStation.status === 'available' ? 'Available' :
                currentStation.status === 'occupied' ? 'Occupied' : 'Unavailable'
              }</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">{currentStation.name}</h1>
            <p className="text-xl opacity-90">{currentStation.address}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Station Details */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Station Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Charger Type</p>
                  <p className="font-semibold flex items-center">
                    <i className="ri-plug-line mr-2 text-primary-600"></i>
                    {currentStation.chargerType || 'Type 2, CCS'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Power Output</p>
                  <p className="font-semibold flex items-center">
                    <i className="ri-flashlight-line mr-2 text-primary-600"></i>
                    {currentStation.powerOutput || '150 kW'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Price</p>
                  <p className="font-semibold flex items-center">
                    <i className="ri-money-dollar-circle-line mr-2 text-primary-600"></i>
                    {currentStation.price || '$0.35 per kWh'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Operating Hours</p>
                  <p className="font-semibold flex items-center">
                    <i className="ri-time-line mr-2 text-primary-600"></i>
                    {currentStation.operatingHours || '24/7'}
                  </p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {currentStation.description || 'This modern charging station offers high-speed charging for all electric vehicle types. Located in a convenient location with amenities nearby, its perfect for a quick charge while running errands or a longer session during your workday.'}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Wi-Fi', 'Restrooms', 'Cafe', 'Parking', 'Shopping', 'Waiting Area'].map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <i className="ri-checkbox-circle-line text-green-600 mr-2"></i>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
              <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <i className="ri-map-pin-line text-6xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500">Interactive map will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking Card */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Book This Station</h3>
              
              <div className="mb-6">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium ${
                    currentStation.status === 'available' ? 'text-green-600' :
                    currentStation.status === 'occupied' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {currentStation.status === 'available' ? 'Available' :
                     currentStation.status === 'occupied' ? 'Occupied' : 'Unavailable'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Next Available</span>
                  <span className="font-medium">Today, 14:30</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Price</span>
                  <span className="font-medium">{currentStation.price || '$0.35 per kWh'}</span>
                </div>
              </div>
              
              {currentStation.status === 'available' ? (
                <Link href={`/bookings/create?stationId=${id}`}>
                  <Button size="lg" className="w-full mb-4">
                    <i className="ri-calendar-check-line mr-2"></i>
                    Book Now
                  </Button>
                </Link>
              ) : (
                <Button size="lg" className="w-full mb-4" disabled>
                  <i className="ri-time-line mr-2"></i>
                  Currently Unavailable
                </Button>
              )}
              
              <button className="w-full flex items-center justify-center py-3 text-primary-600 font-medium hover:text-primary-700 transition-colors">
                <i className="ri-heart-line mr-2"></i>
                Save to Favorites
              </button>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 mb-3">Need Help?</h4>
                <p className="text-gray-600 text-sm mb-4">Have questions about this station or need assistance?</p>
                <Link href="/chat">
                  <Button variant="outline" className="w-full">
                    <i className="ri-customer-service-2-line mr-2"></i>
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}