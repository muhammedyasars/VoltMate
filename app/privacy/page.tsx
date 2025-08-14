'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/layout/header';
import Link from 'next/link';
// import AnimatedBackground from '@/components/AnimatedBackground';
import Button from '@/components/ui/button';

// Define the type for section IDs
type SectionId = 'introduction' | 'collection' | 'usage' | 'sharing' | 'security' | 'rights' | 'cookies' | 'children' | 'changes' | 'contact';

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState<SectionId>('introduction');
  
  // Type the refs object properly - include null in the type
  const sectionRefs: Record<SectionId, React.RefObject<HTMLDivElement | null>> = {
    introduction: useRef<HTMLDivElement>(null),
    collection: useRef<HTMLDivElement>(null),
    usage: useRef<HTMLDivElement>(null),
    sharing: useRef<HTMLDivElement>(null),
    security: useRef<HTMLDivElement>(null),
    rights: useRef<HTMLDivElement>(null),
    cookies: useRef<HTMLDivElement>(null),
    children: useRef<HTMLDivElement>(null),
    changes: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null)
  };

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId: SectionId) => {
    const section = sectionRefs[sectionId].current;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSection(sectionId);
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      // Use Object.entries with proper typing
      (Object.entries(sectionRefs) as [SectionId, React.RefObject<HTMLDivElement>][]).forEach(([sectionId, ref]) => {
        const section = ref.current;
        if (section) {
          const offsetTop = section.offsetTop;
          const height = section.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(sectionId);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tableOfContents: { id: SectionId; title: string }[] = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'collection', title: 'Information We Collect' },
    { id: 'usage', title: 'How We Use Your Information' },
    { id: 'sharing', title: 'Data Sharing and Disclosure' },
    { id: 'security', title: 'Data Security' },
    { id: 'rights', title: 'Your Rights' },
    { id: 'cookies', title: 'Cookies and Technologies' },
    { id: 'children', title: 'Children\'s Privacy' },
    { id: 'changes', title: 'Changes to Policy' },
    { id: 'contact', title: 'Contact Us' }
  ];

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
                <i className="ri-shield-check-line mr-2"></i>
                Last Updated: July 15, 2025
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Privacy
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                {" Policy"}
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              How we collect, use, and protect your information while using our services
            </p>
          </div>
        </div>
      </section>
      
      {/* Content Section with Table of Contents */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents - Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-28">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <i className="ri-list-check text-green-600 mr-2"></i>
                    Contents
                  </h3>
                  
                  <nav className="space-y-1">
                    {tableOfContents.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                          activeSection === item.id
                            ? 'bg-green-100 text-green-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </nav>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <Link href="/terms">
                      <Button 
                        variant="outline" 
                        className="w-full border-green-200 text-green-600 hover:bg-green-50"
                      >
                        View Terms of Service
                        <i className="ri-arrow-right-line ml-2"></i>
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="mt-6 bg-blue-50 rounded-2xl p-5 border border-blue-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className="ri-information-line text-blue-600 text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-blue-900">Need Help?</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        If you have questions about our privacy practices, please contact our privacy team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                <div className="prose prose-lg max-w-none">
                  {/* Introduction */}
                  <div ref={sectionRefs.introduction} id="introduction" className="scroll-mt-28">
                    <h2 className="flex items-center text-gray-900">
                      <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm font-bold">1</span>
                      Introduction
                    </h2>
                    <p>
                      At EVCharge, we respect your privacy and are committed to protecting your personal data. 
                      This Privacy Policy explains how we collect, use, and safeguard your information when you 
                      use our platform and services.
                    </p>
                    <p>
                      By using our Services, you consent to the data practices described in this policy.
                    </p>
                  </div>
                  
                  {/* Information We Collect */}
                  <div ref={sectionRefs.collection} id="collection" className="scroll-mt-28 mt-12">
                    <h2 className="flex items-center text-gray-900">
                      <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm font-bold">2</span>
                      Information We Collect
                    </h2>
                    <p>
                      We collect several types of information from and about users of our Services, including:
                    </p>
                    <div className="bg-gray-50 rounded-xl p-6 mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                          <i className="ri-user-line text-green-600"></i>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                          <p className="text-gray-700">Name, email address, phone number, postal address, payment information, and vehicle information.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                          <i className="ri-bar-chart-line text-blue-600"></i>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Usage Data</h3>
                          <p className="text-gray-700">Information about how you use our Services, including charging habits, session history, and preferences.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-4">
                          <i className="ri-smartphone-line text-purple-600"></i>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Device Information</h3>
                          <p className="text-gray-700">Information about the devices you use to access our Services, including IP address, browser type, and operating system.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center mr-4">
                          <i className="ri-map-pin-line text-yellow-600"></i>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Location Data</h3>
                          <p className="text-gray-700">With your consent, we collect precise location data to provide location-based services such as finding nearby charging stations.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* How We Use Your Information */}
                  <div ref={sectionRefs.usage} id="usage" className="scroll-mt-28 mt-12">
                    <h2 className="flex items-center text-gray-900">
                      <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm font-bold">3</span>
                      How We Use Your Information
                    </h2>
                    <p>
                      We use the information we collect to:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-500 mt-1 mr-2"></i>
                        <span>Provide, maintain, and improve our Services</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-500 mt-1 mr-2"></i>
                        <span>Process transactions and send related information</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-500 mt-1 mr-2"></i>
                        <span>Send administrative messages, updates, and security alerts</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-500 mt-1 mr-2"></i>
                        <span>Respond to your comments, questions, and requests</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-500 mt-1 mr-2"></i>
                        <span>Personalize your experience and deliver content relevant to your interests</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-500 mt-1 mr-2"></i>
                        <span>Monitor and analyze trends, usage, and activities in connection with our Services</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-500 mt-1 mr-2"></i>
                        <span>Detect, investigate, and prevent fraudulent transactions and other illegal activities</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-500 mt-1 mr-2"></i>
                                            <span>Comply with legal obligations</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Data Sharing and Disclosure */}
                  <div ref={sectionRefs.sharing} id="sharing" className="scroll-mt-28 mt-12">
                    <h2 className="flex items-center text-gray-900">
                      <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm font-bold">4</span>
                      Data Sharing and Disclosure
                    </h2>
                    <p>
                      We may share your information with:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                        <h3 className="font-semibold text-gray-900 flex items-center mb-2">
                          <i className="ri-service-line text-blue-600 mr-2"></i>
                          Service Providers
                        </h3>
                        <p className="text-gray-700 text-sm">Third-party vendors who perform services on our behalf, such as payment processing, data analysis, and customer service.</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                        <h3 className="font-semibold text-gray-900 flex items-center mb-2">
                          <i className="ri-charging-pile-line text-green-600 mr-2"></i>
                          Charging Station Partners
                        </h3>
                        <p className="text-gray-700 text-sm">To facilitate your charging sessions at partner locations.</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                        <h3 className="font-semibold text-gray-900 flex items-center mb-2">
                          <i className="ri-team-line text-purple-600 mr-2"></i>
                          Business Partners
                        </h3>
                        <p className="text-gray-700 text-sm">With your consent, we may share your information with business partners to offer joint promotions or products.</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                        <h3 className="font-semibold text-gray-900 flex items-center mb-2">
                          <i className="ri-law-line text-yellow-600 mr-2"></i>
                          Legal Requirements
                        </h3>
                        <p className="text-gray-700 text-sm">When required by law or to protect our rights, property, or safety, or the rights, property, or safety of others.</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Data Security */}
                  <div ref={sectionRefs.security} id="security" className="scroll-mt-28 mt-12">
                    <h2 className="flex items-center text-gray-900">
                      <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm font-bold">5</span>
                      Data Security
                    </h2>
                    <div className="bg-green-50 rounded-xl p-6 mt-4 border border-green-100">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                          <i className="ri-shield-keyhole-line text-green-600 text-xl"></i>
                        </div>
                        <div>
                          <p className="text-gray-800">
                            We implement appropriate technical and organizational measures to protect your personal data 
                            against unauthorized or unlawful processing, accidental loss, destruction, or damage. 
                            However, no method of transmission over the Internet or electronic storage is 100% secure, 
                            so we cannot guarantee absolute security.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Your Rights */}
                  <div ref={sectionRefs.rights} id="rights" className="scroll-mt-28 mt-12">
                    <h2 className="flex items-center text-gray-900">
                      <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm font-bold">6</span>
                      Your Rights
                    </h2>
                    <p>
                      Depending on your location, you may have certain rights regarding your personal data, including:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      <div className="flex items-center bg-gray-50 rounded-lg p-3">
                        <i className="ri-eye-line text-blue-600 mr-3"></i>
                        <span>The right to access your personal data</span>
                      </div>
                      <div className="flex items-center bg-gray-50 rounded-lg p-3">
                        <i className="ri-edit-line text-green-600 mr-3"></i>
                        <span>The right to rectify inaccurate data</span>
                      </div>
                      <div className="flex items-center bg-gray-50 rounded-lg p-3">
                        <i className="ri-delete-bin-line text-red-600 mr-3"></i>
                        <span>The right to erase your personal data</span>
                      </div>
                      <div className="flex items-center bg-gray-50 rounded-lg p-3">
                        <i className="ri-forbid-line text-yellow-600 mr-3"></i>
                        <span>The right to restrict processing</span>
                      </div>
                      <div className="flex items-center bg-gray-50 rounded-lg p-3">
                        <i className="ri-file-transfer-line text-purple-600 mr-3"></i>
                        <span>The right to data portability</span>
                      </div>
                      <div className="flex items-center bg-gray-50 rounded-lg p-3">
                        <i className="ri-stop-line text-orange-600 mr-3"></i>
                        <span>The right to object to processing</span>
                      </div>
                    </div>
                    <p className="mt-4">
                      To exercise these rights, please contact us using the information provided in the "Contact Us" section.
                    </p>
                  </div>
                  
                  {/* Cookies and Similar Technologies */}
                  <div ref={sectionRefs.cookies} id="cookies" className="scroll-mt-28 mt-12">
                    <h2 className="flex items-center text-gray-900">
                      <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm font-bold">7</span>
                      Cookies and Similar Technologies
                    </h2>
                    <p>
                      We use cookies and similar tracking technologies to track activity on our Services and 
                      hold certain information. You can instruct your browser to refuse all cookies or to 
                      indicate when a cookie is being sent. However, if you do not accept cookies, you may 
                      not be able to use some portions of our Services.
                    </p>
                  </div>
                  
                  {/* Children's Privacy */}
                  <div ref={sectionRefs.children} id="children" className="scroll-mt-28 mt-12">
                    <h2 className="flex items-center text-gray-900">
                      <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm font-bold">8</span>
                      Children's Privacy
                    </h2>
                    <div className="bg-blue-50 rounded-xl p-6 mt-4 border border-blue-100">
                      <p className="text-gray-800">
                        Our Services are not intended for children under the age of 16, and we do not knowingly 
                        collect personal data from children under 16. If we learn we have collected personal 
                        data from a child under 16, we will delete that information as quickly as possible.
                      </p>
                    </div>
                  </div>
                  
                  {/* Changes to This Privacy Policy */}
                  <div ref={sectionRefs.changes} id="changes" className="scroll-mt-28 mt-12">
                    <h2 className="flex items-center text-gray-900">
                      <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm font-bold">9</span>
                      Changes to This Privacy Policy
                    </h2>
                    <p>
                      We may update our Privacy Policy from time to time. We will notify you of any changes 
                      by posting the new Privacy Policy on this page and updating the "Last updated" date.
                    </p>
                  </div>
                  
                  {/* Contact Us */}
                  <div ref={sectionRefs.contact} id="contact" className="scroll-mt-28 mt-12">
                    <h2 className="flex items-center text-gray-900">
                      <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm font-bold">10</span>
                      Contact Us
                    </h2>
                    <p>
                      If you have any questions about this Privacy Policy, please contact us at:
                    </p>
                    <div className="bg-gray-50 rounded-xl p-6 mt-4 border border-gray-100">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                          <i className="ri-mail-send-line text-green-600 text-xl"></i>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-2">EVCharge Privacy Team</p>
                          <p className="text-gray-700">123 Electric Avenue<br />Green City, CA 94103</p>
                          <a href="mailto:privacy@evcharge.com" className="inline-block mt-2 text-green-600 hover:text-green-700 hover:underline">
                            privacy@evcharge.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Back to Top Button */}
                <div className="mt-12 text-center">
                  <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <i className="ri-arrow-up-line mr-2"></i>
                    Back to Top
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Links Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-xl text-white p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-4">Related Policies</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/terms" className="text-white hover:underline flex items-center">
                      <i className="ri-file-text-line mr-2"></i>
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookies" className="text-white hover:underline flex items-center">
                      <i className="ri-cookie-line mr-2"></i>
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/data-request" className="text-white hover:underline flex items-center">
                      <i className="ri-file-list-line mr-2"></i>
                      Data Request Form
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Need Assistance?</h3>
                <p className="text-white/90 mb-4">Our privacy team is here to help with any questions about your data.</p>
                <Link href="/contact">
                  <Button className="bg-white text-green-600 hover:bg-green-50">
                    Contact Support
                  </Button>
                </Link>
              </div>
              
              <div className="text-center md:text-right">
                <h3 className="text-xl font-bold mb-4">Privacy Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-white hover:underline flex items-center justify-center md:justify-end">
                      <i className="ri-shield-check-line mr-2"></i>
                      Data Protection Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:underline flex items-center justify-center md:justify-end">
                      <i className="ri-question-line mr-2"></i>
                      Privacy FAQs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:underline flex items-center justify-center md:justify-end">
                      <i className="ri-global-line mr-2"></i>
                      Regional Privacy Rights
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}