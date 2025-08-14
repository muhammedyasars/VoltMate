'use client';

import Header from '@/components/layout/header';
import Button from '@/components/ui/button';
import Link from 'next/link';
// import AnimatedBackground from '@/components/AnimatedBackground';
import { useState } from 'react';

export default function AboutPage() {
   const [activeValue, setActiveValue] = useState<number | null>(null);


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
                <i className="ri-building-line mr-2"></i>
                About EVCharge
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Powering the Future of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Sustainable Mobility
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to accelerate the transition to sustainable transportation 
              through innovative EV charging solutions.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section with enhanced background */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-green-50/30 to-white overflow-hidden">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 rounded-full mb-6">
                <i className="ri-time-line text-green-600 mr-2"></i>
                <span className="text-green-700 text-sm font-medium">Our Journey</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed text-lg">
                  EVCharge was founded in 2020 with a simple vision: to make electric vehicle 
                  charging as convenient and reliable as traditional refueling.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our founders, experienced professionals from the automotive and renewable 
                  energy sectors, recognized the critical need for a better charging infrastructure 
                  to support the growing adoption of electric vehicles.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  What began as a small network of charging stations has rapidly grown into 
                  a comprehensive platform that connects EV drivers with reliable charging 
                  solutions nationwide.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-green-600">2020</div>
                  <div className="text-sm text-gray-600">Founded</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-green-600">50+</div>
                  <div className="text-sm text-gray-600">Stations</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-green-600">10K+</div>
                  <div className="text-sm text-gray-600">Users</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl blur-2xl"></div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1593941707882-a156679de2a9?q=80&w=1024&auto=format&fit=crop" 
                  alt="EV Charging Station" 
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Values Section with enhanced styling */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 rounded-full mb-6">
              <i className="ri-compass-3-line text-green-600 mr-2"></i>
              <span className="text-green-700 text-sm font-medium">Our Purpose</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're driven by core principles that guide everything we do.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'ri-leaf-line',
                color: 'green',
                title: 'Sustainability',
                description: "We're committed to reducing carbon emissions and promoting sustainable transportation solutions that contribute to a healthier planet."
              },
              {
                icon: 'ri-lightbulb-line',
                color: 'blue',
                title: 'Innovation',
                description: 'We continuously seek new technologies and approaches to improve the charging experience and make electric mobility more accessible.'
              },
              {
                icon: 'ri-customer-service-2-line',
                color: 'purple',
                title: 'Reliability',
                description: 'We understand that dependable charging is essential. Our network is built for maximum uptime and backed by responsive customer support.'
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="group relative bg-white/70 backdrop-blur-sm rounded-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-500/30 cursor-pointer hover:bg-white/90 overflow-hidden"
                onMouseEnter={() => setActiveValue(index)}
                onMouseLeave={() => setActiveValue(null)}
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-${value.color}-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`${value.icon} text-${value.color}-600 text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-700">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section with enhanced design */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-green-50/20 to-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 rounded-full mb-6">
              <i className="ri-team-line text-purple-600 mr-2"></i>
              <span className="text-purple-700 text-sm font-medium">Leadership</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the passionate individuals driving our vision forward.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'CEO & Co-Founder',
                bio: 'Former automotive executive with 15+ years of experience in sustainable transportation.',
                image: 'SJ'
              },
              {
                name: 'Michael Chen',
                role: 'CTO & Co-Founder',
                bio: 'Electrical engineer and renewable energy expert with multiple patents in charging technology.',
                image: 'MC'
              },
              {
                name: 'Emma Davis',
                role: 'COO',
                bio: 'Operations specialist with experience scaling infrastructure networks across the country.',
                image: 'ED'
              },
              {
                name: 'David Wilson',
                role: 'Head of Product',
                bio: 'Product leader focused on creating seamless user experiences for EV drivers.',
                image: 'DW'
              }
            ].map((member, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-500/30">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl font-bold text-white">{member.image}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section with gradient background */}
      {/* Stats Section with gradient background */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-700 to-blue-600"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50', suffix: '+', label: 'Charging Stations', icon: 'ri-charging-pile-line' },
              { number: '10K', suffix: '+', label: 'Happy Customers', icon: 'ri-user-smile-line' },
              { number: '500K', suffix: '+', label: 'Charging Sessions', icon: 'ri-flashlight-line' },
              { number: '1.2M', suffix: '+', label: 'kg CO₂ Saved', icon: 'ri-leaf-line' }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <i className={`${stat.icon} text-white text-4xl relative z-10 group-hover:scale-110 transition-transform`}></i>
                  </div>
                </div>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-white">{stat.number}</span>
                  <span className="text-3xl font-bold text-white/80 ml-1">{stat.suffix}</span>
                </div>
                <div className="text-white/90 mt-2 font-medium text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Partners Section with enhanced styling */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full mb-6">
              <i className="ri-handshake-line text-blue-600 mr-2"></i>
              <span className="text-blue-700 text-sm font-medium">Partnerships</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Partners</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We collaborate with leading organizations to expand our network and capabilities.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Tesla', 'ChargePoint', 'Electrify America', 'EVgo', 'Blink Charging', 'Volta', 'Greenlots', 'SemaConnect'].map((partner, index) => (
              <div 
                key={index} 
                className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-8 flex items-center justify-center h-32 border border-gray-200 hover:border-green-500/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-blue-500/0 group-hover:from-green-500/10 group-hover:to-blue-500/10 rounded-xl blur-xl transition-all duration-300"></div>
                  <span className="relative text-gray-400 font-medium group-hover:text-gray-600 transition-colors text-lg">{partner}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section with matching theme */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        {/* Animated elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-8">
            <span className="text-green-400 text-sm font-medium">
              <i className="ri-rocket-line mr-2"></i>
              Join Our Mission
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Be Part of the Sustainable
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              Transportation Revolution
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Start your EV charging journey with us today and contribute to a cleaner, greener future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/signup">
              <Button 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
              >
                <i className="ri-user-add-line mr-2"></i>
                Sign Up Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-400 text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
              >
                <i className="ri-chat-3-line mr-2"></i>
                Contact Us
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-white/80">
            <div className="flex items-center space-x-2">
              <i className="ri-shield-check-line text-2xl"></i>
              <span>Enterprise Ready</span>
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
    </div>
  );
}