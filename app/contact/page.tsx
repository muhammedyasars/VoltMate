'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import Button from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ToastContainer } from '@/components/ui/Toast';

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Have questions or feedback? We're here to help.
          </p>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <i className="ri-map-pin-line text-primary-600 text-xl"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Our Location</h3>
                    <p className="text-gray-700">
                      123 Electric Avenue<br />
                      Green City, CA 94103
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <i className="ri-mail-line text-primary-600 text-xl"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email Us</h3>
                    <a href="mailto:info@evcharge.com" className="text-primary-600 hover:underline">
                      info@evcharge.com
                    </a>
                    <p className="text-gray-700 mt-1">
                      For support: <a href="mailto:support@evcharge.com" className="text-primary-600 hover:underline">support@evcharge.com</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <i className="ri-phone-line text-primary-600 text-xl"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Call Us</h3>
                    <a href="tel:+11234567890" className="text-primary-600 hover:underline">
                      +1 (123) 456-7890
                    </a>
                    <p className="text-gray-700 mt-1">
                      Mon-Fri: 8AM - 8PM<br />
                      Sat-Sun: 9AM - 5PM
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <i className="ri-links-line text-primary-600 text-xl"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Connect With Us</h3>
                    <div className="flex space-x-4 mt-2">
                      <a href="#" className="text-gray-600 hover:text-primary-600">
                        <i className="ri-twitter-fill text-xl"></i>
                      </a>
                      <a href="#" className="text-gray-600 hover:text-primary-600">
                        <i className="ri-facebook-fill text-xl"></i>
                      </a>
                      <a href="#" className="text-gray-600 hover:text-primary-600">
                        <i className="ri-linkedin-fill text-xl"></i>
                      </a>
                      <a href="#" className="text-gray-600 hover:text-primary-600">
                        <i className="ri-instagram-fill text-xl"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
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
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                
                <Button type="submit" size="lg" isLoading={loading}>
                  <i className="ri-send-plane-line mr-2"></i>
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We're located in the heart of Green City, easily accessible by public transportation.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 h-96">
            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <i className="ri-map-pin-line text-6xl text-gray-400 mb-4"></i>
                <p className="text-gray-500">Interactive map will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Find quick answers to common questions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              question: 'How do I report an issue with a charging station?',
              answer: 'You can report station issues through our mobile app, by contacting our support team at support@evcharge.com, or by calling our 24/7 helpline at +1 (123) 456-7890.'
            },
            {
              question: 'What payment methods do you accept?',
              answer: 'We accept all major credit and debit cards, as well as Apple Pay, Google Pay, and our EVCharge prepaid cards. Fleet customers can also set up direct invoicing.'
            },
            {
              question: 'How can I become a station host?',
              answer: 'If youre interested in hosting an EVCharge station at your property, please contact our business development team at partners@evcharge.com for more information.'
            },
            {
              question: 'Do you offer corporate accounts?',
              answer: 'Yes, we offer special plans for businesses with EV fleets. Please contact our sales team to discuss your specific requirements and get a customized solution.'
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}