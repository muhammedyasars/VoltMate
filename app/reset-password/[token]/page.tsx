// 'use client';

// import { useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Button from '@/components/ui/button';
// import { api } from '@/lib/api-client';
// import { useToast } from '@/hooks/use-toast';
// import { ToastContainer } from '@/components/ui/Toast';

// export default function ResetPasswordPage() {
//   const { token } = useParams();
//   const router = useRouter();
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const { toasts, addToast, removeToast } = useToast();

//   const validatePassword = () => {
//     if (password.length < 8) {
//       addToast('Password must be at least 8 characters long', 'error');
//       return false;
//     }
    
//     if (password !== confirmPassword) {
//       addToast('Passwords do not match', 'error');
//       return false;
//     }
    
//     return true;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validatePassword()) return;
    
//     setIsSubmitting(true);
    
//     try {
//       // In a real app, this would call your API
//       // await api.post('/auth/reset-password', { 
//       //   token,
//       //   password 
//       // });
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       setIsSuccess(true);
      
//       // Redirect to login after 3 seconds
//       setTimeout(() => {
//         router.push('/login?reset=success');
//       }, 3000);
//     } catch (error) {
//       addToast('Failed to reset password. The link may have expired.', 'error');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <ToastContainer toasts={toasts} removeToast={removeToast} />
      
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="flex justify-center">
//           <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
//             <i className="ri-charging-pile-2-line text-white text-2xl"></i>
//           </div>
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
//           Reset your password
//         </h2>
//         <p className="mt-2 text-center text-gray-600">
//           Enter your new password below
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10">
//           {isSuccess ? (
//             <div className="text-center">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <i className="ri-check-line text-2xl text-green-600"></i>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 Password reset successful!
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 Your password has been reset. You will be redirected to the login page in a few seconds.
//               </p>
//               <Link href="/login">
//                 <Button className="w-full">
//                   Login Now
//                 </Button>
//               </Link>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   New Password
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                   Confirm New Password
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type="password"
//                     required
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Button
//                   type="submit"
//                   className="w-full"
//                   isLoading={isSubmitting}
//                 >
//                   Reset Password
//                 </Button>
//               </div>
              
//               <div className="text-center mt-4">
//                 <Link href="/login" className="text-primary-600 font-medium hover:text-primary-700">
//                   <i className="ri-arrow-left-line mr-1"></i>
//                   Back to login
//                 </Link>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }