'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// import AnimatedBackground from '../components/AnimatedBackground';
import FloatingChat from '../components/ui/floatingChat';
import Button from '../components/ui/button';
import LoadingSpinner from '../components/ui/loader';
import { Clock, Zap, MapPin, Calendar, LogIn } from 'lucide-react';
import LoginModal from '@/components/modals/login-modal';
import RegisterModal from "@/components/modals/register-modal";
import { useModalStore } from '@/store/modal-store';
import managerRegister from '@/components/modals/manager-register-modal'

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Tesla Model 3 Owner",
    company: "Tech Innovations Inc.",
    content: "EVCharge has transformed our corporate fleet management. The enterprise dashboard provides comprehensive analytics and the reliability is unmatched in the industry.",
    avatar: "SJ",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Fleet Operations Director",
    company: "Global Logistics Corp.",
    content: "The seamless integration with our existing systems and the professional support team make EVCharge our preferred charging infrastructure partner.",
    avatar: "MC",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Sustainability Officer",
    company: "Green Future Foundation",
    content: "EVCharge's commitment to sustainable infrastructure aligns perfectly with our environmental goals. Their carbon offset program is industry-leading.",
    avatar: "ED",
    rating: 5
  }
];

const features = [
  {
    icon: "ri-radar-line",
    title: "Intelligent Network Management",
    description: "AI-powered station discovery with predictive availability and dynamic pricing optimization.",
    highlight: "AI-Powered"
  },
  {
    icon: "ri-shield-star-line",
    title: "Enterprise-Grade Security",
    description: "Bank-level encryption, PCI DSS compliance, and advanced fraud protection for all transactions.",
    highlight: "ISO 27001"
  },
  {
    icon: "ri-bar-chart-box-line",
    title: "Advanced Analytics Suite",
    description: "Comprehensive reporting dashboard with real-time metrics, usage patterns, and cost optimization insights.",
    highlight: "Real-time"
  },
  {
    icon: "ri-global-line",
    title: "Global Infrastructure",
    description: "Seamlessly integrated network across 50+ countries with unified billing and roaming capabilities.",
    highlight: "Worldwide"
  },
  {
    icon: "ri-team-line",
    title: "Dedicated Account Management",
    description: "Personal success manager, priority support, and customized solutions for enterprise clients.",
    highlight: "24/7 Support"
  },
  {
    icon: "ri-leaf-line",
    title: "Carbon Neutral Commitment",
    description: "100% renewable energy sources with transparent carbon offset tracking and sustainability reporting.",
    highlight: "Net Zero"
  }
];

const stats = [
  { number: "500K+", label: "Active Users", icon: "ri-user-line", suffix: "" },
  { number: "99.99", label: "Uptime SLA", icon: "ri-shield-check-line", suffix: "%" },
  { number: "50M+", label: "kWh Delivered", icon: "ri-flashlight-line", suffix: "" },
  { number: "4.9", label: "User Rating", icon: "ri-star-fill", suffix: "/5" }
];

const stations = [
  {
    id: 1,
    name: 'Downtown Plaza Station',
    type: 'fast',
    status: 'available',
    location: 'Downtown Plaza',
    distance: '0.5 km',
    power: '150 kW'
  },
  {
    id: 2,
    name: 'Green Park Charger',
    type: 'slow',
    status: 'occupied',
    location: 'Green Park',
    distance: '1.2 km',
    power: '22 kW'
  },
  {
    id: 3,
    name: 'Highway Express',
    type: 'fast',
    status: 'available',
    location: 'Highway Exit 5',
    distance: '2.3 km',
    power: '350 kW'
  },
  {
    id: 4,
    name: 'Tech Hub Station',
    type: 'slow',
    status: 'available',
    location: 'Tech Business Park',
    distance: '3.1 km',
    power: '50 kW'
  },
  {
    id: 5,
    name: 'Mall Central',
    type: 'fast',
    status: 'maintenance',
    location: 'Central Mall',
    distance: '3.5 km',
    power: '150 kW'
  },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [nextSlotTime] = useState('12:30 PM');
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  
  // Use modal store
  const { onOpen } = useModalStore();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const filteredStations = selectedFilter === 'all' 
    ? stations 
    : stations.filter(station => station.type === selectedFilter);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen relative bg-gray-50">
      {/* <AnimatedBackground /> */}
      {/* <Header /> */}
      
      {/* Login Button - Fixed Position in Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          onClick={() => onOpen('login')}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
        >
          <LogIn className="w-4 h-4" />
          <span className="font-medium">Login</span>
        </Button>
      </div>
      
      <LoginModal />
      <RegisterModal />
      
      <section className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>       
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-8">
              <span className="text-green-400 text-sm font-medium">
                <i className="ri-verified-badge-line mr-2"></i>
                Trusted by Fortune 500 Companies
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Enterprise EV Charging
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Infrastructure Platform
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Scalable, intelligent charging solutions for businesses, fleets, and individuals. 
              Deploy and manage your EV infrastructure with enterprise-grade reliability.
            </p>
            
            <div className="mb-10 flex justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20 shadow-2xl">
                <div className="flex items-center justify-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-6 h-6 text-green-400 animate-spin" style={{ animationDuration: '3s' }} />
                    <span className="text-white font-medium">Next Available Slot:</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-400">{nextSlotTime}</span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-300">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  {stations.filter(s => s.status === 'available').length} stations available now
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
                onClick={() => onOpen('login')}
              >
                <i className="ri-play-circle-line mr-2"></i>
                Get Started
              </Button>
              <Link href="/stations">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-gray-400 text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
                >
                  <i className="ri-map-pin-line mr-2"></i>
                  View Stations Map
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of your sections remain unchanged */}
      {/* Stats Section - Enhanced Background */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-green-50/30 to-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <i className={`${stat.icon} text-green-500 text-3xl relative z-10 group-hover:scale-110 transition-transform`}></i>
                  </div>
                </div>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">{stat.number}</span>
                  <span className="text-2xl font-bold text-gray-900 ml-1">{stat.suffix}</span>
                </div>
                <div className="text-gray-600 mt-2 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Station List + Map Section - Enhanced Background */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}></div>
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full filter blur-3xl opacity-30 animate-pulse animation-delay-4000"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 border border-green-200 rounded-full mb-6">
              <i className="ri-map-pin-2-line text-green-600 mr-2"></i>
              <span className="text-green-700 text-sm font-medium">Live Station Status</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Your Nearest Station
            </h2>
            <p className="text-xl text-gray-600">
              Real-time availability across our network
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sticky top-6 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Station Selection
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {['all', 'fast', 'slow'].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        selectedFilter === filter
                          ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transform scale-105'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {filter === 'all' ? 'All Stations' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Charge`}
                    </button>
                  ))}
                </div>
                
                <div className="space-y-3 mb-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                    <span className="text-sm text-gray-600">Available</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
                    <span className="text-sm text-gray-600">Occupied</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"></div>
                    <span className="text-sm text-gray-600">Maintenance</span>
                  </div>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {filteredStations.map(station => (
                    <div
                      key={station.id}
                      className="p-4 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-lg hover:from-green-50 hover:to-white transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {station.name}
                        </h4>
                        <div
                          className={`w-3 h-3 rounded-full ${
                            station.status === 'available'
                              ? 'bg-green-500 animate-pulse shadow-lg shadow-green-500/50'
                              : station.status === 'occupied'
                              ? 'bg-red-500 shadow-lg shadow-red-500/50'
                              : 'bg-yellow-500 shadow-lg shadow-yellow-500/50'
                          }`}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{station.distance}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {station.type === 'fast' ? (
                              <Zap className="w-4 h-4 text-orange-500" />
                            ) : (
                              <Clock className="w-4 h-4 text-blue-500" />
                            )}
                            <span>{station.power}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {station.location}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link href="/stations">
                  <Button className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg">
                    View All Locations
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    EV Charging Network Map
                  </h3>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-50 to-green-100 text-green-600 rounded-lg hover:from-green-100 hover:to-green-200 transition-all duration-300 shadow-sm">
                    <i className="ri-search-line"></i>
                    <span>Search Area</span>
                  </button>
                </div>
                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    src="https://maps.google.com/maps?q=electric%20vehicle%20charger&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="500"
                    loading="lazy"
                    title="EV Charging Stations Map"
                    style={{ border: 0 }}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced Background */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-green-50/20 to-blue-50/20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
          </div>
        </div>
        
        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 rounded-full mb-6">
              <i className="ri-sparkles-line text-green-600 mr-2"></i>
              <span className="text-green-700 text-sm font-medium">Advanced Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Platform Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions designed for scale, security, and sustainability
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-white/70 backdrop-blur-sm rounded-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-500/30 cursor-pointer hover:bg-white/90 overflow-hidden"
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                      <i className={`${feature.icon} text-white text-2xl`}></i>
                    </div>
                    <span className="text-xs font-semibold text-green-600 bg-gradient-to-r from-green-50 to-green-100 px-3 py-1 rounded-full">
                      {feature.highlight}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - Enhanced Background */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Multi-layered Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2310b981' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* Subtle wave effects */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-blue-50 to-transparent opacity-30"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-green-50 to-transparent opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 border border-blue-200 rounded-full mb-6">
              <i className="ri-lightbulb-flash-line text-blue-600 mr-2"></i>
              <span className="text-blue-700 text-sm font-medium">Simple Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started with EVCharge in three simple steps
            </p>
          </div>
          
          <div className="relative">
            {/* Enhanced Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2">
              <div className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 blur-sm bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 opacity-50"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {[
                {
                  step: "1",
                  title: "Find Stations",
                  desc: "Use our intelligent map to find charging stations with real-time availability",
                  icon: <MapPin className="w-6 h-6" />,
                  bgColor: "bg-blue-100",
                  gradientFrom: "from-blue-500",
                  gradientTo: "to-blue-600",
                  shadowColor: "shadow-blue-500/30"
                },
                {
                  step: "2",
                  title: "Book Your Slot",
                  desc: "Select your preferred time, charger type, and duration with instant confirmation",
                  icon: <Calendar className="w-6 h-6" />,
                  bgColor: "bg-green-100",
                  gradientFrom: "from-green-500",
                  gradientTo: "to-green-600",
                  shadowColor: "shadow-green-500/30"
                },
                {
                  step: "3",
                  title: "Charge & Go",
                  desc: "Arrive at your scheduled time, plug in, and enjoy fast, reliable charging",
                  icon: <Zap className="w-6 h-6" />,
                  bgColor: "bg-purple-100",
                  gradientFrom: "from-purple-500",
                  gradientTo: "to-purple-600",
                  shadowColor: "shadow-purple-500/30"
                }
              ].map((item, idx) => (
                <div key={idx} className="text-center relative group">
                  {/* Step Circle with enhanced styling */}
                  <div className="relative">
                    <div className={`absolute inset-0 ${item.bgColor} rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50`}></div>
                    <div className={`w-24 h-24 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-8 relative z-10 border-4 border-white ${item.shadowColor} shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <div className={`w-16 h-16 bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo} rounded-full flex items-center justify-center text-white`}>
                        {item.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Number indicators with animation */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-gray-200 opacity-60 z-0 group-hover:scale-150 group-hover:opacity-30 transition-all duration-300">
                    {item.step}
                  </div>
                  
                  {/* Content with hover effects */}
                  <div className="relative z-10 bg-white/70 backdrop-blur-sm rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 mx-auto max-w-sm group-hover:transform group-hover:-translate-y-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Client Success Stories
            </h2>
            <p className="text-xl text-gray-300">
              See how leading organizations are transforming with EVCharge
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-500 hover:bg-white/10 ${
                  index === currentTestimonial ? 'scale-105 border-green-500/50 shadow-2xl' : ''
                }`}
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-yellow-400 mr-1"></i>
                  ))}
                </div>
                
                <blockquote className="text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                    <div className="text-xs text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-green-500 w-8' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 via-green-700 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-8">
            <span className="text-white text-sm font-medium">
              <i className="ri-gift-line mr-2"></i>
              Limited Time: Get 3 Months Free for Enterprise Plans
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Electrify Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of users and businesses who trust EVCharge for their charging needs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
              onClick={() => onOpen('register')}
            >
              <i className="ri-user-add-line mr-2"></i>
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
              onClick={() => onOpen('login')}
            >
              <i className="ri-login-box-line mr-2"></i>
              Login to Account
            </Button>
            <Link href="/manager">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
              >
                <i className="ri-store-line mr-2"></i>
                Register Station
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
            <div className="flex items-center space-x-2">
              <i className="ri-shield-check-line text-2xl"></i>
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ri-customer-service-2-line text-2xl"></i>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ri-global-line text-2xl"></i>
              <span>Global Network</span>
            </div>
          </div>
        </div>
      </section>
      
      <FloatingChat />
    </div>
  );
}