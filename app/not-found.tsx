import Link from 'next/link';
import Button from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="inline-block p-6 bg-primary-100 rounded-full mb-8">
          <i className="ri-error-warning-line text-6xl text-primary-600"></i>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        
        <p className="text-gray-600 max-w-lg mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg">
              <i className="ri-home-line mr-2"></i>
              Back to Home
            </Button>
          </Link>
          <Link href="/stations">
            <Button size="lg" variant="outline">
              <i className="ri-search-line mr-2"></i>
              Find Stations
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}