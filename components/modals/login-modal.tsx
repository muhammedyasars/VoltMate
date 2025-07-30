'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/store/modal-store';
import LoginForm from '@/components/forms/login-form';

export default function LoginModal() {
  const [isLoading, setIsLoading] = useState(false);
  const { isLoginOpen, onClose, onOpen } = useModalStore();
  const router = useRouter();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isLoginOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoginOpen]);

  const handleSuccess = () => {
    onClose();
    router.push('/dashboard');
  };

  const switchToRegister = () => {
    onClose();
    onOpen('register');
  };

  if (!isLoginOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => !isLoading && onClose()}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button 
          onClick={() => !isLoading && onClose()} 
          className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group"
          disabled={isLoading}
        >
          <i className="ri-close-line text-xl text-gray-500 group-hover:text-gray-700"></i>
        </button>
        
        {/* Header Background Pattern */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-600 to-blue-700 opacity-5"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-[url('/pattern.svg')] opacity-5"></div>
        
        {/* Content */}
        <div className="relative px-8 pt-12 pb-8">


          {/* Login Form */}
          <LoginForm onSuccess={handleSuccess} setIsLoading={setIsLoading} />

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-4 bg-white text-gray-500 font-medium tracking-wider">New to EVCharge?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button 
                onClick={switchToRegister}
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 relative group"
                disabled={isLoading}
              >
                Create an account
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </button>
            </p>
          </div>

          {/* Security Badge */}
 
        </div>
      </div>
    </div>
  );
}