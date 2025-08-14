'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import Button from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ToastContainer } from '@/components/ui/Toast';
// import AnimatedBackground from '@/components/AnimatedBackground';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      addToast('Your message has been sent successfully! We will get back to you soon.', 'success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      addToast('Failed to send message. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
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
                <i className="ri-customer-service-2-line mr-2"></i>
                We're Here To Help
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Get In
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Touch With Us
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Have questions or feedback? Our team is ready to assist you with any inquiries about our EV charging services.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Section with enhanced styling */}
      <section className="relative z-10 -mt-10 px-4 sm:px-6 lg:px-8 pb-16">
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
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
                
                <div className="space-y-8">
                  <div className="flex group">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center 
                                   group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <i className="ri-map-pin-line text-green-600 text-xl"></i>
                      </div>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Location</h3>
                      <p className="text-gray-700 leading-relaxed">
                        123 Electric Avenue<br />
                        Green City, CA 94103
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex group">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center 
                                   group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <i className="ri-mail-line text-blue-600 text-xl"></i>
                      </div>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                      <a href="mailto:info@evcharge.com" className="text-green-600 hover:text-green-700 transition-colors hover:underline font-medium">
                        info@evcharge.com
                      </a>
                      <p className="text-gray-700 mt-2">
                        For support: <a href="mailto:support@evcharge.com" className="text-green-600 hover:text-green-700 transition-colors hover:underline">support@evcharge.com</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex group">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center 
                                   group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <i className="ri-phone-line text-purple-600 text-xl"></i>
                      </div>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                      <a href="tel:+11234567890" className="text-green-600 hover:text-green-700 transition-colors hover:underline font-medium">
                        +1 (123) 456-7890
                      </a>
                      <p className="text-gray-700 mt-2">
                        Mon-Fri: 8AM - 8PM<br />
                        Sat-Sun: 9AM - 5PM
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex group">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center 
                                   group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <i className="ri-links-line text-yellow-600 text-xl"></i>
                      </div>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect With Us</h3>
                      <div className="flex space-x-4 mt-2">
                        <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors">
                          <i className="ri-twitter-fill text-gray-600 hover:text-green-600 transition-colors"></i>
                        </a>
                        <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors">
                          <i className="ri-facebook-fill text-gray-600 hover:text-green-600 transition-colors"></i>
                        </a>
                        <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors">
                          <i className="ri-linkedin-fill text-gray-600 hover:text-green-600 transition-colors"></i>
                        </a>
                        <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors">
                          <i className="ri-instagram-fill text-gray-600 hover:text-green-600 transition-colors"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="relative group">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-green-600">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                          <i className="ri-user-line text-gray-400 group-focus-within:text-green-600 transition-colors"></i>
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                                 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                 focus:bg-white transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-green-600">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                          <i className="ri-mail-line text-gray-400 group-focus-within:text-green-600 transition-colors"></i>
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                                 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                 focus:bg-white transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                          <i className="ri-phone-line text-gray-400 group-focus-within:text-green-600 transition-colors"></i>
                        </div>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                                 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                 focus:bg-white transition-all duration-300"
                        />
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject <span className="text-green-600">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                          <i className="ri-chat-1-line text-gray-400 group-focus-within:text-green-600 transition-colors"></i>
                        </div>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                                 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                 focus:bg-white transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8 relative group">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message <span className="text-green-600">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                               focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                               focus:bg-white transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    isLoading={loading}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white w-full sm:w-auto px-8"
                  >
                    <i className="ri-send-plane-line mr-2"></i>
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section with enhanced background */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50"></div>
        
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-6">
              <i className="ri-map-pin-2-line text-blue-600 mr-2"></i>
              <span className="text-blue-700 text-sm font-medium">Visit Our Office</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Us Easily</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're located in the heart of Green City, easily accessible by public transportation.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-4">
              <div className="h-96 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzEwLjQiVw!5e0!3m2!1sen!2sus!4v1625103246584!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Office Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 border border-purple-200 rounded-full mb-6">
              <i className="ri-question-line text-purple-600 mr-2"></i>
              <span className="text-purple-700 text-sm font-medium">Quick Answers</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'How do I report an issue with a charging station?',
                answer: 'You can report station issues through our mobile app, by contacting our support team at support@evcharge.com, or by calling our 24/7 helpline at +1 (123) 456-7890.',
                icon: 'ri-error-warning-line',
                color: 'green'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit and debit cards, as well as Apple Pay, Google Pay, and our EVCharge prepaid cards. Fleet customers can also set up direct invoicing.',
                icon: 'ri-bank-card-line',
                color: 'blue'
              },
              {
                question: 'How can I become a station host?',
                answer: 'If youre interested in hosting an EVCharge station at your property, please contact our business development team at partners@evcharge.com for more information.',
                icon: 'ri-community-line',
                color: 'purple'
              },
              {
                question: 'Do you offer corporate accounts?',
                answer: 'Yes, we offer special plans for businesses with EV fleets. Please contact our sales team to discuss your specific requirements and get a customized solution.',
                icon: 'ri-building-line',
                color: 'yellow'
              }
            ].map((faq, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 hover:border-green-200 p-6 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 bg-${faq.color}-100 group-hover:scale-110 transition-transform`}>
                    <i className={`${faq.icon} text-${faq.color}-600 text-xl`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section with matching theme */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        {/* Animated elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-8">
            <span className="text-green-400 text-sm font-medium">
              <i className="ri-24-hours-line mr-2"></i>
              Available 24/7
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Need help right away?
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mt-2">
              Call our support line
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Our dedicated support team is available around the clock to assist with any urgent issues
          </p>
          
          <a href="tel:+11234567890" className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-xl 
                           hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-xl
                           transform hover:scale-105">
            <i className="ri-phone-fill text-green-600 text-2xl mr-3"></i>
            +1 (123) 456-7890
          </a>
        </div>
      </section>
    </div>
  );
}