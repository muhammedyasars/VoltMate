'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/store/modal-store';
import RegisterForm from '@/components/forms/register-form';

export default function RegisterModal() {
  const [isLoading, setIsLoading] = useState(false);
  const { isRegisterOpen, onClose, onOpen } = useModalStore();
  const router = useRouter();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isRegisterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isRegisterOpen]);

  const handleSuccess = () => {
    onClose();
    router.push('/dashboard');
  };

  const switchToLogin = () => {
    onClose();
    onOpen('login');
  };

  if (!isRegisterOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => !isLoading && onClose()}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button 
          onClick={() => !isLoading && onClose()} 
          className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group"
          disabled={isLoading}
        >
          <i className="ri-close-line text-xl text-gray-500 group-hover:text-gray-700"></i>
        </button>
        
        {/* Header Background Pattern */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-br from-blue-600 to-blue-700 opacity-5"></div>
        <div className="absolute top-0 left-0 right-0 h-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
        </div>
        
        {/* Scrollable Content */}
        <div className="relative max-h-[90vh] overflow-y-auto">
          <div className="px-8 pt-12 pb-8">
            {/* Logo/Icon Section */}
            <div className="text-center mb-8">
              
              {/* Welcome Text */}
              <div className="space-y-2">
                <p className="text-gray-600 text-base max-w-sm mx-auto">
                  Create your account and start charging your electric vehicle today
                </p>
              </div>

              {/* Benefits */}
              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-1.5"></i>
                  <span>Free to join</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-1.5"></i>
                  <span>24/7 support</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-1.5"></i>
                  <span>Secure</span>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <RegisterForm onSuccess={handleSuccess} setIsLoading={setIsLoading} />

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-4 bg-white text-gray-500 font-medium tracking-wider">Already a member?</span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Have an account?{' '}
                <button 
                  onClick={switchToLogin}
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 relative group"
                  disabled={isLoading}
                >
                  Sign in instead
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </button>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}