// components/modals/manager-register-modal.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModalStore } from '@/store/modal-store';
import { useAuthStore } from '@/store/auth-store';
import Modal from '@/components/ui/modal';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { toast } from 'react-hot-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  companyName: z.string().min(2, 'Company name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function ManagerRegisterModal() {
  const [isLoading, setIsLoading] = useState(false);
  const { isManagerRegisterOpen, onClose, onOpen } = useModalStore();
  const { registerManager } = useAuthStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      companyName: '',
      phone: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      await registerManager(data);
      toast.success('Registration successful! Please wait for admin approval.');
      onClose();
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const openManagerLoginModal = () => {
    onClose();
    onOpen('managerLogin');
  };

  return (
    <Modal
      title="Manager Registration"
      description="Register to manage your charging stations"
      isOpen={isManagerRegisterOpen}
      onClose={onClose}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="name"
          label="Full Name"
          disabled={isLoading}
          register={form.register}
          errors={form.formState.errors}
          placeholder="John Doe"
        />
        
        <Input
          id="email"
          label="Email"
          type="email"
          disabled={isLoading}
          register={form.register}
          errors={form.formState.errors}
          placeholder="youremail@example.com"
        />
        
        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          register={form.register}
          errors={form.formState.errors}
          placeholder="******"
        />
        
        <Input
          id="companyName"
          label="Company Name"
          disabled={isLoading}
          register={form.register}
          errors={form.formState.errors}
          placeholder="Your Company"
        />
        
        <Input
          id="phone"
          label="Phone Number"
          disabled={isLoading}
          register={form.register}
          errors={form.formState.errors}
          placeholder="+1 (123) 456-7890"
        />
        
        <div className="pt-2">
          <Button fullWidth type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Register'}
          </Button>
        </div>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-gray-600 text-sm">
          Already have a manager account?{' '}
          <button
            onClick={openManagerLoginModal}
            className="text-primary-600 hover:underline font-medium"
            type="button"
          >
            Log in
          </button>
        </p>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>By registering, you agree to our Terms of Service and Privacy Policy.</p>
        <p className="mt-2">Manager accounts require approval before you can manage stations.</p>
      </div>
    </Modal>
  );
}