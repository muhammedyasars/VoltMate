'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import Button from '@/components/ui/button';

interface RegisterFormProps {
  onSuccess: () => void;
  setIsLoading: (loading: boolean) => void;
}

type UserRole = 'user' | 'manager';

export default function RegisterForm({ onSuccess, setIsLoading }: RegisterFormProps) {
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNum: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    businessRegistrationNumber: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [managerId, setManagerId] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { register, registerManager } = useAuthStore();

  // Password strength calculator
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  // Phone number formatter
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, '');
    
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phoneNum.trim()) {
      newErrors.phoneNum = 'Phone number is required';
    } else if (formData.phoneNum.replace(/\D/g, '').length !== 10) {
      newErrors.phoneNum = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number and special character';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Manager-specific validation
    if (userRole === 'manager') {
      if (!formData.companyName.trim()) {
        newErrors.companyName = 'Company name is required';
      }
      
      if (!formData.businessRegistrationNumber.trim()) {
        newErrors.businessRegistrationNumber = 'Business registration number is required';
      }
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'phoneNum') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        phoneNum: formattedPhone
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear API error when user makes changes
    if (apiError) {
      setApiError('');
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    setApiError('');
    setShowSuccessMessage(false);
    setManagerId('');
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Prevent double submissions
  if (isSubmitting) return;
  
  setApiError('');
  
  if (!validate()) return;
  
  setIsSubmitting(true);
  setIsLoading(true);
  
  try {
    if (userRole === 'manager') {
      // Manager registration
      const response = await registerManager({
        firstName: formData.name.split(' ')[0],
        lastName: formData.name.split(' ').slice(1).join(' ') || formData.name.split(' ')[0],
        email: formData.email,
        phoneNumber: formData.phoneNum.replace(/\D/g, ''),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        companyName: formData.companyName,
        businessRegistrationNumber: formData.businessRegistrationNumber
      });
      
      if (!response.success) {
        // Handle registration failure
        setApiError(response.error || 'Registration failed');
        return;
      }
      
      if (response.uniqueId) {
        // Save manager data to localStorage
        localStorage.setItem('registeredUser', JSON.stringify({
          email: formData.email,
          userType: 'manager',
          managerId: response.uniqueId,
          companyName: formData.companyName,
          timestamp: new Date().toISOString()
        }));
        
        setManagerId(response.uniqueId);
        setShowSuccessMessage(true);
        setTimeout(() => {
          onSuccess();
        }, 10000);
      }
    } else {
      // User registration
      await register({
        firstName: formData.name.split(' ')[0],
        lastName: formData.name.split(' ').slice(1).join(' ') || formData.name.split(' ')[0],
        email: formData.email,
        phoneNumber: formData.phoneNum.replace(/\D/g, ''),
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
      
      localStorage.setItem('registeredUser', JSON.stringify({
        email: formData.email,
        userType: 'user',
        timestamp: new Date().toISOString()
      }));
      
      onSuccess();
    }
  } catch (err: any) {
    console.error('Registration error:', err);
    setApiError(err.message || 'Registration failed. Please try again.');
  } finally {
    setIsLoading(false);
    setIsSubmitting(false);
  }
};

  const copyManagerId = () => {
    if (managerId) {
      navigator.clipboard.writeText(managerId);
      // You could add a toast notification here
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return 'bg-red-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-blue-500';
            case 4: return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return '';
    }
  };

  // Show success message for managers
  if (showSuccessMessage && managerId) {
    return (
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-start">
            <i className="ri-checkbox-circle-fill text-green-600 text-2xl mr-3 mt-0.5"></i>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Registration Successful!
              </h3>
              <p className="text-green-700 mb-4">
                Your manager account has been created. Please save your unique Manager ID:
              </p>
              <div className="bg-white border border-green-300 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <code className="text-lg font-mono font-bold text-gray-900">{managerId}</code>
                  <button
                    onClick={copyManagerId}
                    className="ml-4 px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                  >
                    <i className="ri-file-copy-line mr-1"></i>
                    Copy
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                <i className="ri-information-line mr-1"></i>
                This window will close automatically in 10 seconds. Make sure to save your Manager ID!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start animate-in slide-in-from-top-2 duration-300">
          <i className="ri-error-warning-line mr-2 mt-0.5"></i>
          <span className="text-sm">{apiError}</span>
        </div>
      )}

      {/* Role Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Register as:
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
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <i className="ri-user-line text-gray-400 text-lg"></i>
            </div>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-black placeholder-gray-400 ${
                errors.name 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
              }`}
              placeholder="John Doe"
            />
          </div>
          {errors.name && (
            <p className="mt-2 text-red-600 text-sm flex items-center animate-in slide-in-from-top-1">
              <i className="ri-error-warning-line mr-1"></i>
              {errors.name}
            </p>
          )}
        </div>
        
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

        {/* Phone Number Field */}
        <div>
          <label htmlFor="phoneNum" className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <i className="ri-phone-line text-gray-400 text-lg"></i>
            </div>
            <input
              id="phoneNum"
              name="phoneNum"
              type="tel"
              value={formData.phoneNum}
              onChange={handleChange}
              maxLength={14}
              className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-black placeholder-gray-400 ${
                errors.phoneNum 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
              }`}
              placeholder="(555) 123-4567"
            />
          </div>
          {errors.phoneNum && (
            <p className="mt-2 text-red-600 text-sm flex items-center animate-in slide-in-from-top-1">
              <i className="ri-error-warning-line mr-1"></i>
              {errors.phoneNum}
            </p>
          )}
        </div>

        {/* Manager-specific fields */}
        {userRole === 'manager' && (
          <>
            {/* Company Name Field */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <i className="ri-building-line text-gray-400 text-lg"></i>
                </div>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-black placeholder-gray-400 ${
                    errors.companyName 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                  }`}
                  placeholder="Enter your company name"
                />
              </div>
              {errors.companyName && (
                <p className="mt-2 text-red-600 text-sm flex items-center animate-in slide-in-from-top-1">
                  <i className="ri-error-warning-line mr-1"></i>
                  {errors.companyName}
                </p>
              )}
            </div>

            {/* Business Registration Number Field */}
            <div>
              <label htmlFor="businessRegistrationNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                Business Registration Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <i className="ri-file-text-line text-gray-400 text-lg"></i>
                </div>
                <input
                  id="businessRegistrationNumber"
                  name="businessRegistrationNumber"
                  type="text"
                  value={formData.businessRegistrationNumber}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-black placeholder-gray-400 ${
                    errors.businessRegistrationNumber 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                  }`}
                  placeholder="Enter your business registration number"
                />
              </div>
              {errors.businessRegistrationNumber && (
                <p className="mt-2 text-red-600 text-sm flex items-center animate-in slide-in-from-top-1">
                  <i className="ri-error-warning-line mr-1"></i>
                  {errors.businessRegistrationNumber}
                </p>
              )}
            </div>
          </>
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
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
            >
              <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"} />
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 flex-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        i < passwordStrength ? getPasswordStrengthColor() : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className={`text-xs font-medium ml-3 ${
                  passwordStrength <= 1 ? 'text-red-600' : 
                  passwordStrength === 2 ? 'text-yellow-600' : 
                  passwordStrength === 3 ? 'text-blue-600' : 'text-green-600'
                }`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <p className="text-xs text-gray-500">Use 8+ characters with mixed case, numbers & symbols</p>
            </div>
          )}
          
          {errors.password && (
            <p className="mt-2 text-red-600 text-sm flex items-center animate-in slide-in-from-top-1">
              <i className="ri-error-warning-line mr-1"></i>
              {errors.password}
            </p>
          )}
        </div>
        
        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <i className="ri-lock-check-line text-gray-400 text-lg"></i>
            </div>
            <input
              id="confirmPassword"
                            name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full pl-11 pr-12 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-black placeholder-gray-400 ${
                errors.confirmPassword 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
            >
              <i className={showConfirmPassword ? "ri-eye-off-line" : "ri-eye-line"} />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-2 text-red-600 text-sm flex items-center animate-in slide-in-from-top-1">
              <i className="ri-error-warning-line mr-1"></i>
              {errors.confirmPassword}
            </p>
          )}
        </div>
        
        {/* Terms Checkbox */}
        <div className="space-y-3">
          <label className="flex items-start cursor-pointer group">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="w-5 h-5 mt-0.5 text-blue-600 bg-gray-50 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-700">
              I agree to the{' '}
              <a href="/terms" className="font-medium text-blue-600 hover:text-blue-700 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="font-medium text-blue-600 hover:text-blue-700 underline">
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-red-600 text-sm flex items-center animate-in slide-in-from-top-1">
              <i className="ri-error-warning-line mr-1"></i>
              {errors.acceptTerms}
            </p>
          )}
        </div>
      </div>
      
      <Button 
        type="submit" 
        size="lg" 
        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        <i className={userRole === 'manager' ? "ri-building-line mr-2 text-lg" : "ri-user-add-line mr-2 text-lg"}></i>
        Create {userRole === 'manager' ? 'Manager' : 'User'} Account
      </Button>
      
      {userRole === 'user' && (
        <>
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">Or sign up with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center py-3 px-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
            >
              <i className="ri-google-fill text-xl mr-2.5 text-red-500"></i>
              <span className="font-medium text-gray-700 group-hover:text-gray-900">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center py-3 px-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
            >
              <i className="ri-apple-fill text-xl mr-2.5"></i>
              <span className="font-medium text-gray-700 group-hover:text-gray-900">Apple</span>
            </button>
          </div>
        </>
      )}

      {/* Privacy Notice */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-start">
          <i className="ri-shield-check-line text-green-600 mt-0.5 mr-3"></i>
          <div className="text-xs text-gray-600">
            <p className="font-medium text-gray-700 mb-1">Your data is secure</p>
            <p>We use industry-standard encryption to protect your personal information and never share your data with third parties without your consent.</p>
          </div>
        </div>
      </div>
    </form>
  );
}