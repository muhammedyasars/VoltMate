import Link from 'next/link';
import Button from '@/components/ui/button';
// import AnimatedBackground from '@/components/AnimatedBackground';

export default function OfflinePage() {
  return (
    <div className="min-h-screen relative bg-gray-50 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
      {/* <AnimatedBackground /> */}
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="relative z-10 max-w-2xl mx-auto text-center px-4 py-16">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-12">
          {/* Icon Container with Pulse Effect */}
          <div className="relative mx-auto mb-8">
            <div className="absolute inset-0 bg-green-500/10 dark:bg-green-500/5 rounded-full animate-ping opacity-75" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-0 bg-red-500/10 dark:bg-red-500/5 rounded-full animate-ping opacity-75" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full relative">
              <i className="ri-wifi-off-line text-5xl text-red-500 dark:text-red-400"></i>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-500 dark:to-orange-500 mb-4">
            You're Offline
          </h1>
          
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            No internet connection detected
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto mb-8 leading-relaxed">
            The page you're trying to access requires an active internet connection. 
            Please check your network settings and try again when you're back online.
          </p>
          
          <div className="space-y-3 md:space-y-0 md:flex md:space-x-4 justify-center">
            <Button 
              onClick={() => window.location.reload()}
              className="w-full md:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 text-base transform hover:scale-105 transition-all duration-300"
            >
              <i className="ri-refresh-line mr-2"></i>
              Try Again
            </Button>
            
            <Link href="/" className="block w-full md:w-auto">
              <Button 
                variant="outline" 
                className="w-full md:w-auto border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 text-base transform hover:scale-105 transition-all duration-300"
              >
                <i className="ri-home-line mr-2"></i>
                Go to Home
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Troubleshooting Tips */}
        <div className="mt-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
            <i className="ri-information-line text-blue-500 mr-2"></i>
            Troubleshooting Tips
          </h3>
          
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 text-left">
            <li className="flex items-start">
              <i className="ri-checkbox-circle-line text-green-500 mt-0.5 mr-2 flex-shrink-0"></i>
              <span>Check your Wi-Fi or cellular data connection</span>
            </li>
            <li className="flex items-start">
              <i className="ri-checkbox-circle-line text-green-500 mt-0.5 mr-2 flex-shrink-0"></i>
              <span>Try refreshing the page when connection is restored</span>
            </li>
            <li className="flex items-start">
              <i className="ri-checkbox-circle-line text-green-500 mt-0.5 mr-2 flex-shrink-0"></i>
              <span>You can still access previously loaded content in offline mode</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}