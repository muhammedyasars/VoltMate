// components/ui/input.tsx
'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  placeholder?: string;
}

export default function Input({
  id,
  label,
  type = 'text',
  disabled,
  required,
  register,
  errors,
  placeholder
}: InputProps) {
  return (
    <div className="relative">
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id)}
        placeholder={placeholder}
        className={`
          w-full 
          px-4 
          py-2 
          bg-white
          border
          rounded-lg
          transition
          focus:outline-none
          focus:ring-2
          focus:ring-primary-500
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors[id] ? 'border-red-500' : 'border-gray-300'}
        `}
      />
      {errors[id] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  );
}