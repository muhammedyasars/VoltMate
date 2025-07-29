import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';

interface UseAuthOptions {
  redirectTo?: string;
  redirectIfAuthenticated?: string;
  requiredRole?: string;
}

export const useAuth = (options: UseAuthOptions = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { 
    user, 
    isAuthenticated, 
    checkAuth,
    login,
    register,
    logout
  } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      
      // Check authentication status
      const isAuthed = await checkAuth();
      
      // Handle redirects based on options
      if (options.redirectTo && !isAuthed) {
        router.push(options.redirectTo);
        return;
      }
      
      if (options.redirectIfAuthenticated && isAuthed) {
        router.push(options.redirectIfAuthenticated);
        return;
      }
      
      // Check for required role
      if (options.requiredRole && (!user?.role || user.role !== options.requiredRole)) {
        router.push('/unauthorized');
        return;
      }
      
      setIsLoading(false);
    };
    
    initialize();
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout
  };
};