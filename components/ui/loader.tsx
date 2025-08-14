import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-20 h-20 rounded-full border-4 border-gray-200 border-t-green-500 animate-spin"></div>
        
        {/* Inner pulsing circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        
        {/* Loading text */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600 font-medium">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;