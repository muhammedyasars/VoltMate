'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/store/modal-store';
import RegisterForm from '@/components/forms/register-form';

export default function RegisterModal() {
  const [isLoading, setIsLoading] = useState(false);
  const { isRegisterOpen, onClose, onOpen } = useModalStore();
  const router = useRouter();

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

          <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
          
        </div>

        <RegisterForm onSuccess={handleSuccess} setIsLoading={setIsLoading} />

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={switchToLogin}
              className="text-primary-600 font-medium hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}