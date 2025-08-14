'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import Button from '@/components/ui/button';
import Link from 'next/link';
// import AnimatedBackground from '@/components/AnimatedBackground';

const pricingPlans = [
  {
    name: 'Basic',
    description: 'Perfect for occasional EV charging',
    price: 0,
    features: [
      'Access to all public stations',
      'Pay-as-you-go pricing',
      'Standard charging speeds',
      'Mobile app access',
      'Email support'
    ],
    cta: 'Sign Up Free',
    popular: false,
    icon: 'ri-battery-charge-line',
    color: 'blue'
  },
  {
    name: 'Premium',
    description: 'For regular EV drivers',
    price: 9.99,
    features: [
      'All Basic features',
      '10% discount on all charging sessions',
      'Priority booking',
      'Faster charging speeds',
      'No booking fees',
      '24/7 phone support'
    ],
    cta: 'Start Premium',
    popular: true,
    icon: 'ri-flashlight-line',
    color: 'green'
  },
  {
    name: 'Business',
    description: 'For companies with EV fleets',
    price: 29.99,
    features: [
      'All Premium features',
      'Fleet management dashboard',
      'Multiple vehicle support',
      'Usage reports and analytics',
      'Dedicated account manager',
      'API access'
    ],
    cta: 'Contact Sales',
    popular: false,
    icon: 'ri-building-line',
    color: 'purple'
  }
];

