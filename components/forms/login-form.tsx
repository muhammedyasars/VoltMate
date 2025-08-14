'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';
import Button from '@/components/ui/button';

interface LoginFormProps {
  onSuccess: () => void;
  setIsLoading: (loading: boolean) => void;
}

type UserRole = 'user' | 'manager';

export default function LoginForm({ onSuccess, setIsLoading }: LoginFormProps) {
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    uniqueManagerId: '',
    remember: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { login, loginManager } = useAuthStore();

  // Check localStorage for registered user data
  useEffect(() => {
    const registeredUser = localStorage.getItem('registeredUser');
    
    if (registeredUser) {
      try {
        const userData = JSON.parse(registeredUser);
        
        // Set the user role based on registration
        setUserRole(userData.userType as UserRole);
        
        // Pre-fill the email field
        setFormData(prev => ({
          ...prev,
          email: userData.email,
          uniqueManagerId: userData.managerId || ''
        }));
        
        // Show success message
        if (userData.userType === 'manager' && userData.managerId) {
          setSuccessMessage(`Manager account created successfully! Your Manager ID has been filled in.`);
        } else {
          setSuccessMessage('Account created successfully! Please enter your password to login.');
        }
        
        // Clear the registration data from localStorage after 30 seconds
        setTimeout(() => {
          localStorage.removeItem('registeredUser');
          setSuccessMessage('');
        }, 30000);
        
      } catch (error) {
        console.error('Error parsing registered user data:', error);
        localStorage.removeItem('registeredUser');
      }
    }
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (userRole === 'manager' && !formData.uniqueManagerId.trim()) {
      newErrors.uniqueManagerId = 'Manager ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    setApiError('');
    setSuccessMessage('');
    setFormData(prev => ({ ...prev, uniqueManagerId: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      if (userRole === 'manager') {
        await loginManager({
          email: formData.email,
          password: formData.password,
          uniqueManagerId: formData.uniqueManagerId
        });
      } else {
        await login(formData.email, formData.password, formData.remember);
      }
      
      // Save login preferences to localStorage if remember me is checked
      if (formData.remember) {
        localStorage.setItem('loginPreferences', JSON.stringify({
          email: formData.email,
          userType: userRole,
          timestamp: new Date().toISOString()
        }));
      }
      
      // Clear any registration data
      localStorage.removeItem('registeredUser');
      
      onSuccess();
    } catch (err: any) {
      setApiError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load saved login preferences if "Remember me" was previously checked
  useEffect(() => {
    const loginPreferences = localStorage.getItem('loginPreferences');
    
    if (loginPreferences && !localStorage.getItem('registeredUser')) {
      try {
        const preferences = JSON.parse(loginPreferences);
        
        // Check if preferences are not too old (e.g., 30 days)
        const savedDate = new Date(preferences.timestamp);
        const daysDiff = (new Date().getTime() - savedDate.getTime()) / (1000 * 60 * 60 * 24);
        
        if (daysDiff < 30) {
          setFormData(prev => ({
            ...prev,
            email: preferences.email,
            remember: true
          }));
          setUserRole(preferences.userType as UserRole);
        } else {
          // Clear old preferences
          localStorage.removeItem('loginPreferences');
        }
      } catch (error) {
        console.error('Error loading login preferences:', error);
        localStorage.removeItem('loginPreferences');
      }
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-start animate-in slide-in-from-top-2 duration-300">
          <i className="ri-checkbox-circle-line mr-2 mt-0.5"></i>
          <span className="text-sm">{successMessage}</span>
        </div>
      )}

      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start animate-in slide-in-from-top-2 duration-300">
          <i className="ri-error-warning-line mr-2 mt-0.5"></i>
          <span className="text-sm">{apiError}</span>
        </div>
      )}

      {/* Role Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Login as:
        </label>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="userRole"
              value="user"
              checked={userRole === 'user'}
              onChange={() => handleRoleChange('user')}
              className="w-4 h-4 text-blue-600 bg-gray-50 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="ml-2.5 text-sm text-gray-600 select-none">User</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="userRole"
              value="manager"
              checked={userRole === 'manager'}
              onChange={() => handleRoleChange('manager')}
              className="w-4 h-4 text-blue-600 bg-gray-50 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="ml-2.5 text-sm text-gray-600 select-none">Manager</span>
          </label>
        </div>
      </div>
      
      <div className="space-y-5">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <i className="ri-mail-line text-gray-400 text-lg"></i>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-black placeholder-gray-400 ${
                errors.email 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
              }`}
              placeholder="your@email.com"
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-red-600 text-sm flex items-center animate-in slide-in-from-top-1">
              <i className="ri-error-warning-line mr-1"></i>
              {errors.email}
            </p>
          )}
        </div>

        {/* Manager ID Field (only for managers) */}
        {userRole === 'manager' && (
          <div>
            <label htmlFor="uniqueManagerId" className="block text-sm font-semibold text-gray-700 mb-2">
              Manager ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <i className="ri-key-line text-gray-400 text-lg"></i>
              </div>
              <input
                id="uniqueManagerId"
                name="uniqueManagerId"
                type="text"
                value={formData.uniqueManagerId}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-black placeholder-gray-400 ${
                  errors.uniqueManagerId 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                }`}
                placeholder="Enter your unique manager ID"
              />
            </div>
            {errors.uniqueManagerId && (
              <p className="mt-2 text-red-600 text-sm flex items-center animate-in slide-in-from-top-1">
                <i className="ri-error-warning-line mr-1"></i>
                {errors.uniqueManagerId}
              </p>
            )}
          </div>
        )}
        
        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <i className="ri-lock-line text-gray-400 text-lg"></i>
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-11 pr-12 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-black placeholder-gray-400 ${
                errors.password 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
              }`}
              placeholder="••••••••"
              autoFocus={!!formData.email} // Auto-focus password if email is pre-filled
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
            >
              <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"} />
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-red-600 text-sm flex items-center animate-in slide-in-from-top-1">
              <i className="ri-error-warning-line mr-1"></i>
              {errors.password}
            </p>
          )}
        </div>
        
        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center cursor-pointer">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              checked={formData.remember}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 bg-gray-50 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <a href="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Forgot password?
          </a>
        </div>
      </div>
      
      <Button 
        type="submit" 
        size="lg" 
        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        <i className="ri-login-box-line mr-2 text-lg"></i>
        Sign In
      </Button>
    </form>
  );
}