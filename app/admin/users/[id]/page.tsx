'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/layout/admin-sidebar';
import LoadingSpinner from '@/components/ui/loader';
import Link from 'next/link';

interface UserDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastActive: string;
  totalBookings: number;
  totalSpent: number;
  preferredStation: string;
  vehicles: Array<{
    id: string;
    make: string;
    model: string;
    year: number;
    chargerType: string;
  }>;
  recentBookings: Array<{
    id: string;
    date: string;
    station: string;
    duration: number;
    amount: number;
    status: string;
  }>;
}

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserDetail | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUser({
        id: params.id as string,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 555-1234',
        status: 'active',
        joinDate: '2024-01-15T00:00:00Z',
        lastActive: new Date().toISOString(),
        totalBookings: 45,
        totalSpent: 1250.50,
        preferredStation: 'Downtown Station A',
        vehicles: [
          {
            id: 'VEH001',
            make: 'Tesla',
            model: 'Model 3',
            year: 2022,
            chargerType: 'Type 2'
          },
          {
            id: 'VEH002',
            make: 'Nissan',
            model: 'Leaf',
            year: 2021,
            chargerType: 'CHAdeMO'
          }
        ],
        recentBookings: Array.from({ length: 10 }, (_, i) => ({
          id: `BKG${10000 + i}`,
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
          station: `Station ${Math.floor(Math.random() * 10) + 1}`,
          duration: [30, 60, 90][Math.floor(Math.random() * 3)],
          amount: Math.floor(Math.random() * 50) + 20,
          status: ['completed', 'upcoming', 'cancelled'][Math.floor(Math.random() * 3)]
        }))
      });
      setLoading(false);
    }, 1000);
  }, [params.id]);

  if (loading) return <LoadingSpinner />;
  if (!user) return <div>User not found</div>;

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
              Back to Users
            </button>
            
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mr-6">
                  <i className="ri-user-line text-gray-600 text-3xl"></i>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 
                      user.status === 'inactive' ? 'bg-gray-100 text-gray-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Member since {new Date(user.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <i className="ri-mail-line mr-2"></i>
                  Send Email
                </button>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  <i className="ri-edit-line mr-2"></i>
                  Edit User
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
                  <p className="text-gray-600 text-sm">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{user.totalBookings}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-calendar-check-line text-blue-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">${user.totalSpent.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-money-dollar-circle-line text-green-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Vehicles</p>
                  <p className="text-2xl font-bold text-gray-900">{user.vehicles.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="ri-car-line text-purple-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Last Active</p>
                  <p className="text-lg font-bold text-gray-900">Today</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="ri-time-line text-orange-600 text-xl"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                {['overview', 'bookings', 'vehicles', 'activity'].map((tab) => (
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <i className="ri-mail-line text-gray-400 mr-3"></i>
                        <span className="text-gray-600">{user.email}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-phone-line text-gray-400 mr-3"></i>
                        <span className="text-gray-600">{user.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-map-pin-line text-gray-400 mr-3"></i>
                        <span className="text-gray-600">Preferred: {user.preferredStation}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average booking duration</span>
                        <span className="font-medium">65 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cancellation rate</span>
                        <span className="font-medium">5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loyalty points</span>
                        <span className="font-medium">2,450</span>
                      </div>
                    </div>
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
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Station</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {user.recentBookings.map((booking) => (
                          <tr key={booking.id}>
                            <td className="px-4 py-3 text-sm">{booking.id}</td>
                            <td className="px-4 py-3 text-sm">{new Date(booking.date).toLocaleDateString()}</td>
                            <td className="px-4 py-3 text-sm">{booking.station}</td>
                            <td className="px-4 py-3 text-sm">{booking.duration} min</td>
                            <td className="px-4 py-3 text-sm">${booking.amount}</td>
                            <td className="px-4 py-3 text-sm">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                                booking.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
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

              {activeTab === 'vehicles' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Registered Vehicles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.vehicles.map((vehicle) => (
                      <div key={vehicle.id} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{vehicle.make} {vehicle.model}</h4>
                          <span className="text-sm text-gray-500">{vehicle.year}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <i className="ri-plug-2-line text-gray-400 mr-2"></i>
                            <span className="text-gray-600">Charger: {vehicle.chargerType}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <i className="ri-car-line text-gray-400 mr-2"></i>
                            <span className="text-gray-600">ID: {vehicle.id}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
                      <button className="text-primary-600 flex items-center">
                        <i className="ri-add-line mr-2"></i>
                        Add New Vehicle
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {Array.from({ length: 6 }, (_, i) => (
                      <div key={i} className="flex items-start pb-4 border-b border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                          <i className={`${
                            i % 3 === 0 ? 'ri-calendar-check-line text-blue-600' : 
                            i % 3 === 1 ? 'ri-user-settings-line text-purple-600' : 
                            'ri-login-circle-line text-green-600'
                          }`}></i>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900">
                            {i % 3 === 0 ? `Booked a charging session at ${['Downtown', 'Airport', 'Mall'][i % 3]} Station` : 
                             i % 3 === 1 ? 'Updated profile information' : 
                             'Logged in from new device'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {i * 2 + 1} days ago
                          </p>
                        </div>
                      </div>
                    ))}
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