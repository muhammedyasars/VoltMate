'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Button from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import { useToast } from '@/hooks/use-toast';
import { ToastContainer } from '@/components/ui/Toast';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuthStore();
  const { toasts, addToast, removeToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      }));
    }
  }, [user]);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      
      addToast('Profile updated successfully', 'success');
    } catch (error) {
      addToast('Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e:any) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      addToast('Passwords do not match', 'error');
      return;
    }
    
    setLoading(true);
    
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      
      addToast('Password updated successfully', 'success');
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      addToast('Failed to update password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Profile</h1>
          <p className="text-xl opacity-90">Manage your account settings and preferences</p>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl font-medium text-primary-700">
                    {user?.name?.substring(0, 2).toUpperCase() || 'U'}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{user?.name}</h3>
                <p className="text-gray-500">{user?.email}</p>
              </div>
              
              <nav className="space-y-1">
                <a href="#personal-info" className="flex items-center py-3 px-4 rounded-lg bg-primary-50 text-primary-700 font-medium">
                  <i className="ri-user-line mr-3"></i>
                  Personal Information
                </a>
                <a href="#security" className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                  <i className="ri-lock-line mr-3"></i>
                  Security
                </a>
                <a href="#payment" className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                  <i className="ri-bank-card-line mr-3"></i>
                  Payment Methods
                </a>
                <a href="#notifications" className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                  <i className="ri-notification-3-line mr-3"></i>
                  Notifications
                </a>
                <a href="#privacy" className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                  <i className="ri-shield-check-line mr-3"></i>
                  Privacy
                </a>
              </nav>
            </div>
          </div>
          
          {/* Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Personal Information */}
            <div id="personal-info" className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              
              <form onSubmit={handleProfileUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      disabled
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Email cannot be changed. Contact support for assistance.
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                
                <Button type="submit" isLoading={loading}>
                  Save Changes
                </Button>
              </form>
            </div>
            
            {/* Security */}
            <div id="security" className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Security</h2>
              
              <form onSubmit={handlePasswordUpdate}>
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                
                <Button type="submit" isLoading={loading}>
                  Update Password
                </Button>
              </form>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
                <p className="text-gray-600 mb-4">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                
                <Button variant="outline">
                  <i className="ri-shield-keyhole-line mr-2"></i>
                  Enable 2FA
                </Button>
              </div>
            </div>
            
            {/* Payment Methods */}
            <div id="payment" className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Methods</h2>
              
              <div className="space-y-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-8 bg-blue-100 rounded flex items-center justify-center mr-4">
                      <i className="ri-visa-line text-blue-600 text-xl"></i>
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/2025</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <i className="ri-pencil-line"></i>
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              </div>
              
              <Button variant="outline">
                <i className="ri-add-line mr-2"></i>
                Add Payment Method
              </Button>
            </div>
            
            {/* Notifications */}
            <div id="notifications" className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Booking Confirmations</p>
                    <p className="text-sm text-gray-500">Receive notifications when your booking is confirmed</p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input 
                      type="checkbox" 
                      id="booking-notifications" 
                      className="sr-only peer"
                      defaultChecked
                    />
                    <label 
                      htmlFor="booking-notifications"
                      className="absolute cursor-pointer bg-gray-300 rounded-full left-0 right-0 top-0 bottom-0 peer-checked:bg-primary-500 transition-colors"
                    >
                      <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:left-7"></span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Booking Reminders</p>
                    <p className="text-sm text-gray-500">Receive reminders before your scheduled booking</p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input 
                      type="checkbox" 
                      id="reminder-notifications" 
                      className="sr-only peer"
                      defaultChecked
                    />
                    <label 
                      htmlFor="reminder-notifications"
                      className="absolute cursor-pointer bg-gray-300 rounded-full left-0 right-0 top-0 bottom-0 peer-checked:bg-primary-500 transition-colors"
                    >
                      <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:left-7"></span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Marketing Updates</p>
                    <p className="text-sm text-gray-500">Receive promotional offers and updates</p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input 
                      type="checkbox" 
                      id="marketing-notifications" 
                      className="sr-only peer"
                    />
                    <label 
                      htmlFor="marketing-notifications"
                      className="absolute cursor-pointer bg-gray-300 rounded-full left-0 right-0 top-0 bottom-0 peer-checked:bg-primary-500 transition-colors"
                    >
                      <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:left-7"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}