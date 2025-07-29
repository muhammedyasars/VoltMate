import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <i className="ri-charging-pile-2-line text-white"></i>
              </div>
              <span className="text-xl font-bold font-brand">
                EVCharge
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Leading the electric vehicle charging revolution with smart, reliable, and accessible charging solutions.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/stations" className="hover:text-white transition-colors">Find Stations</Link></li>
              <li><Link href="/bookings" className="hover:text-white transition-colors">Book Charging</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status Page</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <i className="ri-twitter-line"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <i className="ri-facebook-line"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <i className="ri-instagram-line"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <i className="ri-linkedin-line"></i>
              </a>
            </div>
            
            <h4 className="text-lg font-semibold mb-4">Download Our App</h4>
            <div className="flex space-x-2">
              <a href="#" className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg flex items-center">
                <i className="ri-apple-fill text-xl mr-2"></i>
                <div className="text-xs">
                  <span className="block">Download on the</span>
                  <span className="block font-medium">App Store</span>
                </div>
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg flex items-center">
                <i className="ri-google-play-fill text-xl mr-2"></i>
                <div className="text-xs">
                  <span className="block">Get it on</span>
                  <span className="block font-medium">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} EVCharge. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}