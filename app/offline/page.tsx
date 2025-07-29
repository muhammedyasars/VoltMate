import Link from 'next/link';
import Button from '@/components/ui/button';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="inline-block p-6 bg-gray-100 dark:bg-gray-800 rounded-full mb-8">
          <i className="ri-wifi-off-line text-6xl text-gray-500 dark:text-gray-400"></i>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">You're Offline</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          No internet connection
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto mb-8">
          The page you're trying to access requires an internet connection. 
          Please check your connection and try again.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => window.location.reload()}>
            <i className="ri-refresh-line mr-2"></i>
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline">
              <i className="ri-home-line mr-2"></i>
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}