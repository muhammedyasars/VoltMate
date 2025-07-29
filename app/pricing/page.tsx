'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import Button from '@/components/ui/button';
import Link from 'next/link';

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
    popular: false
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
    popular: true
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
    popular: false
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Choose the plan that works best for you with no hidden fees or surprises
          </p>
        </div>
      </section>
      
      {/* Pricing Toggle */}
      <section className="container py-12">
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1 inline-flex shadow-sm">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'monthly' 
                  ? 'bg-primary-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'yearly' 
                  ? 'bg-primary-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Yearly <span className="text-xs text-primary-500 font-bold">Save 20%</span>
            </button>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-sm overflow-hidden ${
                plan.popular ? 'ring-2 ring-primary-500 transform md:-translate-y-4' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-primary-500 text-white py-2 text-center text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price === 0 ? '0' : billingCycle === 'monthly' ? plan.price : (plan.price * 0.8 * 12).toFixed(2)}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-600 ml-2">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <i className="ri-checkbox-circle-line text-primary-500 mt-1 mr-2"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href={plan.popular ? '/signup?plan=premium' : '/signup'}>
                  <Button 
                    size="lg" 
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Features Comparison */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Compare Plans</h2>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-left text-gray-500 font-medium">Features</th>
                <th className="px-6 py-4 text-center text-gray-500 font-medium">Basic</th>
                <th className="px-6 py-4 text-center text-primary-600 font-medium">Premium</th>
                <th className="px-6 py-4 text-center text-gray-500 font-medium">Business</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="px-6 py-4 text-gray-900 font-medium">Charging Rate</td>
                <td className="px-6 py-4 text-center">Standard</td>
                <td className="px-6 py-4 text-center font-medium text-primary-600">10% discount</td>
                <td className="px-6 py-4 text-center">15% discount</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-6 py-4 text-gray-900 font-medium">Booking Priority</td>
                <td className="px-6 py-4 text-center">Standard</td>
                <td className="px-6 py-4 text-center font-medium text-primary-600">Priority</td>
                <td className="px-6 py-4 text-center">Highest Priority</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-6 py-4 text-gray-900 font-medium">Booking Fee</td>
                <td className="px-6 py-4 text-center">$1 per booking</td>
                <td className="px-6 py-4 text-center font-medium text-primary-600">No fee</td>
                <td className="px-6 py-4 text-center">No fee</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-6 py-4 text-gray-900 font-medium">Support</td>
                <td className="px-6 py-4 text-center">Email only</td>
                <td className="px-6 py-4 text-center font-medium text-primary-600">24/7 phone & email</td>
                <td className="px-6 py-4 text-center">Dedicated manager</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-6 py-4 text-gray-900 font-medium">Analytics & Reporting</td>
                <td className="px-6 py-4 text-center">Basic</td>
                <td className="px-6 py-4 text-center font-medium text-primary-600">Advanced</td>
                <td className="px-6 py-4 text-center">Enterprise-grade</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-900 font-medium">API Access</td>
                <td className="px-6 py-4 text-center">
                  <i className="ri-close-line text-red-500"></i>
                </td>
                <td className="px-6 py-4 text-center font-medium text-primary-600">
                  <i className="ri-close-line text-red-500"></i>
                </td>
                <td className="px-6 py-4 text-center">
                  <i className="ri-check-line text-green-500"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our pricing and plans
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="flex justify-between items-center w-full px-6 py-4 text-left"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <i className={`ri-arrow-down-s-line transition-transform ${
                  openFaq === index ? 'transform rotate-180' : ''
                }`}></i>
              </button>
              
              <div className={`px-6 pb-4 ${openFaq === index ? 'block' : 'hidden'}`}>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to start your EV journey?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers and experience hassle-free charging today
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 w-full sm:w-auto">
                <i className="ri-user-add-line mr-2"></i>
                Sign Up Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600 w-full sm:w-auto">
                <i className="ri-customer-service-2-line mr-2"></i>
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}