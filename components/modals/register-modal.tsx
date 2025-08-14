// components/modals/register-modal.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/store/modal-store';
import RegisterForm from '@/components/forms/register-form';

export default function RegisterModal() {
  const [isLoading, setIsLoading] = useState(false);
  const { isRegisterOpen, onClose, onOpen } = useModalStore();
  const router = useRouter();

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
  setTimeout(() => {
    onOpen('login');
  }, 300); 
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
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => !isLoading && onClose()}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-md animate-in zoom-in-95 slide-in-from-bottom-2 duration-300">
        <div className="relative bg-white rounded-xl shadow-xl max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Create Account</h2>
            <button 
              onClick={() => !isLoading && onClose()} 
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200"
              disabled={isLoading}
            >
              <i className="ri-close-line text-xl text-gray-500"></i>
            </button>
          </div>
          
          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1 px-6 py-4 custom-scrollbar">
            <RegisterForm onSuccess={handleSuccess} setIsLoading={setIsLoading} />
          </div>

          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={switchToLogin}
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                disabled={isLoading}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}