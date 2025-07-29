'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// Define the structure of a toast item
interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

// Props for the individual Toast component
interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onRemove: (id: string) => void;
}

// Props for the ToastContainer component
interface ToastContainerProps {
  toasts: ToastItem[];
  removeToast: (id: string) => void;
}

const Toast = ({ id, message, type, onRemove }: ToastProps) => {
  const [isExiting, setIsExiting] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 4500); // Start exit animation before removal
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => onRemove(id), 500); // Wait for animation to complete
  };
  
  const bgColors = {
    success: 'bg-green-100 border-green-500',
    error: 'bg-red-100 border-red-500',
    info: 'bg-blue-100 border-blue-500',
    warning: 'bg-yellow-100 border-yellow-500'
  };
  
  const textColors = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800',
    warning: 'text-yellow-800'
  };
  
  const icons = {
    success: 'ri-checkbox-circle-line',
    error: 'ri-error-warning-line',
    info: 'ri-information-line',
    warning: 'ri-alert-line'
  };
  
  return (
    <div 
      className={`flex items-center p-4 mb-4 rounded-lg border-l-4 ${bgColors[type]} ${
        isExiting 
          ? 'animate-fadeOut opacity-0 translate-x-full' 
          : 'animate-fadeIn'
      } transition-all duration-500`}
    >
      <i className={`${icons[type]} text-xl mr-3 ${textColors[type]}`}></i>
      <div className={`flex-1 ${textColors[type]}`}>{message}</div>
      <button 
        onClick={handleRemove}
        className={`ml-3 ${textColors[type]} hover:bg-opacity-20 hover:bg-gray-500 rounded-full p-1`}
      >
        <i className="ri-close-line"></i>
      </button>
    </div>
  );
};

export const ToastContainer = ({ toasts, removeToast }: ToastContainerProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-50 w-80">
      {toasts.map((toast: ToastItem) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onRemove={removeToast}
        />
      ))}
    </div>,
    document.body
  );
};