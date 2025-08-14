'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/layout/admin-sidebar';
import LoadingSpinner from '@/components/ui/loader';
import Link from 'next/link';

interface ChargerUnit {
  id: string;
  type: string;
  power: number;
  status: 'available' | 'in-use' | 'offline' | 'maintenance';
  lastMaintenance: string;
  currentUser?: string;
  estimatedCompletion?: string;
}

interface StationDetail {
  id: string;
  name: string;
  location: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: 'online' | 'offline' | 'maintenance';
  openingHours: string;
  manager: {
    id: string;
    name: string;
    phone: string;
  };
  chargers: ChargerUnit[];
  metrics: {
    dailyBookings: number;
    monthlyBookings: number;
    dailyRevenue: number;
    monthlyRevenue: number;
    utilization: number;
    averageChargingTime: number;
    customerRating: number;
    totalReviews: number;
  };
  recentBookings: Array<{
    id: string;
    user: string;
    date: string;
    duration: number;
    chargerType: string;
    amount: number;
    status: string;
  }>;
}

export default function StationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [station, setStation] = useState<StationDetail | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setTimeout(() => {
      setStation({
        id: params.id as string,
        name: 'Downtown Charging Hub',
        location: 'Downtown',
        address: '123 Main Street, Metro City, State 12345',
        coordinates: {
          lat: 40.7128,
          lng: -74.0060
        },
        status: 'online',
        openingHours: '24/7',
        manager: {
          id: 'MGR1005',
          name: 'Sarah Johnson',
          phone: '+1 555-6789'
        },
        chargers: Array.from({ length: 8 }, (_, i) => ({
          id: `CHG${i + 1}`,
          type: ['Type 2', 'CCS', 'CHAdeMO'][Math.floor(Math.random() * 3)],
          power: [7, 22, 50, 150, 350][Math.floor(Math.random() * 5)],
          status: ['available', 'in-use', 'offline', 'maintenance'][Math.floor(Math.random() * 4)] as ChargerUnit['status'],
          lastMaintenance: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
          currentUser: Math.random() > 0.5 ? 'User Name' : undefined,
          estimatedCompletion: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 2 * 60 * 60 * 1000).toISOString() : undefined
        })),
        metrics: {
          dailyBookings: 42,
          monthlyBookings: 845,
          dailyRevenue: 560,
          monthlyRevenue: 12450,
          utilization: 78,
          averageChargingTime: 45,
          customerRating: 4.7,
          totalReviews: 128
        },
        recentBookings: Array.from({ length: 10 }, (_, i) => ({
          id: `BKG${10000 + i}`,
          user: `User ${Math.floor(Math.random() * 20) + 1}`,
          date: new Date(Date.now() - i * Math.random() * 24 * 60 * 60 * 1000).toISOString(),
          duration: Math.floor(Math.random() * 60) + 30,
          chargerType: ['Type 2', 'CCS', 'CHAdeMO'][Math.floor(Math.random() * 3)],
          amount: Math.floor(Math.random() * 50) + 20,
          status: ['completed', 'in-progress', 'upcoming', 'cancelled'][Math.floor(Math.random() * 4)]
        }))
      });
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const getChargerStatusColor = (status: ChargerUnit['status']) => {
    const colors = {
      'available': 'bg-green-100 text-green-800',
      'in-use': 'bg-blue-100 text-blue-800',
      'offline': 'bg-red-100 text-red-800',
      'maintenance': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status];
  };

  if (loading) return <LoadingSpinner />;
  if (!station) return <div>Station not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1">
        <div className="container py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900 mb-4 flex items-center"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Back to Stations
            </button>
            
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <h1 className="text-3xl font-bold text-gray-900">{station.name}</h1>
                  <span className={`ml-4 px-3 py-1 text-sm font-medium rounded-full ${
                    station.status === 'online' ? 'bg-green-100 text-green-800' : 
                    station.status === 'offline' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {station.status.charAt(0).toUpperCase() + station.status.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">{station.address}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <i className="ri-map-pin-line mr-2"></i>
                  View on Map
                </button>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  <i className="ri-edit-line mr-2"></i>
                  Edit Station
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <i className="ri-more-2-fill text-xl"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Daily Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{station.metrics.dailyBookings}</p>
                  <p className="text-xs text-green-600 mt-1">+8% from average</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-calendar-check-line text-blue-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Daily Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${station.metrics.dailyRevenue}</p>
                  <p className="text-xs text-green-600 mt-1">+12% from average</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-money-dollar-circle-line text-green-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Utilization</p>
                  <p className="text-2xl font-bold text-gray-900">{station.metrics.utilization}%</p>
                  <p className="text-xs text-green-600 mt-1">+5% from last week</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="ri-percent-line text-purple-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Customer Rating</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900 mr-2">{station.metrics.customerRating}</p>
                    <div className="flex">
                      <i className="ri-star-fill text-yellow-400"></i>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{station.metrics.totalReviews} reviews</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <i className="ri-star-line text-yellow-600 text-xl"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                {['overview', 'chargers', 'bookings', 'analytics'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-medium capitalize ${
                      activeTab === tab
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Station Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <i className="ri-map-pin-line text-gray-400 mr-3"></i>
                        <span className="text-gray-600">{station.address}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-time-line text-gray-400 mr-3"></i>
                        <span className="text-gray-600">Hours: {station.openingHours}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-user-settings-line text-gray-400 mr-3"></i>
                        <span className="text-gray-600">Manager: {station.manager.name}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-phone-line text-gray-400 mr-3"></i>
                        <span className="text-gray-600">{station.manager.phone}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Performance Metrics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average charging time</span>
                        <span className="font-medium">{station.metrics.averageChargingTime} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly bookings</span>
                        <span className="font-medium">{station.metrics.monthlyBookings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly revenue</span>
                        <span className="font-medium">${station.metrics.monthlyRevenue}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Charger Status</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm text-gray-600">Available</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                            <span className="text-sm text-gray-600">In Use</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <span className="text-sm text-gray-600">Offline</span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-600">{station.chargers.length} Total Chargers</span>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-3">
                        {station.chargers.map((charger) => (
                          <div 
                            key={charger.id}
                            className={`p-2 rounded-lg border ${
                              charger.status === 'available' ? 'border-green-200 bg-green-50' :
                              charger.status === 'in-use' ? 'border-blue-200 bg-blue-50' :
                              charger.status === 'offline' ? 'border-red-200 bg-red-50' :
                              'border-yellow-200 bg-yellow-50'
                            }`}
                          >
                            <div className="text-center">
                              <div className="font-medium">{charger.id}</div>
                              <div className="text-xs text-gray-500">{charger.power} kW</div>
                              <div className="text-xs mt-1">{charger.type}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Map Location</h3>
                    <div className="bg-gray-200 rounded-lg h-40 flex items-center justify-center">
                      <span className="text-gray-500">Map view placeholder</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'chargers' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Charger Units</h3>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center">
                      <i className="ri-add-line mr-2"></i>
                      Add Charger
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {station.chargers.map((charger) => (
                      <div key={charger.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className={`px-4 py-3 font-medium flex justify-between items-center ${
                          charger.status === 'available' ? 'bg-green-50' :
                          charger.status === 'in-use' ? 'bg-blue-50' :
                          charger.status === 'offline' ? 'bg-red-50' :
                          'bg-yellow-50'
                        }`}>
                          <div className="flex items-center">
                            <span>{charger.id}</span>
                            <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${getChargerStatusColor(charger.status)}`}>
                              {charger.status.replace('-', ' ')}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <i className="ri-refresh-line"></i>
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <i className="ri-settings-line"></i>
                            </button>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Type</p>
                              <p className="font-medium">{charger.type}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Power</p>
                              <p className="font-medium">{charger.power} kW</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Last Maintenance</p>
                              <p className="font-medium">{new Date(charger.lastMaintenance).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Current User</p>
                              <p className="font-medium">{charger.currentUser || 'None'}</p>
                            </div>
                          </div>
                          
                          {charger.status === 'in-use' && charger.estimatedCompletion && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-blue-600">Est. completion</span>
                                <span className="font-medium text-blue-800">
                                  {new Date(charger.estimatedCompletion).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </div>
                          )}
                          
                          {charger.status === 'maintenance' && (
                            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                              <div className="text-sm text-yellow-800">
                                <span className="font-medium">Maintenance note:</span> Scheduled maintenance in progress
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'bookings' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Charger</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {station.recentBookings.map((booking) => (
                          <tr key={booking.id}>
                            <td className="px-4 py-3 text-sm">{booking.id}</td>
                            <td className="px-4 py-3 text-sm">{booking.user}</td>
                            <td className="px-4 py-3 text-sm">{new Date(booking.date).toLocaleDateString()}</td>
                            <td className="px-4 py-3 text-sm">{booking.duration} min</td>
                            <td className="px-4 py-3 text-sm">{booking.chargerType}</td>
                            <td className="px-4 py-3 text-sm">${booking.amount}</td>
                            <td className="px-4 py-3 text-sm">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                                booking.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                booking.status === 'upcoming' ? 'bg-purple-100 text-purple-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {booking.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Patterns</h3>
                      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                        <span className="text-gray-500">Usage chart placeholder</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
                      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                        <span className="text-gray-500">Revenue chart placeholder</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Times</h3>
                      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                        <span className="text-gray-500">Popular times chart placeholder</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Charger Utilization</h3>
                      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                        <span className="text-gray-500">Charger utilization chart placeholder</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}