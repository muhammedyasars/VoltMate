'use client';

import Header from '@/components/layout/header';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl opacity-90">
            How we collect, use, and protect your information.
          </p>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="container py-16">
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <p>Last updated: July 15, 2025</p>
            
            <h2>1. Introduction</h2>
            <p>
              At EVCharge, we respect your privacy and are committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you 
              use our platform and services.
            </p>
            <p>
              By using our Services, you consent to the data practices described in this policy.
            </p>
            
            <h2>2. Information We Collect</h2>
            <p>
              We collect several types of information from and about users of our Services, including:
            </p>
            <ul>
              <li>
                <strong>Personal Information:</strong> Name, email address, phone number, postal address, 
                payment information, and vehicle information.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our Services, including 
                charging habits, session history, and preferences.
              </li>
              <li>
                <strong>Device Information:</strong> Information about the devices you use to access our Services, 
                including IP address, browser type, and operating system.
              </li>
              <li>
                <strong>Location Data:</strong> With your consent, we collect precise location data to 
                provide location-based services such as finding nearby charging stations.
              </li>
            </ul>
            
            <h2>3. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide, maintain, and improve our Services</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative messages, updates, and security alerts</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Personalize your experience and deliver content relevant to your interests</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our Services</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h2>4. Data Sharing and Disclosure</h2>
            <p>
              We may share your information with:
            </p>
            <ul>
              <li>
                <strong>Service Providers:</strong> Third-party vendors who perform services on our behalf, 
                such as payment processing, data analysis, and customer service.
              </li>
              <li>
                <strong>Charging Station Partners:</strong> To facilitate your charging sessions at partner locations.
              </li>
              <li>
                <strong>Business Partners:</strong> With your consent, we may share your information with 
                business partners to offer joint promotions or products.
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to protect our rights, 
                property, or safety, or the rights, property, or safety of others.
              </li>
            </ul>
            
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data 
              against unauthorized or unlawful processing, accidental loss, destruction, or damage. 
              However, no method of transmission over the Internet or electronic storage is 100% secure, 
              so we cannot guarantee absolute security.
            </p>
            
            <h2>6. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal data, including:
            </p>
            <ul>
              <li>The right to access your personal data</li>
              <li>The right to rectify inaccurate or incomplete data</li>
              <li>The right to erase your personal data</li>
              <li>The right to restrict processing of your personal data</li>
              <li>The right to data portability</li>
              <li>The right to object to processing of your personal data</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section.
            </p>
            
            <h2>7. Cookies and Similar Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our Services and 
              hold certain information. You can instruct your browser to refuse all cookies or to 
              indicate when a cookie is being sent. However, if you do not accept cookies, you may 
              not be able to use some portions of our Services.
            </p>
            
            <h2>8. Children's Privacy</h2>
            <p>
              Our Services are not intended for children under the age of 16, and we do not knowingly 
              collect personal data from children under 16. If we learn we have collected personal 
              data from a child under 16, we will delete that information as quickly as possible.
            </p>
            
            <h2>9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              EVCharge Privacy Team<br />
              123 Electric Avenue<br />
              Green City, CA 94103<br />
              privacy@evcharge.com
            </p>
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link href="/terms">
              <button className="text-primary-600 font-medium hover:underline">
                View Terms of Service →
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}