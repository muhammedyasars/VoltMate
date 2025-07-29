'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/store/modal-store';
import LoginForm from '@/components/forms/login-form';

export default function LoginModal() {
  const [isLoading, setIsLoading] = useState(false);
  const { isLoginOpen, onClose, onOpen } = useModalStore();
  const router = useRouter();

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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={() => onClose()}></div>
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-8 mx-4">
        <button 
          onClick={() => onClose()} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <i className="ri-close-line text-2xl"></i>
        </button>
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-user-line text-2xl text-primary-600"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-1">Sign in to your EVCharge account</p>
        </div>

        <LoginForm onSuccess={handleSuccess} setIsLoading={setIsLoading} />

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={switchToRegister}
              className="text-primary-600 font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}