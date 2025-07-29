'use client';

import Header from '@/components/layout/header';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl opacity-90">
            Please read these terms carefully before using our platform.
          </p>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="container py-16">
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <p>Last updated: July 15, 2025</p>
            
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the EVCharge platform, including our website, mobile application, 
              and charging services (collectively, the "Services"), you agree to be bound by these 
              Terms of Service ("Terms"). If you do not agree to these Terms, you may not use our Services.
            </p>
            
            <h2>2. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of any 
              material changes by posting the new Terms on our platform or by sending you an email. 
              Your continued use of the Services after such modifications will constitute your acknowledgment 
              and acceptance of the modified Terms.
            </p>
            
            <h2>3. User Accounts</h2>
            <p>
              To use certain features of our Services, you must register for an account. You must provide 
              accurate, current, and complete information during the registration process and keep your 
              account information up-to-date at all times.
            </p>
            <p>
              You are responsible for safeguarding your password and for all activities that occur under your account. 
              You agree to notify us immediately of any unauthorized use of your account.
            </p>
            
            <h2>4. Booking and Payment Terms</h2>
            <p>
              Our platform allows you to book charging sessions at participating stations. By making a booking, 
              you agree to pay the specified rates for the duration of your session. Prices may vary by location, 
              time of day, and charger type.
            </p>
            <p>
              Payment for charging sessions must be made through our approved payment methods. We use secure 
              third-party payment processors to handle all transactions.
            </p>
            
            <h2>5. Cancellation Policy</h2>
            <p>
              You may cancel a booking without charge up to 30 minutes before the scheduled start time. 
              Cancellations made less than 30 minutes before the start time may be subject to a cancellation fee.
            </p>
            <p>
              Failure to arrive for a booking ("no-show") will result in charges as specified in our 
              Cancellation Policy.
            </p>
            
            <h2>6. User Conduct</h2>
            <p>
              You agree not to:
            </p>
            <ul>
              <li>Use our Services for any illegal purpose or in violation of any laws</li>
              <li>Interfere with or disrupt the operation of our Services</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Impersonate another user or provide false information</li>
              <li>Damage, disable, or overburden our Services</li>
              <li>Use our Services in a manner that could damage or adversely affect EVCharge</li>
            </ul>
            
            <h2>7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, EVCharge shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages, or any loss of profits or revenues, 
              whether incurred directly or indirectly, or any loss of data, use, goodwill, or other 
              intangible losses, resulting from:
            </p>
            <ul>
              <li>Your access to or use of or inability to access or use our Services</li>
              <li>Any conduct or content of any third party on our Services</li>
              <li>Any unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
            
            <h2>8. Dispute Resolution</h2>
            <p>
              Any disputes arising from these Terms or your use of our Services shall be resolved 
              through binding arbitration in accordance with the American Arbitration Association rules. 
              The arbitration shall be conducted in [Location].
            </p>
            
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              EVCharge Legal Department<br />
              123 Electric Avenue<br />
              Green City, CA 94103<br />
              legal@evcharge.com
            </p>
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link href="/privacy">
              <button className="text-primary-600 font-medium hover:underline">
                View Privacy Policy →
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}