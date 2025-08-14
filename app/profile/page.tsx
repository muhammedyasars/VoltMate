'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Button from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import { useToast } from '@/hooks/use-toast';
import { ToastContainer } from '@/components/ui/Toast';
// import AnimatedBackground from '@/components/AnimatedBackground';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuthStore();
  const { toasts, addToast, removeToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('personal-info');
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

  useEffect(() => {
    // Handle hash navigation
    const hash = window.location.hash.substring(1);
    if (hash) {
      setActiveSection(hash);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    
    // Add scroll event listener for highlighting active section
    const handleScroll = () => {
      const sections = ['personal-info', 'security', 'payment', 'notifications', 'privacy'];
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const scrollToSection = (sectionId:any) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    window.history.pushState(null, '', `#${sectionId}`);
  };

  return (
    <div className="min-h-screen relative bg-gray-50">
      {/* <AnimatedBackground /> */}
      <Header />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Hero Section with matching theme */}
      <section className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-8">
              <span className="text-green-400 text-sm font-medium">
                <i className="ri-user-settings-line mr-2"></i>
                Account Settings
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              My
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                {" Profile"}
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
              Manage your account preferences, personal information, and privacy settings
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 -mt-10">
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
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="md:sticky md:top-28">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-400 rounded-full blur-xl opacity-70 animate-pulse"></div>
                      <div className="relative w-24 h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mb-4 border-2 border-white shadow-lg">
                        <span className="text-3xl font-medium text-green-700">
                          {user?.name?.substring(0, 2).toUpperCase() || 'U'}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mt-2 mb-1">{user?.name || 'User'}</h3>
                    <p className="text-gray-500">{user?.email || 'user@example.com'}</p>
                    
                    <div className="mt-3 flex items-center">
                      <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                        Active Member
                      </span>
                    </div>
                  </div>
                  
                  <nav className="space-y-2">
                    {[
                      { id: 'personal-info', label: 'Personal Information', icon: 'ri-user-line' },
                      { id: 'security', label: 'Security', icon: 'ri-lock-line' },
                      { id: 'payment', label: 'Payment Methods', icon: 'ri-bank-card-line' },
                      { id: 'notifications', label: 'Notifications', icon: 'ri-notification-3-line' },
                      { id: 'privacy', label: 'Privacy', icon: 'ri-shield-check-line' }
                    ].map(item => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full flex items-center py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                          activeSection === item.id
                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <i className={`${item.icon} mr-3`}></i>
                        {item.label}
                      </button>
                    ))}
                  </nav>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <Link href="/dashboard">
                      <Button 
                        variant="outline" 
                        className="w-full border-gray-200 text-gray-700 hover:bg-gray-50"
                      >
                        <i className="ri-dashboard-line mr-2"></i>
                        Back to Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="mt-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <i className="ri-customer-service-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                      <p className="text-blue-100 text-sm mb-4">Our support team is here to assist you with any questions.</p>
                      <Link href="/contact">
                        <Button className="bg-white text-blue-600 hover:bg-blue-50 w-full">
                          Contact Support
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="md:col-span-3 space-y-8">
              {/* Personal Information */}
              <div id="personal-info" className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100 scroll-mt-28">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center mr-4 shadow-md">
                    <i className="ri-user-line text-white text-lg"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                </div>
                
                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="relative group">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
                          <i className="ri-user-line text-gray-400 group-focus-within:text-green-500 transition-colors"></i>
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all duration-300"
                        />
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
                          <i className="ri-mail-line text-gray-400"></i>
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-400 cursor-not-allowed"
                          disabled
                        />
                      </div>
                      <p className="mt-1.5 text-sm text-gray-500 flex items-center">
                        <i className="ri-information-line mr-1 text-yellow-500"></i>
                        Email cannot be changed. Contact support for assistance.
                      </p>
                    </div>
                    
                    <div className="relative group">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
                          <i className="ri-phone-line text-gray-400 group-focus-within:text-green-500 transition-colors"></i>
                        </div>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all duration-300"
                        />
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <div className="relative">
                        <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
                          <i className="ri-map-pin-line text-gray-400 group-focus-within:text-green-500 transition-colors"></i>
                        </div>
                        <input
                          id="address"
                          name="address"
                          type="text"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    isLoading={loading}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  >
                    <i className="ri-save-line mr-2"></i>
                    Save Changes
                  </Button>
                </form>
              </div>
              
              {/* Security */}
              <div id="security" className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100 scroll-mt-28">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-md">
                    <i className="ri-lock-line text-white text-lg"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Security</h2>
                </div>
                
                <form onSubmit={handlePasswordUpdate}>
                  <div className="space-y-5 mb-8">
                    <div className="relative group">
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
                          <i className="ri-lock-line text-gray-400 group-focus-within:text-blue-500 transition-colors"></i>
                        </div>
                        <input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300"
                        />
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
                          <i className="ri-lock-password-line text-gray-400 group-focus-within:text-blue-500 transition-colors"></i>
                        </div>
                        <input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300"
                        />
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
                          <i className="ri-checkbox-circle-line text-gray-400 group-focus-within:text-blue-500 transition-colors"></i>
                        </div>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    isLoading={loading}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                  >
                    <i className="ri-lock-password-line mr-2"></i>
                    Update Password
                  </Button>
                </form>
                
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                        <i className="ri-shield-keyhole-line text-blue-600 text-xl"></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Two-Factor Authentication</h3>
                        <p className="text-gray-600 mb-4">
                          Add an extra layer of security to your account by enabling two-factor authentication. 
                          We'll send a verification code to your phone each time you sign in.
                        </p>
                        
                        <Button 
                          variant="outline" 
                          className="bg-white border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                          <i className="ri-shield-keyhole-line mr-2"></i>
                          Enable 2FA
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment Methods */}
              <div id="payment" className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100 scroll-mt-28">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center mr-4 shadow-md">
                    <i className="ri-bank-card-line text-white text-lg"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-300 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-14 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                        <i className="ri-visa-fill text-white text-xl"></i>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Visa ending in 4242</p>
                        <div className="flex items-center mt-1">
                          <p className="text-sm text-gray-500 mr-3">Expires 12/2025</p>
                          <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Default</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                        <i className="ri-pencil-line"></i>
                      </button>
                      <button className="w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-300 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-14 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                        <i className="ri-mastercard-fill text-white text-xl"></i>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Mastercard ending in 8752</p>
                        <p className="text-sm text-gray-500">Expires 08/2024</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                        <i className="ri-pencil-line"></i>
                      </button>
                      <button className="w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  <i className="ri-add-line mr-2"></i>
                  Add Payment Method
                </Button>
              </div>
              
              {/* Notifications */}
              <div id="notifications" className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100 scroll-mt-28">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center mr-4 shadow-md">
                    <i className="ri-notification-3-line text-white text-lg"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Notification Preferences</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-yellow-200 transition-all duration-300 bg-white">
                    <div>
                      <p className="font-semibold text-gray-900 flex items-center">
                        <i className="ri-checkbox-circle-line text-green-500 mr-2"></i>
                        Booking Confirmations
                      </p>
                      <p className="text-sm text-gray-600 mt-1 ml-6">Receive notifications when your booking is confirmed</p>
                    </div>
                    <div className="relative inline-block w-14 h-7">
                      <input 
                        type="checkbox" 
                        id="booking-notifications" 
                        className="sr-only peer"
                        defaultChecked
                      />
                      <label 
                        htmlFor="booking-notifications"
                        className="absolute cursor-pointer bg-gray-300 rounded-full left-0 right-0 top-0 bottom-0 peer-checked:bg-green-500 transition-colors"
                      >
                        <span className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-all peer-checked:left-8 shadow-sm"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-yellow-200 transition-all duration-300 bg-white">
                    <div>
                      <p className="font-semibold text-gray-900 flex items-center">
                        <i className="ri-alarm-line text-blue-500 mr-2"></i>
                        Booking Reminders
                      </p>
                      <p className="text-sm text-gray-600 mt-1 ml-6">Receive reminders before your scheduled booking</p>
                    </div>
                    <div className="relative inline-block w-14 h-7">
                      <input 
                        type="checkbox" 
                        id="reminder-notifications" 
                        className="sr-only peer"
                        defaultChecked
                      />
                      <label 
                        htmlFor="reminder-notifications"
                        className="absolute cursor-pointer bg-gray-300 rounded-full left-0 right-0 top-0 bottom-0 peer-checked:bg-green-500 transition-colors"
                      >
                        <span className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-all peer-checked:left-8 shadow-sm"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-yellow-200 transition-all duration-300 bg-white">
                    <div>
                      <p className="font-semibold text-gray-900 flex items-center">
                        <i className="ri-mail-send-line text-purple-500 mr-2"></i>
                        Marketing Updates
                      </p>
                      <p className="text-sm text-gray-600 mt-1 ml-6">Receive promotional offers and updates</p>
                    </div>
                    <div className="relative inline-block w-14 h-7">
                      <input 
                        type="checkbox" 
                        id="marketing-notifications" 
                        className="sr-only peer"
                      />
                      <label 
                        htmlFor="marketing-notifications"
                        className="absolute cursor-pointer bg-gray-300 rounded-full left-0 right-0 top-0 bottom-0 peer-checked:bg-green-500 transition-colors"
                      >
                        <span className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-all peer-checked:left-8 shadow-sm"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-yellow-200 transition-all duration-300 bg-white">
                    <div>
                      <p className="font-semibold text-gray-900 flex items-center">
                        <i className="ri-battery-charge-line text-red-500 mr-2"></i>
                        Charging Notifications
                      </p>
                      <p className="text-sm text-gray-600 mt-1 ml-6">Receive alerts when your vehicle is fully charged</p>
                    </div>
                    <div className="relative inline-block w-14 h-7">
                      <input 
                        type="checkbox" 
                        id="charging-notifications" 
                        className="sr-only peer"
                        defaultChecked
                      />
                      <label 
                        htmlFor="charging-notifications"
                        className="absolute cursor-pointer bg-gray-300 rounded-full left-0 right-0 top-0 bottom-0 peer-checked:bg-green-500 transition-colors"
                      >
                        <span className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-all peer-checked:left-8 shadow-sm"></span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Communication Channels</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-yellow-200 text-yellow-600 hover:bg-yellow-50"
                    >
                      Manage Channels
                    </Button>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 flex items-center">
                      <i className="ri-mail-line text-blue-500 text-xl mr-3"></i>
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-xs text-gray-600">Primary</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 flex items-center">
                      <i className="ri-smartphone-line text-green-500 text-xl mr-3"></i>
                      <div>
                        <p className="font-medium text-gray-900">SMS</p>
                        <p className="text-xs text-gray-600">Enabled</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 flex items-center">
                      <i className="ri-push-notification-line text-purple-500 text-xl mr-3"></i>
                      <div>
                        <p className="font-medium text-gray-900">Push</p>
                        <p className="text-xs text-gray-600">Enabled</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Privacy Section */}
              <div id="privacy" className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100 scroll-mt-28">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center mr-4 shadow-md">
                    <i className="ri-shield-check-line text-white text-lg"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Privacy Settings</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Privacy</h3>
                    <p className="text-gray-700 mb-4">
                      Manage how your personal data is used and accessed across our platform.
                      Learn more about our data practices in our <Link href="/privacy" className="text-teal-600 hover:underline">Privacy Policy</Link>.
                    </p>
                    
                    <div className="space-y-3 mt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="data-sharing"
                            type="checkbox"
                            className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                            defaultChecked
                          />
                          <label htmlFor="data-sharing" className="ml-2 text-sm text-gray-700">
                            Allow data sharing with partners to improve services
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="location-tracking"
                            type="checkbox"
                            className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                            defaultChecked
                          />
                          <label htmlFor="location-tracking" className="ml-2 text-sm text-gray-700">
                            Enable location tracking for nearby station suggestions
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="usage-analytics"
                            type="checkbox"
                            className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                            defaultChecked
                          />
                          <label htmlFor="usage-analytics" className="ml-2 text-sm text-gray-700">
                            Share usage analytics to improve app experience
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Data</h3>
                    <p className="text-gray-700 mb-6">
                      You can request a copy of your personal data or delete your account at any time.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        variant="outline" 
                        className="border-teal-200 text-teal-600 hover:bg-teal-50"
                      >
                        <i className="ri-download-line mr-2"></i>
                        Download My Data
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <i className="ri-delete-bin-line mr-2"></i>
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Back to Top Button */}
              <div className="flex justify-center mt-8">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <i className="ri-arrow-up-line mr-2"></i>
                  Back to Top
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}