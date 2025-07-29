// components/modals/manager-login-modal.tsx
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
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormValues = z.infer<typeof formSchema>;

export default function ManagerLoginModal() {
  const [isLoading, setIsLoading] = useState(false);
  const { isManagerLoginOpen, onClose, onOpen } = useModalStore();
  const { loginManager } = useAuthStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      await loginManager(data);
      toast.success('Logged in successfully');
      onClose();
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const openManagerRegisterModal = () => {
    onClose();
    onOpen('managerRegister');
  };

  return (
    <Modal
      title="Manager Login"
      description="Log in to manage your charging stations"
      isOpen={isManagerLoginOpen}
      onClose={onClose}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        
        <div className="pt-2">
          <Button fullWidth type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
        </div>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-gray-600 text-sm">
          Don't have a manager account?{' '}
          <button
            onClick={openManagerRegisterModal}
            className="text-primary-600 hover:underline font-medium"
            type="button"
          >
            Register as Manager
          </button>
        </p>
      </div>
    </Modal>
  );
}