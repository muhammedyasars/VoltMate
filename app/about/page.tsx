'use client';

import Header from '@/components/layout/header';
import Button from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      

      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About EVCharge</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            We're on a mission to accelerate the transition to sustainable transportation 
            through innovative EV charging solutions.
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
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
          </div>
          
          <div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1593941707882-a156679de2a9?q=80&w=1024&auto=format&fit=crop" 
                alt="EV Charging Station" 
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Values */}
      <section className="bg-gray-100 py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We're driven by core principles that guide everything we do.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-leaf-line text-primary-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sustainability</h3>
              <p className="text-gray-700">
                We're committed to reducing carbon emissions and promoting sustainable 
                transportation solutions that contribute to a healthier planet.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-lightbulb-line text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-700">
                We continuously seek new technologies and approaches to improve the 
                charging experience and make electric mobility more accessible.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-customer-service-2-line text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Reliability</h3>
              <p className="text-gray-700">
                We understand that dependable charging is essential. Our network is 
                built for maximum uptime and backed by responsive customer support.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
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
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">{member.image}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-primary-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <p className="opacity-90">Charging Stations</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <p className="opacity-90">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500K+</div>
              <p className="opacity-90">Charging Sessions</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1.2M+</div>
              <p className="opacity-90">kg CO₂ Saved</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partners</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            We collaborate with leading organizations to expand our network and capabilities.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {['Partner 1', 'Partner 2', 'Partner 3', 'Partner 4', 'Partner 5', 'Partner 6', 'Partner 7', 'Partner 8'].map((partner, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center h-32">
              <span className="text-gray-400 font-medium">{partner} Logo</span>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Be part of the sustainable transportation revolution. Start your EV charging journey with us today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg">
                <i className="ri-user-add-line mr-2"></i>
                Sign Up Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                <i className="ri-chat-3-line mr-2"></i>
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}