const faqs = [
  {
    question: 'How does the pricing work?',
    answer: 'Our basic plan is free with pay-as-you-go pricing for each charging session. Premium and Business plans offer monthly subscriptions with discounted rates and additional features to enhance your charging experience.'
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your benefits will continue until the end of your current billing cycle.'
  },
  {
    question: 'Are there any contracts or commitments?',
    answer: 'No long-term contracts. Our Premium and Business plans are month-to-month subscriptions that you can cancel anytime.'
  },
  {
    question: 'How do I pay for charging sessions?',
    answer: 'You can add a credit card to your account for automatic payments. We charge based on the amount of energy (kWh) used or time spent charging, depending on the station.'
  },
  {
    question: 'Are there any hidden fees?',
    answer: 'No hidden fees. With Basic, you pay only for what you use. Premium and Business plans have transparent monthly subscription costs plus discounted charging rates.'
  },
  {
    question: 'Do you offer corporate accounts?',
    answer: 'Yes, our Business plan is designed for companies with EV fleets. We also offer custom enterprise solutions for larger organizations. Contact our sales team for details.'
  }
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

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
                <i className="ri-price-tag-3-line mr-2"></i>
                Simple, Transparent Pricing
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Choose Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Charging Plan
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Select the perfect plan for your EV charging needs with no hidden fees or surprises
            </p>
          </div>
        </div>
      </section>
      
      {/* Pricing Toggle with enhanced styling */}
      <section className="relative z-10 -mt-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 inline-flex shadow-xl border border-gray-200">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`relative px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  billingCycle === 'monthly' 
                    ? 'text-white' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {billingCycle === 'monthly' && (
                  <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg"></span>
                )}
                <span className="relative z-10">Monthly</span>
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`relative px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  billingCycle === 'yearly' 
                    ? 'text-white' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {billingCycle === 'yearly' && (
                  <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg"></span>
                )}
                <span className="relative z-10">Yearly</span>
                <span className="ml-2 text-xs font-bold bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full relative z-10">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
        
      {/* Pricing Cards with enhanced styling */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative ${
                  plan.popular ? 'md:-mt-4 md:mb-4' : ''
                }`}
                onMouseEnter={() => setHoveredPlan(index)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {/* Card glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-${plan.color}-500/30 to-${plan.color}-600/30 rounded-2xl blur-xl transition-opacity duration-300 ${
                  hoveredPlan === index || plan.popular ? 'opacity-100' : 'opacity-0'
                }`}></div>
                
                <div className={`relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
                  hoveredPlan === index ? 'transform scale-105' : ''
                } ${
                  plan.popular ? 'border-2 border-green-500 shadow-green-500/20' : 'border border-gray-200'
                }`}>
                  {plan.popular && (
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 text-center text-sm font-medium">
                      <div className="flex items-center justify-center">
                        <i className="ri-star-line mr-2"></i>
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${plan.color}-100`}>
                        <i className={`${plan.icon} text-${plan.color}-600 text-xl`}></i>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-6 flex items-baseline">
                      <span className="text-5xl font-bold text-gray-900">
                        ${plan.price === 0 ? '0' : billingCycle === 'monthly' ? plan.price : (plan.price * 0.8 * 12).toFixed(2)}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-600 ml-2">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      )}
                    </div>
                    
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <div className={`mt-1 mr-3 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center bg-${plan.color}-100`}>
                            <i className={`ri-check-line text-${plan.color}-600 text-sm`}></i>
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link href={plan.popular ? '/signup?plan=premium' : '/signup'}>
                      <Button 
                        size="lg" 
                        className={`w-full ${
                          plan.popular 
                            ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' 
                            : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Comparison with enhanced styling */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-6">
              <i className="ri-scales-line text-blue-600 mr-2"></i>
              <span className="text-blue-700 text-sm font-medium">Feature Comparison</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Compare Plans</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect plan for your EV charging needs
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-5 text-left text-gray-500 font-medium">Features</th>
                    <th className="px-6 py-5 text-center text-gray-600 font-medium">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                          <i className="ri-battery-charge-line text-blue-600"></i>
                        </div>
                        Basic
                      </div>
                    </th>
                    <th className="px-6 py-5 text-center text-gray-600 font-medium">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                          <i className="ri-flashlight-line text-green-600"></i>
                        </div>
                        <span className="text-green-600">Premium</span>
                        <div className="text-xs mt-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Most Popular</div>
                      </div>
                    </th>
                    <th className="px-6 py-5 text-center text-gray-600 font-medium">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                          <i className="ri-building-line text-purple-600"></i>
                        </div>
                        Business
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 text-gray-900 font-medium">Charging Rate</td>
                    <td className="px-6 py-4 text-center">Standard</td>
                    <td className="px-6 py-4 text-center font-medium text-green-600 bg-green-50">10% discount</td>
                    <td className="px-6 py-4 text-center">15% discount</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 text-gray-900 font-medium">Booking Priority</td>
                    <td className="px-6 py-4 text-center">Standard</td>
                    <td className="px-6 py-4 text-center font-medium text-green-600 bg-green-50">Priority</td>
                    <td className="px-6 py-4 text-center">Highest Priority</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 text-gray-900 font-medium">Booking Fee</td>
                    <td className="px-6 py-4 text-center">$1 per booking</td>
                    <td className="px-6 py-4 text-center font-medium text-green-600 bg-green-50">No fee</td>
                    <td className="px-6 py-4 text-center">No fee</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 text-gray-900 font-medium">Support</td>
                    <td className="px-6 py-4 text-center">Email only</td>
                    <td className="px-6 py-4 text-center font-medium text-green-600 bg-green-50">24/7 phone & email</td>
                    <td className="px-6 py-4 text-center">Dedicated manager</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 text-gray-900 font-medium">Analytics & Reporting</td>
                    <td className="px-6 py-4 text-center">Basic</td>
                    <td className="px-6 py-4 text-center font-medium text-green-600 bg-green-50">Advanced</td>
                    <td className="px-6 py-4 text-center">Enterprise-grade</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-900 font-medium">API Access</td>
                    <td className="px-6 py-4 text-center">
                      <i className="ri-close-line text-red-500 text-xl"></i>
                    </td>
                    <td className="px-6 py-4 text-center font-medium bg-green-50">
                      <i className="ri-close-line text-red-500 text-xl"></i>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <i className="ri-check-line text-green-500 text-xl"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section with enhanced styling */}
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
              <span className="text-purple-700 text-sm font-medium">Have Questions?</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our pricing and plans
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex justify-between items-center w-full px-8 py-5 text-left transition-colors hover:bg-gray-50"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 group-hover:bg-green-100 transition-colors ${
                    openFaq === index ? 'bg-green-100' : ''
                  }`}>
                    <i className={`ri-arrow-down-s-line transition-transform duration-300 ${
                      openFaq === index ? 'transform rotate-180 text-green-600' : 'text-gray-500'
                    }`}></i>
                  </div>
                </button>
                
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-8 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
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
              <i className="ri-rocket-line mr-2"></i>
              Get Started Today
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to start your EV
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              charging journey?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience hassle-free charging today
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/signup">
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-green px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
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
                <i className="ri-customer-service-2-line mr-2"></i>
                Contact Sales
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-white/80">
            <div className="flex items-center space-x-2">
              <i className="ri-secure-payment-line text-2xl"></i>
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ri-calendar-check-line text-2xl"></i>
              <span>No Contracts</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ri-customer-service-2-line text-2xl"></i>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}